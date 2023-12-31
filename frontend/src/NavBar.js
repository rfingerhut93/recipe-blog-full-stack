import { Link, useNavigate } from "react-router-dom";
import {getAuth, signOut} from 'firebase/auth'
import useUser from "./hooks/useUser";
import "./navbar.css"

const NavBar = () => {
    const navigate = useNavigate();
    const {user} = useUser();

    const handleRedirect = () => {
        navigate("/log-in", {state: {from:window.location.pathname}});
    }
    
    return (
        <nav id="nav">
            <ul id="nav-left">
                <li className="nav-link">
                    <Link className="link" to="/">Home</Link>
                </li>
                <li className="nav-link">
                    <Link className="link" to="/recipes">Recipes</Link>
                </li>
                { user && (<li className="nav-link"><Link className="link" to="/add-new-recipe">Add A Recipe</Link></li>)}
            </ul>
            <div id="nav-right">
                {user 
                    ? <button class="log-in-btn" onClick={() => {signOut(getAuth());}}>Log Out</button> 
                    : <button class="log-in-btn" onClick={handleRedirect}>Log In</button>}
            </div>
        </nav>
    );
}

export default NavBar;

