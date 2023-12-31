import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "../NotFoundPage";
import useUser from "../../hooks/useUser";
import './recipePage.css'

const RecipePage = () => {
    const [recipeInfo, setRecipeInfo] = useState({});
    const { recipeId } = useParams();
    const {user, isLoading} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipeInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {};
            try {
                const response = await axios.get(`/api/recipes/${recipeId}`, {headers});
                const newRecipeInfo = response.data;
                setRecipeInfo(newRecipeInfo);
            } catch (error) {
                console.log("Error: Could not load recipe", error);
            }
        } 
    
        loadRecipeInfo();
        
    },[recipeId, user]);


    if (!recipeInfo){
        return (<NotFoundPage />);
    }

    const deleteRecipe = async () => {
        try {
            await axios.delete(`/api/recipes/${recipeId}`);
            navigate("/recipes");
        } catch (error){
            console.error("Could not delete recipe:", error);
        }
    }

    return (
        <div id="recipe-page">
            <h1 id="recipe-title">{recipeInfo.title}</h1>
            <div className="recipe-body">
                <h2 className="recipe-header">Ingredients:</h2>
                <ul id="ingredient-list">
                    {
                        (Array.isArray(recipeInfo.ingredients))
                            ? recipeInfo.ingredients.map(ingredient => (
                                <li className="ingredient-item" key={ingredient.name}>
                                    {ingredient.name}
                                    {ingredient.measurement ? `, ${ingredient.measurement}` : ''}
                                </li>
                            ))
                            : <p>{recipeInfo.ingredients}</p>
                    }
                </ul>
                <h2 className="recipe-header">Directions:</h2>
                <ol id="direction-list">
                    {
                        (Array.isArray(recipeInfo.directions)) 
                            ? recipeInfo.directions.map(direction => (
                                <li className="direction-item" key={direction}>{direction}</li>
                            ))
                            : <p>{recipeInfo.directions}</p>
                    }
                </ol>
                {user ? <button className="home-btn" id="delete-btn" onClick={deleteRecipe}>Delete</button> : ""}   
            </div>
        </div>  
    );
}

export default RecipePage;