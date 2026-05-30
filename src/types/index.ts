export interface User {
  id: string
  email: string
  full_name: string
  role: 'super_admin' | 'school_admin' | 'teacher' | 'parent' | 'student'
  school_id?: string
  phone?: string
  avatar_url?: string
  created_at: string
}

export interface School {
  id: string
  name: string
  address: string
  phone: string
  email: string
  principal_name: string
  founded_year: number
  logo_url?: string
  created_at: string
}

export interface Student {
  id: string
  admission_number: string
  first_name: string
  last_name: string
  middle_name?: string
  gender: 'M' | 'F'
  date_of_birth: string
  class_id: string
  parent_name: string
  parent_phone: string
  parent_email?: string
  address: string
  passport_photo_url?: string
  school_id: string
  status: 'active' | 'inactive' | 'transferred' | 'graduated'
  created_at: string
}

export interface Teacher {
  id: string
  first_name: string
  last_name: string
  phone: string
  email: string
  gender: 'M' | 'F'
  qualification: string
  department: string
  photo_url?: string
  school_id: string
  status: 'active' | 'inactive'
  created_at: string
}

export interface Class {
  id: string
  name: string
  level: string
  class_teacher_id?: string
  school_id: string
  capacity: number
  created_at: string
}

export interface Subject {
  id: string
  subject_name: string
  subject_code: string
  school_id: string
  subject_type: 'core' | 'elective'
  created_at: string
}

export interface Attendance {
  id: string
  student_id: string
  class_id: string
  attendance_date: string
  status: 'present' | 'absent' | 'late'
  remark?: string
  school_id: string
  created_at: string
}

export interface Result {
  id: string
  student_id: string
  subject_id: string
  class_id: string
  term_id: string
  session_id: string
  ca1: number
  ca2: number
  ca3: number
  assignment: number
  project: number
  exam: number
  total_score: number
  average: number
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  remark: string
  gpa: number
  position?: number
  school_id: string
  created_at: string
}

export interface Payment {
  id: string
  student_id: string
  amount: number
  payment_date: string
  term: string
  session: string
  status: 'paid' | 'partially_paid' | 'unpaid'
  payment_method?: string
  receipt_number?: string
  school_id: string
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  target_audience: 'all' | 'students' | 'parents' | 'teachers'
  created_by: string
  school_id: string
  created_at: string
}

export interface AcademicSession {
  id: string
  session_name: string
  start_date: string
  end_date: string
  is_active: boolean
  school_id: string
  created_at: string
}

export interface Term {
  id: string
  term_name: 'First' | 'Second' | 'Third'
  session_id: string
  start_date: string
  end_date: string
  school_id: string
  created_at: string
}

export interface ReportCard {
  id: string
  student_id: string
  term_id: string
  session_id: string
  class_average: number
  position: number
  total_score: number
  average: number
  principal_comment?: string
  form_teacher_comment?: string
  promotion_status: 'promoted' | 'repeated' | 'graduated' | 'transferred'
  school_id: string
  created_at: string
}
