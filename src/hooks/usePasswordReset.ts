import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { getAuthErrorMessage } from '../utils/auth';
import toast from 'react-hot-toast';

export function usePasswordReset() {
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: window.location.origin + '/reset-password',
        }
      );
      if (resetError) throw resetError;
      toast.success('Check your email for password reset instructions');
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePasswordReset,
  };
}