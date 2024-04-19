import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [UserId, setUserId] = useState(null);
    const [weather, setWeather] = useState({main: {temp : 25}});
    const [flag, setFlag] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const navigate = useNavigate();

    const getWeather = () => {
        const apiKey = '60162dd23e20513ff670f6aa4c5a940c';
        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=53.3491019&lon=-6.2446622&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setFlag(true);
            })
            .catch(error => console.error("Failed to fetch data:", error));
    }

    useEffect(() => {
        const id = localStorage.getItem("UserID");
        console.log("UserId: ", id);

        if (id) {
            setUserId(id);
        } else {
            setUserId(null);
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

                console.log("position: ", position);
                if (location.latitude) {
                    console.log("Location set");
                    console.log("lat: ", location.latitude);
                    console.log("lon: ", location.longitude);
                    // getWeather();
                }
            },
            (error) => {
                // setError(error.message);
                console.log("location error: ", error.message);
            }
        );
        
    }, [setUserId]);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            getWeather();
        }
    }, [location]);

    const handleLogout = () => {
        alert("logging out!");
        localStorage.removeItem("UserID");
        window.location.reload();
        navigate("/");
    };

    return (
        <header className="bg-yellow-400">
            <nav className="flex justify-between">
                <div className="ml-5">
                    <ul className="flex">
                    {UserId ? (
                        <li>
                            <a href="/tasks" className="text-black text-3xl font-bold flex items-center h-full hover:bg-black hover:text-white hover:subpixel-antialiased p-3 mx-2">
                                Taskify
                            </a>
                        </li>
                    ) : (
                        <li>
                            <a href="/" className="text-black text-3xl font-bold flex items-center h-full hover:bg-black hover:text-white hover:subpixel-antialiased p-3 mx-2">
                                Taskify
                            </a>
                        </li>
                    )}
                    </ul>
                </div>
                <div className="mr-5">
                    <ul className="flex">
                        <li>
                            <h4 className="text-black text-xl flex items-center h-full p-4 mx-2">
                                Temperature in {weather.name}: {flag && weather.main?.temp && <span className="ml-1">{weather.main.temp}°C</span>}
                            </h4>
                        </li>
                    {UserId ? (
                        <>
                            <li>
                                <a href="/add-task" className="text-black text-xl flex items-center h-full hover:bg-black hover:text-white p-4 mx-2" >
                                    Add Task
                                </a>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-black text-xl flex items-center h-full hover:bg-black hover:text-white p-4 mx-2">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a href="/login" className="text-black text-xl flex items-center h-full hover:bg-black hover:text-white p-4 mx-2">
                                    Login
                                </a>
                            </li>
                            <li>
                                <a href="/register" className="text-black text-xl flex items-center h-full hover:bg-black hover:text-white p-4 mx-2" >
                                    Register
                                </a>
                            </li>
                        </>
                    )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
