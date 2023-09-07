import express from 'express';

const app = express();
app.use(express.json());

let fakeRecipeData = [
    {
        name: "gyros",
        title: "Gryos",
        ingredients: [
            { name: 'Lamb', measurement: '3 lb'},
            { name: 'Bacon', measurement: '4 strips'},
            { name: 'Onion', measurement: '1'}
        ],
        directions: "Make it"
    },
    {
        name: "spaghetti-and-meatballs",
        title: "Spaghetti and Meatballs",
        ingredients: [
            { name: 'Spaghetti', measurement: '1 box' },
            { name: 'Ground Beef', measurement: '0.5 pound'},
            { name: 'Ground Pork', measurement: '0.5 pound'}
        ],
        directions: "Make it"
    }
]

// retrieves existing recipe
app.get('/api/recipes/:name', (req,res) => {
    const {name} = req.params;
    const recipe = fakeRecipeData.find(recipe => recipe.name === name);
    if (recipe){
        res.send(recipe);
    } else {
        res.send('That recipe doesn\'t exist.');
    }
});

// adds new recipe
app.post('/api/recipes', async (req, res) => {
    const newRecipe = req.body;
    const existingRecipe = fakeRecipeData.find((recipe => recipe.name === newRecipe.name));

    if (existingRecipe){
        return res.status(400).json({error: 'Recipe with same name already exists. Either update existing recipe or use a different name.'});
    }

    fakeRecipeData.push(newRecipe);

    res.status(201).json({message: "Recipe added successfuly", recipe: newRecipe});
});

// updates existing recipe (BY REPLACEMENT)
app.put('/api/recipes/:name', (req, res) => {
    const {name } = req.params;

    const existingRecipe = fakeRecipeData.find(recipe => recipe.name === name);

    if (existingRecipe) {
        if (req.body.ingredients) {
            existingRecipe.ingredients = req.body.ingredients;
        }
    
        if (req.body.directions) {
            existingRecipe.directions = req.body.directions;
        }
        res.send('Recipe updated successfully');
    } else{
        res.send('That recipe doesn\'t exist.');
    }

});

app.listen(8000, () => {
    console.log('Server is listening to port 8000');
});

