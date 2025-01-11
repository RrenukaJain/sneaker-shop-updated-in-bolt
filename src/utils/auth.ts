// Authentication error messages
export const getAuthErrorMessage = (error: any): string => {
  const code = error?.code;
  const message = error?.message;

  switch (code) {
    case 'invalid_credentials':
      return 'Invalid email or password. Please try again.';
    case 'user_not_found':
      return 'No account found with this email.';
    case 'too_many_attempts':
      return 'Too many login attempts. Please try again later.';
    default:
      return message || 'An error occurred. Please try again.';
  }
};