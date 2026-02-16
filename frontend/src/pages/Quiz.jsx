import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const quizData = [
  { id: 'memory', q: "How often do you find it difficult to remember the day?", options: [{ t: "Never", v: 3 }, { t: "Occasionally", v: 2 }, { t: "Often", v: 1 }] },
  { id: 'mobility', q: "Describe your physical activity level today:", options: [{ t: "I can walk 30 mins", v: 3 }, { t: "I need to sit often", v: 2 }, { t: "Stay at home", v: 1 }] },
  { id: 'social', q: "How many people do you talk to weekly?", options: [{ t: "5 or more", v: 3 }, { t: "2 to 4", v: 2 }, { t: "0 to 1", v: 1 }] },
  { id: 'focus', q: "How long can you focus on reading?", options: [{ t: "30+ minutes", v: 3 }, { t: "15-20 minutes", v: 2 }, { t: "Under 5 mins", v: 1 }] },
  { id: 'independence', q: "How do you manage medications?", options: [{ t: "By myself", v: 3 }, { t: "Use pillbox", v: 2 }, { t: "Need help", v: 1 }] }
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const navigate = useNavigate();

  const handleChoice = (value) => {
    const category = quizData[step].id;
    const newScores = { ...scores, [category]: value };
    setScores(newScores);

    if (step < quizData.length - 1) {
      setStep(step + 1); // Move to the next "page"
    } else {
      submitAssessment(newScores);
    }
  };

  const submitAssessment = async (finalScores) => {
    try {
      const token = localStorage.getItem('token'); // Session handling
      await axios.post('http://localhost:5000/api/quiz/submit', { scores: finalScores }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Assessment Complete!");
      navigate('/dashboard'); // Move to final destination
    } catch (err) {
      alert("Registration failed: Server is offline");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-6">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(step + 1) * 20}%` }}></div>
        </div>

        <h3 className="text-xs font-bold text-blue-500 uppercase mb-2">Assessment {step + 1} of 5</h3>
        <h2 className="text-xl font-bold text-slate-800 mb-8">{quizData[step].q}</h2>

        <div className="space-y-4">
          {quizData[step].options.map((opt, i) => (
            <button key={i} onClick={() => handleChoice(opt.v)}
              className="w-full p-5 text-left bg-gray-50 hover:bg-blue-50 border-2 border-transparent hover:border-blue-300 rounded-2xl transition-all font-semibold">
              {opt.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}