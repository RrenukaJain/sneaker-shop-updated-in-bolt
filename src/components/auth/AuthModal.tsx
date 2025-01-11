import React, { useState } from 'react';
import { X } from 'lucide-react';
import AuthForm from './AuthForm';
import PasswordReset from './PasswordReset';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    setEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <AuthForm isLogin={isLogin} onSuccess={handleSuccess} />

        {isLogin && <PasswordReset email={email} disabled={loading} />}

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
            className="text-sm text-purple-600 hover:text-purple-500 disabled:opacity-50"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}