import { Lesson } from '@infra/dto/course/GetCourseDetailDto.ts';
import { create } from 'zustand';

type WatchCourseStore = {
  courseSlug: string | null;
  isVideoPlaying: boolean;
  lastLessonId: string | null;
  currentLesson: Lesson | null;
  toggleVideoPlaying: () => void;
  stopVideoPlaying: () => void;
  startVideoPlaying: () => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setCourseSlug: (slug: string | null) => void;
};

export const useWatchCourseStore = create<WatchCourseStore>(set => ({
  courseSlug: null,
  isVideoPlaying: false,
  currentLesson: null,
  lastLessonId: localStorage.getItem('lastLesson') as string,
  setCourseSlug: (slug: string | null) => set({ courseSlug: slug }),
  toggleVideoPlaying: () => set(state => ({ isVideoPlaying: !state.isVideoPlaying })),
  stopVideoPlaying: () => set({ isVideoPlaying: false }),
  startVideoPlaying: () => set({ isVideoPlaying: true }),
  setCurrentLesson: (lesson: Lesson | null) => {
    localStorage.setItem('lastLesson', lesson ? lesson.id : '');
    set({ currentLesson: lesson });
  },
}));
