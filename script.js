// fetch("http://localhost:8088/food")
// .then(foods => foods.json())
// .then(parsedFoods => {
//     console.table(parsedFoods)
// })

// Create a DOM element in your index.html with a class of foodList.
// Use the template code below to take the data and print it to the DOM.
// Example fetch call using functions
let foodList = document.querySelector("#foodList")


// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
       
//         parsedFoods.forEach(food => {
//             // console.log(food)
//            //Print foods to DOM
//         //    const createFood = () => {
//         //        let foodList = food.value
//         //    }
//            foodList.innerHTML += createFoodList(food.name, food.category, food.ethnicity)
//         })
//     })


    fetch("https://world.openfoodfacts.org/api/v0/product/8076809523509.json")
    .then(response => response.json())
    .then(productInfo => {
        // Use it here
        console.log(productInfo)
    })




// Your job is to query the Open Food Facts API for each of your products, and list the following additional information.

// Ingredients
// Country of origin
// Calories per serving
// Fat per serving
// Sugar per serving
// Helpful hints: You will need to use the forEach array method to iterate your foods. Inside that forEach, you will need to perform another fetch to get the additional information. The barcode value must be interpolated inside the URL for the inner fetch.

createFoodList = (name, category, ethnicity, ingredients, countries, calories, fat, sugar) => {
    return `
    <div class="row">
  <h1>${name}<br></h1>
  <h5>${category}<br></h5>
  <h6>${ethnicity}<br></h6>
  <p>Ingredients: <br>${ingredients}</p>
  <h5>Countries: ${countries}</h5>
  <h5>Calories: ${calories}</h5>
  <h5>Fat: ${fat}</h5>
  <h5>Sugar: ${sugar}</h5>
</div>
    `
}

fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    food.countries = productInfo.product.countries

                    if (productInfo.product.nutriscore_data.energy) {
                        console.log(productInfo.product.nutriscore_data.energy) 
                        food.calories = productInfo.product.nutriscore_data.energy
                    } else {
                        food.calories = "no calories listed"
                    }

                    if (productInfo.product.nutriscore_data.saturated_fat) {
                        food.fat = productInfo.product.nutriscore_data.saturated_fat
                    } else {
                        food.fat = "no fat listed"
                    }

                    if (productInfo.product.nutriscore_data.sugars) {
                        food.sugar = productInfo.product.nutriscore_data.sugars
                    } else {
                        food.sugar = "no sugar listed"
                    }
                    // Build HTML string for individual food
                    // Add HTML string to DOM
                  console.log(food.ingredients)

                    foodList.innerHTML += createFoodList(food.name, food.category, food.ethnicity, food.ingredients, food.countries, food.calories, food.fat, food.sugar )
                                })
        })
    })