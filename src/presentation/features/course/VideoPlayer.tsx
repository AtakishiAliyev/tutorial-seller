import useSaveLessonProgress from '@business/services/course/useSaveLessonProgress.ts';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore';
import { Lesson } from '@infra/dto/course/GetCourseDetailDto.ts';
import Hls from 'hls.js';
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react';

type CustomVideoPlayerProps = {
  url: string;
  lessonId?: string;
  lastWatchedTime?: number; // Добавляем опциональный пропс для последнего просмотренного времени
};

const VideoPlayer: FC<CustomVideoPlayerProps> = ({ url, lessonId, lastWatchedTime = 0 }) => {
  const currentLesson = useWatchCourseStore(state => state.currentLesson);
  const setCurrentLesson = useWatchCourseStore(state => state.setCurrentLesson);
  const { saveLessonProgress } = useSaveLessonProgress({
    lessonId: lessonId || '',
    invalidateQueries: true,
    showSuccessNotification: false,
    showErrorNotification: true,
  });
  const { isVideoPlaying, startVideoPlaying, stopVideoPlaying } = useWatchCourseStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const trackingIntervalRef = useRef<number | null>(null); // Реф для интервала отслеживания
  const lastTrackedTimeRef = useRef<number>(lastWatchedTime); // Реф для отслеживания последнего времени

  const [currentTime, setCurrentTime] = useState(lastWatchedTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);
  const [availableQualities, setAvailableQualities] = useState<
    Array<{ label: string; value: number }>
  >([]);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  // Доступные качества видео (fallback)
  const qualities = [
    { label: 'Auto', value: 'auto' },
    { label: '4K', value: '2160p' },
    { label: '1440p', value: '1440p' },
    { label: '1080p', value: '1080p' },
    { label: '720p', value: '720p' },
    { label: '480p', value: '480p' },
  ];

  // Скорости воспроизведения
  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Отслеживание проигрывания каждые 10 секунд
  useEffect(() => {
    if (isVideoPlaying) {
      // Запускаем интервал каждую секунду для точного отслеживания
      trackingIntervalRef.current = window.setInterval(() => {
        const video = videoRef.current;
        if (!video) return;

        const currentVideoTime = Math.floor(video.currentTime);
        const lastTrackedTime = lastTrackedTimeRef.current;

        // Проверяем, прошло ли 10 секунд с последнего трекинга
        if (currentVideoTime >= lastTrackedTime + 10) {
          lastTrackedTimeRef.current = Math.floor(currentVideoTime / 10) * 10;
          (async () => {
            await saveLessonProgress({
              progressSeconds: lastTrackedTimeRef.current,
            });
          })();
        }

        if (
          video.duration > 0 &&
          currentVideoTime >= video.duration * 0.95 &&
          currentLesson?.userProgresses?.isCompleted === false
        ) {
          (async () => {
            await saveLessonProgress({
              isCompleted: true,
            });
            setCurrentLesson({
              ...currentLesson,
              userProgresses: {
                ...currentLesson.userProgresses,
                isCompleted: true,
              },
            } as Lesson);
          })();
        }
      }, 1000);
    } else {
      // Очищаем интервал когда видео на паузе
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
        trackingIntervalRef.current = null;
      }
    }

    // Очистка при размонтировании или изменении состояния
    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
        trackingIntervalRef.current = null;
      }
    };
  }, [isVideoPlaying, currentLesson, saveLessonProgress, setCurrentLesson]);

  // Сброс отслеживания при смене видео
  useEffect(() => {
    lastTrackedTimeRef.current = 0;
  }, [url]);

  // Обработчик кликов вне меню настроек
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSettings &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        // Проверяем, что клик не по кнопке настроек
        const settingsButton = containerRef.current?.querySelector('[data-settings-button]');
        if (settingsButton && !settingsButton.contains(event.target as Node)) {
          setShowSettings(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    let hls: Hls | null = null;
    setHasError(false);
    setIsLoading(true);

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      startVideoPlaying();
    };

    const handlePause = () => {
      stopVideoPlaying();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Очищаем предыдущий HLS инстанс
    if (hlsInstance) {
      hlsInstance.destroy();
      setHlsInstance(null);
    }

    // Проверяем поддержку HLS
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Встроенная поддержка HLS (Safari)
      video.src = url;
      video.load();
    } else if (Hls.isSupported()) {
      // Используем HLS.js для других браузеров
      hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest parsed successfully');
        setHlsInstance(hls);

        // Получаем доступные качества
        if (hls && hls.levels) {
          const levels = hls.levels;
          // eslint-disable-next-line no-shadow
          const qualities = levels.map((level, index) => ({
            label: `${level.height}p`,
            value: index,
          }));
          qualities.unshift({ label: 'Auto', value: -1 });
          setAvailableQualities(qualities);
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error('HLS error:', data);
        if (data.fatal) {
          setIsLoading(false);
          setHasError(true);

          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Fatal network error encountered');
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error encountered');
              try {
                hls?.recoverMediaError();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (_error) {
                console.error('Cannot recover from media error');
              }
              break;
            default:
              console.error('Fatal error encountered');
              break;
          }
        }
      });
    } else {
      // Fallback для обычных видео файлов
      console.warn('HLS is not supported, fallback to native video');
      video.src = url;
      video.load();
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.currentTime = lastWatchedTime; // Устанавливаем начальное время воспроизведения

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);

      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error('Error playing video:', error);
        setHasError(true);
      });
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);

    // Обновляем последнее отслеженное время при перемотке
    lastTrackedTimeRef.current = Math.floor(newTime / 10) * 10;
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const changeQuality = (levelIndex: number) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = levelIndex;
      setQuality(levelIndex === -1 ? 'auto' : levelIndex.toString());
      setShowSettings(false);
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
    video.currentTime = newTime;

    // Обновляем последнее отслеженное время при скипе
    lastTrackedTimeRef.current = Math.floor(newTime / 10) * 10;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    const timeout = setTimeout(() => {
      if (isVideoPlaying) {
        setShowControls(false);
      }
    }, 3000);
    setControlsTimeout(timeout);
  };

  const handleMouseMove = () => {
    showControlsTemporarily();
  };

  const retryVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setIsLoading(true);

    // Перезагружаем видео
    if (hlsInstance) {
      hlsInstance.destroy();
      setHlsInstance(null);
    }

    // Сбрасываем отслеживание
    lastTrackedTimeRef.current = 0;

    video.load();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80dvh] md:h-[500px] bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isVideoPlaying && setShowControls(false)}
    >
      {/* Видео элемент */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        style={{ aspectRatio: '16/9' }}
        playsInline
        controls={false} // Отключаем стандартные элементы управления
        crossOrigin="anonymous"
      />

      {/* Индикатор загрузки */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-white text-xl mb-2">Ошибка загрузки видео</h3>
            <p className="text-gray-300 text-sm mb-4">Проверьте URL или попробуйте позже</p>
            <button
              onClick={retryVideo}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      )}

      {/* Центральная кнопка воспроизведения */}
      {!isVideoPlaying && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-red-500 bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <Play className="w-10 h-10 text-white ml-1" />
          </button>
        </div>
      )}

      {/* Панель управления */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        }`}
      >
        {/* Прогресс бар */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(currentTime / duration) * 100 || 0}%, #4b5563 ${(currentTime / duration) * 100 || 0}%, #4b5563 100%)`,
            }}
          />
        </div>

        {/* Основные элементы управления */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Кнопка воспроизведения/паузы */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-red-500 transition-colors cursor-pointer"
            >
              {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* Перемотка */}
            <button
              onClick={() => skip(-10)}
              className="text-white hidden md:block hover:text-red-500 transition-colors cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white hidden md:block hover:text-red-500 transition-colors cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Громкость */}
            <div className=" hidden md:flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-red-500 transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Время */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Настройки */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white mt-2 hover:text-red-500 transition-colors cursor-pointer"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Меню настроек */}
              {showSettings && (
                <div
                  ref={settingsRef}
                  className="absolute bottom-8 right-0 bg-black bg-opacity-95 rounded-lg p-4 min-w-48 z-50 border border-gray-700"
                  onClick={e => e.stopPropagation()} // Предотвращаем всплытие события
                >
                  <div className="mb-4">
                    <h3 className="text-white text-sm font-semibold mb-2">Скорость</h3>
                    <div className="space-y-1">
                      {playbackRates.map(rate => (
                        <button
                          key={rate}
                          onClick={() => changePlaybackRate(rate)}
                          className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors cursor-pointer ${
                            playbackRate === rate
                              ? 'text-red-500 bg-red-500 bg-opacity-20'
                              : 'text-white hover:text-red-500 hover:bg-gray-800'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-sm font-semibold mb-2">Качество</h3>
                    <div className="space-y-1">
                      {availableQualities.length > 0
                        ? availableQualities.map(q => (
                            <button
                              key={q.value}
                              onClick={() => changeQuality(q.value)}
                              className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors cursor-pointer ${
                                (q.value === -1 && quality === 'auto') ||
                                quality === q.value.toString()
                                  ? 'text-red-500 bg-red-500 bg-opacity-20'
                                  : 'text-white hover:text-red-500 hover:bg-gray-800'
                              }`}
                            >
                              {q.label}
                            </button>
                          ))
                        : qualities.map(q => (
                            <button
                              key={q.value}
                              onClick={() => setQuality(q.value)}
                              className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors cursor-pointer ${
                                quality === q.value
                                  ? 'text-red-500 bg-red-500 bg-opacity-20'
                                  : 'text-white hover:text-red-500 hover:bg-gray-800'
                              }`}
                            >
                              {q.label}
                            </button>
                          ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Полноэкранный режим */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-red-500 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoizedVideoPlayer = memo(VideoPlayer);

export default MemoizedVideoPlayer;
