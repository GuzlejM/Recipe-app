const randomRecipe = document.querySelector('#randomRecipe');

const getRandomRecipe = async () => {
    const config = { headers: {Accept:'application/json'} }
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php", config);
    console.log(res.data.meals[0].strMealThumb)

    randomRecipe.innerHTML = `
        <div class="absolute bg-white top-2 p-2 opacity-90"><span class="opacity-100">Random Recipe</span></div>
        <img src="${res.data.meals[0].strMealThumb}" alt="">
        <div class="flex justify-between p-5">
            <span>${res.data.meals[0].strMeal}</span>
            <button> <i class="fas fa-heart"></i></button>
        </div>
    `
}
getRandomRecipe()
// function getRecipeById(id) {
//     axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772" + id)
//     .then( res => {
//         console.log(res.data)
//     })
//     .catch(err => {
//         console.log("Error!", err)
//     })
// }
// function getRecipeBySearch(term) {
//     axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiatssa" + term)
//     .then( res => {
//         console.log(res.data)
//     })
//     .catch(err => {
//         console.log("Error!", err)
//     })
// }