import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data?.user) {
          setError('Please check your email for verification before signing in.');
          setIsSignUp(false); // Switch to sign in mode
        }
      } else {
        const { error: signInError, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // Handle specific error cases
          if (signInError.message.includes('Email not confirmed')) {
            throw new Error('Please verify your email before signing in. Check your inbox for the verification link.');
          } else if (signInError.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please try again.');
          } else {
            throw signInError;
          }
        }

        if (data?.user) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-dark-primary py-12 px-4 sm:px-6 lg:px-8">
      <ThreeBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-brand-light dark:bg-dark-secondary rounded-2xl shadow-2xl dark:shadow-neon p-8 border border-brand-sage/20 dark:border-dark-accent/40">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-brand-teal/20 dark:bg-brand-teal/30 flex items-center justify-center">
              <Lock className="h-6 w-6 text-brand-teal" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-brand-dark dark:text-dark-text">
              {isSignUp ? 'Create your account' : 'Sign in'}
            </h2>
            <p className="mt-2 text-sm text-brand-slate dark:text-brand-sage">
              {isSignUp ? 'Join Star Predictor today' : 'Welcome back'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleAuth}>
            {error && (
              <div className="flex items-start p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800/50">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-brand-slate dark:text-brand-sage/60" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-lg border border-brand-sage dark:border-dark-accent bg-white dark:bg-dark-accent text-brand-dark dark:text-dark-text placeholder-brand-slate dark:placeholder-brand-sage/50 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-brand-slate dark:text-brand-sage/60" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-lg border border-brand-sage dark:border-dark-accent bg-white dark:bg-dark-accent text-brand-dark dark:text-dark-text placeholder-brand-slate dark:placeholder-brand-sage/50 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white bg-brand-teal hover:bg-brand-teal/90 dark:hover:bg-brand-teal/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal dark:focus:ring-offset-dark-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  isSignUp ? 'Create account' : 'Sign in'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-brand-teal hover:text-brand-teal/80 dark:hover:text-brand-teal/90 font-medium transition"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;