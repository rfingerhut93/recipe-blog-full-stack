import { Link } from "react-router-dom";

const RecipesList = ({recipes}) => {
    return (
        <>
            {recipes.map(recipe => (
                <Link key={recipe.name} className="article-list-item" to={`/recipes/${recipe.name}`}>
                    <h3>{recipe.title}</h3>
                </Link>
            ))}
        </>
    );
}

export default RecipesList;