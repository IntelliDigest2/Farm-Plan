//api docs here https://developer.edamam.com/food-database-api-docs
export const ingrBarcodeAPI = async (code, setItem) => {
  const app_id = "e61e6c91";
  const app_key = "25fbf2bfe68aaeac0f67859971acbee0";
  const request = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}app_key=${app_key}&upc=${code}&nutrition-type=cooking`;
  const resp = await fetch(request);
  const data = await resp.json();
  setItem(data);
};
