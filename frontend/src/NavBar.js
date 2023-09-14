import { Link, useNavigate } from "react-router-dom";
import {getAuth, signOut} from 'firebase/auth'
import useUser from "./hooks/useUser";

const NavBar = () => {
    const navigate = useNavigate();
    const {user, isLoading} = useUser();

    const handleRedirect = () => {
        navigate("/log-in", {state: {from:window.location.pathname}});
    }
    
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
                <li>{ user ? <Link to="/add-new-recipe">Add A Recipe</Link> : ""}</li>
            </ul>
            <div className="nav-right">
                {user 
                    ? <button class="log-in-btn" onClick={() => {signOut(getAuth());}}>Log Out</button> 
                    : <button class="log-in-btn" onClick={handleRedirect}>Log In</button>}
            </div>
        </nav>
    );
}

export default NavBar;

