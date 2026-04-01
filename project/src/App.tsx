import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

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
    <Router>
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
