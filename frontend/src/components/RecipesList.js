import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const RecipesList = ({recipeList, setRecipeList}) => {

    useEffect(() => {
        const loadRecipeList = async () => {
            const response = await axios.get('/api/recipes');
            const newRecipeList = response.data;
            newRecipeList.sort((a,b) => a.title.localeCompare(b.title))
            setRecipeList(newRecipeList);
        }
        loadRecipeList();
    }, []);

    return (
        <>
            {recipeList.map(recipe => (
                <Link key={recipe._id} className="recipe-list-item" to={`/recipes/${recipe.name}`}>
                    <h3 className="recipe-list-item-title">{recipe.title}</h3>
                </Link>
                
            ))}
        </>
    );
}

export default RecipesList;