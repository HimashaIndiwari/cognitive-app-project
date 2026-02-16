import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Account created successfully!");
      navigate('/');
    } catch (err) {
      alert("Registration failed: " + err.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">New Registration</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="FULL NAME" className="w-full p-4 bg-gray-50 border rounded-xl" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="EMAIL ADDRESS" className="w-full p-4 bg-gray-50 border rounded-xl" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="CREATE PASSWORD" className="w-full p-4 bg-gray-50 border rounded-xl" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg">CREATE ACCOUNT</button>
        </form>
        <Link to="/" className="block mt-6 text-center text-blue-600 font-medium">ALREADY HAVE AN ACCOUNT? LOGIN</Link>
      </div>
    </div>
  );
}