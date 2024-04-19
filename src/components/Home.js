import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const GoToLogin = () => {
        navigate("/login");
    }
    
    const GoToRegister = () => {
        navigate("/register");
    }

    return (
        <div className="border border-white max-w-xl mx-auto flex flex-col items-center justify-center h-full mt-20 bg-white bg-opacity-15 rounded-xl p-12 shadow-lg backdrop-blur-lg">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Taskify!</h1>
            <p className="text-lg text-white mb-6">Start organizing your tasks efficiently.</p>
            <div className="flex space-x-4">
                <button onClick={GoToLogin} className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-2 px-4 rounded-lg focus:outline-none">Login</button>
                <button onClick={GoToRegister} className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-2 px-4 rounded-lg focus:outline-none">Register</button>
            </div>
        </div>
    );
}

export default Home;
