import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, ShieldAlert, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import logoImage from '@/assets/indo-air-aviation-logo-removebg-preview.png';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    authService.getSession().then((session) => {
      if (session) {
        navigate('/admin', { replace: true });
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both Email and Password.');
      return;
    }

    setLoading(true);

    try {
      const res = await authService.signInAdmin(email, password);

      if (res.error) {
        setErrorMsg(res.error);
        toast.error('Login Failed', { description: res.error });
        setLoading(false);
        return;
      }

      toast.success('Welcome back!', { description: 'Authenticated successfully.' });
      setLoading(false);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during sign in.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 relative">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-slate-950 pointer-events-none" />

      {/* Return to website link */}
      <div className="relative z-10 w-full max-w-md mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Indo Air Aviation Website
        </button>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-md">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <img
              src={logoImage}
              alt="Indo Air Aviation Academy"
              className="h-20 w-auto object-contain cursor-pointer drop-shadow-md"
              onClick={() => navigate('/')}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight">
            Owner & Admin Portal
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm mt-1">
            Sign in to manage student records & certificates
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errorMsg && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start space-x-2">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200 text-sm font-medium">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@indoaviationacademy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 mt-2 transition-all cursor-pointer shadow-lg hover:shadow-primary/20"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-500">
              Authorized personnel only. Students and public visitors should use the{' '}
              <a href="/verify" className="text-primary hover:underline">
                Public Certificate Verification
              </a>{' '}
              portal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
