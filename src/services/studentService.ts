import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface Student {
  id: string;
  application_number: string;
  registration_number: string;
  student_name: string;
  father_name: string;
  date_of_birth: string; // YYYY-MM-DD
  mobile_number: string;
  email?: string | null;
  course_name: string;
  admission_date: string;
  course_start_date: string;
  course_end_date?: string | null;
  status: 'Active' | 'Completed' | 'Discontinued';
  is_archived: boolean;
  created_at?: string;
  updated_at?: string;
}

export type NewStudentInput = Omit<Student, 'id' | 'created_at' | 'updated_at' | 'is_archived'> & {
  is_archived?: boolean;
};

export interface PublicVerificationResult {
  student_name: string;
  father_name: string;
  registration_number: string;
  course_name: string;
  admission_date: string;
  course_start_date: string;
  course_end_date?: string | null;
  status: string;
}

const LOCAL_STORAGE_KEY = 'iaa_students_local_registry';

// Official academy students registry
const DEFAULT_STUDENTS: Student[] = [
  {
    id: 'std-abhishek-navnath',
    application_number: 'IAA27Y2GV2026/8425',
    registration_number: 'IAA27Y2GV2026/8425',
    student_name: 'Abhishek Navnath Arkas',
    father_name: 'Navnath Namdev Arkas',
    date_of_birth: '2001-08-15',
    mobile_number: '8858453069',
    email: 'abhishek.arkas@indoaviationacademy.com',
    course_name: 'Ground staff',
    admission_date: '2024-01-15',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-30',
    status: 'Completed',
    is_archived: false,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'std-rohit-kumar',
    application_number: 'IAA27Y2GV2026/8420',
    registration_number: 'IAA27Y2GV2026/8420',
    student_name: 'Rohit kumar',
    father_name: 'Chandilal',
    date_of_birth: '2002-06-20',
    mobile_number: '8858453069',
    email: 'rohit.kumar@indoaviationacademy.com',
    course_name: 'lata basic certificate',
    admission_date: '2024-01-15',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-30',
    status: 'Completed',
    is_archived: false,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'sample-student-1',
    application_number: 'APP-2026-100',
    registration_number: 'IAA-2026-100',
    student_name: 'Aarav Sharma',
    father_name: 'Ramesh Sharma',
    date_of_birth: '2002-05-15',
    mobile_number: '9876543210',
    email: 'aarav.sharma@example.com',
    course_name: 'Commercial Pilot License (CPL)',
    admission_date: '2024-01-10',
    course_start_date: '2024-02-01',
    course_end_date: '2025-12-15',
    status: 'Completed',
    is_archived: false,
    created_at: new Date('2024-01-10').toISOString(),
    updated_at: new Date('2024-01-10').toISOString(),
  },
];

const getLocalStudents = (): Student[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    let list: Student[] = raw ? JSON.parse(raw) : [];

    // Ensure all DEFAULT_STUDENTS are merged so any device opening the app gets latest registry
    let hasChanges = false;
    DEFAULT_STUDENTS.forEach((defStudent) => {
      const exists = list.some(
        (s) => s.registration_number.toLowerCase() === defStudent.registration_number.toLowerCase()
      );
      if (!exists) {
        list.push(defStudent);
        hasChanges = true;
      }
    });

    if (hasChanges || !raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }

    return list;
  } catch {
    return DEFAULT_STUDENTS;
  }
};

