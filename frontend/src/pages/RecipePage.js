import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";

const RecipePage = () => {
    const [recipeInfo, setRecipeInfo] = useState();
    const { recipeId } = useParams();

    useEffect(() => {
        const loadRecipeInfo = async () => {
            try {
                const response = await axios.get(`/api/recipes/${recipeId}`);
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
    </>
    );
}

export default RecipePage;