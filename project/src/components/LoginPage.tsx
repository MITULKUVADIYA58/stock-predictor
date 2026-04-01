import { useState, type FormEvent } from 'react';
import { Mail, Lock, TrendingUp, ArrowRight, Eye, EyeOff, BarChart3, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      alert('Login functionality to be implemented');
    } catch {
      setError('Login failed. Please try again.');
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
              { icon: TrendingUp, text: 'Portfolio tracking & optimization', color: 'from-emerald-500/20 to-teal-500/20' },
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
              <div className="mb-6 p-4 rounded-xl bg-brand-rose/10 border border-brand-rose/20 animate-slide-down">
                <p className="text-brand-rose text-sm font-medium">{error}</p>
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
                    placeholder="name@company.com"
                    className="input-glass pl-12"
                    required
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
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-subtle hover:text-brand-text transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-brand-border bg-brand-dark text-brand-accent focus:ring-brand-accent focus:ring-offset-0"
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
                onMouseEnter={() => setIsHovered(true)}
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

            <div className="mt-8 pt-6 border-t border-brand-border/50 text-center">
              <p className="text-brand-muted text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-brand-accentLight hover:text-white transition-colors font-semibold">
                  Create account
                </a>
              </p>
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
