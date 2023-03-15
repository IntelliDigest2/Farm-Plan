const initState = {
  authError: null,
  meals: [],
  mealDiary: [],
  singleMealDiary: [],
  savedMeals: [],
  shoppingList: [],
  newShoppingList: [],
  inventory: [],
  giftedFood: [], 
  purchaseInfo: [],
};

const mealPlanReducer = (state = initState, action) => {
  switch (action.type) {
    //#region calendar
    case "CREATE_MEAL":
      console.log("meal created", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_MEAL_ERROR":
      console.log("error, meal not created", action.err);
      return {
        ...state,
        authError: "Create meal failed",
      };
    case "GET_MEALS":
      console.log("get meals success", action.payload);
      return {
        ...state,
        meals: action.payload,
        authError: null,
      };
    case "GET_MEALS_ERROR":
      console.log("error, couldn't fetch meals", action.err);
      return {
        ...state,
        authError: "Get meals failed",
      };
      case "GET_MEAL_DIARY":
        console.log("get meal diary success", action.payload);
        return {
          ...state,
          mealDiary: action.payload,
          authError: null,
        };
      case "GET_MEAL_DIARY_ERROR":
        console.log("error, couldn't fetch diary meals", action.err);
        return {
          ...state,
          authError: "Get meal diary failed",
        };

        case "GET_SINGLE_MEAL_DIARY":
        console.log("get single meal diary success", action.payload);
        return {
          ...state,
          singleMealDiary: action.payload,
          authError: null,
        };
      case "GET_SINGLE_MEAL_DIARY_ERROR":
        console.log("error, couldn't fetch single diary meals", action.err);
        return {
          ...state,
          authError: "Get single meal diary failed",
        };
        
    case "EDIT_MEAL":
      console.log("successfully edited", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_MEAL_ERROR":
      console.log("error, couldn't edit meal", action.err);
      return {
        ...state,
        authError: "Edit meal failed",
      };
      case "EDIT_DIARY_MEAL":
      console.log("successfully edited diary meal", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_DIARY_MEAL_ERROR":
      console.log("error, couldn't edit diary meal", action.err);
      return {
        ...state,
        authError: "Edit diary meal failed",
      };
    case "DELETE_MEAL":
      console.log("successfully deleted", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "DELETE_MEAL_ERROR":
      console.log("error, couldn't delete meal", action.err);
      return {
        ...state,
        authError: "delete meal failed",
      };
      
    // #endregion

    //#region recipes
    case "CREATE_RECIPE":
      console.log("recipe saved", action.recipe);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_RECIPE_ERROR":
      console.log("error, recipe not saved", action.err);
      return {
        ...state,
        authError: "Create recipe failed",
      };
    case "GET_RECIPES":
      console.log("get meals success", action.payload);
      return {
        ...state,
        savedMeals: action.payload,
        authError: null,
      };
    case "GET_RECIPES_ERROR":
      console.log("error, couldn't fetch recipes", action.err);
      return {
        ...state,
        authError: "Get recipe failed",
      };
    case "DELETE_RECIPE":
      console.log("successfully deleted", action.recipe);
      return {
        ...state,
        authError: null,
      };
    case "DELETE_RECIPE_ERROR":
      console.log("error, couldn't delete meal", action.err);
      return {
        ...state,
        authError: "delete recipe failed",
      };
    //#endregion

    //#region shopping list
    case "GET_SHOPPING_LIST":
      console.log("get shopping list success", action.payload);
      return {
        ...state,
        shoppingList: action.payload,
        authError: null,
      };
    case "GET_SHOPPING_LIST_ERROR":
      console.log("error, couldn't get shopping list", action.err);
      return {
        ...state,
        authError: "Get shoppiung list failed",
      };
      case "GET_NEW_SHOPPING_LIST":
      console.log("get shopping list success", action.payload);
      return {
        ...state,
        newShoppingList: action.payload,
        authError: null,
      };
    case "GET_NEW_SHOPPING_LIST_ERROR":
      console.log("error, couldn't get shopping list", action.err);
      return {
        ...state,
        authError: "Get shoppiung list failed",
      };
    case "CREATE_SHOP":
      console.log("added to shop", action.ingr);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_SHOP_ERROR":
      console.log("error, couldn't add to shopping list", action.err);
      return {
        ...state,
        authError: "Add to shop failed",
      };
      case "CREATE_NEW_SHOP":
      console.log("added to shop", action.ingr);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_NEW_SHOP_ERROR":
      console.log("error, couldn't add to shopping list", action.err);
      return {
        ...state,
        authError: "Add to shop failed",
      };

      case "ADD_PURCHASE_ITEM":
      console.log("added to purchases", action.data);
      return {
        ...state,
        authError: null,
      };
    case "ADD_PURCHASE_ITEM_ERROR":
      console.log("error, couldn't add to purchase list", action.err);
      return {
        ...state,
        authError: "Add to purchase failed",
      };

      case "SEND_TO_USER":
        // console.log("sent to user", action.data);
        return {
          ...state,
          authError: null,
        };
      case "SEND_TO_USER_ERROR":
        console.log("error, couldn't send to user collection", action.err);
        return {
          ...state,
          authError: "send to user failed",
        };

        case "GET_PURCHASE_INFO":
          console.log("sent to user", action.payload);
          return {
            ...state,
            purchaseInfo: action.payload,
            authError: null,
          };
        case "GET_PURCHASE_INFO_ERROR":
          console.log("error, couldn't get purchase info", action.err);
          return {
            ...state,
            authError: "fetch purchase info failed",
          };
  

      case "CREATE_SHOP_ITEMS":
      console.log("added to shop", action.ingr);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_SHOP_ITEMS_ERROR":
      console.log("error, couldn't add to shopping list", action.err);
      return {
        ...state,
        authError: "Add to shop failed",
      };
      case "EDIT_SHOPPING_LIST":
        console.log("succesfully editted shoping list", action.payload);
        return {
          ...state,
          authError: null,
        };
      case "EDIT_SHOPPING_LIST_ERROR":
        console.log("error, couldn't edit shopping list", action.err);
        return {
          ...state,
          authError: "Add to shop failed",
        };

        case "EDIT_PURCHASE_STATUS":
        console.log("succesfully editted status", action.payload);
        return {
          ...state,
          authError: null,
        };
      case "EDIT_PURCHASE_STATUS_ERROR":
        console.log("error, couldn't edit status", action.err);
        return {
          ...state,
          authError: "edit status failed",
        };

    case "DELETE_SHOP":
      console.log("successfully deleted item");
      return {
        ...state,
        authError: null,
      };
    case "DELETE_SHOP_ERROR":
      console.log("error, couldn't delete item", action.err);
      return {
        ...state,
        authError: "delete item failed",
      };
      case "DELETE_NEW_SHOP":
      console.log("successfully deleted item");
      return {
        ...state,
        authError: null,
      };
    case "DELETE_NEW_SHOP_ERROR":
      console.log("error, couldn't delete item", action.err);
      return {
        ...state,
        authError: "delete item failed",
      };
    //#endregion



    //#region Restaurant shopping list
    case "GET_RESTAURANT_SHOPPING_LIST":
      console.log("get shopping list success", action.payload);
      return {
        ...state,
        shoppingList: action.payload,
        authError: null,
      };
    case "GET_RESTAURANT_SHOPPING_LIST_ERROR":
      console.log("error, couldn't get shopping list", action.err);
      return {
        ...state,
        authError: "Get shoppiung list failed",
      };
    case "CREATE_RESTAURANT_SHOP":
      console.log("added to shop", action.ingr);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_RESTAURANT_SHOP_ERROR":
      console.log("error, couldn't add to shopping list", action.err);
      return {
        ...state,
        authError: "Add to shop failed",
      };
    case "DELETE_RESTAURANT_SHOP":
      console.log("successfully deleted item");
      return {
        ...state,
        authError: null,
      };
    case "DELETE_RESTAURANT_SHOP_ERROR":
      console.log("error, couldn't delete item", action.err);
      return {
        ...state,
        authError: "delete item failed",
      };
    //#endregion

    
    //#region inventory
    case "GET_INVENTORY":
      console.log("get inventory success", action.payload);
      return {
        ...state,
        inventory: action.payload,
        authError: null,
      };
    case "GET_INVENTORY_ERROR":
      console.log("error, couldn't fetch inventory", action.err);
      return {
        ...state,
        authError: "Get inventory failed",
      };
    case "CREATE_INVENTORY_ITEM":
      console.log("inventory item created", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_INVENTORY_ITEM_ERROR":
      console.log("error, inventory item not created", action.err);
      return {
        ...state,
        authError: "Create inventory item failed",
      };
      case "CREATE_GIFT_ITEM":
      console.log("gifted item created", action.data);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_GIFT_ITEM_ERROR":
      console.log("error, gifted item not created", action.err);
      return {
        ...state,
        authError: "Create inventory item failed",
      };
      case "CREATE_WASTE_ITEM":
        console.log("waste item added", action.data);
        return {
          ...state,
          authError: null,
        };
      case "CREATE_WASTE_ITEM_ERROR":
        console.log("error, waste item not created", action.err);
        return {
          ...state,
          authError: "Create inventory item failed",
        };
    case "DELETE_INVENTORY_ITEM":
      console.log("successfully deleted", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "DELETE_INVENTORY_ITEM_ERROR":
      console.log("error, couldn't delete inventory item", action.err);
      return {
        ...state,
        authError: "Edit inventory item failed",
      };
      case "EDIT_INVENTORY":
      console.log("edit inventory success", action.payload);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_INVENTORY_ERROR":
      console.log("error, couldn't edit inventory", action.err);
      return {
        ...state,
        authError: "Get inventory failed",
      };
    //#endregion
    default:
      return state;
  }
};

export default mealPlanReducer;
