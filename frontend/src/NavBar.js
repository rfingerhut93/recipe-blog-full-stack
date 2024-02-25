import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import useUser from "./hooks/useUser";
import "./navbar.css";
import cupcakeLogo from "./assets/undraw_cupcake.svg"; // Adjust the path accordingly

const NavBar = ({ clearQueryResults }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleRedirect = () => {
        navigate("/log-in", { state: { from: window.location.pathname } });
    }

    const handleClick = (event) => {
        clearQueryResults();
    }

    const handleLogout = () => {
        signOut(getAuth());
    }

    return (
        <nav id="sidebar">
            <div className="sidebar-logo">
                <Link to="/" onClick={handleClick}>
                    <img src={cupcakeLogo} alt="Cupcake Logo" />
                </Link>
            </div>
            <ul>
                {user && (
                    <li className="nav-link">
                        <Link className="link" to="/add-new-recipe">Add A Recipe</Link>
                    </li>
                )}
                <li className="nav-link">
                    {user ? (
                        <Link className="link" to="/" onClick={handleLogout}>Log Out</Link>
                    ) : (
                        <Link className="link" to="/log-in" onClick={handleRedirect}>Log In</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
