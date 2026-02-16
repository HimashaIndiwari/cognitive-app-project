import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  // 1. Manage form state for name, email, and password
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 2. Send the registration data to your Node.js backend on Port 5000
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // 3. Show success message if the user is saved to MongoDB
      alert("Account created successfully!");
      navigate('/'); // Redirect to the Login page after success
      
    } catch (err) {
      // 4. Handle errors (e.g., email already exists or server is offline)
      const errorMsg = err.response?.data?.error || "Server is offline. Please try again later.";
      alert("Registration failed: " + errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Container matches your professional UI design */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">New Registration</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" 
            placeholder="FULL NAME" 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition-all" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition-all" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="CREATE PASSWORD" 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition-all" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider">
            Create Account
          </button>
        </form>

        <Link to="/" className="block mt-6 text-center text-blue-600 font-medium hover:underline">
          ALREADY HAVE AN ACCOUNT? LOGIN
        </Link>
        
        <p className="mt-8 italic text-gray-400 text-xs text-center font-medium">Designed for Seniors ✨</p>
      </div>
    </div>
  );
}