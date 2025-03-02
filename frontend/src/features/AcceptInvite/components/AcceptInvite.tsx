import React, { useState } from 'react';
import { useAcceptInvitation } from '../hooks/useAcceptInvitation';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../Shared/components/Navbar';
import Footer from '../../Shared/components/Footer';

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  const { handleAcceptInvitation, isLoading, isError, isSuccess, error } = useAcceptInvitation();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAcceptInvitation(email, token, password, passwordConfirmation);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Invitation Accepted!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully activated.
          </p>
          <a 
            href="/login" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      {/* <header className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-green-700 text-xl font-bold">LinkUp</div>
          <nav className="space-x-6">
            <a href="/" className="text-green-800 hover:text-green-600">Home</a>
            <a href="/help" className="text-green-800 hover:text-green-600">Help</a>
            <a href="/contact" className="text-green-800 hover:text-green-600">Contact Us</a>
          </nav>
        </div>
      </header> */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Accept Invitation</h1>
            <p className="text-gray-600">
              Set your password to activate your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" value={email} />
            <input type="hidden" value={token} />

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            {isError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex justify-center items-center mt-6"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Accept Invitation"
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
      {/* <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 LinkUp. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default AcceptInvitation;