import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

// Pre-configured Academy Owner Credentials
export const ADMIN_CREDENTIALS = {
  email: 'admin@indoaviationacademy.com',
  password: 'GTSbJ?JtzEq5LeVQH6q?',
};

const LOCAL_ADMIN_KEY = 'iaa_admin_session_auth';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}

const listeners: Array<(session: Session | null) => void> = [];

const notifyListeners = (session: Session | null) => {
  listeners.forEach((fn) => fn(session));
};

export const authService = {
  /**
   * Log in the owner/admin with email and password
   */
  async signInAdmin(email: string, password: string): Promise<AuthResponse> {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check Master Admin Credentials
    if (
      cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const mockUser = {
        id: 'master-admin-id',
        email: ADMIN_CREDENTIALS.email,
        aud: 'authenticated',
        role: 'authenticated',
        app_metadata: {},
        user_metadata: { role: 'admin' },
        created_at: new Date().toISOString(),
      } as unknown as User;

      const mockSession = {
        access_token: 'master-admin-session-token',
        token_type: 'bearer',
        expires_in: 86400,
        expires_at: Math.floor(Date.now() / 1000) + 86400,
        user: mockUser,
      } as unknown as Session;

      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockSession));
      notifyListeners(mockSession);

      return { user: mockUser, session: mockSession, error: null };
    }

    // 2. If Supabase is configured, also attempt Supabase Auth
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          return { user: null, session: null, error: error.message };
        }

        if (data.session) {
          localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(data.session));
          notifyListeners(data.session);
        }

        return { user: data.user, session: data.session, error: null };
      } catch (err: any) {
        return {
          user: null,
          session: null,
          error: err.message || 'An unexpected error occurred during login.',
        };
      }
    }

    return {
      user: null,
      session: null,
      error: 'Invalid admin credentials. Please check your email and password.',
    };
  },

  /**
   * Log out the admin
   */
  async signOutAdmin(): Promise<{ error: string | null }> {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    notifyListeners(null);

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }

    return { error: null };
  },

  /**
   * Get the current active session
   */
  async getSession(): Promise<Session | null> {
    // Check local storage session
    const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed as Session;
      } catch {
        localStorage.removeItem(LOCAL_ADMIN_KEY);
      }
    }

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(data.session));
          return data.session;
        }
      } catch {
        return null;
      }
    }

    return null;
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (session: Session | null) => void) {
    listeners.push(callback);

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          // If we already have an active master admin session in localStorage, keep it active
          const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed?.user?.email?.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()) {
                callback(parsed);
                return;
              }
            } catch {
              // Ignore
            }
          }

          if (session) {
            localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(session));
            callback(session);
          } else if (!stored) {
            callback(null);
          }
        }
      );
      return {
        unsubscribe: () => {
          const idx = listeners.indexOf(callback);
          if (idx > -1) listeners.splice(idx, 1);
          subscription.unsubscribe();
        },
      };
    }

    return {
      unsubscribe: () => {
        const idx = listeners.indexOf(callback);
        if (idx > -1) listeners.splice(idx, 1);
      },
    };
  },
};
