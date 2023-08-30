const addRecipeButton = document.getElementById('addRecipe');
const recipeList = document.getElementById('recipeList');

addRecipeButton.addEventListener('click', () => {
  const recipeName = document.getElementById('recipeName').value;
  const ingredients = document.getElementById('ingredients').value;
  const method = document.getElementById('method').value;

  //if any of the fields are empty or filled with spaces the message comes up
  if (recipeName.trim() === '' || ingredients.trim() === '' || method.trim() === '') {
    alert('Please fill out all fields.');
    return;
  }
  
  //catching inputs and creating recipe object
  const recipeObj = {
    name: recipeName,
    ingredients: ingredients,
    method: method,
    favorite: false 
  };

  
  //create new recipe card element
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');
  recipeCard.innerHTML = `
    <div class="recipe-name-h">
      <h2 class="accordion-trigger">${recipeName}<span class="accordion-icon">+</span></h2>
        <span class="favorite-icon ${recipeObj.favorite ? 'favorited' : ''}">☆</span>
    </div>
    <div class="recipe-content">
      <h3>Ingredients:</h3>
      <p>${ingredients}</p>
      <h3>Method:</h3>
      <p>${method}</p>
      <button class="delete-button">Delete Recipe</button>
      <button class="edit-button">Edit</button>
    </div>
    
  `;

  // expand recipe accordion
  const accordionTrigger = recipeCard.querySelector('.accordion-trigger');
  const recipeContent = recipeCard.querySelector('.recipe-content');
  accordionTrigger.addEventListener('click', () => {
    recipeContent.classList.toggle('show');
    const accordionIcon = accordionTrigger.querySelector('.accordion-icon');
    accordionIcon.textContent = recipeContent.classList.contains('show') ? '-' : '+';
  });

  // editing recipe
  const editButton = recipeCard.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    document.getElementById('recipeName').value = recipeObj.name;
    document.getElementById('ingredients').value = recipeObj.ingredients;
    document.getElementById('method').value = recipeObj.method;

    // temporarily removing the current recipe
    recipeCard.remove();

    // scrolling to the top of the screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // toggle favorite status
  const favoriteIcon = recipeCard.querySelector('.favorite-icon');
  favoriteIcon.addEventListener('click', () => {
    recipeObj.favorite = !recipeObj.favorite;
    favoriteIcon.classList.toggle('favorited', recipeObj.favorite);
  });

  // delete recipe
  const deleteButton = recipeCard.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      recipeCard.remove();
    }
  });

  recipeList.appendChild(recipeCard);

  // removing everything from input fields
  document.getElementById('recipeName').value = '';
  document.getElementById('ingredients').value = '';
  document.getElementById('method').value = '';
});