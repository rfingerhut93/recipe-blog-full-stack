import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                    <Link to="/add-new-recipe">Add A Recipe</Link>
                </li>
            </ul>
            <div className="nav-right">
                <button>Log In</button> 
            </div>
        </nav>
    );
}

export default NavBar;