export interface GetCourseDetailDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  preview: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  order: number;
  isPublic: boolean;
  totalDuration: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  order: number;
  video: Video | null;
  resources: Resource[];
  userProgresses: UserProgress | null;
}

export interface Video {
  id: string;
  url: string;
}

export interface Resource {
  id: string;
  name: string;
  resourceUrl: string;
}

export interface UserProgress {
  id: string;
  progressSeconds: number;
  isCompleted: boolean;
}
