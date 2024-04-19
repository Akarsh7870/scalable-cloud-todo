import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
    const [taskId, setTaskId] = useState("");
    const [userId, setUserId] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addTask = async () => {
        const payload = { taskId, userId, content };
        setError("");

        try {
            const response = await axios.post(
                "https://b68oq3lgtf.execute-api.eu-west-1.amazonaws.com/TaskStage/task",
                payload
            );
            console.log('User registered:', response.data);
            setTaskId('');
            setContent('');
            alert("Task Added!");
          
            navigate("/tasks");
        } catch (error) {
            console.error(error);
            setError('Error adding task');
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("UserID");
        console.log("UserId add task: ", id);

        if (id) {
            setUserId(id);
        } else {
            setUserId(null);
            navigate("/");
        }
    }, [setUserId, navigate]);

    return(
        <div className="border border-white max-w-md mx-auto mt-20 p-8 bg-white bg-opacity-15 rounded-xl shadow-lg backdrop-blur-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Add Task</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-4">
                <input
                    type="text"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="Unique Task Identifier"
                    className="block w-full p-3 rounded-md bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                    required
                />
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Task description"
                    className="block w-full p-3 rounded-md bg-white bg-opacity-25 focus:outline-none focus:ring focus:ring-yellow-500"
                    required
                />
                <button
                    onClick={addTask}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-2 px-4 rounded-lg focus:outline-none"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
}

export default AddTask;
