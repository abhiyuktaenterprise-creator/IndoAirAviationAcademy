import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { studentService, PublicVerificationResult } from '@/services/studentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  RotateCcw,
  Printer,
  Calendar,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileCheck,
  User,
  GraduationCap,
} from 'lucide-react';
import logoImage from '@/assets/indo-air-aviation-logo-removebg-preview.png';

export const StudentVerification: React.FC = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<PublicVerificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const regNo = registrationNumber.trim();
    const dob = dateOfBirth.trim();

    if (!regNo || !dob) {
      setErrorMessage('Please enter both the Registration Number and Date of Birth.');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await studentService.verifyCertificate(regNo, dob);

      if (res.error) {
        setErrorMessage(res.error);
        setVerifiedResult(null);
      } else if (res.verified && res.data) {
        setVerifiedResult(res.data);
        setErrorMessage(null);
      } else {
        setVerifiedResult(null);
        setErrorMessage(null); // Triggers "No matching record" view
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification service error. Please try again.');
      setVerifiedResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRegistrationNumber('');
    setDateOfBirth('');
    setHasSearched(false);
    setVerifiedResult(null);
    setErrorMessage(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Verification Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Official Academy Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certificate Verification
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Verify the authenticity of an Indo Air Aviation Academy certificate and enrollment credentials using the student's official registration details.
          </p>
        </div>

        {/* Verification Form Card */}
        <Card className="shadow-lg border-slate-200 bg-white overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-slate-900 p-4 text-white">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-sm sm:text-base">Enter Verification Details</span>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Registration Number */}
                <div className="space-y-2">
                  <Label htmlFor="regNo" className="text-sm font-bold text-slate-800">
                    Registration Number *
                  </Label>
                  <div className="relative">
                    <Input
                      id="regNo"
                      type="text"
                      placeholder="e.g. IAA-2026-100"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="font-mono text-sm sm:text-base uppercase bg-slate-50 border-slate-300 focus:bg-white focus:border-primary"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Located on the top of your certificate or admission card.
                  </p>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-sm font-bold text-slate-800">
                    Date of Birth (DOB) *
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="text-sm sm:text-base bg-slate-50 border-slate-300 focus:bg-white focus:border-primary"
                    required
                  />
                  <p className="text-[11px] text-slate-500">
                    Used as a security verification step to protect student privacy.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-2">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 text-base shadow-md cursor-pointer transition-all"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Verifying with Official Registry...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Search className="w-4 h-4 mr-2" />
                      Verify Certificate
                    </span>
                  )}
                </Button>

                {hasSearched && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* ========================================================================= */}
        {/* RESULT AREA: SUCCESS                                                     */}
        {/* ========================================================================= */}
        {hasSearched && !loading && verifiedResult && (
          <div id="print-certificate-area" className="animate-in fade-in-50 duration-500">
            <Card className="border-2 border-emerald-500 shadow-xl bg-white overflow-hidden">
              {/* Official Seal Banner */}
              <div className="bg-emerald-600 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Certificate Verified</h2>
                    <p className="text-xs text-emerald-100">
                      Official record confirmed in Indo Air Aviation Academy database
                    </p>
                  </div>
                </div>
                <Badge className="bg-white text-emerald-800 font-bold hover:bg-white self-start sm:self-auto uppercase tracking-wider text-xs">
                  Authentic Certificate
                </Badge>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Academy watermark header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={logoImage}
                      alt="Indo Air Aviation Academy"
                      className="h-12 w-auto object-contain"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm sm:text-base">
                        Indo Air Aviation Academy
                      </p>
                      <p className="text-xs text-slate-500">
                        Premier Aviation Training Institute in India
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-slate-400 block">Verification Timestamp</span>
                    <span className="text-xs font-mono font-medium text-slate-600">
                      {new Date().toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>

                {/* Details Grid & Optional Student Photo */}
                <div className="flex flex-col sm:flex-row gap-6 bg-slate-50/70 p-4 sm:p-6 rounded-xl border border-slate-100 items-start">
                  {/* Optional Student Passport Photo */}
                  {verifiedResult.photo_url && (
                    <div className="shrink-0 flex flex-col items-center mx-auto sm:mx-0">
                      <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-lg overflow-hidden border-2 border-slate-300 shadow-md bg-white p-1">
                        <img
                          src={verifiedResult.photo_url}
                          alt={verifiedResult.student_name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1.5">
                        Student Photo
                      </span>
                    </div>
                  )}

                  {/* Information Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm flex-1 w-full">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Student Name
                      </span>
                      <span className="text-slate-900 font-bold text-base sm:text-lg mt-0.5 block">
                        {verifiedResult.student_name}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Father's Name
                      </span>
                      <span className="text-slate-800 font-semibold text-base mt-0.5 block">
                        {verifiedResult.father_name}
                      </span>
                    </div>

                    <div className="sm:col-span-2 pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Registration Number
                      </span>
                      <span className="text-slate-900 font-mono font-bold text-base mt-0.5 block">
                        {verifiedResult.registration_number}
                      </span>
                    </div>

                    <div className="sm:col-span-2 pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Course Enrolled
                      </span>
                      <span className="text-slate-900 font-bold text-base mt-0.5 block">
                        {verifiedResult.course_name}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Admission Date
                      </span>
                      <span className="text-slate-700 font-medium text-sm mt-0.5 block">
                        {verifiedResult.admission_date}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Status
                      </span>
                      <span className="inline-block mt-1">
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                          {verifiedResult.status}
                        </Badge>
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Course Start Date
                      </span>
                      <span className="text-slate-700 font-medium text-sm mt-0.5 block">
                        {verifiedResult.course_start_date}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Course End Date
                      </span>
                      <span className="text-slate-700 font-medium text-sm mt-0.5 block">
                        {verifiedResult.course_end_date || 'Course in Progress'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust and Authenticity Note */}
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm flex items-start space-x-3">
                  <FileCheck className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Official Confirmation:</strong> This record has been verified against the official database records of <strong>Indo Air Aviation Academy</strong>. The certificate details presented above correspond to an authorized student record.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2 print:hidden">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrint}
                    className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 mr-2 text-slate-500" />
                    Print / Save Record
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white cursor-pointer"
                  >
                    Verify Another Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* RESULT AREA: NOT VERIFIED / NOT FOUND                                    */}
        {/* ========================================================================= */}
        {hasSearched && !loading && !verifiedResult && !errorMessage && (
          <div className="animate-in fade-in-50 duration-500">
            <Card className="border-2 border-rose-400 shadow-lg bg-white overflow-hidden">
              <div className="bg-rose-600 px-6 py-4 text-white flex items-center space-x-2.5">
                <XCircle className="w-6 h-6 text-white flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Certificate Not Verified</h2>
                  <p className="text-xs text-rose-100">
                    No matching official record could be found
                  </p>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShieldAlert className="w-8 h-8" />
                </div>

                <h3 className="text-lg font-bold text-slate-800">
                  No Matching Record Found
                </h3>

                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Sorry, we could not find a matching official record for Registration Number{' '}
                  <span className="font-mono font-semibold text-slate-900">{registrationNumber}</span> with the provided Date of Birth.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 max-w-lg mx-auto text-left space-y-1.5 border border-slate-200">
                  <p className="font-semibold text-slate-800">Please check the following:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Ensure the Registration Number is spelled exactly as shown on the certificate (e.g. <code>IAA-2026-00125</code>).</li>
                    <li>Ensure the Date of Birth matches your registered admission records.</li>
                    <li>If you recently enrolled or completed your training, your certificate record may take 24–48 hours to synchronize.</li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <Button
                    onClick={handleReset}
                    className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('mailto:Indoairaviation107@gmail.com?subject=Certificate%20Verification%20Assistance&body=Hi,%0A%0AI%20am%20trying%20to%20verify%20my%20certificate%20(Registration%20No:%20' + registrationNumber + ')%20and%20need%20assistance.%0A%0AThank%20you!')}
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Contact Academy Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security & Privacy Assurance */}
        <div className="mt-12 text-center border-t border-slate-200 pt-8 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data Privacy Guarantee: Personal contact information is strictly protected and never displayed publicly.</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentVerification;
