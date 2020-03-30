console.log('Hello world');
const mainPage = document.querySelector('.main-page');
const recipePage = document.querySelector('.recipe-page');
const favorites = document.querySelector('.favorites');
const mealPlan = document.querySelector('.meal-plan');
const searchResults = document.querySelector('.search-results');
const pantry = document.querySelector('.pantry');
//want to create navbar functionality

document.addEventListener('click', changePageView);


function changePageView(event) {
  const header = document.getElementsByTagName('header')[0]
  const favoritesNavItem = document.querySelector('.favorites-navbar');
  const pantryNavItem = document.querySelector('.pantry-navbar');
  const mealPlanNavItem = document.querySelector('.meal-plan-navbar');
  const allRecipesNavItem = document.querySelector('.all-recipes-navbar');
  const variousPages = [mainPage, recipePage, favorites, mealPlan, searchResults,
  pantry]

  if (event.target === header && mainPage.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    mainPage.classList.toggle('shown')
  } else if (event.target === favoritesNavItem && favorites.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    favorites.classList.remove('hidden')
    favorites.classList.toggle('shown')
  } else if (event.target === pantryNavItem && pantry.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    pantry.classList.remove('hidden')
    pantry.classList.toggle('shown')
  } else if (event.target === mealPlanNavItem && mealPlan.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    mealPlan.classList.remove('hidden')
    mealPlan.classList.toggle('shown')
  } else if (event.target.classList.contains('recipe-card') && recipePage.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    recipePage.classList.remove('hidden')
    recipePage.classList.toggle('shown')
    populatePantryPage();
  } else if (event.target === allRecipesNavItem && searchResults.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    searchResults.classList.remove('hidden')
    searchResults.classList.toggle('shown')
  }
}

function addUserToPage() {
  console.log(usersData);
  const user0 = new User(usersData[0]);
  console.log(user0);
}

<<<<<<< Updated //need to create function that instantiates all recipes
//display all recipes in the search page in a function -- all should be unchecked for now
//create function that is invoked when "favorite" icon is clicked
// after favorite icon is clicked, should now become selected icons
//the function should also make sure that the favorite meal function from the class is invoked with recipe as the argument
//favorite meal should then be added to the DOM using interpolation
//create click function that executes if you've clicked one of the unselected or selected buttons;

function instantiateAllRecipes() {
  let instantiatedRecipes = recipeData.map((recipe, index) => {
  let eachRecipe = new Recipe(recipe);
  return eachRecipe;
});
  addRecipesToSearchPage(instantiatedRecipes)
}

function addRecipesToSearchPage(instantiatedRecipes) {
  //add functionality to add each recipe to the javascript
  //create constant for the div that holds all of the searches in it
  instantiatedRecipes.forEach(recipe => {
  allRecipesSection.innerHTML += `<div class="recipe-card" id="${recipe.id}">
    <img class="recipe-card-image" src=${recipe.image} alt=${recipe.name}>
    <p class="recipe-card-title">${recipe.name}</p>
    <img class="unselected-heart" src="../assets/heart-regular.svg" alt="unselected heart icon">
    <img class="unselected-chef-hat" src="../assets/unselected-chef-hat.svg" alt="unselected recipe to cook">
  </div>`
});

}

function favoriteRecipe() {
//should add recipe to favorited recipe array
//should also display recipe in favorites section
  // user.favoriteMeal()
  console.log('in favorite recipe function!')
}

function addRecipeToMealPlan() {
  console.log('in add recipe to meal plan  function!')

}

function populatePantryPage() {
  let currentRecipe = recipeData.find(recipe => recipe.id == event.target.id)
  recipePage.innerHTML += (`<h2>${currentRecipe.name}</h2>
  <img class="recipe-page-image" src=${currentRecipe.image} alt=${currentRecipe.name}>
  <ul class="recipe-ingredients">
    <h3>Ingredients</h3>`)
  currentRecipe.ingredients.forEach(ing => {
    recipePage.innerHTML +=
      (`<li>${ing.quantity.amount} ${ing.quantity.unit}</li>`)
  })
  recipePage.innerHTML +=
  (`</ul>
  <ol class="instructions">
    <h3>Instructions</h3>`)
  currentRecipe.instructions.forEach(instruction => {
    recipePage.innerHTML +=
    (`<li>${instruction.instruction}</li>`)
  })
  recipePage.innerHTML +=
  (`</ol>
  <div class="able-to-cook-alert">You have everything you need to cook this recipe</div>`)
  showRecipeAlert();
}

function showRecipeAlert() {
  let currentRecipe = recipeData.find(recipe => recipe.id == event.target.id)
  console.log(currentRecipe);
  console.log(event.target.id);
  const user0 = new User(usersData[0]);
  return user0.checkIngredientAmts(currentRecipe)
  // checkIngredientAmts()
}
window.onload = addUserToPage();
