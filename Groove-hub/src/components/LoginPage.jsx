// src/components/LoginPage.jsx (Recreated with new UI layout and Orange Theme)
import React from 'react';
// Importing icons for social login buttons
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'; // Make sure you've installed react-icons

function LoginPage({ onLogin }) {
  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    // For now, this just simulates a login for UI purposes.
    // In a real app, you'd handle email/password authentication here.
    onLogin();
  };

  const handleSocialLogin = (provider) => {
    console.log(`Attempting to login with ${provider}... (Not implemented for demo)`);
    // In a real app, this would redirect to OAuth providers (Google, GitHub, Facebook)
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 md:p-10 rounded-xl shadow-2xl max-w-sm w-full border border-orange-500 animate-fade-in">
        <div className="text-center mb-8">
          {/* "Your logo" placeholder - you can replace with an actual image */}
          <div className="text-orange-500 text-3xl font-bold mb-2">Your logo</div>
          <h2 className="text-3xl font-bold text-gray-100">Login</h2>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="user@example.com"
              className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-md text-white
                         placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-md text-white
                         placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-orange-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-orange-500 text-white font-semibold rounded-md text-lg
                       hover:bg-orange-600 transition-colors duration-300
                       focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 text-center text-gray-400 text-sm">
          or continue with
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white text-xl
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white text-xl
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FaGithub />
          </button>
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white text-xl
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FaFacebook />
          </button>
        </div>

        <p className="text-center text-gray-300 text-sm">
          Don't have an account yet?{' '}
          <a href="#" className="text-orange-400 hover:underline">
            Register for Free
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

// (Optional) Add this CSS to your main stylesheet (e.g., src/index.css)
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
*/