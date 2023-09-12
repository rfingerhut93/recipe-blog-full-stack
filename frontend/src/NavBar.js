import { Link,useNavigate } from "react-router-dom";
import {getAuth, signOut} from 'firebase/auth'
import useUser from "./hooks/useUser";

const NavBar = () => {
    const navigate = useNavigate();
    const {user, isLoading} = useUser();

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
                    ? <button onClick={() => {
                        signOut(getAuth());
                    }}>Log Out</button> 
                    : <button onClick={() => {
                        navigate('/log-in');
                    }}>Log In</button>}
            
            </div>
        </nav>
    );
}

export default NavBar;

