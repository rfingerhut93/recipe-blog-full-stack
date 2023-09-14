import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import useUser from "../hooks/useUser";

const RecipePage = () => {
    const [recipeInfo, setRecipeInfo] = useState();
    const { recipeId } = useParams();
    const {user} = useUser();
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
    },[recipeId]);

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
        <h2>Ingredients:</h2>
        <ul key={recipeInfo.name}>
            {recipeInfo.ingredients.map(ingredient => (
                <li key={ingredient.name}>{ingredient.name}, {ingredient.measurement}</li>
            ))}
        </ul>
        <h2>Directions:</h2>
        <p>{recipeInfo.directions}</p>
        <button onClick={deleteRecipe}>Delete</button>
    </>
    );
}

export default RecipePage;