import { useParams } from "react-router-dom";
import recipes from "./recipe-content";
import NotFoundPage from "./NotFoundPage";

const RecipePage = () => {
    const { recipeId } = useParams();
    const recipe = recipes.find(recipe => recipe.name === recipeId)

    if (!recipe){
        return (<NotFoundPage />);
    }

    return (
    <>
        <h1>{recipe.title}</h1>
        <h2>Ingredients:</h2>
        <ul key={recipe.name}>
            {recipe.ingredients.map(ingredient => (
                <li key={ingredient.name}>{ingredient.name}, {ingredient.measurement}</li>
            ))}
        </ul>
        <h2>Directions:</h2>
        <p>{recipe.directions}</p>
    </>
    );
}

export default RecipePage;