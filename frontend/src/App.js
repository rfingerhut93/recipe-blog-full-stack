import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RecipeListPage from './pages/RecipeListPage/RecipeListPage';
import RecipePage from './pages/RecipePage/RecipePage';
import AddNewRecipe from './pages/AddNewRecipePage/AddNewRecipePage';
import LogInPage from './pages/LogInPage/LogInPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import useUser from './hooks/useUser';
import NavBar from './NavBar';
import { useState } from 'react';
import HamburgerMenu from './components/HamburgerMenu';

function App() {
  const {user, isLoading} = useUser();

  const [queryResults, setQueryResults] = useState([]);
  const [recipeName, setRecipeName] = useState('');

  const clearQueryResults = () => {
    setQueryResults([]);
    setRecipeName('');
  }

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }


  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar clearQueryResults={clearQueryResults} />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<RecipeListPage setQueryResults={setQueryResults} queryResults={queryResults} recipeName={recipeName} setRecipeName={setRecipeName} />} />
            <Route path="/recipes/:recipeId" element={<RecipePage />} />
            <Route path="/add-new-recipe" element={
              <ProtectedRoute>
                <AddNewRecipe />
              </ProtectedRoute>
            } />
            <Route path="/log-in" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
