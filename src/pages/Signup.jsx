import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, Check, X, LogIn, Mail, MailCheck, RefreshCw, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuth } from '../hooks/useAuth';
import { signup as signupService, loginWithGoogle } from '../services/authService';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import logoSrc from '../assets/logo.png';

// ─── Inline Google SVG Icon ──────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Inline Spinner ────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Zod Schema ────────────────────────────────────────────────────────────
const signupSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // ── Form State (react-hook-form) ─────────────────────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: location.state?.email || '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched'
  });

  // Watch password to show strength / match check
  const watchedPassword = watch('password');
  const watchedConfirm = watch('confirmPassword');

  // ── UI state ─────────────────────────────────────────────────────────────
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError]     = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormError('');
    setAlreadyExists(false);

    const result = await signupService(data.name, data.email, data.password);

    setIsLoading(false);

    if (result.success) {
      login(result.user);
      navigate('/dashboard');
    } else if (result.needsEmailConfirmation) {
      // Email confirmation required — show the confirmation screen
      setConfirmationEmail(result.email || data.email);
    } else {
      if (result.alreadyRegistered) {
        setAlreadyExists(true);
      }
      setFormError(result.error || 'Account creation failed. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setGoogleError('');

    const result = await loginWithGoogle();

    if (!result.success) {
      setGoogleLoading(false);
      setGoogleError(result.error || 'Google sign-up failed. Please try again.');
    }
  };

  // ── Email Confirmation Screen ─────────────────────────────────────────────
  if (confirmationEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-page px-4 py-12 transition-colors duration-300 relative overflow-hidden">
        <div className="pointer-events-none absolute top-[10%] right-[5%] w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-[10%] left-[5%] w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10 text-center">
          <div className="mb-6">
            <img src={logoSrc} alt="ElevateU Logo" className="h-16 w-auto mx-auto object-contain" />
          </div>

          <div className="w-24 h-24 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
            <MailCheck className="h-12 w-12 text-secondary" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-text-primary mb-2">
            Check your inbox!
          </h1>
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            We sent a confirmation link to{' '}
            <span className="font-bold text-text-primary">{confirmationEmail}</span>.
            <br />Click the link in that email to activate your account, then come back and sign in.
          </p>

          <div className="bg-bg-surface border border-border rounded-2xl p-5 mb-6 text-left space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
              <p className="text-sm text-text-secondary">Open your email at <span className="text-text-primary font-semibold">{confirmationEmail}</span></p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
              <p className="text-sm text-text-secondary">Click <span className="text-text-primary font-semibold">"Confirm your email"</span> in the message from ElevateU</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
              <p className="text-sm text-text-secondary">Return here and sign in with your email and password</p>
            </div>
          </div>

          <Link
            to="/login"
            state={{ email: confirmationEmail }}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity duration-200 mb-3"
          >
            <Mail className="h-4 w-4" />
            Go to Sign In
          </Link>

          <button
            type="button"
            onClick={() => setConfirmationEmail('')}
            className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors font-medium"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex transition-colors duration-300">
      
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-bg-page px-4 py-12 relative overflow-hidden">
        <div className="pointer-events-none absolute top-[10%] right-[5%] w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-[10%] left-[5%] w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          {/* ── Brand header above the card ── */}
          <div className="text-center mb-8">
            <div className="mb-4 relative inline-block">
              <img src={logoSrc} alt="ElevateU Logo" className="h-20 w-auto mx-auto object-contain" />
              <p className="mt-2 text-xs font-semibold text-text-secondary tracking-wide">
                Elevate Your Skills. Define Your Future.
              </p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Start your personalised career journey today
            </p>
          </div>

          {/* ── Main card ── */}
          <Card className="p-6 sm:p-8 space-y-5 shadow-2xl shadow-primary/5 border-0">
            {/* Google Sign-up Option */}
            <Button
              variant="outline"
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-page text-text-primary text-sm font-semibold transition-all duration-200 h-auto"
            >
              {googleLoading ? (
                <>
                  <Spinner />
                  Connecting…
                </>
              ) : (
                <>
                  <GoogleIcon />
                  Sign up with Google
                </>
              )}
            </Button>

            {googleError && (
              <p className="text-xs font-medium text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2 text-center">
                {googleError}
              </p>
            )}

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-xs text-text-secondary uppercase">Or sign up with email</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Name */}
              <Input
                label="Full name"
                type="text"
                placeholder="Aditi Sharma"
                {...register('name')}
                error={errors.name?.message}
                autoComplete="name"
              />

              {/* Email */}
              <Input
                label="Email address"
                type="email"
                placeholder="aditi@example.com"
                {...register('email')}
                error={errors.email?.message}
                autoComplete="email"
              />

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Min. 8 chars, 1 number, 1 symbol"
                  {...register('password')}
                  error={errors.password?.message}
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <Input
                  label="Confirm password"
                  type="password"
                  placeholder="Re-enter password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  autoComplete="new-password"
                />
                {watchedPassword && watchedConfirm && !errors.confirmPassword && (
                  <div className="flex items-center gap-1 text-xs font-semibold mt-1.5 px-1">
                    {watchedPassword === watchedConfirm ? (
                      <span className="flex items-center gap-1 text-success">
                        <Check className="h-3.5 w-3.5" /> Passwords match
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-danger">
                        <X className="h-3.5 w-3.5" /> Passwords don't match
                      </span>
                    )}
                  </div>
                )}
              </div>

              {alreadyExists ? (
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4 space-y-3 text-left">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <LogIn className="h-4 w-4 shrink-0" />
                    Account Already Exists
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    An account with <strong className="text-text-primary">{watch('email')}</strong> is already registered. Please sign in instead.
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="w-full gap-2 text-xs font-semibold"
                    onClick={() => navigate('/login')}
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </div>
              ) : formError ? (
                <p className="text-xs font-medium text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                  {formError}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2 gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Creating account…
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create account
                  </>
                )}
              </Button>
            </form>

            {/* Divider + login link */}
            <div className="text-center border-t border-border pt-5">
              <p className="text-xs text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-secondary font-bold hover:underline transition-colors"
                >
                  Sign in instead →
                </Link>
              </p>
            </div>
          </Card>

          {/* Terms note */}
          <p className="mt-4 text-center text-xs text-text-secondary px-4">
            By creating an account you agree to our{' '}
            <span className="text-secondary font-semibold cursor-pointer hover:underline">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-secondary font-semibold cursor-pointer hover:underline">
              Privacy Policy
            </span>.
          </p>
        </div>
      </div>
      
      {/* Right side: Brand Graphic */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-brand-2 to-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-black/10 to-transparent" />
        
        <div className="relative z-10 text-center p-12 text-white max-w-xl">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-2xl">
              <ShieldCheck className="h-16 w-16 text-blue-200" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-white">Your Journey Starts Here</h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            Create an account to uncover skill gaps, access tailored learning roadmaps, and land your dream job faster.
          </p>
        </div>
      </div>
    </div>
  );
}
