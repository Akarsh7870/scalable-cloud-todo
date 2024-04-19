import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
    return (
        <>
            <Router>
                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/tasks" element={<TaskList />}/>
                    <Route path="/add-task" element={<AddTask />}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
