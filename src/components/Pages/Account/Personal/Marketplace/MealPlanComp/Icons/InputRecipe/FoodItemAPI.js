//api docs here https://developer.edamam.com/food-database-api-docs
export const foodItemApi = async (query, setResponse) => {
  const app_id = "e61e6c91";
  const app_key = "25fbf2bfe68aaeac0f67859971acbee0";
  const limit = "10";
  const link = `https://api.edamam.com/auto-complete?app_id=${app_id}&app_key=${app_key}&q=${query}&limit=${limit}`;
  const resp = await fetch(link);
  const data = await resp.json();
  setResponse(data);
};
