import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Download,
  Upload,
  RefreshCw,
  Camera,
  ImageIcon,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import logoImage from '@/assets/indo-air-aviation-logo-removebg-preview.png';
import { CertificateModal } from '@/components/admin/CertificateModal';

const POPULAR_COURSES = [
  'Commercial Pilot License (CPL)',
  'Private Pilot License (PPL)',
  'Cabin Crew Training',
  'Ground Services & Airport Operations',
  'Aviation Management',
  'Aviation Security & Safety',
  'Customer Service Executive',
];

// Helper to compress uploaded student photo to compact lightweight Base64
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxSize = 400; // Passport photo optimal dimension

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // High quality compact JPEG (~25KB)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

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
  const [showCertModal, setShowCertModal] = useState(false);
  const [certStudent, setCertStudent] = useState<Student | null>(null);

  const handleOpenCertificate = (student?: Student | null) => {
    setCertStudent(student || null);
    setShowCertModal(true);
  };

  // Active student targets
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputAddRef = useRef<HTMLInputElement>(null);
  const photoInputEditRef = useRef<HTMLInputElement>(null);

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
    photo_url: null,
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
      photo_url: student.photo_url || null,
    });
    setIsEditOpen(true);
  };

  // Upload Photo handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG or PNG)');
      return;
    }
    try {
      toast.loading('Processing photo...', { id: 'photo-upload' });
      const compressedBase64 = await compressImage(file);
      setFormData((prev) => ({ ...prev, photo_url: compressedBase64 }));
      toast.success('Photo attached successfully!', { id: 'photo-upload' });
    } catch {
      toast.error('Failed to process photo', { id: 'photo-upload' });
    }
    e.target.value = '';
  };

  // Remove Photo handler
  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photo_url: null }));
    toast.info('Photo removed');
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

  // Export registry to JSON
  const handleExportData = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `iaa-students-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success('Backup downloaded successfully');
    } catch {
      toast.error('Failed to export data');
    }
  };

  // Sync / Reset with latest official registry
  const handleSyncRegistry = async () => {
    setLoading(true);
    const updated = await studentService.resetToRegistry();
    setStudents(updated);
    setLoading(false);
    toast.success('Synced with official academy registry!');
  };

  // Import JSON backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const res = await studentService.importStudents(json);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(`Imported ${res.count} student records!`);
          loadStudents();
        }
      } catch {
        toast.error('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
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
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <img
                src={logoImage}
                alt="Indo Air Aviation Academy"
                className="h-8 sm:h-10 w-auto object-contain cursor-pointer shrink-0"
                onClick={() => navigate('/')}
              />
              <div className="min-w-0 truncate">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm sm:text-lg tracking-tight block truncate">
                    Indo Air Aviation Academy
                  </span>
                  {isSupabaseConfigured ? (
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                      Live Cloud Sync
                    </span>
                  ) : (
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5" />
                      Local Storage
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-amber-400 font-medium block uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
            </div>

            {/* Navigation links & Logout */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
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
                <span className="hidden sm:inline">Verify Page</span>
                <span className="sm:hidden">Verify</span>
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Action Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Students & Certificates
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Manage student registrations, certificates, and verification records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <Button
              onClick={handleSyncRegistry}
              variant="outline"
              size="sm"
              className="text-xs text-slate-700 hover:text-slate-900 border-slate-300 cursor-pointer"
              title="Sync latest academy registry"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1 text-primary" />
              Sync
            </Button>
            <Button
              onClick={handleExportData}
              variant="outline"
              size="sm"
              className="text-xs text-slate-700 hover:text-slate-900 border-slate-300 cursor-pointer"
              title="Download backup JSON file"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Backup
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className="text-xs text-slate-700 hover:text-slate-900 border-slate-300 cursor-pointer"
              title="Import JSON backup"
            >
              <Upload className="w-3.5 h-3.5 mr-1 text-blue-600" />
              Import
            </Button>
            <Button
              onClick={handleOpenAdd}
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md inline-flex items-center cursor-pointer text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Student
            </Button>
            <Button
              onClick={() => handleOpenCertificate(null)}
              className="bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-md inline-flex items-center cursor-pointer text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2.5"
              title="Open Certificate Generator"
            >
              <Award className="w-4 h-4 mr-1.5" />
              <span>Create Certificate</span>
            </Button>
          </div>
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

        {/* Mobile View: Clean Cards */}
        <div className="block md:hidden space-y-3">
          {loading ? (
            <Card className="p-8 text-center text-slate-500">
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2 align-middle" />
              Loading student records...
            </Card>
          ) : students.length === 0 ? (
            <Card className="p-8 text-center text-slate-500">
              <p className="text-base font-medium text-slate-700 mb-1">No students found</p>
              <p className="text-xs text-slate-400">Click "Add Student" to create a record</p>
            </Card>
          ) : (
            students.map((student) => (
              <Card
                key={student.id}
                className={`p-4 border-slate-200 shadow-sm transition-all ${
                  student.is_archived ? 'bg-slate-50 opacity-60' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-3 min-w-0">
                    {student.photo_url ? (
                      <img
                        src={student.photo_url}
                        alt={student.student_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shrink-0 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-base truncate">{student.student_name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">S/O, D/O: {student.father_name}</p>
                    </div>
                  </div>
                  {getStatusBadge(student.status, student.is_archived)}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration</span>
                    <span className="font-mono font-semibold text-slate-800 break-all text-xs">{student.registration_number}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Course</span>
                    <span className="font-medium text-slate-800 text-xs">{student.course_name}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">App: {student.application_number}</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenCertificate(student)}
                      className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                      title="Download Certificate"
                    >
                      <Award className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenView(student)}
                      className="h-8 w-8 text-slate-600 hover:text-primary hover:bg-primary/10"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(student)}
                      className="h-8 w-8 text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                      title="Edit Student"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleArchive(student)}
                      className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      title={student.is_archived ? "Restore Student" : "Archive Student"}
                    >
                      {student.is_archived ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDelete(student)}
                      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Desktop View: Full Table */}
        <Card className="hidden md:block shadow-sm border-slate-200 overflow-hidden">
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
                        {searchQuery ? 'Try adjusting your search query' : 'Click "Add Student" to create your first record'}
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
                        <div className="flex items-center space-x-3">
                          {student.photo_url ? (
                            <img
                              src={student.photo_url}
                              alt={student.student_name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-900">{student.student_name}</div>
                            <div className="text-xs text-slate-500 flex items-center mt-0.5">
                              <span>S/O, D/O: {student.father_name}</span>
                            </div>
                          </div>
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
                            size="sm"
                            title="Generate & Download Certificate"
                            onClick={() => handleOpenCertificate(student)}
                            className="h-8 px-2.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 cursor-pointer text-xs font-semibold inline-flex items-center"
                          >
                            <Award className="w-3.5 h-3.5 mr-1" />
                            <span>Certificate</span>
                          </Button>

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
        <DialogContent 
          className="w-[95vw] sm:max-w-2xl max-h-[92vh] flex flex-col p-0 overflow-hidden rounded-2xl"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="p-4 sm:p-6 pb-3 border-b border-slate-100 bg-white z-10 shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900">Add New Student</DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm">
              Enter student credentials, contact info, and course enrollment details
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Optional Student Photo Upload */}
                <div className="sm:col-span-2 flex items-center space-x-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="file"
                    ref={photoInputAddRef}
                    onChange={handlePhotoUpload}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />
                  {formData.photo_url ? (
                    <div className="relative shrink-0">
                      <img
                        src={formData.photo_url}
                        alt="Preview"
                        className="w-16 h-20 rounded-lg object-cover border-2 border-primary shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 cursor-pointer"
                        title="Remove Photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => photoInputAddRef.current?.click()}
                      className="w-16 h-20 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary cursor-pointer transition-colors bg-white shrink-0"
                    >
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-semibold">Photo</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800">
                      Student Photo <span className="text-slate-400 font-normal">(Optional)</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formData.photo_url
                        ? 'Photo attached. Will be shown on verified certificate.'
                        : 'Upload passport photo for student verification (PNG/JPG).'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => photoInputAddRef.current?.click()}
                        className="text-xs h-7 px-2.5 cursor-pointer"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        {formData.photo_url ? 'Change Photo' : 'Upload Photo'}
                      </Button>
                      {formData.photo_url && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemovePhoto}
                          className="text-xs h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

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
                    type="tel"
                    inputMode="tel"
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
                  {/* Quick course selectors */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {POPULAR_COURSES.map((course) => (
                      <button
                        type="button"
                        key={course}
                        onClick={() => setFormData({ ...formData, course_name: course })}
                        className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          formData.course_name === course
                            ? 'bg-primary text-white border-primary'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
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
            </div>

            <DialogFooter className="p-4 sm:p-6 pt-3 border-t border-slate-100 bg-slate-50 z-10 shrink-0 flex items-center justify-end gap-2">
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
        <DialogContent 
          className="w-[95vw] sm:max-w-2xl max-h-[92vh] flex flex-col p-0 overflow-hidden rounded-2xl"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="p-4 sm:p-6 pb-3 border-b border-slate-100 bg-white z-10 shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900">Edit Student Record</DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm">
              Update details for {formData.student_name}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Optional Student Photo Upload in Edit */}
                <div className="sm:col-span-2 flex items-center space-x-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="file"
                    ref={photoInputEditRef}
                    onChange={handlePhotoUpload}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />
                  {formData.photo_url ? (
                    <div className="relative shrink-0">
                      <img
                        src={formData.photo_url}
                        alt="Preview"
                        className="w-16 h-20 rounded-lg object-cover border-2 border-primary shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 cursor-pointer"
                        title="Remove Photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => photoInputEditRef.current?.click()}
                      className="w-16 h-20 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary cursor-pointer transition-colors bg-white shrink-0"
                    >
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-semibold">Photo</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800">
                      Student Photo <span className="text-slate-400 font-normal">(Optional)</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formData.photo_url
                        ? 'Photo attached. Will be shown on verified certificate.'
                        : 'Upload passport photo for student verification (PNG/JPG).'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => photoInputEditRef.current?.click()}
                        className="text-xs h-7 px-2.5 cursor-pointer"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        {formData.photo_url ? 'Change Photo' : 'Upload Photo'}
                      </Button>
                      {formData.photo_url && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemovePhoto}
                          className="text-xs h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

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
                    type="tel"
                    inputMode="tel"
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
                  {/* Quick course selectors */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {POPULAR_COURSES.map((course) => (
                      <button
                        type="button"
                        key={course}
                        onClick={() => setFormData({ ...formData, course_name: course })}
                        className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          formData.course_name === course
                            ? 'bg-primary text-white border-primary'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
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
            </div>

            <DialogFooter className="p-4 sm:p-6 pt-3 border-t border-slate-100 bg-slate-50 z-10 shrink-0 flex items-center justify-end gap-2">
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
                {selectedStudent.photo_url && (
                  <div className="flex justify-center pb-2">
                    <img
                      src={selectedStudent.photo_url}
                      alt={selectedStudent.student_name}
                      className="w-24 h-28 object-cover rounded-lg border-2 border-slate-300 shadow-sm"
                    />
                  </div>
                )}

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

              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
                <Button
                  onClick={() => {
                    setIsViewOpen(false);
                    handleOpenCertificate(selectedStudent);
                  }}
                  className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                >
                  <Award className="w-4 h-4 mr-1.5" />
                  Generate Admission Certificate
                </Button>
                <Button variant="outline" onClick={() => setIsViewOpen(false)} className="w-full sm:w-auto">
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

      {/* ========================================================================= */}
      {/* LUXURY ADMISSION CERTIFICATE GENERATOR MODAL                              */}
      {/* ========================================================================= */}
      <CertificateModal
        open={showCertModal}
        onOpenChange={setShowCertModal}
        student={certStudent}
      />
    </div>
  );
};

export default AdminDashboard;
