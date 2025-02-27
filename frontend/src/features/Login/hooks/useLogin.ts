import { useLoginUserMutation } from '../api/loginApi';

const useLogin = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = async (
    values: { email: string; password: string },
    { setErrors }: { setErrors: (errors: { api?: string }) => void }
  ) => {
    try {
      const response = await loginUser(values).unwrap();
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token);
    } catch (err) {
      console.error('Login failed:', err);
      setErrors({ api: 'Invalid email or password' });
    }
  };

  return { handleLogin, isLoading, error };
};

export default useLogin;
