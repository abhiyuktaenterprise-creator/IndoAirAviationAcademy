import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Download,
  Printer,
  Award,
  Sparkles,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { Student } from '@/services/studentService';
import { renderLuxuryCertificate, CertificateData } from '@/utils/certificateCanvas';
import logoImage from '@/assets/indo-air-aviation-logo-removebg-preview.png';

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  open,
  onOpenChange,
  student,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<CertificateData>({
    studentName: '',
    registrationNumber: '',
    courseName: 'IATA SOFTWARE BASIC TRAINING',
    duration: '1 MONTH (Full Time)',
    admissionDate: new Date().toLocaleDateString('en-GB'),
    status: 'Verified Active / Admitted Student',
    campus: 'Indore Campus (Sayaji Plaza, MP - 452001)',
  });

  // Pre-fill when student changes
  useEffect(() => {
    if (student) {
      setFormData({
        studentName: student.student_name || '',
        registrationNumber: student.registration_number || '',
        courseName: student.course_name || 'IATA SOFTWARE BASIC TRAINING',
        duration: '1 MONTH (Full Time)',
        admissionDate: student.admission_date || new Date().toLocaleDateString('en-GB'),
        status:
          student.status === 'Completed'
            ? 'Course Completed & Certified'
            : 'Verified Active / Admitted Student',
        campus: 'Indore Campus (Sayaji Plaza, MP - 452001)',
      });
    } else {
      setFormData({
        studentName: '',
        registrationNumber: 'IAA27Y2GV2026/8420',
        courseName: 'IATA SOFTWARE BASIC TRAINING',
        duration: '1 MONTH (Full Time)',
        admissionDate: new Date().toLocaleDateString('en-GB'),
        status: 'Verified Active / Admitted Student',
        campus: 'Indore Campus (Sayaji Plaza, MP - 452001)',
      });
    }
  }, [student, open]);

  // Re-render canvas whenever formData changes or modal opens
  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    const render = async () => {
      if (canvasRef.current && isMounted) {
        setLoading(true);
        try {
          await renderLuxuryCertificate(canvasRef.current, formData, logoImage);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };

    const timer = setTimeout(render, 80);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [formData, open]);

  // Handle Download High-Res PNG
  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    const safeName = (formData.studentName || 'Student').trim().replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `Certificate_${safeName}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  // Handle Print / PDF
  const handlePrint = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png', 1.0);
    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admission Certificate - ${formData.studentName}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
            }
            img {
              width: 100vw;
              height: 100vh;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-slate-900 border-slate-800 text-white shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-4 sm:p-5 border-b border-slate-800 shrink-0 flex flex-row items-center justify-between gap-3 bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-primary flex items-center justify-center text-white shadow-md">
              <Award className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Official Admission Certificate Generator</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Luxury UI
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Direct client certificate generator with live preview and 1-click HD download.
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Print / PDF
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleDownloadPNG}
              className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Download (HD PNG)
            </Button>
          </div>
        </DialogHeader>

        {/* Content Body: Left Form Inputs + Right Live Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/40">
          {/* Column 1: Editable Fields (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certificate Particulars</span>
              </span>
              {student && (
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Auto-filled
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <Label className="text-slate-300 text-xs font-medium">Student Name *</Label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Rohit Kumar"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400 font-bold"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Registration Number *</Label>
                <Input
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="e.g. IAA27Y2GV2026/8420"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 font-mono focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Program Enrolled *</Label>
                <Input
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  placeholder="e.g. IATA SOFTWARE BASIC TRAINING"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-slate-300 text-xs font-medium">Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="1 MONTH (Full Time)"
                    className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-xs font-medium">Date</Label>
                  <Input
                    value={formData.admissionDate}
                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                    placeholder="21/10/2026"
                    className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Training Status</Label>
                <Input
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  placeholder="Verified Active / Admitted Student"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Campus</Label>
                <Input
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  placeholder="Indore Campus (Sayaji Plaza, MP - 452001)"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 text-slate-400"
                />
              </div>
            </div>

            {/* Quick helper note */}
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Features included:</p>
              <p>• Official Academy Logo & Medallion Seal</p>
              <p>• S S Rajpoot (Company CEO) & R. Sharma Signatures</p>
              <p>• Live QR Code linked to website verification portal</p>
              <p>• High-Resolution 2400 × 1700 print-ready canvas</p>
            </div>
          </div>

          {/* Column 2: Live HD Canvas Preview (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center space-y-3">
            <div className="w-full flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Live Certificate Preview</span>
                {loading && <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />}
              </span>
              <span className="text-[11px] font-mono text-slate-500">2400 × 1700 HD Landscape</span>
            </div>

            {/* Canvas Box with drop shadow and border */}
            <div className="w-full bg-slate-900 rounded-xl p-2 sm:p-3 border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-auto max-h-[58vh] object-contain rounded-lg border border-slate-700/60 shadow-lg"
              />
            </div>

            {/* Download CTA Bar */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Click download to get this certificate in full high resolution PNG.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleDownloadPNG}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer text-xs h-9 px-4"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
