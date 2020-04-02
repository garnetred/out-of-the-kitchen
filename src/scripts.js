const mainPage = document.querySelector('.main-page');
const recipePage = document.querySelector('.recipe-page');
const favorites = document.querySelector('.favorites');
const mealPlan = document.querySelector('.meal-plan');
const searchResults = document.querySelector('.search-results');
const pantry = document.querySelector('.pantry');
const allRecipesSection = document.querySelector('.all-recipes-group');
let randomNumber = (Math.floor(Math.random() * 50));
const user0 = new User(usersData[randomNumber]);
const searchButton = document.querySelector('.search-button');
const searchButtonMealPlan = document.querySelector('.meal-plan-search-btn');
let currentRecipeForCalc;
const allIngredients = []
ingredientsData.forEach(ing => {
  let someIngredient = new Ingredient(ing);
  allIngredients.push(someIngredient);
})
let allRecipes = [];
recipeData.map(recipe => {
  let eachRecipe = new Recipe(recipe);
  allRecipes.push(eachRecipe);
});
const filterButton = document.querySelector('.filter-button')

document.addEventListener('click', changePageView);
document.addEventListener('click', selectCards);
filterButton.addEventListener('click', filterRecipes)
searchButton.addEventListener('click', searchFaveRecipes);
searchButtonMealPlan.addEventListener('click', searchMealPlanRecipes);
recipePage.addEventListener('click', printNeededIngredients);

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
    populatePantryPage();
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
    populateRecipePage();
  } else if (event.target === allRecipesNavItem && searchResults.classList.contains('hidden')) {
    variousPages.forEach(page => page.classList.add('hidden'));
    variousPages.forEach(page => page.classList.remove('shown'));
    searchResults.classList.remove('hidden')
    searchResults.classList.toggle('shown')
    addRecipesToSearchPage();
  }
}

function selectCards(event) {
  if (event.target.classList.contains('unselected-heart')) {
    favoriteRecipe(event);
    event.target.src = "../assets/heart-solid.svg"
    event.target.alt = "selected heart icon"
    event.target.classList.add('selected-heart');
    event.target.classList.remove('unselected-heart');
  } else if (event.target.classList.contains('unselected-chef-hat')) {
    addRecipeToMealPlan(event);
    event.target.src = "../assets/selected-chef-hat.svg"
    event.target.alt = "selected recipe to cook"
    event.target.classList.add('selected-chef-hat')
    event.target.classList.remove('unselected-chef-hat')
  } else if (event.target.classList.contains('selected-heart')) {
    removeRecipeFromFavorites(event)
    event.target.src = "../assets/heart-regular.svg"
    event.target.alt = "unselected heart icon"
    event.target.classList.add('unselected-heart')
    event.target.classList.remove('selected-heart')
  } else if (event.target.classList.contains('selected-chef-hat')) {
    removeRecipeFromMealPlan(event);
    event.target.src = "../assets/unselected-chef-hat.svg";
    event.target.alt = "unselected recipe to cook"
    event.target.classList.add('unselected-chef-hat')
    event.target.classList.remove('selected-chef-hat')
  }
}

function addRecipesToSearchPage() {
  allRecipesSection.innerHTML = '';
  allRecipes.forEach(recipe => {
    allRecipesSection.innerHTML += `<div class="recipe-card" id =${recipe.id}>
    <img class="recipe-card-image" src=${recipe.image} alt=${recipe.name}>
    <p class="recipe-card-title">${recipe.name}</p>
    <img class="unselected-heart" src="../assets/heart-regular.svg" alt="unselected heart icon" id=${recipe.id}>
    <img class="unselected-chef-hat" src="../assets/unselected-chef-hat.svg" alt="unselected recipe to cook" id=${recipe.id}>
  </div>`
  });
}

