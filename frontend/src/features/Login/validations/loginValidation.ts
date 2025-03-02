//https://stackoverflow.com/questions/55811114/async-validation-with-formik-yup-and-react
//https://dev.to/agiksetiawan/validation-password-and-confirm-password-with-yup-3gfj
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
