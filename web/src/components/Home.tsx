import {useNavigate} from "react-router-dom"
import React, {useState} from "react";

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate("/chat", {
            state: {userName: userName,},
        });
    }
    return (
        <div>
            <h2>Provide your name to enter the chat</h2>
            <div className="form-field">
                <form onSubmit={handleSubmit}>
                    <label htmlFor={"username"}>Username</label>
                    <input type="text"
                           minLength={6}
                           name="username"
                           id='username'
                           value={userName}
                           onChange={e => setUserName(e.target.value)}
                    />
                    <button>Sign in</button>
                </form>
            </div>
        </div>
    )
};

export default Home;