var search = document.getElementById("search");
var submit = document.getElementById("submit");
var random =document.getElementById("random");
var mealEl = document.getElementById("meals");
var result = document.getElementsByClassName("result");
var cat = document.querySelector("#categories");


const mealDetailsContent = document.querySelector('.meal-details-content');

mealEl.addEventListener('click',getMealRecipe)



var api = "https://www.themealdb.com/api/json/v1/1/";

// function searchMeal(e){
//     e.preventDefault();

//     if(search.value.trim()){
//         fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
//         .then((res)=>res.json())
//         .then((data)=>{
//             result.innerHTML = `<h2>${search.value}</h2>`
//             if(data.meals===null){
//                 result.innerHTML =`<h2>No result ${search.value}</h2>`
//             }
//             else
//             {
//                 mealEl.innerHTML = data.meals.map(
//                     (meal)=>`
//                     <div class="meal col-6 col-md-4 col-lg-3 my-5" id="meal">
//                     <img src="${meal.strMealThumb}"alt="${meal.strMeal}"/>
//                     <div class="meal-info" data-mealID="${meal.idMeal}"
//                     <h3>${meal.strMeal}</h3>
//                      </div> </div> `
//                 ).join("");
//             }
//         })
//     }
// }
async function loadOn()
{
      var res =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
      var data = await res.json();
            result.innerHTML = `<h2>All Meals</h2>`
            
                mealEl.innerHTML = data.meals.map(
                    (meal)=>`
                    <div class="col-6 col-md-4 col-lg-3 my-5" id="meal" data-mealID="${meal.idMeal}">
                    <img src="${meal.strMealThumb}"alt="${meal.strMeal}"/>
                    <div class="meal-info" >
                    <h3>${meal.strMeal}</h3>
                     </div>
                     <a href = "#" class = "recipe-btn">Get Recipe</a>
                      </div> `
                ).join("");
}
/*Fill comboBox*/    
async function searchM(){
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var data = await res.json();
    cat.innerHTML = ` <select onchange="getCat(this.value)">
        ${data.categories.map(categories =>  `<option>${categories.strCategory}</option>`)}
    </select>` 
}

loadOn();
searchM();
async function getCat(categorie){
    var res = await fetch(`${api}filter.php?c=${categorie}`);
    var data = await res.json();
   console.log(data);
   mealEl.innerHTML = data.meals.map(
    (meal)=>`
        <div class="meal col-6 col-md-4 col-lg-3 my-5" id="meal">
            <img src="${meal.strMealThumb}"alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}"
                 <h3>${meal.strMeal}</h3>
            </div> 
        </div> `
).join("");
}

async function getMealRecipe(e){
    e.preventDefault();
    console.log(e.target.parentElement)
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement;
        var res =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
      var data = await res.json();
        mealRecipeModal(data.meals);
    }
}


function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
//call functions


