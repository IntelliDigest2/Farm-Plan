//api docs here https://developer.edamam.com/edamam-docs-recipe-api#/
export const recipeSearch = async (query, setRecipes) => {
  const app_id = "5532003c";
  const app_key = "511d39184173c54ebc5d02a5063a7b87";
  const resp = await fetch(
    `https://api.edamam.com/api/recipes/v2?app_id=${app_id}&app_key=${app_key}&type=public&q=${query}`
  );
  const data = await resp.json();
  setRecipes(data.hits);
  //   console.log("This is your data", data);
};