function favoriteRecipe(event) {
  const favoriteMealSection = document.querySelector('.favorited-recipe-group')
  let currentRecipe = allRecipes.find(recipe => recipe.id === parseInt(event.target.id))
  currentRecipe.hasBeenFavorited = true;
  if (!user0.favoriteRecipes.includes(currentRecipe)) {
    user0.favoriteMeal(currentRecipe);
    favoriteMealSection.innerHTML += `<div class="recipe-card" id=${currentRecipe.id}>
      <img class="recipe-card-image" src=${currentRecipe.image} alt="${currentRecipe.name}">
      <p class="recipe-card-title">${currentRecipe.name}</p>
      <img class="selected-heart" src="../assets/heart-solid.svg" alt="selected heart icon" id =${currentRecipe.id}>
      <img class="unselected-chef-hat" src="../assets/unselected-chef-hat.svg" alt="unselected recipe to cook" id=${currentRecipe.id}>
    </div>`;
  }
}

function addRecipeToMealPlan() {
  const mealPlanSection = document.querySelector('.meal-plan-group')
  let currentRecipe = allRecipes.find(recipe => recipe.id === parseInt(event.target.id))
  currentRecipe.hasBeenAddedToMealPlan = true;
  if (!user0.recipesToCook.includes(currentRecipe)) {
    user0.addRecipeToMealsToCook(currentRecipe);
    mealPlanSection.innerHTML += `<div class="recipe-card" id=${currentRecipe.id}>
      <img class="recipe-card-image" src=${currentRecipe.image} alt="${currentRecipe.name}">
      <p class="recipe-card-title">${currentRecipe.name}</p>
      <img class="selected-heart" src="../assets/heart-regular.svg" alt="selected heart icon" id =${currentRecipe.id}>
      <img class="selected-chef-hat" src="../assets/selected-chef-hat.svg" alt="unselected recipe to cook" id=${currentRecipe.id}>
    </div>`;
  }
}

function removeRecipeFromMealPlan() {
  let currentRecipe = allRecipes.find(recipe => recipe.id === parseInt(event.target.id))
  currentRecipe.hasBeenAddedToMealPlan = false;
  const currentRecipeDiv = document.getElementById(`${currentRecipe.id}`)
  if (user0.recipesToCook.includes(currentRecipe)) {
    user0.removeRecipeFromMealsToCook(currentRecipe);
    currentRecipeDiv.remove();
  }
}

function removeRecipeFromFavorites() {
  let currentRecipe = allRecipes.find(recipe => recipe.id === parseInt(event.target.id))
  currentRecipe.hasBeenFavorited = false;
  const currentRecipeDiv = document.getElementById(`${currentRecipe.id}`)
  if (user0.favoriteRecipes.includes(currentRecipe)) {
    user0.unfavoriteMeal(currentRecipe);
    currentRecipeDiv.remove();
  }
}

function populateRecipePage() {
  recipePage.innerHTML = "";
  let currentRecipe = allRecipes.find(recipe => recipe.id === parseInt(event.target.id));
  recipePage.innerHTML += `<h2 class="recipe-title">${currentRecipe.name}</h2>
  <button class="find-missing-ing-btn">Calculate Missing Ingredient</button>
  <div class="able-to-cook-alert">You have everything you need to cook this recipe</div>
  <img class="recipe-page-image" src=${currentRecipe.image} alt=${currentRecipe.name}>
  <ul class="recipe-ingredients">
    <h3>Ingredients</h3>`
  currentRecipe.ingredients.forEach(ing => {
    allIngredients.find(ingData => {
      if (ingData.id === ing.id) {
        recipePage.innerHTML +=
        (`<li>${parseFloat(ing.quantity.amount).toFixed(2)} ${ing.quantity.unit} ${ingData.name}</li>`)
      }
    })
  })
  recipePage.innerHTML +=
  `</ul>
  <ol class="instructions">
    <h3>Instructions</h3>`
  currentRecipe.instructions.forEach(instruction => {
    recipePage.innerHTML +=
    (`<li class="each-ing">${instruction.instruction}</li>`)
  })
  recipePage.innerHTML +=
  `</ol>`
  showRecipeAlert();
  getRecipeCost(allIngredients, event)
}

