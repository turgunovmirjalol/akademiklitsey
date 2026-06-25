export interface NewsTranslation {
  title: string;
  content: string;
}

export interface NewsItem {
  id: number;
  slug: string;
  translations: {
    uz: NewsTranslation;
    uz_cyrl: NewsTranslation;
    ru: NewsTranslation;
    en: NewsTranslation;
  };
  image: string;
  views_count: number;
  status: string;
  status_display: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface NewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

export interface AnnouncementTranslation {
  title: string;
  content: string;
}

export interface Announcement {
  id: number;
  slug: string;
  translations: {
    uz: AnnouncementTranslation;
    ru: AnnouncementTranslation;
    en: AnnouncementTranslation;
    [key: string]: AnnouncementTranslation;
  };
  image: string;
  views_count: number;
  status: string;
  status_display: string;
  is_important: boolean;
  is_expired: boolean;
  expires_at: string | null;
  published_at: string;
  created_at: string;
  created_by: string;
}

export interface AnnouncementResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Announcement[];
}

export interface FAQTranslation {
  question: string;
  answer: string;
}

export interface FAQItem {
  id: number;
  translations: {
    uz: FAQTranslation;
    uz_cyrl: FAQTranslation;
    ru: FAQTranslation;
    en: FAQTranslation;
    [key: string]: FAQTranslation;
  };
  category: string;
  category_display: string;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface TeacherTranslation {
  position: string;
  subject: string;
  bio: string;
  achievements: string;
}

export interface Teacher {
  id: number;
  full_name: string;
  slug: string;
  translations: {
    uz: TeacherTranslation;
    ru: TeacherTranslation;
    [key: string]: TeacherTranslation;
  };
  academic_degree: string;
  academic_rank: string;
  category: string;
  category_display: string;
  experience_years: number;
  department: number | null;
  department_name: string | null;
  photo: string;
  email: string;
  phone?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface TeacherResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Teacher[];
}

export interface LeadershipTranslation {
  position: string;
  bio: string;
  reception_hours: string;
}

export interface LeadershipMember {
  id: number;
  full_name: string;
  translations: {
    uz: LeadershipTranslation;
    ru: LeadershipTranslation;
    [key: string]: LeadershipTranslation;
  };
  academic_degree: string;
  phone: string;
  email: string;
  photo: string;
  sort_order: number;
  is_active: boolean;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface StatTranslation {
  label: string;
}

export interface StatItem {
  id: number;
  key: string;
  value: number | string;
  translations: {
    uz: StatTranslation;
    uz_cyrl: StatTranslation;
    ru: StatTranslation;
    en: StatTranslation;
    [key: string]: StatTranslation;
  };
  icon: string;
  sort_order: number;
  updated_at: string;
}

export interface AdmissionDocumentTranslation {
  document_name: string;
  note: string;
}

export interface AdmissionDocument {
  id: number;
  translations: {
    uz: AdmissionDocumentTranslation;
    uz_cyrl: AdmissionDocumentTranslation;
    ru: AdmissionDocumentTranslation;
    en: AdmissionDocumentTranslation;
    [key: string]: AdmissionDocumentTranslation;
  };
  document_file: string;
  is_required: boolean;
  sort_order: number;
}

export interface SubjectTranslation {
  subject_name: string;
  description: string;
}

export interface Subject {
  id: number;
  subject_type: string;
  subject_type_display: string;
  max_score: number;
  sort_order: number;
  translations: {
    uz: SubjectTranslation;
    uz_cyrl: SubjectTranslation;
    ru: SubjectTranslation;
    en: SubjectTranslation;
    [key: string]: SubjectTranslation;
  };
}

export interface SliderTranslation {
  title: string;
  description: string;
}

export interface SliderItem {
  id: number;
  image: string;
  translations: {
    uz: SliderTranslation;
    uz_cyrl: SliderTranslation;
    ru: SliderTranslation;
    en: SliderTranslation;
    [key: string]: SliderTranslation;
  };
  sort_order: number;
  is_active: boolean;
}

export interface DepartmentTranslation {
  name: string;
  description: string;
}

export interface DepartmentHead {
  id: number;
  full_name: string;
  position: string;
}

export interface Department {
  id: number;
  slug: string;
  translations: {
    uz: DepartmentTranslation;
    uz_cyrl: DepartmentTranslation;
    ru: DepartmentTranslation;
    en: DepartmentTranslation;
    [key: string]: DepartmentTranslation;
  };
  head_teacher: DepartmentHead;
  subjects: string[];
  room_number: string;
  phone: string;
  email: string;
  teachers_count: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface AlbumTranslation {
  title: string;
  description: string;
}

export interface Album {
  id: number;
  slug: string;
  translations: {
    uz: AlbumTranslation;
    uz_cyrl: AlbumTranslation;
    ru: AlbumTranslation;
    en: AlbumTranslation;
    [key: string]: AlbumTranslation;
  };
  cover_image: string;
  event_date: string;
  photos_count: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AlbumResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Album[];
}

export interface DepartmentTranslation {
  name: string;
  description: string;
}

export interface DepartmentHead {
  id: number;
  full_name: string;
  position: string;
}

export interface Department {
  id: number;
  slug: string;
  translations: {
    uz: DepartmentTranslation;
    uz_cyrl: DepartmentTranslation;
    ru: DepartmentTranslation;
    en: DepartmentTranslation;
    [key: string]: DepartmentTranslation;
  };
  head_teacher: DepartmentHead;
  subjects: string[];
  room_number: string;
  phone: string;
  email: string;
  teachers_count: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface AlbumTranslation {
  title: string;
  description: string;
}

export interface Album {
  id: number;
  slug: string;
  translations: {
    uz: AlbumTranslation;
    uz_cyrl: AlbumTranslation;
    ru: AlbumTranslation;
    en: AlbumTranslation;
    [key: string]: AlbumTranslation;
  };
  cover_image: string;
  event_date: string;
  photos_count: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AlbumResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Album[];
}

export interface VideoTranslation {
  title: string;
  description: string;
}

export interface Video {
  id: number;
  translations: {
    uz: VideoTranslation;
    uz_cyrl: VideoTranslation;
    ru: VideoTranslation;
    en: VideoTranslation;
    [key: string]: VideoTranslation;
  };
  video_file: string;
  thumbnail: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Video[];
}

export interface AdmissionInfo {
  id: number;
  academic_year: string;
  total_quota: number;
  grant_quota: number;
  contract_quota: number;
  contract_price: string;
  application_start: string;
  application_end: string;
  exam_date: string;
  results_date: string;
  online_apply_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdmissionCurrentResponse {
  admission_info: AdmissionInfo;
  subjects: Subject[];
  documents: AdmissionDocument[];
}

export interface ScheduleItemTranslation {
  title: string;
}

export interface ScheduleItem {
  id: number;
  translations: {
    uz: ScheduleItemTranslation;
    ru: ScheduleItemTranslation;
    [key: string]: ScheduleItemTranslation;
  };
  file: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
}
