import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

const MemoryQuiz = () => {
    const [step, setStep] = useState(1);
    const [memoryAnswer, setMemoryAnswer] = useState('');
    const [mobilityAnswer, setMobilityAnswer] = useState('');
    const [socialAnswer, setSocialAnswer] = useState('');
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1 && !memoryAnswer) {
            alert("Please select an option.");
            return;
        }
        if (step === 2 && !mobilityAnswer) {
            alert("Please select an option.");
            return;
        }
        setStep(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!socialAnswer) {
            alert("Please select an option.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const payload = {
                memoryAnswer,
                mobilityAnswer,
                socialAnswer
            };

            const res = await axios.post('http://localhost:5000/api/quiz/memory-quiz', payload, config);

            console.log("Assessment Success:", res.data);
            if (res.data.success) {
                setPlan(res.data.plan);
            }
        } catch (err) {
            console.error("Assessment Error:", err);
            if (err.response) {
                setError(`Error: ${err.response.status} - ${err.response.data.error || err.response.statusText}`);
            } else if (err.request) {
                setError("Error: No response from server. Please check if backend is running on port 5000.");
            } else {
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        navigate('/dashboard');
    };

    if (plan) {
        return <PlanCard plan={plan} onConfirm={handleConfirm} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 && "Memory Assessment"}
                        {step === 2 && "Physical Mobility"}
                        {step === 3 && "Social Interaction"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 1 && "How often do you find it difficult to remember what day of the week it is?"}
                        {step === 2 && "Which best describes your physical activity level today?"}
                        {step === 3 && "In a typical week, how many people do you talk to outside of your home?"}
                    </p>
                </div>

                {error && <div className="text-red-500 text-center">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={step < 3 ? handleNext : handleSubmit}>
                    <div className="space-y-4">
                        {step === 1 && (
                            // STEP 1: MEMORY OPTIONS
                            <>
                                <div className="flex items-center">
                                    <input id="mem_a" name="memory" type="radio" value="A" onChange={(e) => setMemoryAnswer(e.target.value)} checked={memoryAnswer === 'A'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mem_a" className="ml-3 block text-sm font-medium text-gray-700">A) Never/Rarely (I am fully independent)</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="mem_b" name="memory" type="radio" value="B" onChange={(e) => setMemoryAnswer(e.target.value)} checked={memoryAnswer === 'B'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mem_b" className="ml-3 block text-sm font-medium text-gray-700">B) Sometimes (I need reminders)</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="mem_c" name="memory" type="radio" value="C" onChange={(e) => setMemoryAnswer(e.target.value)} checked={memoryAnswer === 'C'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mem_c" className="ml-3 block text-sm font-medium text-gray-700">C) Often (I rely on others often)</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="mem_d" name="memory" type="radio" value="D" onChange={(e) => setMemoryAnswer(e.target.value)} checked={memoryAnswer === 'D'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mem_d" className="ml-3 block text-sm font-medium text-gray-700">D) Always (I need full support)</label>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            // STEP 2: MOBILITY OPTIONS
                            <>
                                <div className="flex items-center">
                                    <input id="mob_a" name="mobility" type="radio" value="A" onChange={(e) => setMobilityAnswer(e.target.value)} checked={mobilityAnswer === 'A'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mob_a" className="ml-3 block text-sm font-medium text-gray-700">A) I can walk for 30 minutes comfortably.</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="mob_b" name="mobility" type="radio" value="B" onChange={(e) => setMobilityAnswer(e.target.value)} checked={mobilityAnswer === 'B'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mob_b" className="ml-3 block text-sm font-medium text-gray-700">B) I can walk but need to sit down after 10 minutes.</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="mob_c" name="mobility" type="radio" value="C" onChange={(e) => setMobilityAnswer(e.target.value)} checked={mobilityAnswer === 'C'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mob_c" className="ml-3 block text-sm font-medium text-gray-700">C) I prefer staying at home and moving between rooms.</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="mob_d" name="mobility" type="radio" value="D" onChange={(e) => setMobilityAnswer(e.target.value)} checked={mobilityAnswer === 'D'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="mob_d" className="ml-3 block text-sm font-medium text-gray-700">D) I have limited mobility and need assistance.</label>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            // STEP 3: SOCIAL OPTIONS
                            <>
                                <div className="flex items-center">
                                    <input id="soc_a" name="social" type="radio" value="A" onChange={(e) => setSocialAnswer(e.target.value)} checked={socialAnswer === 'A'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="soc_a" className="ml-3 block text-sm font-medium text-gray-700">A) 5 or more people.</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="soc_b" name="social" type="radio" value="B" onChange={(e) => setSocialAnswer(e.target.value)} checked={socialAnswer === 'B'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="soc_b" className="ml-3 block text-sm font-medium text-gray-700">B) 2 to 4 people.</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="soc_c" name="social" type="radio" value="C" onChange={(e) => setSocialAnswer(e.target.value)} checked={socialAnswer === 'C'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="soc_c" className="ml-3 block text-sm font-medium text-gray-700">C) Only 1 person.</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="soc_d" name="social" type="radio" value="D" onChange={(e) => setSocialAnswer(e.target.value)} checked={socialAnswer === 'D'} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label htmlFor="soc_d" className="ml-3 block text-sm font-medium text-gray-700">D) None, I feel quite isolated.</label>
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                        >
                            {loading ? 'Processing...' : (step < 3 ? 'Next Question' : 'Submit Assessment')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemoryQuiz;
