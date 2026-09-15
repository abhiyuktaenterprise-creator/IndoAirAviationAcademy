import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { studentService, Student, NewStudentInput } from '@/services/studentService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  LogOut,
  Eye,
  Pencil,
  Trash2,
  Archive,
  RotateCcw,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  BookOpen,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';
import logoImage from '@/assets/indo-air-aviation-logo-removebg-preview.png';

const POPULAR_COURSES = [
  'Commercial Pilot License (CPL)',
  'Private Pilot License (PPL)',
  'Cabin Crew Training',
  'Ground Services & Airport Operations',
  'Aviation Management',
  'Aviation Security & Safety',
  'Customer Service Executive',
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Data states
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Active student targets
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form state
  const initialFormState: NewStudentInput = {
    student_name: '',
    father_name: '',
    date_of_birth: '',
    mobile_number: '',
    email: '',
    application_number: '',
    registration_number: '',
    course_name: 'Commercial Pilot License (CPL)',
    admission_date: '',
    course_start_date: '',
    course_end_date: '',
    status: 'Completed',
  };

  const [formData, setFormData] = useState<NewStudentInput>(initialFormState);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load students
  const loadStudents = async () => {
    setLoading(true);
    const res = await studentService.getStudents(searchQuery, showArchived);
    if (res.error) {
      toast.error('Error', { description: res.error });
    } else {
      setStudents(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, [showArchived]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadStudents();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Logout handler
  const handleLogout = async () => {
    await authService.signOutAdmin();
    toast.success('Signed out successfully');
    navigate('/admin/login', { replace: true });
  };

  // Generate next sequential registration and application numbers starting from 100
  const getNextSequentialIds = () => {
    const year = new Date().getFullYear();
    let maxNum = 99; // Base: Next number will start at 100

    students.forEach((s) => {
      // Check registration number (e.g. IAA-2026-100 or IAA-100)
      const regMatch = s.registration_number.match(/-0*(\d+)$/);
      if (regMatch) {
        const num = parseInt(regMatch[1], 10);
        // Only count sequential numbers < 1000 to prevent old random numbers from breaking sequence
        if (!isNaN(num) && num > maxNum && num < 1000) {
          maxNum = num;
        }
      }

      // Check application number (e.g. APP-2026-100 or APP-100)
      const appMatch = s.application_number.match(/-0*(\d+)$/);
      if (appMatch) {
        const num = parseInt(appMatch[1], 10);
        if (!isNaN(num) && num > maxNum && num < 1000) {
          maxNum = num;
        }
      }
    });

    const nextNumber = maxNum + 1;
    return {
      registration_number: `IAA-${year}-${nextNumber}`,
      application_number: `APP-${year}-${nextNumber}`,
    };
  };

  // Open Add modal
  const handleOpenAdd = () => {
    const { registration_number, application_number } = getNextSequentialIds();
    setFormData({
      ...initialFormState,
      application_number,
      registration_number,
    });
    setIsAddOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      student_name: student.student_name,
      father_name: student.father_name,
      date_of_birth: student.date_of_birth,
      mobile_number: student.mobile_number,
      email: student.email || '',
      application_number: student.application_number,
      registration_number: student.registration_number,
      course_name: student.course_name,
      admission_date: student.admission_date,
      course_start_date: student.course_start_date,
      course_end_date: student.course_end_date || '',
      status: student.status,
    });
    setIsEditOpen(true);
  };

  // Open View modal
  const handleOpenView = (student: Student) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  // Open Delete modal
  const handleOpenDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  // Submit Add Student
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    const res = await studentService.addStudent(formData);
    if (res.error) {
      toast.error('Could not add student', { description: res.error });
      setFormSubmitting(false);
      return;
    }

    toast.success('Student added successfully!', {
      description: `${formData.student_name} (${formData.registration_number})`,
    });
    setIsAddOpen(false);
    setFormSubmitting(false);
    loadStudents();
  };

  // Submit Edit Student
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setFormSubmitting(true);

    const res = await studentService.updateStudent(selectedStudent.id, formData);
    if (res.error) {
      toast.error('Could not update student', { description: res.error });
      setFormSubmitting(false);
      return;
    }

    toast.success('Student updated successfully!');
    setIsEditOpen(false);
    setFormSubmitting(false);
    loadStudents();
  };

  // Toggle Archive
  const handleToggleArchive = async (student: Student) => {
    const nextStatus = !student.is_archived;
    const res = await studentService.setArchived(student.id, nextStatus);
    if (res.error) {
      toast.error('Error', { description: res.error });
      return;
    }
    toast.success(nextStatus ? 'Student moved to archive' : 'Student restored');
    loadStudents();
  };

  // Permanent Delete
  const handlePermanentDelete = async () => {
    if (!selectedStudent) return;
    const res = await studentService.deleteStudent(selectedStudent.id);
    if (res.error) {
      toast.error('Delete failed', { description: res.error });
      return;
    }
    toast.success('Student record deleted permanently');
    setIsDeleteOpen(false);
    loadStudents();
  };

  // Status Badge styling helper
  const getStatusBadge = (status: string, isArchived: boolean) => {
    if (isArchived) {
      return <Badge variant="secondary" className="bg-slate-200 text-slate-700">Archived</Badge>;
    }
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">Completed</Badge>;
      case 'Active':
        return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Active</Badge>;
      case 'Discontinued':
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Discontinued</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Indo Air Aviation Academy"
                className="h-10 w-auto object-contain cursor-pointer"
                onClick={() => navigate('/')}
              />
              <div>
                <span className="font-bold text-base sm:text-lg tracking-tight block">
                  Indo Air Aviation Academy
                </span>
                <span className="text-[11px] text-amber-400 font-medium block uppercase tracking-wider">
                  Admin Management Portal
                </span>
              </div>
            </div>

            {/* Navigation links & Logout */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm hidden sm:inline-flex items-center cursor-pointer"
                onClick={() => window.open('/', '_blank')}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Website
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm inline-flex items-center cursor-pointer"
                onClick={() => window.open('/verify', '_blank')}
              >
                <Award className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Verify Page
              </Button>
              <div className="h-5 w-px bg-slate-700 hidden sm:block" />
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="text-xs sm:text-sm font-medium inline-flex items-center cursor-pointer bg-red-600 hover:bg-red-700"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Students & Certificates
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage student registrations, certificates, and verification records
            </p>
          </div>

          <Button
            onClick={handleOpenAdd}
            className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md inline-flex items-center cursor-pointer text-sm px-5 py-2.5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-sm border-slate-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <Input
                  type="text"
                  placeholder="Search by Name, Reg No, App No, or Mobile..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white border-slate-200 text-slate-900 text-sm focus:border-primary"
                />
              </div>

              {/* Show Archived Toggle */}
              <div className="flex items-center space-x-2 self-start sm:self-center text-sm text-slate-600">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showArchived}
                    onChange={(e) => setShowArchived(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span>Show archived records</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="shadow-sm border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Student Name</th>
                  <th className="py-3.5 px-4">Registration No.</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2 align-middle" />
                      Loading student records...
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <p className="text-base font-medium text-slate-700 mb-1">No students found</p>
                      <p className="text-xs text-slate-400">
                        {searchQuery ? 'Try adjusting your search query' : 'Click "Add New Student" to create your first record'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        student.is_archived ? 'bg-slate-50 opacity-60' : 'bg-white'
                      }`}
                    >
                      {/* Name & Father Name */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-semibold text-slate-900">{student.student_name}</div>
                        <div className="text-xs text-slate-500 flex items-center mt-0.5">
                          <span>S/O, D/O: {student.father_name}</span>
                        </div>
                      </td>

                      {/* Registration & App Number */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-medium text-xs sm:text-sm text-slate-800 bg-slate-100 px-2 py-1 rounded">
                          {student.registration_number}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1">
                          App: {student.application_number}
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {student.course_name}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(student.status, student.is_archived)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View Details"
                            onClick={() => handleOpenView(student)}
                            className="h-8 w-8 text-slate-600 hover:text-primary hover:bg-primary/10 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Student"
                            onClick={() => handleOpenEdit(student)}
                            className="h-8 w-8 text-slate-600 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title={student.is_archived ? 'Restore Student' : 'Archive Student'}
                            onClick={() => handleToggleArchive(student)}
                            className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                          >
                            {student.is_archived ? (
                              <RotateCcw className="w-4 h-4" />
                            ) : (
                              <Archive className="w-4 h-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete Permanently"
                            onClick={() => handleOpenDelete(student)}
                            className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      {/* ========================================================================= */}
      {/* ADD STUDENT DIALOG                                                        */}
      {/* ========================================================================= */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Add New Student</DialogTitle>
            <DialogDescription className="text-slate-500 text-sm">
              Enter student credentials, contact info, and course enrollment details
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="student_name" className="text-xs font-semibold text-slate-700">
                  Student Name *
                </Label>
                <Input
                  id="student_name"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="father_name" className="text-xs font-semibold text-slate-700">
                  Father's Name *
                </Label>
                <Input
                  id="father_name"
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.father_name}
                  onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="date_of_birth" className="text-xs font-semibold text-slate-700">
                  Date of Birth (DOB) *
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mobile_number" className="text-xs font-semibold text-slate-700">
                  Mobile Number *
                </Label>
                <Input
                  id="mobile_number"
                  placeholder="e.g. 9876543210"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                  Email Address (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="registration_number" className="text-xs font-semibold text-slate-700">
                  Registration Number * (Unique)
                </Label>
                <Input
                  id="registration_number"
                  placeholder="e.g. IAA-2026-100"
                  value={formData.registration_number}
                  onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="application_number" className="text-xs font-semibold text-slate-700">
                  Application Number * (Unique)
                </Label>
                <Input
                  id="application_number"
                  placeholder="e.g. APP-2026-100"
                  value={formData.application_number}
                  onChange={(e) => setFormData({ ...formData, application_number: e.target.value })}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="course_name" className="text-xs font-semibold text-slate-700">
                  Course Name *
                </Label>
                <Input
                  id="course_name"
                  placeholder="e.g. Commercial Pilot License (CPL)"
                  value={formData.course_name}
                  onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admission_date" className="text-xs font-semibold text-slate-700">
                  Admission Date *
                </Label>
                <Input
                  id="admission_date"
                  type="date"
                  value={formData.admission_date}
                  onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs font-semibold text-slate-700">
                  Status *
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed (Certificate Issued)</SelectItem>
                    <SelectItem value="Active">Active (Currently Enrolled)</SelectItem>
                    <SelectItem value="Discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="course_start_date" className="text-xs font-semibold text-slate-700">
                  Course Start Date *
                </Label>
                <Input
                  id="course_start_date"
                  type="date"
                  value={formData.course_start_date}
                  onChange={(e) => setFormData({ ...formData, course_start_date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="course_end_date" className="text-xs font-semibold text-slate-700">
                  Course End Date (Optional)
                </Label>
                <Input
                  id="course_end_date"
                  type="date"
                  value={formData.course_end_date || ''}
                  onChange={(e) => setFormData({ ...formData, course_end_date: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
                disabled={formSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={formSubmitting} className="bg-primary text-white">
                {formSubmitting ? 'Saving...' : 'Save Student Record'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* EDIT STUDENT DIALOG                                                       */}
      {/* ========================================================================= */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit Student Record</DialogTitle>
            <DialogDescription className="text-slate-500 text-sm">
              Update details for {formData.student_name}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Student Name *</Label>
                <Input
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Father's Name *</Label>
                <Input
                  value={formData.father_name}
                  onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Date of Birth (DOB) *</Label>
                <Input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Mobile Number *</Label>
                <Input
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-semibold text-slate-700">Email Address</Label>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Registration Number *</Label>
                <Input
                  value={formData.registration_number}
                  onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Application Number *</Label>
                <Input
                  value={formData.application_number}
                  onChange={(e) => setFormData({ ...formData, application_number: e.target.value })}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-semibold text-slate-700">Course Name *</Label>
                <Input
                  value={formData.course_name}
                  onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Admission Date *</Label>
                <Input
                  type="date"
                  value={formData.admission_date}
                  onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed (Certificate Issued)</SelectItem>
                    <SelectItem value="Active">Active (Currently Enrolled)</SelectItem>
                    <SelectItem value="Discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Course Start Date *</Label>
                <Input
                  type="date"
                  value={formData.course_start_date}
                  onChange={(e) => setFormData({ ...formData, course_start_date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Course End Date</Label>
                <Input
                  type="date"
                  value={formData.course_end_date || ''}
                  onChange={(e) => setFormData({ ...formData, course_end_date: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                disabled={formSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={formSubmitting} className="bg-primary text-white">
                {formSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* VIEW STUDENT DETAILS DIALOG                                               */}
      {/* ========================================================================= */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
              <span>Student Details</span>
              {selectedStudent && getStatusBadge(selectedStudent.status, selectedStudent.is_archived)}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Complete profile & course history
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4 py-2">
              <div className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-100 text-sm">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Full Name</span>
                  <span className="font-bold text-slate-900 text-base">{selectedStudent.student_name}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Father's Name</span>
                    <span className="text-slate-800 font-medium">{selectedStudent.father_name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Date of Birth</span>
                    <span className="text-slate-800 font-medium">{selectedStudent.date_of_birth}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Registration Number</span>
                    <span className="font-mono text-slate-900 font-semibold">{selectedStudent.registration_number}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Application Number</span>
                    <span className="font-mono text-slate-800 font-medium">{selectedStudent.application_number}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Mobile</span>
                    <span className="text-slate-800">{selectedStudent.mobile_number}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Email</span>
                    <span className="text-slate-800">{selectedStudent.email || 'N/A'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Course</span>
                  <span className="text-slate-900 font-semibold">{selectedStudent.course_name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 block">Admission</span>
                    <span className="font-medium text-slate-700">{selectedStudent.admission_date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Start Date</span>
                    <span className="font-medium text-slate-700">{selectedStudent.course_start_date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">End Date</span>
                    <span className="font-medium text-slate-700">{selectedStudent.course_end_date || 'Ongoing'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* PERMANENT DELETE CONFIRMATION                                             */}
      {/* ========================================================================= */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm">
              This will permanently delete the student record for{' '}
              <strong>{selectedStudent?.student_name}</strong> (Reg: {selectedStudent?.registration_number}).
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePermanentDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
