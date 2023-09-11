import { useState } from "react";
import axios from "axios";

const AddNewRecipeForm = () => {
    const [recipeName, setRecipeName] = useState("");
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeDirections, setRecipeDirections] = useState("");

    const addRecipe = async () => {
        try {
            const ingredientArr = recipeIngredients.split("\n").map((line) => {
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
            
            await axios.post(`/api/recipes`, {
                name: recipeName,
                title: recipeTitle,
                ingredients: ingredientArr,
                directions: recipeDirections,
            });

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
                <label htmlFor="">Name</label>
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