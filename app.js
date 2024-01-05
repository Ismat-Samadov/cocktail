const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());


// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
}); 

app.get('/random-cocktail', async (req, res) => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = response.data.drinks[0];

    res.json({
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      category: cocktail.strCategory,
      instructions: cocktail.strInstructions,
      ingredients: getIngredients(cocktail),
      image: cocktail.strDrinkThumb,
    });
  } catch (error) {
    console.error('Error fetching random cocktail:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getIngredients(cocktail) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
    } else if (ingredient) {
      ingredients.push(ingredient.trim());
    }
  }
  return ingredients;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
