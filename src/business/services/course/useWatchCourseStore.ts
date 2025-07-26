import { Lesson } from '@infra/dto/course/GetCourseDetailDto.ts';
import { create } from 'zustand';

type WatchCourseStore = {
  isVideoPlaying: boolean;
  currentLesson: Lesson | null;
  courseTotalDuration: number;
  userTotalProgress: number;
  toggleVideoPlaying: () => void;
  stopVideoPlaying: () => void;
  startVideoPlaying: () => void;
  setCurrentLesson: (lesson: Lesson) => void;
  setCourseTotalDuration: (duration: number) => void;
  setUserTotalProgress: (progress: number) => void;
};

export const useWatchCourseStore = create<WatchCourseStore>(set => ({
  isVideoPlaying: false,
  currentLesson: null,
  courseTotalDuration: 0,
  userTotalProgress: 0,
  setCourseTotalDuration: (duration: number) => set({ courseTotalDuration: duration }),
  setUserTotalProgress: (progress: number) => set({ userTotalProgress: progress }),
  toggleVideoPlaying: () => set(state => ({ isVideoPlaying: !state.isVideoPlaying })),
  stopVideoPlaying: () => set({ isVideoPlaying: false }),
  startVideoPlaying: () => set({ isVideoPlaying: true }),
  setCurrentLesson: (lesson: Lesson) => set({ currentLesson: lesson }),
}));
