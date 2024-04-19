import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const payload = { Email, Password };
        setError("");
        setLoading(true);
        try {
            const response = await axios.post(
                "https://jnhujmnnxd.execute-api.eu-west-1.amazonaws.com/userStage/user",
                payload
            );
            console.log(response.data);
            if (response.data && response.data.userID) {
                localStorage.setItem("UserID", response.data.userID);
                localStorage.setItem("RL", "T");
                setLoading(false);
                alert("Login successful");
                navigate("/tasks");
            } else {
                // Handle any unexpected response structure here
                // alert("Login failed. Please try again.");
                setError("Login failed. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                // alert(
                //     error.response.data.message ||
                //         "Login failed. Please try again."
                // );
                setError(
                    error.response.data.message ||
                        "Login failed. Please try again."
                );
                setLoading(false);
            } else {
                // alert(
                //     "Login failed due to server error. Please try again later."
                // );
                setError(
                    "Login failed due to server error. Please try again later."
                );
                setLoading(false);
            }
        }
    };

    return(
        <div className="border border-white max-w-md mx-auto mt-20 p-8 bg-white bg-opacity-15 rounded-xl shadow-lg backdrop-blur-lg">
            <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
            {loading &&
                <div className="flex justify-center items-center mb-5">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-yellow-500 text-4xl" />
                </div> 
            }
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-3 rounded-md mb-4 bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-3 rounded-md mb-4 bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                required
            />
            <button
                onClick={handleLogin}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-2 px-4 rounded-lg focus:outline-none"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}

export default Login;
