//api docs here https://developer.edamam.com/edamam-docs-recipe-api#/
export const recipeSearch = async (
  query,
  mealType,
  cuisineType,
  setRecipes,
  setLinks,
  addPageToArray
) => {
  const app_id = "5532003c";
  const app_key = "511d39184173c54ebc5d02a5063a7b87";
  const link = `https://api.edamam.com/api/recipes/v2?app_id=${app_id}&app_key=${app_key}&type=public&q=${query}${mealType}${cuisineType}`;
  const resp = await fetch(link);
  const data = await resp.json();
  setRecipes(data.hits);
  setLinks(data._links);
  addPageToArray(link);
  console.log("This is your data", data);
  // console.log("links", data._links);
};

export const nextPage = async (page, setLinks, setRecipes) => {
  const resp = await fetch(`${page}`);
  const data = await resp.json();
  setRecipes(data.hits);
  setLinks(data._links);
  console.log("This is your data", data);
};
