const randomRecipe = document.querySelector('#randomRecipe');
const favRecipes = document.querySelector('#fav-recipes');

const getRandomRecipe = async () => {
    const config = { headers: {Accept:'application/json'} }
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php", config);
    randomRecipe.innerHTML = `
        <div class="absolute bg-white top-2 p-2 opacity-90"><span class="opacity-100">Random Recipe</span></div>
        <img src="${res.data.meals[0].strMealThumb}" alt="">
        <div class="flex justify-between p-5">
            <span>${res.data.meals[0].strMeal}</span>
            <button><i id="fav-btn" class="fas fa-heart opacity-25"></i></button>
        </div>
    `;

    // Add to local storage with click
    
    const btn = document.querySelector('#fav-btn');
    
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('opacity-100')) {
            removeFromLS(res.data.meals[0].idMeal)
            btn.classList.remove('opacity-100');
            btn.classList.add('opacity-25');
        } else {
            addToLS(res.data.meals[0].idMeal)
            btn.classList.add('opacity-100');
            btn.classList.remove('opacity-25');
        }
        favRecipes.innerHTML = ''
        fetchFavRecipe();
    });
}

getRandomRecipe()

const getRecipeById = async (id) => {
    const config = { headers: {Accept:'application/json'} }
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id, config);
    const recipe = res.data.meals[0];
    return recipe
}
// function getRecipeBySearch(term) {
//     axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiatssa" + term)
//     .then( res => {
//         console.log(res.data)
//     })
//     .catch(err => {
//         console.log("Error!", err)
//     })
// }


function addToLS(recipeId) {
    const recipeIds = getFromLS();

    localStorage.setItem(
        'recipeIds',
        JSON.stringify([...recipeIds, recipeId]));
}

function removeFromLS(recipeId) {
    const recipeIds = getFromLS();

    localStorage.setItem(
        'recipeIds',
        JSON.stringify(recipeIds.filter((id) => id !== recipeId)));
}

function getFromLS() {
    const recipeIds = JSON.parse(localStorage.getItem('recipeIds'));

    return recipeIds === null ? [] : recipeIds;
}

fetchFavRecipe()

async function fetchFavRecipe() {
    const recipeIds = getFromLS();

    const recipes = [];

    for(let i=0; i<recipeIds.length; i++) {
        const recipeId = recipeIds[i];
        recipe = await getRecipeById(recipeId);

        addRecipeToFav(recipe)
    }
}


function addRecipeToFav(mealData) {
    const favRecipe = document.createElement('li');

    favRecipe.classList.add("w-1/3")
    favRecipe.innerHTML = `
        <img 
            src="${mealData.strMealThumb}" 
            alt="${mealData.strMeal}"
        class="w-64 rounded-full"/>
        <span class="text-xs">${mealData.strMeal}</span>
    `;

    favRecipes.appendChild(favRecipe);
} 