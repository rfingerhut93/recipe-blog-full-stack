import { useState } from "react";
import axios from "axios";
import useUser from '../hooks/useUser';

const AddNewRecipeForm = () => {
    const [recipeName, setRecipeName] = useState("");
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeDirections, setRecipeDirections] = useState("");
    const {user, isLoading} = useUser();

    const addRecipe = async () => {
        try {
            const ingredientArr = recipeIngredients?.split("\n").map((line) => {
                const [name, measurement] = line.split(",");
                if (name && measurement){
                    return {
                        name: name.trim(),
                        measurement: measurement.trim()
                    }
                } else {
                    return null;
                }
            }).filter((ingredient) => ingredient !== null);

            const directionsArr = recipeDirections?.split("\n");


            const token = user && (await user.getIdToken());
            const headers = token ? {authtoken: token} : {};

            await axios.post(`/api/recipes`, {
                name: recipeName,
                title: recipeTitle,
                ingredients: ingredientArr,
                directions: directionsArr,
            }, headers);

            console.log("Submission successful.");

            // Clear form after submission
            setRecipeName("");
            setRecipeTitle("");
            setRecipeIngredients("");
            setRecipeDirections("");

        } catch (error) {
            console.error("Error: Couldn't add recipe", error);
        }
    }

    return (
        
            <div id="add-recipe-form">
                <label htmlFor="">Name (url-friendly)</label>
                <input type="text" name="recipeName" placeholder="Recipe name" value={recipeName} onChange={(event) => setRecipeName(event.target.value)}/>
                <label htmlFor="">Title</label>
                <input type="text" name="recipeTitle" placeholder="Recipe title" value={recipeTitle} onChange={(event) => setRecipeTitle(event.target.value)}/>
                <label htmlFor="">Ingredients</label>
                <textarea name="recipeIngredients" id="" cols="30" rows="10" placeholder="Ingredient, measurement" value={recipeIngredients} onChange={(event) => setRecipeIngredients(event.target.value)}/>
                <label htmlFor="">Directions</label>
                <textarea name="recipeDirections" id="" cols="30" rows="10" value={recipeDirections} onChange={(event) => setRecipeDirections(event.target.value)}></textarea>
                <button onClick={addRecipe}>Add Recipe</button>
            </div>
        
    );
}

export default AddNewRecipeForm;