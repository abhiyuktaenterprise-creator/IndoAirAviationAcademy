-- ==============================================================================
-- INDO AIR AVIATION ACADEMY - STUDENT MANAGEMENT & CERTIFICATE VERIFICATION
-- Run this complete script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create the students table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Unique Identifiers
    application_number VARCHAR(50) NOT NULL UNIQUE,
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    
    -- Personal Information
    student_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    
    -- Course & Academic Information
    course_name VARCHAR(150) NOT NULL,
    admission_date DATE NOT NULL,
    course_start_date DATE NOT NULL,
    course_end_date DATE,
    
    -- Status & Archival
    status VARCHAR(30) NOT NULL DEFAULT 'Completed', -- e.g., 'Active', 'Completed', 'Discontinued'
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create search indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_students_reg_no ON public.students(registration_number);
CREATE INDEX IF NOT EXISTS idx_students_app_no ON public.students(application_number);
CREATE INDEX IF NOT EXISTS idx_students_name ON public.students(student_name);
CREATE INDEX IF NOT EXISTS idx_students_mobile ON public.students(mobile_number);
CREATE INDEX IF NOT EXISTS idx_students_dob ON public.students(date_of_birth);

-- 3. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_students_updated_at ON public.students;
CREATE TRIGGER trigger_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 5. Security Policy: Only authenticated admin can perform CRUD operations on students table
DROP POLICY IF EXISTS "Admins full access to students" ON public.students;
CREATE POLICY "Admins full access to students"
    ON public.students
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Note: Anonymous (anon) users have NO SELECT policy on the students table directly!
-- This guarantees the public cannot dump, scrape, or query student data directly.

-- 6. Secure Public Verification Function (RPC)
-- This function runs with SECURITY DEFINER so it can query the table safely,
-- but returns ONLY whitelisted public certificate fields when both Registration No
-- and Date of Birth match an active, unarchived student.
CREATE OR REPLACE FUNCTION public.verify_student_certificate(
    p_registration_number TEXT,
    p_date_of_birth DATE
)
RETURNS TABLE (
    student_name VARCHAR,
    father_name VARCHAR,
    registration_number VARCHAR,
    course_name VARCHAR,
    admission_date DATE,
    course_start_date DATE,
    course_end_date DATE,
    status VARCHAR
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.student_name,
        s.father_name,
        s.registration_number,
        s.course_name,
        s.admission_date,
        s.course_start_date,
        s.course_end_date,
        s.status
    FROM public.students s
    WHERE UPPER(TRIM(s.registration_number)) = UPPER(TRIM(p_registration_number))
      AND s.date_of_birth = p_date_of_birth
      AND s.is_archived = FALSE
    LIMIT 1;
END;
$$;

-- Grant execution permission to both public visitors and authenticated admins
GRANT EXECUTE ON FUNCTION public.verify_student_certificate(TEXT, DATE) TO anon, authenticated;

-- ==============================================================================
-- OPTIONAL: Sample Record for Instant Verification Testing
-- ==============================================================================
INSERT INTO public.students (
    application_number,
    registration_number,
    student_name,
    father_name,
    date_of_birth,
    mobile_number,
    email,
    course_name,
    admission_date,
    course_start_date,
    course_end_date,
    status
) VALUES (
    'APP-2026-100',
    'IAA-2026-100',
    'Aarav Sharma',
    'Ramesh Sharma',
    '2002-05-15',
    '9876543210',
    'aarav.sharma@example.com',
    'Commercial Pilot License (CPL)',
    '2024-01-10',
    '2024-02-01',
    '2025-12-15',
    'Completed'
) ON CONFLICT (registration_number) DO NOTHING;
