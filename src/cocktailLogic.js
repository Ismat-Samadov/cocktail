// This file contains the application logic for fetching and displaying random cocktails

async function fetchRandomCocktail() {
  try {
    const response = await fetch('/random-cocktail');

    if (!response.ok) {
      throw new Error(`Failed to fetch random cocktail: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random cocktail:', error.message);
    throw error;
  }
}

function displayCocktail(cocktail) {
  const cocktailInfoDiv = document.getElementById('cocktailInfo');
  cocktailInfoDiv.innerHTML = '';

  const image = document.createElement('img');
  image.src = cocktail.image;
  image.alt = cocktail.name;
  cocktailInfoDiv.appendChild(image);

  const name = document.createElement('h2');
  name.textContent = cocktail.name;
  cocktailInfoDiv.appendChild(name);

  const category = document.createElement('p');
  category.textContent = `Category: ${cocktail.category}`;
  cocktailInfoDiv.appendChild(category);

  const instructions = document.createElement('p');
  instructions.textContent = `Instructions: ${cocktail.instructions}`;
  cocktailInfoDiv.appendChild(instructions);

  const ingredientsList = document.createElement('ul');
  const ingredients = cocktail.ingredients.map(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    return listItem;
  });
  ingredients.forEach(item => ingredientsList.appendChild(item));
  cocktailInfoDiv.appendChild(ingredientsList);
}

export { fetchRandomCocktail, displayCocktail };
