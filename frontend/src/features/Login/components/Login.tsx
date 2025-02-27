import React from 'react';
import { Formik, Form } from 'formik';
import Navbar from '../../Shared/components/Navbar';
import Footer from '../../Shared/components/Footer';

interface LoginProps {
  validationSchema: any;
  isLoading: boolean;
  onSubmit: (values: { email: string; password: string }, formikHelpers: { setErrors: (errors: any) => void }) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ validationSchema, onSubmit, isLoading }) => {
  console.log('Props received in Login:', { validationSchema, onSubmit, isLoading });
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-green-200 px-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 -mt-40">
          
          {/* Left - Login Form */}
          <div className="p-20 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Login</h3>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div>
                    <label className="text-gray-600 font-medium">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email ? (
                      <p className="text-sm text-red-500 mt-1">{errors.email as string}</p>
                    ) : null}
                  </div>
                  
                  {/* Password Input */}
                  <div className="mt-4">
                    <label className="text-gray-600 font-medium">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {touched.password && errors.password ? (
                      <p className="text-sm text-red-500 mt-1">{errors.password as string}</p>
                    ) : null}
                  </div>
                  
                  {/* API Error Message */}
                  {/* {errors.api && (
                    <p className="text-sm text-red-500 mt-2">{errors.api as string}</p>
                  )} */}

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white font-semibold py-3 rounded-lg mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'LOGIN'}
                  </button>
                </Form>
              )}
            </Formik>

          </div>

          {/* Right - Image Section */}
          <div className="hidden md:flex bg-indigo-100 items-center justify-center p-6">
            <img src="/icons/login-page.svg" alt="Secure Login" className="w-80 h-auto" />
          </div>

        </div>
      </div>
      <Footer />
    </div>
    
  );
  
};

export default Login;
