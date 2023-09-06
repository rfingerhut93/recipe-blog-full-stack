import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipePage from './pages/RecipePage';
import AddNewRecipe from './pages/AddNewRecipePage';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path ="/recipes" element={<RecipeListPage/>}/>
            <Route path="/recipes/:recipeId" element={<RecipePage/>}/>
            <Route path="add-new-recipe" element={<AddNewRecipe />}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
