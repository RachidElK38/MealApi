var inputSearch = document.getElementById("inputSearch");
var submit = document.getElementById("submit");
var mealEl = document.getElementById("meals");
var cat = document.querySelector("#categories");

var api = "https://www.themealdb.com/api/json/v1/1/";

async function searchMeal(e){
        e.preventDefault();
        if(inputSearch.value.trim()){
            
                var res = await fetch(`${api}search.php?s=${inputSearch.value}`);
                var data = await res.json();
                console.log(data);
                mealEl.innerHTML = data.meals.map((meal)=>`
                <div class="col-6 col-md-4 col-lg-3 my-4" id="meal"">
                        <div class="card h-100  bg-dark ">
                        <img src="${meal.strMealThumb}"alt="${meal.strMeal}" class="card-img-top" />
                        <div >
                        <h6 class="text-white my-4 mx-1">
                           ${meal.strMeal}
                        </h6>   
                        <h6 class="text-white"> <strong>Cat</strong> ${meal.strCategory} </h6> 
                        <h6 class="text-white" > ${meal.strArea} </h6>
                      <h6  class="text-white"> ${meal.strTags} </h6>
                      </div>
                        </div>
                    </div>
                `).join("");  }         }

submit.addEventListener('submit',searchMeal);        
async function loadOn()
{
      var res =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
      var data = await res.json();
        
                mealEl.innerHTML = data.meals.map((meal)=>`
                <div class="col-6 col-md-4 col-lg-3 my-4" id="meal"">
                <div class="card h-100  bg-dark ">
                <img src="${meal.strMealThumb}"alt="${meal.strMeal}" class="card-img-top" />
                <div >
                <h6 class="text-white my-4 mx-1">
                   ${meal.strMeal}
                </h6>   
                <h6 class="text-white"> <strong>Cat</strong> ${meal.strCategory} </h6> 
                <h6 class="text-white" > ${meal.strArea} </h6>
              <h6  class="text-white"> ${meal.strTags} </h6>
              </div>
                </div>
            </div>  `).join("");}
/*Fill comboBox*/    
async function fillSelectCategories (){
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var data = await res.json();
    cat.innerHTML = ` <select onchange="getCat(this.value)">
        ${data.categories.map(categories =>  `<option>${categories.strCategory}</option>`)}
    </select>` 
}

loadOn();
fillSelectCategories();
async function getCat(categorie){
    var res = await fetch(`${api}filter.php?c=${categorie}`);
    var data = await res.json();
   console.log(data.meals);

   mealEl.innerHTML = data.meals.map(
  async function gg(meal){
    var res2 = await fetch(`${api}lookup.php?i=${meal.idMeal}`);
    var data2 = await res2.json();
    console.log(data2.meals);
    
    mealEl.innerHTML += data2.meals.map(
        (meal1)=>`
        <div class="col-6 col-md-4 col-lg-3 my-4" id="meal"">
        <div class="card h-100  bg-dark ">
        <img src="${meal1.strMealThumb}"alt="${meal1.strMeal}" class="card-img-top" />
        <div > 
        
        <h6 class="text-white my-4 mx-1">
           ${meal1.strMeal}
        </h6> 
        <h6 class="text-white"> <strong>Cat</strong> ${meal1.strCategory} </h6> 
                    <h6 class="text-white" > ${meal1.strArea} </h6>
                  <h6  class="text-white"> ${meal1.strTags} </h6>  
      </div>
    
        </div>
    </div> `  ).join("");}).join("");}
