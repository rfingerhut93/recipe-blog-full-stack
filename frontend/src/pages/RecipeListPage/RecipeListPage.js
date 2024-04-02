import RecipesList from "../../components/RecipesList";
import RecipeSearch from "../../components/RecipeSearch";
import './recipeListPage.css';
import { useState } from "react";

const RecipeListPage = ({queryResults, setQueryResults, recipeName, setRecipeName}) => {
    const [recipeList, setRecipeList] = useState([]);
    const [searchError, setSearchError] = useState("");

    
    const handleSearchResults = (results) => {
        if (results.length === 0){
            setSearchError("No recipes found with that name.")
        } else {
            setSearchError("");
        }
        setQueryResults(results);
    }

    return (
    <div className="recipe-list-page-container">
        <div className="recipe-search-container">
          <RecipeSearch onSearchResults={handleSearchResults} recipeName={recipeName} setRecipeName={setRecipeName}/>
        </div>
        <div id="recipe-list">
          {searchError ? (
            <p>{searchError}</p>
          ) : (
            <RecipesList
              recipeList={queryResults.length > 0 ? queryResults : recipeList}
              setRecipeList={setRecipeList}
            />
          )}
        </div>
    </div>
    );
}

export default RecipeListPage;