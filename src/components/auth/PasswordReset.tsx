import React from 'react';
import { usePasswordReset } from '../../hooks/usePasswordReset';

interface PasswordResetProps {
  email: string;
  disabled: boolean;
}

export default function PasswordReset({ email, disabled }: PasswordResetProps) {
  const { handlePasswordReset } = usePasswordReset();

  return (
    <button
      onClick={() => handlePasswordReset(email)}
      disabled={disabled}
      className="mt-4 text-sm text-purple-600 hover:text-purple-500 disabled:opacity-50"
    >
      Forgot password?
    </button>
  );
}