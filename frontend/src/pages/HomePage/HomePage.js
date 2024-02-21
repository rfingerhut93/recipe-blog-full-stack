import React, { useState } from 'react';
import RecipeSearch from '../../components/RecipeSearch';
import RecipesList from '../../components/RecipesList';
import "./homepage.css";

const HomePage = () => {
  const [queryResults, setQueryResults] = useState([]);
  const [recipeName, setRecipeName] = useState('');

  return (
    <div className="home-container">
      <RecipeSearch onSearchResults={setQueryResults} recipeName={recipeName} setRecipeName={setRecipeName} />
      <RecipesList recipeList={queryResults} />
    </div>
  );
};

export default HomePage;
