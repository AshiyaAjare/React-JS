import React from 'react';
import { Formik, Form } from 'formik';
// import Navbar from '../../Shared/components/Navbar';
import Footer from '../../Shared/components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';

interface LoginProps {
  validationSchema: Yup.ObjectSchema<{
    email: string;
    password: string;
  }>
  isLoading: boolean;
  onSubmit: (
    values: { email: string; password: string },
    formikHelpers: { setErrors: (errors: Record<string, string>) => void }
  ) => Promise<void>;  
}

const Login: React.FC<LoginProps> = ({ validationSchema, onSubmit, isLoading }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <ToastContainer style={{ fontSize: "14px", zIndex: "1000"}} />
      
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-6 py-20 relative overflow-hidden">
        {/* Decorative circles similar to About section */}

        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 relative z-10">
          {/* Left - Login Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400 mb-8">
              Welcome Back
            </h3>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="text-gray-700 font-medium block mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </div>
                    {touched.email && errors.email ? (
                      <p className="text-sm text-red-500 mt-1">{errors.email as string}</p>
                    ) : null}
                  </div>
                  
                  {/* Password Input */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-gray-700 font-medium">Password</label>
                      {/* <a href="#" className="text-sm text-indigo-500 hover:text-indigo-700 transition duration-200">
                        Forgot password?
                      </a> */}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                    {touched.password && errors.password ? (
                      <p className="text-sm text-red-500 mt-1">{errors.password as string}</p>
                    ) : null}
                  </div>
                  
                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md transform hover:-translate-y-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </div>
                    ) : 'LOGIN'}
                  </button>
                  
                  
                </Form>
              )}
            </Formik>
          </div>

          {/* Right - Image Section */}
          <div className="hidden md:block bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>
            <div className="absolute -bottom-6 -right-6 bg-indigo-200 h-32 w-32 rounded-full opacity-40"></div>
            <div className="absolute -top-10 -left-10 bg-purple-200 h-40 w-40 rounded-full opacity-40"></div>
            
            <div className="relative h-full flex flex-col items-center justify-center z-10 p-10 text-center">
              <img src="/icons/login-page.svg" alt="Secure Login" className="w-72 h-auto mb-8 drop-shadow-xl" />
              <h3 className="text-2xl font-bold text-indigo-700 mb-3">Join our Community</h3>
              <p className="text-gray-700 max-w-xs">
                Connect, collaborate, and create with like-minded people in the LinkUp community.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;