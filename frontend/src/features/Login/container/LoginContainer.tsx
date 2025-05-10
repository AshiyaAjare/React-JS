import Login from '../components/Login';
import useLogin from '../hooks/useLogin';
import { loginValidationSchema } from '../validations/loginValidation'; 

const LoginContainer = () => {
  const { handleLogin, isLoading } = useLogin();

  return (
    <Login 
      validationSchema={loginValidationSchema} 
      onSubmit={handleLogin} 
      isLoading={isLoading} 
    />
  );
};

export default LoginContainer;
