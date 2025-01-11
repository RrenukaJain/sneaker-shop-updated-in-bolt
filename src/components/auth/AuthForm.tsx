import React, { useState } from 'react';
import { useAuthForm } from '../../hooks/useAuthForm';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  isLogin: boolean;
  onSuccess: () => void;
}

export default function AuthForm({ isLogin, onSuccess }: AuthFormProps) {
  const { email, password, loading, error, handleSubmit, handleInputChange } = useAuthForm({
    isLogin,
    onSuccess,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !agreedToTerms) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-shadow"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleInputChange}
            className="pl-10 pr-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-shadow"
            required
            disabled={loading}
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-600">
              I agree to the{' '}
              <Link to="/terms" className="text-purple-600 hover:text-purple-500">
                Terms and Conditions
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (!isLogin && !agreedToTerms)}
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200 font-medium"
      >
        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  );
}