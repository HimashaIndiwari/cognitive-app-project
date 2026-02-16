import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

const MemoryQuiz = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOption) {
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

            const res = await axios.post('http://localhost:5000/api/quiz/memory-quiz', { answer: selectedOption }, config);

            console.log("Memory Quiz Success:", res.data);
            if (res.data.success) {
                setPlan(res.data.plan);
            }
        } catch (err) {
            console.error("Memory Quiz Error:", err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(`Error: ${err.response.status} - ${err.response.data.error || err.response.statusText}`);
            } else if (err.request) {
                // The request was made but no response was received
                setError("Error: No response from server. Please check if backend is running on port 5000.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        navigate('/quiz'); // or dashboard, wherever logical
    };

    if (plan) {
        return <PlanCard plan={plan} onConfirm={handleConfirm} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Memory Quiz
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        How often do you find it difficult to remember what day of the week it is?
                    </p>
                </div>

                {error && <div className="text-red-500 text-center">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                id="optionA"
                                name="memory-option"
                                type="radio"
                                value="A"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="optionA" className="ml-3 block text-sm font-medium text-gray-700">
                                A) Never, I always know the date.
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="optionB"
                                name="memory-option"
                                type="radio"
                                value="B"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="optionB" className="ml-3 block text-sm font-medium text-gray-700">
                                B) Occasionally, I have to check a calendar.
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="optionC"
                                name="memory-option"
                                type="radio"
                                value="C"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="optionC" className="ml-3 block text-sm font-medium text-gray-700">
                                C) Often, I lose track of time.
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="optionD"
                                name="memory-option"
                                type="radio"
                                value="D"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="optionD" className="ml-3 block text-sm font-medium text-gray-700">
                                D) I rely entirely on others to tell me.
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                        >
                            {loading ? 'Processing...' : 'Submit Answer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemoryQuiz;
