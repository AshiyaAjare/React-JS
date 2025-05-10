//https://stackoverflow.com/questions/65552524/login-form-react-js-with-custom-hook
//https://refine.dev/docs/authentication/hooks/use-login/
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../api/loginApi';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuth } from '../../../app/authSlice';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = async (
    values: { email: string; password: string },
    { setErrors }: { setErrors: (errors: { api?: string }) => void }
  ) => {
    try {
      const response = await loginUser(values).unwrap();
      console.log('API Response:', response);
  
      if (!response || !response.token || !response.user) {
        throw new Error('Invalid response from API');
      }
      // Store token and user data properly
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
  
      dispatch(setAuth({ token: response.token, user: response.user }));
  
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      navigate("/app");
  
    } catch (err) {
      console.error('Login failed:', err);
      
      setErrors({ api: 'Invalid email or password' });
  
      toast.error("Login failed. Invalid email or password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  return { handleLogin, isLoading, error };
};

export default useLogin;
