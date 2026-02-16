import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz'; // Ensure this file exists in your src/pages folder

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Entry: Login Page */}
          <Route path="/" element={<Login />} />
          
          {/* Registration Page */}
          <Route path="/register" element={<Register />} />
          
          {/* After Login, user moves here for the 5-step quiz */}
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;