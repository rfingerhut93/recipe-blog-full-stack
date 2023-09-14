import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import useUser from "../hooks/useUser";

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
    <>
        <h1>{recipeInfo.title}</h1>
        <div class="recipe-body">
            <h2>Ingredients:</h2>
            <ul>
                {
                    (Array.isArray(recipeInfo.ingredients))
                        ? recipeInfo.ingredients.map(ingredient => (
                            <li key={ingredient.name}>
                                {ingredient.name}, {ingredient.measurement}
                            </li>
                        ))
                        : <p>{recipeInfo.ingredients}</p>
                }
            </ul>
            <h2>Directions:</h2>
            <ol>
                {
                    (Array.isArray(recipeInfo.directions)) 
                        ? recipeInfo.directions.map(direction => (
                            <li key={direction}>{direction}</li>
                        ))
                        : <p>{recipeInfo.directions}</p>
                }
            </ol>
        </div>
        {user ? <button onClick={deleteRecipe}>Delete</button> : ""}   
    </>
    );
}

export default RecipePage;