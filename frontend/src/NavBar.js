import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signOut } from 'firebase/auth';
import useUser from "./hooks/useUser";
import "./navbar.css";
import cupcakeLogo from "./assets/undraw_cupcake.svg"; // Adjust the path accordingly
import HamburgerMenu from "./components/HamburgerMenu";
import MenuItem from "./components/MenuItem";

const NavBar = ({ clearQueryResults }) => {
    const navigate = useNavigate();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
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

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    return (
        <nav className="navbar">
            <div className="hamburger-container" onClick={toggleHamburger}>
                <HamburgerMenu isOpen={hamburgerOpen}/>
            </div>

                {hamburgerOpen && (
                    <div className="menu-items-container">
                        <MenuItem
                        user={user}
                        handleLogout={handleLogout}
                        handleRedirect={handleRedirect}
                        isOpen={!hamburgerOpen}
                    />    
                    </div>
                )}

            <div className={`sidebar ${hamburgerOpen ? 'hide' : ''}`}>
                <div className="sidebar-logo">
                    <Link to="/" onClick={handleClick}>
                        <img src={cupcakeLogo} alt="Cupcake Logo" />
                    </Link>
                </div>
                <MenuItem
                    user={user}
                    handleLogout={handleLogout}
                    handleRedirect={handleRedirect}
                    isOpen={hamburgerOpen}
                />
            </div>
        </nav>
    );
}

export default NavBar;
