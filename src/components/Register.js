import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [Email, setEmail] = useState("");
    const [UserId, setUserId] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registerUser = async () => {
        const payload = { UserId, Name, Email, Password };
        console.log("1");
        setError("");

        try {
            const response = await axios.post(
                "https://9066plwxzh.execute-api.eu-west-1.amazonaws.com/userStage/user",
                payload
            );
            console.log('User registered:', response.data);
            setEmail('');
            setName('');
            setUserId('');
            setPassword('');
            setError('');
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            setError('Registration failed. Please try again.');
        }
    };

    return(
        <div className="border border-white max-w-md mx-auto mt-20 p-8 bg-white bg-opacity-15 rounded-xl shadow-lg backdrop-blur-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-4">
                <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="block w-full p-3 rounded-md bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                    required
                />
                <input
                    type="text"
                    value={UserId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User Name"
                    className="block w-full p-3 rounded-md bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                    required
                />
                <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="block w-full p-3 rounded-md bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                    required
                />
                <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full p-3 rounded-md bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                    required
                />
                <button
                    onClick={registerUser}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-2 px-4 rounded-lg focus:outline-none"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