function populatePantryPage() {
  const welcomeMessage = document.querySelector('.welcome-pantry-title')
  welcomeMessage.innerText = `Welcome to your pantry, ${user0.name}!`
  const table = document.querySelector('.pantry-table')
  user0.pantry.forEach(ingredient => {
    allIngredients.find(ing => {
      if (ing.id === ingredient.ingredient) {
        table.innerHTML +=
          `<tr>
          <td>${ing.name}</td>
          <td>${ingredient.amount}</td>
          </tr>
          <br />`
      }
    })
  })
}

function showRecipeAlert() {
  let calcMissingIngredientsBtn = document.querySelector('.find-missing-ing-btn')
  let ableToCookAlert = document.querySelector('.able-to-cook-alert')
  let currentRecipeData = allRecipes.find(recipe => recipe.id === parseInt(event.target.id));
  addMissingIngAmount();
  if (user0.checkIngredientAmts(currentRecipeData)) {
    ableToCookAlert.classList.remove('hidden');
    calcMissingIngredientsBtn.classList.add('hidden')
  } else {
    ableToCookAlert.classList.add('hidden');
    calcMissingIngredientsBtn.classList.remove('hidden')
  }
}

function addMissingIngAmount() {
  let currentRecipeData = allRecipes.find(recipe => recipe.id === parseInt(event.target.id))
  user0.checkIngredientAmts(currentRecipeData);
  currentRecipeForCalc = currentRecipeData.ingredientsNeeded;
  addMissingIngName(currentRecipeForCalc);
}

function addMissingIngName(currentRecipeForCalc) {
  return currentRecipeForCalc.map(ingInRec => {
    allIngredients.forEach(ing => {
      if (ing.id === ingInRec.id) {
        return ingInRec['name'] = ing.name
      }
    })
  })
}

function printNeededIngredients(event) {
  let calcMissingIngredientsBtn = document.querySelector('.find-missing-ing-btn')
  let recipeTitle = document.querySelector('.recipe-title')
  if (event.target.classList.contains('find-missing-ing-btn')) {
    recipeTitle.insertAdjacentHTML('afterend', `<ul class="missing-ing-section">
    </ul>`)
    const missingIngSection = document.querySelector('.missing-ing-section')
    missingIngSection.innerHTML = `<p class="needed-ing-title">You still need the following to make this recipe:</p>`
    calcMissingIngredientsBtn.classList.add('hidden');
    currentRecipeForCalc.forEach(ing => {
      missingIngSection.innerHTML += `<li>${ing.difference} ${ing.name}</li>`
    })
  }
}


function searchMealPlanRecipes() {
  const mealPlanSearchTerm = document.querySelector('.meal-plan-search-term');
  let foundRecipeName = user0.recipesToCook.filter(recipe => recipe.name.toLowerCase().includes(mealPlanSearchTerm.value))
  let foundRecipeTag = user0.recipesToCook.filter(recipe => recipe.tags.includes(mealPlanSearchTerm.value))
  let foundRecipeIngredients = allIngredients.filter(ingredient => ingredient.name === mealPlanSearchTerm.value)
  let foundRecipeIngredientIds = foundRecipeIngredients.map(ingredient => ingredient.id)
  let searchResults = [foundRecipeName, foundRecipeTag]
  user0.recipesToCook.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (foundRecipeIngredientIds.includes(ingredient.id)) {
        searchResults.push(recipe)
      }
    })
  });
  let flattenedSearchResults = searchResults.flat();
  let searchResultsAsObj  = new Set(flattenedSearchResults);
  let regSearchResults = [...searchResultsAsObj];
  displayMealPlanRecipes(regSearchResults);
}

function displayMealPlanRecipes(regSearchResults) {
  const mealPlanSection = document.querySelector('.meal-plan-group')
  if (regSearchResults.length > 0) {
    mealPlanSection.innerHTML = '';
    regSearchResults.forEach(recipe => {
      mealPlanSection.innerHTML += (`<div class="recipe-card" id=${recipe.id}>
      <img class="recipe-card-image" src=${recipe.image} alt="${recipe.name}">
      <p class="recipe-card-title">${recipe.name}</p>
      <img class="selected-heart" src="../assets/heart-regular.svg" alt="selected heart icon" id =${recipe.id}>
      <img class="unselected-chef-hat" src="../assets/selected-chef-hat.svg" alt="unselected recipe to cook" id=${recipe.id}>
      </div>`)
    })
  }
}

