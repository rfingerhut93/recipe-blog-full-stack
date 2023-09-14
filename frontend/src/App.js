import './App.css';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipePage from './pages/RecipePage';
import AddNewRecipe from './pages/AddNewRecipePage';
import CreateAccountPage from './pages/CreateAccountPage';
import LogInPage from './pages/LogInPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import useUser from './hooks/useUser';
import NavBar from './NavBar';


function App() {
  const {user, isLoading} = useUser();

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <div id="page-body">
          <Routes>
            <Route
              element={(
                <>
                  <NavBar />
                  <Outlet />
                </>
              )}
            >
              <Route path ="/recipes" element={<RecipeListPage/>}/>
              <Route path="/recipes/:recipeId" element={<RecipePage/>}/>
              <Route path="/add-new-recipe" element={
                <ProtectedRoute>
                  <AddNewRecipe />
                </ProtectedRoute>
              }/>
              <Route path="/create-account" element={<CreateAccountPage />}/>
              <Route path="*" element={<NotFoundPage />}/>
            </Route>
          <Route path="/" element={<HomePage />}/>
          <Route path="/log-in" element={<LogInPage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
