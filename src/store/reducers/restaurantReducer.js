const initState = {
    authError: null,
    res: [],
    orderRes: [],
    savedMenus: [],
    plans: [],
    newPlans: [],
    newShoppingList: [],
    shoppingList: [],
    inventory: []
  };

  const restaurantReducer = (state = initState, action) => {
    switch (action.type) {
      //#region calendar
      case "GET_RESTAURANT":
        console.log("restaurant data", action.payload);
        return {
            ...state,
            res: action.payload,
            authError: null,
          };
      case "GET_RESTAURANT_ERROR":
        console.log("error, restaurant data not fetched", action.err);
        return {
          ...state,
          authError: "get restaurant failed",
        };

        case "GET_ORDER_INFO_RES":
        console.log("restaurant order data", action.payload);
        return {
            ...state,
            orderRes: action.payload,
            authError: null,
          };
      case "GET_ORDER_INFO_RES_ERROR":
        console.log("error, restaurant order data not fetched", action.err);
        return {
          ...state,
          authError: "get restaurant orders failed",
        };

        case "SEND_TO_RESTAURANT":
        console.log("sent to restaurant");
        return {
          ...state,
          authError: null,
        };
      case "SEND_TO_RESTAURANT_ERROR":
        console.log("error, couldn't send to restaurant", action.err);
        return {
          ...state,
          authError: "send to restaurant failed",
        };

        case "SEND_ORDER_TO_USER":
        console.log("sent order to user");
        return {
          ...state,
          authError: null,
        };
      case "SEND_ORDER_TO_USER_ERROR":
        console.log("error, couldn't send order to user", action.err);
        return {
          ...state,
          authError: "send order to user failed",
        };

        case "EDIT_MENU_STATUS":
          console.log("status updated", action.payload);
          return {
            ...state,
            authError: null,
          };
        case "EDIT_MENU_STATUS_ERROR":
          console.log("error, couldn't update status", action.err);
          return {
            ...state,
            authError: "update status failed",
          };
          case "CREATE_MEAL_PLAN_RES":
            console.log("meal planner for restaurant created", action.mealPlanner);
            return {
              ...state,
              authError: null, 
            };
          case "CREATE_MEAL_PLANNER_RES_ERROR":
            console.log("error, meal plan for restaurant not created", action.err);
            return {
              ...state,
              authError: "Create meal for restaurant failed",
            };
            case "GET_MEAL_PLANS_RES":
              console.log("get meals plans for restaurant success", action.payload);
              return {
                ...state,
                plans: action.payload,
                authError: null,
              };
            case "GET_MEAL_PLANS_RES_ERROR":
              console.log("error, couldn't fetch meals for restaurant", action.err);
              return {
                ...state,
                authError: "Get meals for restaurant failed",
              };

              case "CREATE_NEW_SHOP_RES":
              console.log("added to shop for restaurant", action.ingr);
              return {
                ...state,
                authError: null,
              };
            case "CREATE_NEW_SHOP_RES_ERROR":
              console.log("error, couldn't add to shopping list for restaurant", action.err);
              return {
                ...state,
                authError: "Add to shop failed",
              };

              case "GET_NEW_PLANS_RES":
              console.log("get meal new plan success", action.payload);
              return {
                ...state,
                newPlans: action.payload,
                authError: null,
              };
            case "GET_NEW_PLANS_RES_ERROR":
              console.log("error, couldn't fetch new plan", action.err);
              return {
                ...state,
                authError: "Get meals failed",
              };

              case "GET_NEW_SHOPPING_LIST_RES":
                console.log("get shopping list success", action.payload);
                return {
                  ...state,
                  newShoppingList: action.payload,
                  authError: null,
                };
              case "GET_NEW_SHOPPING_LIST_RES_ERROR":
                console.log("error, couldn't get shopping list", action.err);
                return {
                  ...state,
                  authError: "Get shoppiung list failed",
                };
                case "CREATE_INVENTORY_ITEM_RES":
                console.log("inventory item created", action.mealPlan);
                return {
                  ...state,
                  authError: null,
                };
              case "CREATE_INVENTORY_ITEM_RES_ERROR":
                console.log("error, inventory item not created", action.err);
                return {
                  ...state,
                  authError: "Create inventory item failed",
                };
                case "DELETE_NEW_SHOP_RES":
                  console.log("successfully deleted item");
                  return {
                    ...state,
                    authError: null,
                  };
                case "DELETE_NEW_SHOP_RES_ERROR":
                  console.log("error, couldn't delete item", action.err);
                  return {
                    ...state,
                    authError: "delete item failed",
                  };

                  case "GET_INVENTORY_RES":
                  console.log("get inventory success", action.payload);
                  return {
                    ...state,
                    inventory: action.payload,
                    authError: null,
                  };
                case "GET_INVENTORY_RES_ERROR":
                  console.log("error, couldn't fetch inventory", action.err);
                  return {
                    ...state,
                    authError: "Get inventory failed",
                  };

                  case "CREATE_SHOP_RES":
                  console.log("added to shop", action.ingr);
                  return {
                    ...state,
                    authError: null,
                  };
                case "CREATE_SHOP_RES_ERROR":
                  console.log("error, couldn't add to shopping list", action.err);
                  return {
                    ...state,
                    authError: "Add to shop failed",
                  };
                  case "GET_SHOPPING_LIST_RES":
                  console.log("get user added shopping list success", action.payload);
                  return {
                    ...state,
                    shoppingList: action.payload,
                    authError: null,
                  };
                case "GET_SHOPPING_LIST_RES_ERROR":
                  console.log("error, couldn't get user added shopping list", action.err);
                  return {
                    ...state,
                    authError: "Get user added shopping list failed",
                  };
                case "ADD_PURCHASE_ITEM_RES":
                  console.log("added to purchases for restaurant", action.data);
                  return {
                    ...state,
                    authError: null,
                  };
                case "ADD_PURCHASE_ITEM_RES_ERROR":
                  console.log("error, couldn't add to purchase list for restaurant", action.err);
                  return {
                    ...state,
                    authError: "Add to purchase for restaurant failed",
                  };
      
      //#endregion

       //#region recipes
    case "CREATE_MENUS":
      console.log("menu saved", action.menu);
      return { 
        ...state,
        authError: null,
      };
    case "CREATE_MENUS_ERROR":
      console.log("error, menu not saved", action.err);
      return {
        ...state,
        authError: "Create recipe failed",
      };
    case "GET_MENUS":
      console.log("get menus success", action.payload);
      return {
        ...state,
        savedMenus: action.payload,
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


      default:
        return state;
    }
  };
  
  export default restaurantReducer;
  