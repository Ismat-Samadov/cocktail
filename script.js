function getRandomCocktail() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      document.getElementById('cocktail-image').src = cocktail.strDrinkThumb;
      document.getElementById('cocktail-name').innerText = cocktail.strDrink;
      document.getElementById('cocktail-category').innerText = `Category: ${cocktail.strCategory}`;
      document.getElementById('cocktail-instructions').innerText = `Instructions: ${cocktail.strInstructions}`;
      document.getElementById('cocktail-ingredients').innerText = formatIngredients(cocktail);
    })
    .catch(error => console.error('Error fetching random cocktail:', error));
}

function formatIngredients(cocktail) {
  let ingredients = 'Ingredients:';
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients += `\n- ${measure.trim()} ${ingredient.trim()}`;
    }
  }
  return ingredients;
}

// Initial load
getRandomCocktail();
