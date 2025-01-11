import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { getAuthErrorMessage } from '../utils/auth';
import toast from 'react-hot-toast';

interface UseAuthFormProps {
  isLogin: boolean;
  onSuccess: () => void;
}

export function useAuthForm({ isLogin, onSuccess }: UseAuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        toast.success('Successfully logged in!');
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) throw signUpError;
        toast.success('Check your email to confirm your account!');
      }
      onSuccess();
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    handleSubmit,
    handleInputChange,
  };
}