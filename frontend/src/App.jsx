import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz'; // Ensure this file exists in your src/pages folder
import MemoryQuiz from './pages/MemoryQuiz';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Entry: Login Page */}
          <Route path="/" element={<Login />} />

          {/* Registration Page */}
          <Route path="/register" element={<Register />} />

          {/* After Login, user moves here. Repurposing /quiz to show the Memory Quiz */}
          <Route path="/quiz" element={<MemoryQuiz />} />

          {/* Keep old quiz accessible if needed, or remove. For now alias old quiz to /old-quiz just in case */}
          <Route path="/old-quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;