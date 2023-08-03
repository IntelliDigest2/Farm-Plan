const initState = {
	authError: null,
	produce: null,
	addProduceError: null,
	purchaseInfoFarm: [],
	farmPlan: null,
	farmPlanError: null,
	farmerData: null,
	addProduceLoader: null,
};

const farmReducer = (state = initState, action) => {
	switch (action.type) {
		//#region calendar
		case "GET_FARM_PLAN":
			console.log("farm plan fetched", action.payload);
			return {
				...state,
				farmPlan: action.payload,
			};
		case "GET_FARM_PLAN_ERROR":
			console.log("farm plan error", action.payload);
			return {
				...state,
				farmPlanError: action.payload,
			};
		case "GET_FARMER_DATA":
			console.log("farmer data fetched", action.payload);
			return {
				...state,
				farmPlanError: action.payload,
			};
		case "GET_FARMER_DATA_ERROR":
			console.log("farmer data error", action.payload);
			return {
				...state,
				farmPlanError: action.payload,
			};
		case "CREATE_PRODUCE_ITEM":
			console.log("produce added", action.payload);
			return {
				...state,
				addProduceError: null,
			};
		case "CREATE_PRODUCE_ITEM_ERROR":
			console.log("error, produce not added", action.err);
			return {
				...state,
				addProduceError: "Something went wrong try again",
			};
		case "CREATE_PRODUCE_ITEM_LOADER":
			console.log("error, produce not added", action);
			return {
				...state,
				addProduceLoader: action.payload,
			};

		case "GET_PRODUCE_ITEM":
			console.log("get produce items success", action.payload);
			return {
				...state,
				produce: action.payload,
				authError: null,
			};
		case "GET_PRODUCE_ITEM_ERROR":
			console.log("error, couldn't fetch produce items", action.err);
			return {
				...state,
				authError: "Get produce items failed",
			};
		case "EDIT_PRODUCE":
			console.log("successfully edited", action.produce);
			return {
				...state,
				authError: null,
			};
		case "EDIT_PRODUCE_ERROR":
			console.log("error, couldn't edit produce", action.err);
			return {
				...state,
				authError: "Edit produce failed",
			};
		case "GET_PURCHASE_INFO_FARM":
			console.log("sent to user", action.payload);
			return {
				...state,
				purchaseInfoFarm: action.payload,
				authError: null,
			};
		case "GET_PURCHASE_INFO_FARM_ERROR":
			console.log("error, couldn't get purchase info", action.err);
			return {
				...state,
				authError: "fetch purchase info failed",
			};

		case "DELETE_PRODUCE":
			console.log("successfully deleted item");
			return {
				...state,
				authError: null,
			};
		case "DELETE_PRODUCE_ERROR":
			console.log("error, couldn't delete item", action.err);
			return {
				...state,
				authError: "delete item failed",
			};
		//#endregion
		default:
			return state;
	}
};

export default farmReducer;
