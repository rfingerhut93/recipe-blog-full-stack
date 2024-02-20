import { useState, useEffect } from "react";
import axios from "axios";
import useUser from '../hooks/useUser';

const EditRecipeForm = ({ recipeName, toggleEditMode }) => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeDirections, setRecipeDirections] = useState("");

    const { user } = useUser();


    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const token = user && (await user.getIdToken());
                const headers = token ? { authtoken: token } : {};

                const response = await axios.get(`/api/recipes/${recipeName}`, { headers });

                setRecipeTitle(response.data.title);
                setRecipeIngredients(response.data.ingredients.map(ingredient => `${ingredient.name}, ${ingredient.measurement || ""}`).join("\n"));
                setRecipeDirections(response.data.directions.join("\n"));
            } catch (error) {
                console.error("Error: Couldn't fetch recipe data", error);
            }
        };

        fetchRecipeData();
    }, [recipeName, user]);

    const updateRecipe = async () => {
        try {
            const ingredientArr = recipeIngredients?.split("\n").map((line) => {
                const [name, measurement] = line.split(",");
                if (name && measurement) {
                    return {
                        name: name.trim(),
                        measurement: measurement.trim()
                    };
                } else if (name) {
                    return {
                        name: name.trim(),
                        measurement: null
                    };
                } else {
                    return null;
                }
            }).filter((ingredient) => ingredient !== null);

            const directionsArr = recipeDirections?.split("\n");


            const token = user && (await user.getIdToken());
            const headers = token ? {authtoken: token} : {};

            await axios.put(`/api/recipes/${recipeName}`, {
                name: recipeName,
                title: recipeTitle,
                ingredients: ingredientArr,
                directions: directionsArr,
            }, { headers });

            console.log("update successful.");
            toggleEditMode();
        } catch (error) {
            console.error("Error: Couldn't update recipe", error);
        }
    };

    const cancelEdit = () => {
        toggleEditMode();

    };

    return (
        <div id="edit-recipe-form">
            <h1>Edit Recipe</h1>
            {/* <label htmlFor="">Title</label>
            <input className="form-element edit" type="text" name="recipeTitle" placeholder="Recipe title" value={recipeTitle} onChange={(event) => setRecipeTitle(event.target.value)} /> */}
            <label htmlFor="">Ingredients</label>
            <textarea className="form-element edit" name="recipeIngredients" id="" cols="30" rows="10" placeholder="Ingredient, measurement" value={recipeIngredients} onChange={(event) => setRecipeIngredients(event.target.value)} />
            <label htmlFor="">Directions</label>
            <textarea className="form-element edit" name="recipeDirections" id="" cols="30" rows="10" value={recipeDirections} onChange={(event) => setRecipeDirections(event.target.value)}></textarea>
            <button className="home-btn" onClick={updateRecipe}>Update Recipe</button>
            <button className="home-btn" onClick={cancelEdit}>Cancel Edit</button>

        </div>
    );
};

export default EditRecipeForm;