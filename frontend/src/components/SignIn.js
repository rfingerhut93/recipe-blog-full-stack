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
        <h1>Log in</h1>
        {error && <p className="error">{error}</p>}
        <input 
            placeholder="Your email address" 
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email" />
        <input 
            placeholder="Your password" 
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" />
        <button onClick={logIn}>Log In</button>
        <div id="creat-acount-link">
            <Link to="/create-account">Don't have an account? Create one here.</Link>
        </div>
        </>
    );
}

export default SignIn;