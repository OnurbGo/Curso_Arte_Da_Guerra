export interface BaseEntity {
  id: number;
}

export type WithProgress<T> = T & { progress: number };

export interface Inscription extends BaseEntity {
  user_id: number;
  class_id: number;
}

export interface CourseDetails extends BaseEntity {
  title: string;
  description: string;
  url_img: string;
  url_img_banner: string;
  master_id?: number;
}

export type CourseWithProgress = WithProgress<CourseDetails>;

export interface User extends BaseEntity {
  name: string;
  email: string;
  cpf?: string;
  type: string;
  registrationDate: string;
  url_img?: string;
}

export interface Teacher extends BaseEntity {
  user_id: number;
  biography: string;
  expertise: string;
  name?: string;
  UserModel?: { name?: string };
}

export interface LessonData extends BaseEntity {
  title: string;
  description: string;
  url_video: string;
  class_id: number;
}

export interface Lesson extends BaseEntity {
  title: string;
  url_img: string;
}

export interface ClassItem extends BaseEntity {
  title: string;
  description: string;
  url_img: string;
  url_img_banner: string;
  teacherName?: string;
  teacherSpecialization?: string;
}

export interface FormData {
  name: string;
  email: string;
  CPF: string;
  password: string;
  confirmPassword: string;
  type: string;
  biography: string;
  expertise: string;
}

export interface UserUpdatePayload {
  name: string;
  password?: string;
  url_img?: string;
}

export interface TeacherUpdatePayload {
  name: string;
  biography: string;
  expertise: string;
  password?: string;
}

export interface DecodedTokenAuth {
  user: {
    id: number;
    type: string;
  };
}

export interface DecodedTokenFull {
  user: User;
}

export interface DecodedTokenMinimal {
  user: { id: number };
}

export interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
}
