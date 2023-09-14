import useUser from "../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const HomePage = () => {
    const {user} = useUser();
    const navigate = useNavigate();

    return(
        <>
            <center><h1>Welcome to Food Stuff.</h1></center>
            <div id="home-menu">
                <button onClick={() => {navigate('/recipes')}}>All Recipes</button>
                { user 
                    ? <>
                        <button onClick={() => {navigate('add-new-recipe')}}>Add New Recipe</button>
                        <button onClick={() => { 
                        signOut(getAuth());
                        }}>Log Out</button>
                        </>
                    : <button onClick={() => {
                        navigate('/log-in');
                        }}>Log In</button>
                }
            </div> 
        </>
    );
}

export default HomePage;