const saveLocalStudents = (students: Student[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

export const studentService = {
  /**
   * Fetch students for Admin Dashboard
   * Supports search across Student Name, Registration No, Application No, Mobile No
   */
  async getStudents(searchQuery: string = '', showArchived: boolean = false): Promise<{ data: Student[]; error: string | null }> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('students')
          .select('*')
          .order('created_at', { ascending: false });

        if (!showArchived) {
          query = query.eq('is_archived', false);
        }

        const trimmed = searchQuery.trim();
        if (trimmed) {
          query = query.or(
            `student_name.ilike.%${trimmed}%,registration_number.ilike.%${trimmed}%,application_number.ilike.%${trimmed}%,mobile_number.ilike.%${trimmed}%`
          );
        }

        const { data, error } = await query;
        if (!error && data) {
          return { data: data as Student[], error: null };
        }
      } catch {
        // Fall back to local storage
      }
    }

    // Local Storage / Offline fallback
    let list = getLocalStudents();
    if (!showArchived) {
      list = list.filter((s) => !s.is_archived);
    }

    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed) {
      list = list.filter(
        (s) =>
          s.student_name.toLowerCase().includes(trimmed) ||
          s.registration_number.toLowerCase().includes(trimmed) ||
          s.application_number.toLowerCase().includes(trimmed) ||
          s.mobile_number.includes(trimmed)
      );
    }

    return { data: list, error: null };
  },

  /**
   * Add a new student record (Admin Only)
   */
  async addStudent(student: NewStudentInput): Promise<{ data: Student | null; error: string | null }> {
    const payload = {
      ...student,
      application_number: student.application_number.trim(),
      registration_number: student.registration_number.trim(),
      student_name: student.student_name.trim(),
      father_name: student.father_name.trim(),
      mobile_number: student.mobile_number.trim(),
      email: student.email?.trim() || null,
      course_name: student.course_name.trim(),
      is_archived: student.is_archived ?? false,
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('students')
          .insert([payload])
          .select()
          .single();

        if (!error && data) {
          return { data: data as Student, error: null };
        }
        if (error) {
          if (error.code === '23505') {
            if (error.message.includes('registration_number')) {
              return { data: null, error: `Registration Number "${student.registration_number}" already exists.` };
            }
            if (error.message.includes('application_number')) {
              return { data: null, error: `Application Number "${student.application_number}" already exists.` };
            }
          }
          return { data: null, error: error.message };
        }
      } catch {
        // Fallback
      }
    }

    // Local Storage fallback
    const list = getLocalStudents();

    if (list.some((s) => s.registration_number.toLowerCase() === payload.registration_number.toLowerCase())) {
      return { data: null, error: `Registration Number "${payload.registration_number}" already exists.` };
    }
    if (list.some((s) => s.application_number.toLowerCase() === payload.application_number.toLowerCase())) {
      return { data: null, error: `Application Number "${payload.application_number}" already exists.` };
    }

    const newStudent: Student = {
      ...payload,
      id: `std-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    list.unshift(newStudent);
    saveLocalStudents(list);

    return { data: newStudent, error: null };
  },

  /**
   * Update an existing student record (Admin Only)
   */
  async updateStudent(id: string, updates: Partial<Student>): Promise<{ data: Student | null; error: string | null }> {
    const cleanUpdates = { ...updates };
    delete (cleanUpdates as any).id;
    delete (cleanUpdates as any).created_at;
    delete (cleanUpdates as any).updated_at;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('students')
          .update(cleanUpdates)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          return { data: data as Student, error: null };
        }
        if (error) {
          return { data: null, error: error.message };
        }
      } catch {
        // Fallback
      }
    }

    // Local Storage fallback
    const list = getLocalStudents();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) {
      return { data: null, error: 'Student record not found.' };
    }

    const updated = {
      ...list[idx],
      ...cleanUpdates,
      updated_at: new Date().toISOString(),
    };

    list[idx] = updated;
    saveLocalStudents(list);

    return { data: updated, error: null };
  },

  /**
   * Soft archive / unarchive student (Admin Only)
   */
  async setArchived(id: string, is_archived: boolean): Promise<{ success: boolean; error: string | null }> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('students')
          .update({ is_archived })
          .eq('id', id);

        if (!error) return { success: true, error: null };
      } catch {
        // Fallback
      }
    }

    const list = getLocalStudents();
    const student = list.find((s) => s.id === id);
    if (student) {
      student.is_archived = is_archived;
      student.updated_at = new Date().toISOString();
      saveLocalStudents(list);
      return { success: true, error: null };
    }

    return { success: false, error: 'Student not found' };
  },

  /**
   * Permanently delete a student (Admin Only)
   */
  async deleteStudent(id: string): Promise<{ success: boolean; error: string | null }> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('students')
          .delete()
          .eq('id', id);

        if (!error) return { success: true, error: null };
      } catch {
        // Fallback
      }
    }

    let list = getLocalStudents();
    list = list.filter((s) => s.id !== id);
    saveLocalStudents(list);

    return { success: true, error: null };
  },

  /**
   * Public Certificate Verification:
   * Returns ONLY safe public fields.
   */
  async verifyCertificate(
    registrationNumber: string,
    dateOfBirth: string
  ): Promise<{ data: PublicVerificationResult | null; verified: boolean; error: string | null }> {
    const regNoTrimmed = registrationNumber.trim();
    const dobTrimmed = dateOfBirth.trim();

    if (!regNoTrimmed || !dobTrimmed) {
      return { data: null, verified: false, error: 'Both Registration Number and Date of Birth are required.' };
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.rpc('verify_student_certificate', {
          p_registration_number: regNoTrimmed,
          p_date_of_birth: dobTrimmed,
        });

        if (!error && data && Array.isArray(data) && data.length > 0) {
          return { data: data[0] as PublicVerificationResult, verified: true, error: null };
        }
      } catch {
        // Fallback to local
      }
    }

    // Local Verification Lookup
    const list = getLocalStudents();
    const match = list.find(
      (s) =>
        s.registration_number.trim().toUpperCase() === regNoTrimmed.toUpperCase() &&
        s.date_of_birth === dobTrimmed &&
        !s.is_archived
    );

    if (match) {
      const publicResult: PublicVerificationResult = {
        student_name: match.student_name,
        father_name: match.father_name,
        registration_number: match.registration_number,
        course_name: match.course_name,
        admission_date: match.admission_date,
        course_start_date: match.course_start_date,
        course_end_date: match.course_end_date,
        status: match.status,
      };
      return { data: publicResult, verified: true, error: null };
    }

    return { data: null, verified: false, error: null };
  },

  /**
   * Reset local storage to latest official registry
   */
  async resetToRegistry(): Promise<Student[]> {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  },

  /**
   * Import students list (e.g. from backup JSON file)
   */
  async importStudents(importedStudents: Student[]): Promise<{ count: number; error: string | null }> {
    try {
      if (!Array.isArray(importedStudents) || importedStudents.length === 0) {
        return { count: 0, error: 'Invalid or empty student file' };
      }
      const existing = getLocalStudents();
      let added = 0;
      importedStudents.forEach((imp) => {
        if (!imp.registration_number || !imp.student_name) return;
        const idx = existing.findIndex(
          (s) => s.registration_number.toLowerCase() === imp.registration_number.toLowerCase()
        );
        if (idx === -1) {
          existing.push(imp);
          added++;
        } else {
          existing[idx] = { ...existing[idx], ...imp };
          added++;
        }
      });
      saveLocalStudents(existing);
      return { count: added, error: null };
    } catch (e: any) {
      return { count: 0, error: e.message || 'Failed to import students' };
    }
  },
};
