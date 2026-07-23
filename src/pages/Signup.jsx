import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles, Check, X } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { signup as signupService } from '../services/authService';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import logoSrc from '../assets/logo.png';

// ─── Inline Spinner ────────────────────────────────────────────────────────────

/**
 * Animated loading spinner for use inside buttons.
 */
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

// ─── Password Strength Helper ──────────────────────────────────────────────────

/**
 * Evaluates password strength returning a 3-level rating (Weak/Fair/Strong).
 */
function getPasswordStrength(pass) {
  if (!pass) return null;
  const hasMinLength = pass.length >= 8;
  const hasNumber = /\d/.test(pass);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pass);

  if (!hasMinLength) {
    return { label: 'Weak', colorClass: 'text-danger' };
  }
  if (hasNumber && hasSpecial) {
    return { label: 'Strong', colorClass: 'text-success' };
  }
  return { label: 'Fair', colorClass: 'text-warning' };
}

// Robust email regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ─── Main Component ────────────────────────────────────────────────────────────

/**
 * Signup page.
 *
 * Fields: Name, Email, Password, Confirm Password.
 * Validation:
 *   - All fields are required
 *   - Robust email regex validated inline on blur and change
 *   - Live 3-level password strength feedback (Weak/Fair/Strong)
 *   - Live "passwords match" indicator with visual feedback
 *
 * On success: calls AuthContext.login(user) → auto-navigates to /dashboard.
 */
export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // ── Form field state ─────────────────────────────────────────────────────
  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ── UI state ─────────────────────────────────────────────────────────────
  const [errors, setErrors]     = useState({});  // field-level + form-level
  const [isLoading, setIsLoading] = useState(false);

  // ─── Validation ──────────────────────────────────────────────────────────

  const validateEmail = (val) => {
    if (!val.trim()) return 'Email is required';
    if (!EMAIL_REGEX.test(val.trim())) return 'Enter a valid email address';
    return '';
  };

  const handleEmailBlur = () => {
    const err = validateEmail(email);
    setErrors((prev) => ({ ...prev, email: err }));
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) {
      const freshErr = validateEmail(val);
      setErrors((prev) => ({ ...prev, email: freshErr }));
    }
  };

  /**
   * Validate all fields.
   * Returns true if the form is valid, false otherwise.
   */
  const validate = () => {
    const errs = {};

    if (!name.trim()) {
      errs.name = 'Full name is required';
    }

    const emailErr = validateEmail(email);
    if (emailErr) {
      errs.email = emailErr;
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ─── Submit Handler ───────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation; abort if any field fails
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    const result = await signupService(name, email, password);

    setIsLoading(false);

    if (result.success) {
      // Log the new user in immediately after account creation
      login(result.user);
      navigate('/dashboard');
    } else {
      setErrors({ form: 'Account creation failed. Please try again.' });
    }
  };

  // Helper to clear a specific field error when the user starts typing
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const passwordStrength = getPasswordStrength(password);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page px-4 py-12 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background blobs */}
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
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Start your personalised career journey today
          </p>
        </div>

        {/* ── Main card ── */}
        <Card className="p-6 sm:p-8 space-y-5">

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Name */}
            <Input
              label="Full name"
              type="text"
              placeholder="Aditi Sharma"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError('name'); }}
              error={errors.name}
              autoComplete="name"
            />

            {/* Email */}
            <Input
              label="Email address"
              type="email"
              placeholder="aditi@example.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={errors.email}
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                error={errors.password}
                autoComplete="new-password"
              />
              {/* Real-time 3-level password strength feedback */}
              {password && passwordStrength && (
                <div className="flex items-center justify-between text-xs mt-1.5 px-1 font-medium">
                  <span className="text-text-secondary">Password strength:</span>
                  <span className={`font-bold ${passwordStrength.colorClass}`}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                label="Confirm password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />
              {/* Real-time passwords match feedback */}
              {password && confirmPassword && (
                <div className="flex items-center gap-1 text-xs font-semibold mt-1.5 px-1">
                  {password === confirmPassword ? (
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

            {/* API-level error */}
            {errors.form && (
              <p className="text-xs font-medium text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                {errors.form}
              </p>
            )}

            {/* Submit */}
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
  );
}
