//api docs here https://developer.edamam.com/food-database-api-docs
//need the food id from api in order to find the nutrition
export const foodIdAPI = async (food, setFoodId) => {
  const app_id = "e61e6c91";
  const app_key = "25fbf2bfe68aaeac0f67859971acbee0";
  const link = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${food}&nutrition-type=cooking`;
  const resp = await fetch(link);
  const data = await resp.json();
  setFoodId(data.hints[0].food.foodId);
};

export const nutritionAPI = async (local, setNutrition) => {
  let measure;
  switch (local.measure) {
    default:
    case "g":
      measure = "http://www.edamam.com/ontologies/edamam.owl#Measure_gram";
      break;
    case "kg":
      measure = "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram";
      break;
    case "mL":
      measure =
        "http://www.edamam.com/ontologies/edamam.owl#Measure_milliliter";
      break;
    case "L":
      measure = "http://www.edamam.com/ontologies/edamam.owl#Measure_liter ";
      break;
    case "tsp":
      measure = "http://www.edamam.com/ontologies/edamam.owl#Measure_teaspoon ";
      break;
    case "tbsp":
      measure =
        "http://www.edamam.com/ontologies/edamam.owl#Measure_tablespoon";
      break;
    case "cups":
      measure = "http://www.edamam.com/ontologies/edamam.owl#Measure_cup";
      break;
  }

  const app_id = "e61e6c91";
  const app_key = "25fbf2bfe68aaeac0f67859971acbee0";
  const link = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${app_id}&app_key=${app_key}`;
  const ingredient = {
    ingredients: [
      {
        quantity: local.quantity,
        measureURI: measure,
        foodId: local.foodId,
      },
    ],
  };

  //     const resp = await fetch(link, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ingredients: [
  //         {
  //           quantity: local.quantity,
  //           measureURI: measure,
  //           foodId: local.foodId,
  //         },
  //       ],
  //     }),
  //   });
  //   console.log(resp);
  const axios = require("axios").default;

  axios
    .post(link, ingredient)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};
