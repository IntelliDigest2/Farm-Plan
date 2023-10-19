const initState = {
	authError: null,
	produce: null,
	// addProduceError: null,
	purchaseInfoFarm: [],
	farmPlan: null,
	farmPlanError: null,
	farmerData: null,
	// addProduceLoader: null,
	produceForChart: null,
	produceForChartLoader: false,
	produceForChartError: null,
	produceForProfit: null,
	produceForProfitLoader: false,
	produceForProfitError: null,
	salesInfoForProfit: null,
	salesForProfitError: false,
	salesForProfitLoader: false,
	salesInfo: null,
	salesInfoError: false,
	salesInfoLoader: false,
	salesChartInfo: null,
	salesChartInfoError: false,
	salesChartInfoLoader: false,
	salesInfoForProfitchart: null,
	salesForProfitchartError: false,
	salesForProfitchartLoader: false,
	produceInfoForProfitchart: null,
	produceForProfitchartError: false,
	produceForProfitchartLoader: false,
	expenseInfo: null,
	expenseError: false,
	expenseLoader: false,
	purcaseAdminMessages: null,
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
		// case "CREATE_PRODUCE_ITEM":
		// 	console.log("produce added", action.payload);
		// 	return {
		// 		...state,
		// 		addProduceError: null,
		// 	};
		// case "CREATE_PRODUCE_ITEM_ERROR":
		// 	console.log("error, produce not added", action.err);
		// 	return {
		// 		...state,
		// 		addProduceError: "Something went wrong try again",
		// 	};
		// case "CREATE_PRODUCE_ITEM_LOADER":
		// console.log("error, produce not added", action);
		// return {
		// 	...state,
		// 	addProduceLoader: action.payload,
		// };
		case "FETCH_PRODUCE_FOR_CHART_SUCCESS":
			// console.log("produce chart success ", action.payload);
			return {
				...state,
				produceForChart: action.payload,
				produceForChartError: null,
				produceForChartLoader: false,
			};
		case "FETCH_PRODUCE_FOR_CHART_ERROR":
			return {
				...state,
				produceForChartError: action.payload,
				produceForChartLoader: false,
			};
		case "FETCH_SALES_SUCCESS":
			console.log("sale fetch success ", action.payload);
			return {
				...state,
				salesInfo: action.payload,
				salesInfoError: false,
				salesInfoLoader: false,
			};
		case "FETCH_SALES_ERROR":
			return {
				...state,
				salesInfoError: action.payload,
				salesInfoLoader: false,
			};
		case "FETCH_SALES_LOADER":
			// console.log("error, produce not added", action.err);
			return {
				...state,

				salesLoader: true,
			};
		case "FETCH_SALESCHART_SUCCESS":
			// console.log("sale fetch success ", action.payload);
			return {
				...state,
				salesChartInfo: action.payload,
				salesChartInfoError: false,
				salesChartInfoLoader: false,
			};
		case "FETCH_SALESCHART_ERROR":
			return {
				...state,
				salesChartInfoError: action.payload,
				salesChartInfoLoader: false,
			};
		case "FETCH_SALESCHART_LOADER":
			// console.log("error, produce not added", action.err);
			return {
				...state,

				salesChartInfoLoader: true,
			};
		case "FETCH_EXPENSE_SUCCESS":
			// console.log("sale fetch success ", action.payload);
			return {
				...state,
				expenseInfo: action.payload,
				expenseError: false,
				expenseLoader: false,
			};
		case "FETCH_EXPENSE_ERROR":
			return {
				...state,
				expenseError: action.payload,
				expenseLoader: false,
			};
		case "FETCH_EXPENSE_LOADER":
			// console.log("error, produce not added", action.err);
			return {
				...state,

				expenseLoader: true,
			};

		// console.log("error, produce not added", action.err);
		// return {
		// 	...state,

		// 	addExpenseLoader: true,
		// };

		// // console.log("error, produce not added", action.err);
		// return {
		// 	...state,

		// 	addSaleLoader: true,
		// };
		case "FETCH_PRODUCE_FOR_SALESCHART_SUCCESS":
			// console.log("produce chart success ", action.payload);
			return {
				...state,
				produceForSales: action.payload,
				produceForSalesError: null,
				produceForSalesLoader: false,
			};
		case "FETCH_PRODUCE_FOR_SALESCHART_ERROR":
			return {
				...state,
				produceForSalesError: action.payload,
				produceForSalesLoader: false,
			};
		case "FETCH_PRODUCE_FOR_SALESCHART_LOADER":
			// console.log("error, produce not added", action.err);
			return {
				...state,

				produceForSalesLoader: true,
			};

		case "FETCH_PRODUCE_FOR_PROFIT_SUCCESS":
			// console.log("produce chart success ", action.payload);
			return {
				...state,
				produceForProfit: action.payload,
				produceForProfitError: null,
				produceForProfitLoader: false,
			};
		case "FETCH_PRODUCE_FOR_PROFIT_ERROR":
			// console.log("error, produce not added", action.err);
			return {
				...state,
				produceForProfitError: action.payload,
				produceForProfitLoader: false,
			};
		case "FETCH_PRODUCE_FOR_PROFIT_LOADER":
			// console.log("error, produce chart loading", action);
			return {
				...state,
				produceForProfitLoader: true,
			};
		case "FETCH_SALES_FOR_PROFIT_SUCCESS":
			// console.log("produce chart success ", action.payload);
			return {
				...state,
				salesInfoForProfit: action.payload,
				salesForProfitError: null,
				salesForProfitLoader: false,
			};
		case "FETCH_SALES_FOR_PROFIT_ERROR":
			// console.log("error, produce not added", action.err);
			return {
				...state,
				salesForProfitError: action.payload,
				salesForProfitLoader: false,
			};

		case "FETCH_PRODUCE_FOR_PROFITCHART_LOADER":
			// console.log("error, produce chart loading", action);
			return {
				...state,
				produceForProfitchartLoader: true,
			};

		case "FETCH_PRODUCE_FOR_PROFITCHART_SUCCESS":
			// console.log("produce chart success ", action.payload);
			return {
				...state,
				produceInfoForProfitchart: action.payload,
				produceForProfitchartError: null,
				produceForProfitchartLoader: false,
			};
		case "FETCH_PRODUCE_FOR_PROFITCHART_ERROR":
			// console.log("error, produce not added", action.err);
			return {
				...state,
				produceForProfitError: action.payload,
				produceForProfitchartLoader: false,
			};
		case "FETCH_SALES_FOR_PROFITCHART_LOADER":
			// console.log("error, produce chart loading", action);
			return {
				...state,
				salesForProfitchartLoader: true,
			};
		case "FETCH_SALES_FOR_PROFITCHART_SUCCESS":
			// console.log("produce chart success ", action.payload);
			return {
				...state,
				salesInfoForProfitchart: action.payload,
				salesForProfitchartError: null,
				salesForProfitchartLoader: false,
			};
		case "FETCH_SALES_FOR_PROFITCHART_ERROR":
			// console.log("error, produce not added", action.err);
			return {
				...state,
				salesForProfitError: action.payload,
				salesForProfitchartLoader: false,
			};
		// case "FETCH_SALES_FOR_PROFITCHART_LOADER":
		// 	// console.log("error, produce chart loading", action);
		// 	return {
		// 		...state,
		// 		salesForProfitchartLoader: true,
		// 	};

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
		case "GET_PURCHASEADMIN_MESSAGES_SUCCESS":
			console.log("get produce items success", action.payload);
			return {
				...state,
				purcaseAdminMessages: action.payload,
			};
		case "GET_PURCHASEADMIN_MESSAGES__ERROR":
			console.log("error, couldn't fetch produce items", action.err);
			return {
				...state,
				purcaseAdminMessagesError: "Get produce items failed",
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
