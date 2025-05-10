import { useState } from 'react';
import { useAcceptInvitationMutation } from '../api/acceptInvitationApi';

export const useAcceptInvitation = () => {
  const [acceptInvitation, { isLoading, isError, isSuccess }] = useAcceptInvitationMutation();
  const [error, setError] = useState('');

  const handleAcceptInvitation = async (email: string, token: string, password: string, passwordConfirmation: string) => {
    try {
      await acceptInvitation({ email, token, password, password_confirmation: passwordConfirmation }).unwrap();
    } catch (err) {
      console.error(err);
      setError('Failed to accept invitation');
    }
  };

  return { handleAcceptInvitation, isLoading, isError, isSuccess, error };
};
