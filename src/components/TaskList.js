import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function TaskList() {
    const [UserId, setUserId] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [tip, setTip] = useState('');
    const [description, setDescription] = useState('');

    const fetchTip = () => {
        fetch('https://n0y0ksvsu7.execute-api.eu-west-1.amazonaws.com/prod/tips')
            .then(response => response.json())
            .then(data => {
                setTip(data.tip);
                setDescription(data.description);
            })
            .catch(error => console.error('Error fetching data: ', error));
    };
        
    const getUserTasks = async () => {
        try {
            const response = await axios.get(
                `https://gqa3z5nj4a.execute-api.eu-west-1.amazonaws.com/TaskStage/tasks?userId=${UserId}`
            );
            setTasks(response.data);
        } catch (error) {
            console.error("Failed to fetch user tasks: ", error);
            alert("Failed to fetch user tasks");
        } finally {
            setLoading(false); // Set loading to false when fetching is complete
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("UserID");
        const RL = localStorage.getItem("RL");

        fetchTip();

        if (RL === "T") {
            localStorage.setItem("RL", "F");
            window.location.reload();
        }

        if (!id) {
            navigate("/login");
            return;
        }

        setUserId(id);

    }, [navigate, UserId]);

    useEffect(() => {
        if (UserId) {
            getUserTasks();
        }
    });

    const deleteTask = async (taskID) => {
        try {
            const response = await axios.delete(
                `https://i8fn0r12k9.execute-api.eu-west-1.amazonaws.com/taskStage/task?taskId=${taskID}`,{
                headers: {
                    'Authorization': 'Bearer your_token_here',
                    'Another-Header': 'header-value'
                }
            });
            console.log("Delete response: ", response);
            alert("Task Deleted!");
        } catch (error) {
            console.error("Failed to delete task: ", error);
            alert("Failed to delete task!");
        }
    };

    return(
        <>
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white bg-opacity-15 rounded-xl shadow-lg backdrop-blur-lg">
                <h1 className="text-3xl font-bold text-white mb-6">{tip}</h1>
                <p className="text-white mb-2">{description}</p>
            </div>

            <div className="max-w-2xl mx-auto mt-10 mb-10 p-8 bg-white bg-opacity-15 rounded-xl shadow-lg backdrop-blur-lg">
                <h1 className="text-3xl font-bold text-white mb-6">Your Tasks</h1>
                {loading ? ( // Conditionally render loading icon
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-yellow-500 text-4xl" />
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <div key={index} className="bg-white bg-opacity-25 rounded-md p-4 mb-4">
                            <h2 className="text-xl font-semibold text-yellow-500 mb-2">{task.taskId}</h2>
                            <p className="text-white mb-2">Description: {task.content}</p>
                            <button onClick={() => deleteTask(task.taskId)} className="bg-red-500 hover:bg-red-600 text-white text-lg py-2 px-4 rounded-lg focus:outline-none">
                                Delete Task
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default TaskList;
