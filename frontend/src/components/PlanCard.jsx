import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PlanCard = ({ plan, onConfirm }) => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 max-w-2xl">

            {/* MEMORY CARD */}
            <div className="bg-slate-800 text-white rounded-xl shadow-lg overflow-hidden p-6 relative">
                {/* Decorative Icon */}
                <div className="absolute top-4 right-4 text-slate-600 opacity-20">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold mb-1">{plan.memory?.title || "Daily Orientation"}</h2>
                <h3 className="text-lg text-emerald-400 font-semibold mb-6">{plan.memory?.subtitle}</h3>

                <div className="bg-white text-gray-800 rounded-lg p-4 mb-4 shadow-sm">
                    <h4 className="font-bold text-gray-700 mb-2">Independent Daily Check</h4>
                    <div className="mb-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Current Date</label>
                        <p className="text-sm bg-gray-50 p-2 rounded border border-gray-200">{plan.date}</p>
                    </div>
                </div>

                <div className="bg-white text-gray-800 rounded-lg p-4 shadow-sm">
                    <h4 className="font-bold text-gray-700 mb-3">Today's Cognitive Tasks</h4>
                    <ul className="space-y-2">
                        {plan.memory?.tasks.map((task, index) => (
                            <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
                                <span className="text-sm">{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4 flex justify-center bg-slate-700 p-2 rounded-lg">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="rounded-lg text-black"
                    />
                </div>
            </div>

            {/* MOBILITY CARD */}
            <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden p-6 relative">
                {/* Decorative Star */}
                <div className="absolute bottom-4 right-4 text-yellow-500 opacity-50">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>

                <h2 className="text-2xl font-bold mb-1">{plan.mobility?.title || "Daily Fitness"}</h2>
                <h3 className="text-lg text-orange-300 font-semibold mb-6">{plan.mobility?.subtitle}</h3>

                <div className="bg-orange-50 text-gray-900 rounded-lg p-4 mb-4 border border-orange-100">
                    <h4 className="font-bold text-gray-800 mb-2">Morning Routine</h4>
                    <ul className="space-y-2">
                        {plan.mobility?.tasks.map((task, index) => (
                            <li key={index} className="flex items-center">
                                <span className="h-2 w-2 bg-orange-500 rounded-full mr-3"></span>
                                <span className="text-sm font-medium">{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={onConfirm}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
                >
                    Confirm & Save Plans
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
