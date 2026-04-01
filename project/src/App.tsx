import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient, type Session } from '@supabase/supabase-js';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that env vars are actual URLs, not placeholders
const isValidConfig = supabaseUrl && supabaseAnonKey
  && supabaseUrl.startsWith('http')
  && supabaseAnonKey.length > 20;

let supabase: ReturnType<typeof createClient> | null = null;
if (isValidConfig) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    console.warn('Failed to initialize Supabase client');
  }
}

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // Demo mode: when Supabase is not configured, allow free navigation
  const isDemoMode = !supabase;

  return (
    <Router basename="/stock-predictor">
      <Routes>
        <Route
          path="/login"
          element={
            !isDemoMode && session ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            isDemoMode || session ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isDemoMode || session ? "/dashboard" : "/login"} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;