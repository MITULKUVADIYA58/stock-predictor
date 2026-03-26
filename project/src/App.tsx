import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { AlertCircle } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

// Initialize Supabase client with error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function App() {
  const [session, setSession] = useState(null);

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

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center">
        <div className="bg-white dark:bg-dark-secondary p-8 rounded-lg shadow-md dark:shadow-neon max-w-md w-full relative z-10">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-dark-text mb-4">Configuration Required</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Please connect your Supabase project by clicking the "Connect to Supabase" button in the top right corner.
          </p>
          <div className="bg-gray-50 dark:bg-dark-accent p-4 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Missing environment variables:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {!supabaseUrl && <li>VITE_SUPABASE_URL</li>}
              {!supabaseAnonKey && <li>VITE_SUPABASE_ANON_KEY</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={session ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard/*"
          element={session ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={session ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;