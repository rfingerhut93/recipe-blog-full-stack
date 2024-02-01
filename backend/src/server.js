import express from 'express';
import { db, connectToDb } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// middleware: load user information upon request
app.use( async (req,res, next) => {
    // if user is logged in, include authtoken
    const {authtoken} = req.headers;

    if (authtoken){
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};
    next();
});


// gets one recipe from MongoDB database, based on recipe name (url)
app.get('/api/recipes/:name', async (req,res) => {
    const {name} = req.params;

    const recipe = await db.collection('recipes').findOne({ name: name });

    if (recipe){
        res.json(recipe);
    } else {
        res.send({message: "Recipe not found??"});
    }
})

// gets all recipes as array from MongoDB database
app.get('/api/recipes', async (req, res) => {
    const recipes = await db.collection('recipes').find({}).toArray();
    res.json(recipes);
})

// Search Endpoint
app.get('/api/search', async (req, res) => {
    const { query } = req.query;

    try {
        // Perform the search query
        // const searchResults = await db.collection('recipes').find({ $text: { $search: query } }).toArray();

        const searchResults = await db.collection('recipes').find({ title: { $regex: new RegExp(query, 'i') } }).toArray();

        res.json(searchResults);
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Rejects endpoint access if user is not logged in
app.use((req, res, next) => {
    if (req.user){
        next();
    } else {
        res.sendStatus(401);
    }
})

// deletes recipe from MongoDB database
// ** USERS ONLY
app.delete('/api/recipes/:name', async (req, res) => {

    const { name } = req.params;
    
        const response = await db.collection('recipes').deleteOne({ name });
        if (response){
            res.json({message: `Recipe ${name} has been deleted.`});
        } else {
            res.status(404).json({error: `Recipe ${name} not found.`});
        }
    
})

// adds new recipe to MongoDB database
// ** USERS ONLY
app.post('/api/recipes', async (req, res) => {
    const { email } = req.user;
    const {name} = req.params;

    const existingRecipe = await db.collection('recipes').findOne({name});

    const newRecipe = {
        email: email,
        ...req.body,
    }

    if (existingRecipe){
        return res.status(400).json({error: `Recipe with same name (${newRecipe.name}) already exists. Either update existing recipe or use a different name.`});
    } 


    await db.collection('recipes').insertOne(newRecipe);
    
    res.status(201).json({message: "Recipe added successfuly", recipe: newRecipe});
});

// updates existing recipe's ingredients by adding on.
// ** USERS ONLY
app.put('/api/recipes/:name/ingredients', async (req, res) => {
    const { name } = req.params;
    const ingredient = req.body;


    const existingRecipe = await db.collection('recipes').findOne({ name });

    if (existingRecipe){
        const ingredientExists = existingRecipe.ingredients.some((existingIngredient) => {
            return (
                existingIngredient.name === ingredient.name && existingIngredient.measurement === ingredient.measurement
            );
        });

        if (!ingredientExists){
            const updatedRecipe = await db.collection('recipes').updateOne({ name }, {
                $push: {ingredients: ingredient}}
            );
            if (updatedRecipe){
                res.send('Recipe updated successfully');
            } else{
                res.send('Error: Recipe was not updated.');
            }
        } else {
            res.send('That ingredient and measurement are already added to the ingredients list.');
        }

    } else{
        res.send('That recipe doesn\'t exist.');
    }
});

// updates existing recipe's directions by updating specific index of directions array, or will add a new element if no index is specified.
app.put('/api/recipes/:name/directions', async(req, res)=> {
    const { name } = req.params;
    const { index, newDirection } = req.body;

    const existingRecipe = await db.collection('recipes').findOne({ name });

    if (existingRecipe){

        if (index !== null){
            existingRecipe.directions[index] = newDirection;
            const updatedRecipe = await db.collection('recipes').updateOne({ name }, {
                $set: {directions: existingRecipe.directions}
            });

            if (updatedRecipe){
                res.send('Recipe\'s directions updated successfully');
            } else {
                res.send('Error: Recipe not updated.');
            }

        } else {
            res.send('Error: Please enter an index.')
        }

    } else {
        res.send('Error: This recipe does not exist and cannot be updated.')
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


const PORT = process.env.PORT || 8000;

connectToDb(() => {
    console.log('Successfully connected to database.')
    app.listen(PORT, () => {
        console.log('Server is listening to port ' + PORT);
    });
})

