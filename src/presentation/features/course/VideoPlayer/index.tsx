import 'plyr/dist/plyr.css';
import './VideoPlayer.css';

import useSaveLessonProgress from '@business/services/course/useSaveLessonProgress.ts';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import { Lesson } from '@infra/dto/course/GetCourseDetailDto.ts';
import Hls from 'hls.js';
// @ts-expect-error Plyr import is correct
import Plyr from 'plyr';
import { FC, memo, useEffect, useRef } from 'react';

type CustomVideoPlayerProps = {
  url: string;
  lessonId?: string;
  lastWatchedTime?: number;
};

const Index: FC<CustomVideoPlayerProps> = ({ url, lessonId, lastWatchedTime = 0 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const plyrRef = useRef<Plyr | null>(null);

  const lastTrackedTimeRef = useRef<number>(lastWatchedTime);
  const isCompletedRef = useRef<boolean>(false);

  const { currentLesson, setCurrentLesson, startVideoPlaying, stopVideoPlaying } =
    useWatchCourseStore();
  const { saveLessonProgress } = useSaveLessonProgress({
    lessonId: lessonId || '',
    invalidateQueries: true,
    showSuccessNotification: false,
    showErrorNotification: true,
  });

  useEffect(() => {
    if (currentLesson?.userProgresses?.isCompleted) {
      isCompletedRef.current = true;
    }
  }, [currentLesson]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    isCompletedRef.current = currentLesson?.userProgresses?.isCompleted || false;
    lastTrackedTimeRef.current = lastWatchedTime;

    const isMobile = window.innerWidth < 640;

    // Формируем список контролов динамически
    const controls = [
      'play-large',
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      !isMobile && 'volume',
      'captions',
      'settings',
      !isMobile && 'pip',
      'airplay',
      'fullscreen',
    ].filter(Boolean) as string[];

    const defaultOptions: Plyr.Options = {
      controls: controls, // Передаем наш отфильтрованный список
      settings: ['captions', 'quality', 'speed'],
      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
      autoplay: false,
      ratio: '16:9',
    };

    let player: Plyr;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxMaxBufferLength: 30,
        });
        hlsRef.current = hls;

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map(l => l.height);

          defaultOptions.quality = {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (newQuality: number) => {
              hls.levels.forEach((level, levelIndex) => {
                if (level.height === newQuality) {
                  hls.currentLevel = levelIndex;
                }
              });
            },
          };

          player = new Plyr(video, defaultOptions);
          plyrRef.current = player;

          if (lastWatchedTime > 0) {
            video.currentTime = lastWatchedTime;
          }

          setupPlyrListeners(player);
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          console.error('HLS Error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for Safari (Native HLS)
        video.src = url;
        player = new Plyr(video, defaultOptions);
        plyrRef.current = player;

        if (lastWatchedTime > 0) {
          video.currentTime = lastWatchedTime;
        }
        setupPlyrListeners(player);
      }
    };

    const setupPlyrListeners = (plyrInstance: Plyr) => {
      plyrInstance.on('play', () => startVideoPlaying());
      plyrInstance.on('pause', () => stopVideoPlaying());

      // @ts-expect-error I don't know the real type of event here
      plyrInstance.on('timeupdate', event => {
        const instance = event.detail.plyr;
        const currentTime = instance.currentTime;
        const duration = instance.duration;

        if (currentTime > lastTrackedTimeRef.current + 10) {
          const nextMilestone = Math.floor(currentTime / 10) * 10;
          lastTrackedTimeRef.current = nextMilestone;

          void saveLessonProgress({
            progressSeconds: nextMilestone,
          });
        }

        if (duration > 0 && currentTime >= duration * 0.95 && !isCompletedRef.current) {
          isCompletedRef.current = true;
          void saveLessonProgress({ isCompleted: true });

          if (currentLesson) {
            setCurrentLesson({
              ...currentLesson,
              userProgresses: {
                ...currentLesson.userProgresses,
                isCompleted: true,
              },
            } as Lesson);
          }
        }
      });
    };

    initPlayer();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (plyrRef.current) {
        plyrRef.current.destroy();
        plyrRef.current = null;
      }
    };
  }, [url]);

  return (
    <div
      key={url}
      className="w-full max-w-[760px] mx-auto rounded-lg overflow-hidden shadow-lg bg-black"
    >
      <video ref={videoRef} className="plyr-react plyr" crossOrigin="anonymous" playsInline />
    </div>
  );
};

const MemoizedVideoPlayer = memo(Index);

export default MemoizedVideoPlayer;
