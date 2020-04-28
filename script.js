// fetch("http://localhost:8088/food")
// .then(foods => foods.json())
// .then(parsedFoods => {
//     console.table(parsedFoods)
// })

// Create a DOM element in your index.html with a class of foodList.
// Use the template code below to take the data and print it to the DOM.
// Example fetch call using functions
let foodList = document.querySelector("#foodList")

createFoodList = (name, category, ethnicity) => {
    return `
    <div class="row">
  <h1>${name}<br></h1>
  <h5>${category}<br></h5>
  <h6>${ethnicity}<br></h6>
</div>
    `
}


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
       
        parsedFoods.forEach(food => {
            console.log(food)
           //Print foods to DOM
        //    const createFood = () => {
        //        let foodList = food.value
        //    }
           foodList.innerHTML += createFoodList(food.name, food.category, food.ethnicity)
        })
    })