import RecipesList from "../components/RecipesList";

const RecipeListPage = () => {
    return (
    <>
        <form id="recipe-search">
            <input type="text" placeholder="Recipe name"/>
            <button>Search</button>
        </form>
        <div id="recipe-list">
            <RecipesList />
        </div>
    </>
    );
}

export default RecipeListPage;