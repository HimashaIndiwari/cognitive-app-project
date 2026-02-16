import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

const MemoryQuiz = () => {
    const [step, setStep] = useState(1);
    const [memoryAnswer, setMemoryAnswer] = useState('');
    const [mobilityAnswer, setMobilityAnswer] = useState('');
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        if (!memoryAnswer) {
            alert("Please select an option.");
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mobilityAnswer) {
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
                mobilityAnswer
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
        navigate('/quiz');
    };

    if (plan) {
        return <PlanCard plan={plan} onConfirm={handleConfirm} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 ? "Memory Assessment" : "Physical Mobility"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 1
                            ? "How often do you find it difficult to remember what day of the week it is?"
                            : "Which best describes your physical activity level today?"}
                    </p>
                </div>

                {error && <div className="text-red-500 text-center">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleNext : handleSubmit}>
                    <div className="space-y-4">
                        {step === 1 ? (
                            // STEP 1: MEMORY OPTIONS
                            <>
                                <div className="flex items-center">
                                    <input
                                        id="memA" name="memory" type="radio" value="A"
                                        checked={memoryAnswer === 'A'}
                                        onChange={(e) => setMemoryAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="memA" className="ml-3 block text-sm font-medium text-gray-700">
                                        A) Never, I always know the date.
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="memB" name="memory" type="radio" value="B"
                                        checked={memoryAnswer === 'B'}
                                        onChange={(e) => setMemoryAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="memB" className="ml-3 block text-sm font-medium text-gray-700">
                                        B) Occasionally, I have to check a calendar.
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="memC" name="memory" type="radio" value="C"
                                        checked={memoryAnswer === 'C'}
                                        onChange={(e) => setMemoryAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="memC" className="ml-3 block text-sm font-medium text-gray-700">
                                        C) Often, I lose track of time.
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="memD" name="memory" type="radio" value="D"
                                        checked={memoryAnswer === 'D'}
                                        onChange={(e) => setMemoryAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="memD" className="ml-3 block text-sm font-medium text-gray-700">
                                        D) I rely entirely on others to tell me.
                                    </label>
                                </div>
                            </>
                        ) : (
                            // STEP 2: MOBILITY OPTIONS
                            <>
                                <div className="flex items-center">
                                    <input
                                        id="mobA" name="mobility" type="radio" value="A"
                                        checked={mobilityAnswer === 'A'}
                                        onChange={(e) => setMobilityAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="mobA" className="ml-3 block text-sm font-medium text-gray-700">
                                        A) I can walk for 30 minutes comfortably.
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="mobB" name="mobility" type="radio" value="B"
                                        checked={mobilityAnswer === 'B'}
                                        onChange={(e) => setMobilityAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="mobB" className="ml-3 block text-sm font-medium text-gray-700">
                                        B) I can walk but need to sit down after 10 minutes.
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="mobC" name="mobility" type="radio" value="C"
                                        checked={mobilityAnswer === 'C'}
                                        onChange={(e) => setMobilityAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="mobC" className="ml-3 block text-sm font-medium text-gray-700">
                                        C) I prefer staying at home and moving between rooms.
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="mobD" name="mobility" type="radio" value="D"
                                        checked={mobilityAnswer === 'D'}
                                        onChange={(e) => setMobilityAnswer(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="mobD" className="ml-3 block text-sm font-medium text-gray-700">
                                        D) I have limited mobility and need assistance.
                                    </label>
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
                            {loading ? 'Processing...' : (step === 1 ? 'Next Question' : 'Submit Assessment')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemoryQuiz;
