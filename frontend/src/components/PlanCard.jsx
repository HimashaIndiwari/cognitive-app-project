import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PlanCard = ({ plan, onConfirm }) => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10 p-6">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{plan.title}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">{plan.date}</p>
            <p className="mt-2 text-gray-500">{plan.description}</p>

            <div className="mt-6 flex justify-center">
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="border rounded-lg shadow-sm p-2"
                />
            </div>

            <div className="mt-4">
                <h3 className="text-gray-700 font-bold mb-2">Today's Tasks:</h3>
                <ul className="list-disc list-inside text-gray-600">
                    {plan.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <button
                    onClick={onConfirm}
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Save & Confirm from Memory
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
