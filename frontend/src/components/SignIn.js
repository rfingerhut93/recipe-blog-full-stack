import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate(location.state?.from || "/");
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <>
            <h1 id="log-in-title">Log in</h1>

            {error && <p className="error">{error}</p>}
            <input className="form-element"
                placeholder="Your email address" 
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email" />
            <input className="form-element"
                placeholder="Your password" 
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" />
            <div id="btn-container">
                <button className="home-btn btn" onClick={logIn}>Log In</button>
                <button className="home-btn btn" id="back-to-home-btn" onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </>
    );
}

export default SignIn;