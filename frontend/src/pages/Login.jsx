import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert("Welcome back!");
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-100">
        <div className="flex justify-center mb-4">
          <span className="text-4xl">🧠</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 uppercase tracking-wide">Brain Training & Cognitive Assessment</h2>
        <h1 className="text-3xl font-black text-slate-800 my-4 uppercase">Good Health & Well-Being</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="USERNAME (EMAIL)" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="PASSWORD" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
            onChange={(e) => setPassword(e.target.value)} required />
          
          <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105">LOGIN</button>
        </form>

        <div className="mt-8 flex justify-between text-sm text-gray-500 font-medium">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" /> REMEMBER ME
          </label>
          <button className="hover:text-blue-500">FORGOT PASSWORD?</button>
          <Link to="/register" className="text-blue-600 hover:underline font-bold">CREATE ACCOUNT</Link>
        </div>
        <p className="mt-12 italic text-gray-400 text-sm">Designed for Seniors ✨</p>
      </div>
    </div>
  );
}