const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipieContainer = document.querySelector(".recipie-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipecloseBtn = document.querySelector(".recipe-close-btn");

async function getRecipes(recipeName) {
  recipieContainer.innerHTML = "<h2>Ruko jara sabar karo...</h2>";
  try {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`
  );
  const data = await response.json();
  // console.log(data.meals[0])
  recipieContainer.innerHTML = "";
  data.meals.forEach((meal) => {
    // console.log(meal)
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    // adding event listner to the above button
    button.addEventListener("click", () => {
      openRecipePopUp(meal);
    });
    recipieContainer.appendChild(recipeDiv);
  });
} catch (error) {
    recipieContainer.innerHTML = "<h2>No such recipe found.</h2>";
}
}
function getIngredients(dish) {
  // console.log(dish)
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = dish[`strIngredient${i}`];
    if (ingredient) {
      const measure = dish[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
}
function openRecipePopUp(dish) {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipe-name">${dish.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredients-list">${getIngredients(dish)}</ul>
    <div class="recipe-instructions">
        <h3>Instructions:</h3>
        <p >${dish.strInstructions}</p>
    </div>
    `;

  recipeDetailsContent.parentElement.style.display = "block";
}
recipecloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none"
})
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = searchBox.value.trim();
  if(searchInput===""){
    recipieContainer.innerHTML=`<h2>Type the recipe name...</h2>`
  }
  else{
    getRecipes(searchInput);
  }
});