function searchFaveRecipes() {
  const searchTerm = document.querySelector('.search-term');
  let foundRecipeName = user0.favoriteRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.value))
  let foundRecipeTag = user0.favoriteRecipes.filter(recipe => recipe.tags.includes(searchTerm.value))
  let foundRecipeIngredients = allIngredients.filter(ingredient => ingredient.name === searchTerm.value)
  let foundRecipeIngredientIds = foundRecipeIngredients.map(ingredient => ingredient.id)
  let searchResults = [foundRecipeName, foundRecipeTag]
  user0.favoriteRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (foundRecipeIngredientIds.includes(ingredient.id)) {
        searchResults.push(recipe)
      }
    })
  });
  let flattenedSearchResults = searchResults.flat();
  let searchResultsAsObj  = new Set(flattenedSearchResults);
  let regSearchResults = [...searchResultsAsObj];
  displayFaveSearchedRecipes(regSearchResults);
}

function displayFaveSearchedRecipes(regSearchResults) {
  const favoriteMealSection = document.querySelector('.favorited-recipe-group')
  if (regSearchResults.length > 0) {
    favoriteMealSection.innerHTML = '';
    regSearchResults.forEach(recipe => {
      favoriteMealSection.innerHTML += `<div class="recipe-card" id=${recipe.id}>
      <img class="recipe-card-image" src=${recipe.image} alt="${recipe.name}">
      <p class="recipe-card-title">${recipe.name}</p>
      <img class="selected-heart" src="../assets/heart-solid.svg" alt="selected heart icon" id =${recipe.id}>
      <img class="unselected-chef-hat" src="../assets/unselected-chef-hat.svg" alt="unselected recipe to cook" id=${recipe.id}>
      </div>`
    })
  }
}

function getRecipeCost(allIngredients, event) {
  let currentRecipe = allRecipes.find(recipe => recipe.id === parseInt(event.target.id))
  let cost = currentRecipe.calculateCostOfIngredients(allIngredients);
  let costInDollars = (cost / 100).toFixed(2)
  recipePage.innerHTML += `<section class="price-to-make-alert">This recipe costs $${costInDollars} to make.</section>`
}

function filterRecipes() {
  const searchInput = document.querySelector('.filter-input');
  let foundRecipeName = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchInput.value))
  let foundRecipeTag = allRecipes.filter(recipe => recipe.tags.includes(searchInput.value))
  let foundRecipeIngredients = allIngredients.filter(ingredient => ingredient.name === searchInput.value)
  let foundRecipeIngredientIds = foundRecipeIngredients.map(ingredient => ingredient.id)
  let searchResults = []
  searchResults.push(foundRecipeName, foundRecipeTag);
  allRecipes.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (foundRecipeIngredientIds.includes(ingredient.id)) {
        searchResults.push(recipe)
      }
    })
  });
  let flattenedSearchResults = searchResults.flat();
  let searchResultsAsObj  = new Set(flattenedSearchResults);
  let regSearchResults = [...searchResultsAsObj];
  if (regSearchResults.length > 0) {
    allRecipesSection.innerHTML = '';
    regSearchResults.forEach(recipe => {
      allRecipesSection.innerHTML += `<div class="recipe-card" id =${recipe.id}>
            <img class="recipe-card-image" src=${recipe.image} alt=${recipe.name}>
            <p class="recipe-card-title">${recipe.name}</p>
            <img class="unselected-heart" src="../assets/heart-regular.svg" alt="unselected heart icon" id=${recipe.id}>
            <img class="unselected-chef-hat" src="../assets/unselected-chef-hat.svg" alt="unselected recipe to cook" id=${recipe.id}>
            </div>`
    });
  } else {
    allRecipesSection.innerHTML = '';
    allRecipesSection.innerHTML = `<p>No Search Results Found</p>`
  }
}
