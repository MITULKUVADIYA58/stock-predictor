import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, TrendingUp, ArrowRight, Eye, EyeOff, BarChart3, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validation
      if (!email.trim()) {
        setError('Email address is required');
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      if (!password) {
        setError('Password is required');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      // Sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        setError(signInError.message || 'Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      if (data.session) {
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Store session info if remember me is checked
        if (rememberMe) {
          localStorage.setItem('userEmail', email);
        }

        setIsLoggedIn(true);
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) {
        setError(signUpError.message || 'Sign up failed');
        setLoading(false);
        return;
      }

      if (data) {
        setSuccess('Sign up successful! Check your email to confirm.');
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-darker relative overflow-hidden flex">
      {/* Animated Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center p-16">
        <div className="max-w-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-cyan flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-white">
              Stock Predictor
            </h1>
          </div>
          
          <h2 className="text-5xl font-display font-bold text-white leading-tight mb-6">
            AI-Powered
            <span className="block gradient-text">Market Intelligence</span>
          </h2>
          
          <p className="text-lg text-brand-muted mb-12 leading-relaxed">
            Harness the power of advanced machine learning algorithms to predict market trends, 
            analyze stock performance, and make data-driven investment decisions.
          </p>

          {/* Feature Pills */}
          <div className="space-y-4">
            {[
              { icon: BarChart3, text: 'Real-time market analysis & predictions', color: 'from-blue-500/20 to-cyan-500/20' },
              { icon: Zap, text: 'AI-powered sentiment analysis', color: 'from-violet-500/20 to-purple-500/20' },
              { icon: TrendingUp, text: 'Advanced stock tracking & analytics', color: 'from-emerald-500/20 to-teal-500/20' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r border border-brand-border/30 animate-slide-up"
                style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: 'both' }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="h-5 w-5 text-brand-text" />
                </div>
                <span className="text-brand-text font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-cyan flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Stock Predictor</h1>
          </div>

          {/* Form Card */}
          <div className="glass-card p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-white mb-2">Welcome back</h2>
              <p className="text-brand-muted">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-brand-rose/10 border border-brand-rose/20 animate-slide-down flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-brand-rose flex-shrink-0 mt-0.5" />
                <p className="text-brand-rose text-sm font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 animate-slide-down flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand-emerald flex-shrink-0 mt-0.5" />
                <p className="text-brand-emerald text-sm font-medium">{success}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-subtle h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-glass pl-12"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-subtle h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-glass pl-12 pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-subtle hover:text-brand-text transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-brand-border bg-brand-dark text-brand-accent"
                    disabled={loading}
                  />
                  <span className="text-brand-muted">Remember me</span>
                </label>
                <a href="#" className="text-brand-accentLight hover:text-white transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => !loading && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full btn-glow flex items-center justify-center gap-2 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-brand-border/50">
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full py-2 px-4 rounded-lg border border-brand-border/30 text-brand-accentLight hover:text-white hover:border-brand-accent transition-colors text-sm font-medium disabled:opacity-50"
              >
                Create New Account
              </button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Active Users', value: '12K+' },
              { label: 'Accuracy', value: '94.2%' },
              { label: 'Stocks Tracked', value: '500+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 rounded-xl bg-brand-card/30 border border-brand-border/20">
                <p className="text-lg font-bold text-white font-display">{stat.value}</p>
                <p className="text-xs text-brand-subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
