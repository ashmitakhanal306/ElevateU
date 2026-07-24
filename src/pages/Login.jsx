import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, ArrowRight, ShieldCheck, RefreshCw, UserPlus, AlertCircle } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import {
  loginWithEmail,
  loginWithGoogle,
  sendOtp,
  verifyOtp,
} from '../services/authService';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import logoSrc from '../assets/logo.png';

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'email',  label: 'Email' },
  { id: 'phone',  label: 'Phone OTP' },
  { id: 'google', label: 'Google' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Which tab is currently active (default: email)
  const [activeTab, setActiveTab] = useState('email');

  // ── Email tab state ──────────────────────────────────────────────────────
  const [email, setEmail]       = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState({});
  const [emailLoading, setEmailLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  // ── Google tab state ─────────────────────────────────────────────────────
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError]     = useState('');

  // ── Phone tab state ──────────────────────────────────────────────────────
  const [phone, setPhone]           = useState('');
  const [otp, setOtp]               = useState('');
  const [otpSent, setOtpSent]       = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [phoneErrors, setPhoneErrors] = useState({});
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Countdown timer for OTP Resend
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Helper to extract 10-digit mobile number handling optional +91 / 0 prefix
  const getCleanPhoneDigits = (input) => {
    let digits = input.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return digits;
  };

  const isPhoneValid = (input) => {
    const digits = getCleanPhoneDigits(input);
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  };

  const getPhoneHint = (input) => {
    if (!input.trim()) return '';
    const digits = getCleanPhoneDigits(input);
    if (digits.length < 10) {
      return `Enter 10-digit phone number (${digits.length}/10 digits)`;
    }
    if (digits.length > 10) {
      return 'Phone number should not exceed 10 digits';
    }
    if (!/^[6-9]/.test(digits)) {
      return 'Indian mobile numbers must start with 6, 7, 8, or 9';
    }
    return '';
  };

  // ─── Handlers: Email tab ────────────────────────────────────────────────

  const validateEmail = () => {
    const errs = {};
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) errs.email = 'Email address is required';
    else if (!EMAIL_REGEX.test(email.trim())) errs.email = 'Please enter a valid email address';
    if (!password) errs.password = 'Password is required';
    setEmailErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setEmailLoading(true);
    setEmailErrors({});
    setUserNotFound(false);

    const result = await loginWithEmail(email, password);

    setEmailLoading(false);

    if (result.success) {
      login(result.user);
      navigate('/dashboard');
    } else {
      if (result.notRegistered) {
        setUserNotFound(true);
      }
      setEmailErrors({ form: result.error });
    }
  };

  // ─── Handlers: Google tab ───────────────────────────────────────────────

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setGoogleError('');

    const result = await loginWithGoogle();

    if (!result.success) {
      setGoogleLoading(false);
      setGoogleError(
        'Google OAuth configuration is currently in progress. Please use Email or Phone OTP below.'
      );
    }
  };

  // ─── Handlers: Phone tab ────────────────────────────────────────────────

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!isPhoneValid(phone)) {
      setPhoneErrors({ phone: getPhoneHint(phone) || 'Please enter a valid 10-digit mobile number' });
      return;
    }
    setPhoneErrors({});
    setSendLoading(true);

    const result = await sendOtp(phone);

    setSendLoading(false);

    if (result.success) {
      setOtpSent(true);
      setResendTimer(30);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setPhoneErrors({ otp: 'OTP code is required' });
      return;
    }
    setPhoneErrors({});
    setVerifyLoading(true);

    const result = await verifyOtp(phone, otp);

    setVerifyLoading(false);

    if (result.success) {
      login(result.user);
      navigate('/dashboard');
    } else {
      setPhoneErrors({ form: result.error });
    }
  };

  const switchTab = (id) => {
    setActiveTab(id);
    setEmailErrors({});
    setGoogleError('');
    setPhoneErrors({});
  };

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page px-4 py-12 transition-colors duration-300 relative overflow-hidden">
      <div className="pointer-events-none absolute top-[10%] left-[5%] w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">

        {/* ── Brand header above the card ── */}
        <div className="text-center mb-8">
          <div className="mb-4 relative inline-block">
            <img src={logoSrc} alt="ElevateU Logo" className="h-20 w-auto mx-auto object-contain" />
            <p className="mt-2 text-xs font-semibold text-text-secondary tracking-wide">
              Elevate Your Skills. Define Your Future.
            </p>
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Sign in to continue your career journey
          </p>
        </div>

        {/* ── Main card ── */}
        <Card className="overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-border">
            {TABS.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => switchTab(tab.id)}
                className={`flex-1 py-3.5 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-none h-auto focus:ring-0 active:scale-100
                  ${activeTab === tab.id
                    ? 'text-secondary border-b-2 border-secondary -mb-px bg-secondary/5'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-page'
                  }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* ── Tab panels ── */}
          <div className="p-6 sm:p-8 space-y-5">

            {/* ── EMAIL TAB ─────────────────────────────────────────────── */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailLogin} noValidate className="space-y-4">

                <Input
                  label="Email address"
                  type="email"
                  placeholder="aditi@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailErrors.email) setEmailErrors((p) => ({ ...p, email: '' }));
                  }}
                  error={emailErrors.email}
                  autoComplete="email"
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (emailErrors.password) setEmailErrors((p) => ({ ...p, password: '' }));
                  }}
                  error={emailErrors.password}
                  autoComplete="current-password"
                />

                {userNotFound ? (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-3 text-left">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Account Not Found
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      No account exists for <strong className="text-text-primary">{email}</strong>. Please create a new account to sign up.
                    </p>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="w-full gap-2 text-xs font-semibold"
                      onClick={() => navigate('/signup', { state: { email } })}
                    >
                      <UserPlus className="h-4 w-4" />
                      Create New Account
                    </Button>
                  </div>
                ) : emailErrors.form ? (
                  <p className="text-xs font-medium text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                    {emailErrors.form}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2 gap-2"
                  disabled={emailLoading}
                >
                  {emailLoading ? (
                    <>
                      <Spinner />
                      Signing in…
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Sign in with Email
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* ── PHONE OTP TAB ─────────────────────────────────────────── */}
            {activeTab === 'phone' && (
              <div className="space-y-4">

                {!otpSent ? (
                  /* Step 1 — Enter phone number */
                  <form onSubmit={handleSendOtp} noValidate className="space-y-4">
                    <Input
                      label="Phone number"
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneErrors.phone) setPhoneErrors((p) => ({ ...p, phone: '' }));
                      }}
                      error={phoneErrors.phone || getPhoneHint(phone)}
                      autoComplete="tel"
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full gap-2"
                      disabled={sendLoading || !isPhoneValid(phone)}
                    >
                      {sendLoading ? (
                        <>
                          <Spinner />
                          Sending OTP…
                        </>
                      ) : (
                        <>
                          <Phone className="h-4 w-4" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  /* Step 2 — Enter OTP code */
                  <form onSubmit={handleVerifyOtp} noValidate className="space-y-4">

                    <div className="flex items-center justify-between bg-success/10 border border-success/20 text-success rounded-lg px-3 py-2.5 text-xs font-semibold">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 shrink-0" />
                        OTP sent to +91 {getCleanPhoneDigits(phone)}
                      </span>
                    </div>

                    <Input
                      label="6-digit OTP code"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ''));
                        if (phoneErrors.otp) setPhoneErrors((p) => ({ ...p, otp: '' }));
                      }}
                      error={phoneErrors.otp}
                      autoComplete="one-time-code"
                    />

                    <div className="flex items-center justify-between text-xs text-text-secondary bg-bg-page border border-border rounded-lg px-3 py-2">
                      <span>💡 <strong>Demo tip:</strong> use <span className="font-mono font-bold text-secondary">123456</span></span>
                      {resendTimer > 0 ? (
                        <span className="text-text-secondary">Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-secondary font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <RefreshCw className="h-3 w-3" /> Resend OTP
                        </button>
                      )}
                    </div>

                    {phoneErrors.form && (
                      <p className="text-xs font-medium text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                        {phoneErrors.form}
                      </p>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => { setOtpSent(false); setOtp(''); setPhoneErrors({}); }}
                      >
                        Change number
                      </Button>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="flex-1 gap-2"
                        disabled={verifyLoading}
                      >
                        {verifyLoading ? (
                          <>
                            <Spinner />
                            Verifying…
                          </>
                        ) : (
                          <>
                            <ArrowRight className="h-4 w-4" />
                            Verify
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ── GOOGLE TAB ────────────────────────────────────────────── */}
            {activeTab === 'google' && (
              <div className="space-y-4 text-center">
                <p className="text-sm text-text-secondary pb-1">
                  Sign in instantly using your Google account.
                </p>

                {googleError && (
                  <div className="text-xs font-medium text-warning bg-warning/10 border border-warning/20 rounded-lg px-3 py-2 text-left space-y-1">
                    <p className="font-bold">{googleError}</p>
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
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
                      Continue with Google
                    </>
                  )}
                </Button>

                {/* Quick tab switcher guidance */}
                <div className="border-t border-border pt-3 mt-2">
                  <p className="text-xs text-text-secondary mb-2">Or use one of our active login options:</p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => switchTab('email')}
                      className="flex-1 text-xs gap-1"
                    >
                      <Mail className="h-3.5 w-3.5" /> Sign in with Email
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => switchTab('phone')}
                      className="flex-1 text-xs gap-1"
                    >
                      <Phone className="h-3.5 w-3.5" /> Sign in with Phone
                    </Button>
                  </div>
                </div>

              </div>
            )}

          </div>{/* end tab panels */}

          {/* Divider + signup link */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-center border-t border-border">
            <p className="mt-4 text-xs text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-secondary font-bold hover:underline transition-colors"
              >
                Create one free →
              </Link>
            </p>
          </div>

        </Card>{/* end card */}
      </div>
    </div>
  );
}
