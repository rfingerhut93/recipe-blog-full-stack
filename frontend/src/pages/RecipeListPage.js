import recipes from "./recipe-content";
import RecipesList from "../components/RecipesList";

const RecipeListPage = () => {
    return (
    <>
        <h1>Recipes:</h1>
        <RecipesList recipes={recipes}/>
    </>
    );
}

export default RecipeListPage;