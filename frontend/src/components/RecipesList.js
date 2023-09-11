import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Updates when new recipe is added (AddNewRecipeForm.js)
const RecipesList = () => {
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        const loadRecipeList = async () => {
            const response = await axios.get('/api/recipes');
            const newRecipeList = response.data;
            setRecipeList(newRecipeList);
        }
        loadRecipeList();
    }, []);

    return (
        <>
            {recipeList.map(recipe => (
                <Link key={recipe.name} className="article-list-item" to={`/recipes/${recipe.name}`}>
                    <h3>{recipe.title}</h3>
                </Link>
            ))}
        </>
    );
}

export default RecipesList;