import React from "react";

import { Tab, Tabs } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import { connect } from "react-redux";
// import TurnOverData from "./TurnOverData";
// import ProfitData from "./ProfitData";
// import TurnOverChart from "./TurnOverChart";
// import ProfitChart from "./ProfitChart";
import { PageWrap } from "./../../../../SubComponents/PageWrap";
import RestaurantProfitDataComponent from "./RestaurantProfitDataComponent";
import { getRestuarantInfoForTurnover } from "./../../../../../store/actions/marketplaceActions/restaurantData";

function RestaurantTurnover(props) {
	const { t } = useTranslation();
	const handleGetProfitData = (period, duration) => {
		props.getTurnoverData(period, duration);
		console.log(`this is the filter that was passed`, period, duration);
	};

	return (
		<div>
			<PageWrap goTo="/account" header={t("description.my_plan_to_save")}>
				{/* <WaveLoader /> */}

				<Tabs
					defaultActiveKey="Profit/Turnover Data"
					id="meal-plan-tabs"
					className="mb-3 mealtabs basic-title"
					fill
				>
					{/* <Tab
						eventKey="Turnover Data "
						// title={t("description.meal_diary")}
						title={"Turnover Data "}
						className="mealtab"
					>
						<YieldData />
					</Tab> */}
					<Tab
						eventKey="Profit/Turnover Data"
						title={"Profit/Turnover  Data"}
						className="mealtab"
					>
						<RestaurantProfitDataComponent
							getProfitData={handleGetProfitData}
							mealProfitData={[
								{ meal: "amala", menuSection: "Any", quantity: 5 },
								{ meal: "garri", menuSection: "Lunch", quantity: 5 },
								{ meal: "garri", menuSection: "Lunch", quantity: 3 },
								{ meal: "rice", menuSection: "Breakfast", quantity: 5 },
								{ meal: "poundo", menuSection: "Breakfast", quantity: 5 },
								{ meal: "poundo", menuSection: "Dinner", quantity: 5 },
								{ meal: "poundo", menuSection: "Any", quantity: 5 },
							]}
						/>
					</Tab>

					<Tab
						eventKey="Profit/Turnover  Chart"
						title={"Profit/Turnover  Chart"}
						className="mealtab"
					>
						{/* <ProfitChart /> */}
					</Tab>
					{/* <Tab
						eventKey="TurnOver Chart"
						// title={t("description.meal_planner")}
						title={"TurnOver Chart"}
						className="mealtab"
					> */}
					{/* <CalendarPlan value={value} onChange={setValue} /> */}
					{/* <YieldChart /> */}
					{/* </Tab> */}
				</Tabs>

				{/* input available locations for picking up */}
				{/* shopping list */}
			</PageWrap>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		// produceData: state.farmData.produceForProfit,
		// profitDataLoader: state.farmData.produceForProfitLoader,
		// profitDataError: state.farmData.produceForProfitError,
		// salesData: state.farmData.salesInfoForProfit,
		// salesDataLoader: state.farmData.salesForProfitLoader,
		// salesDataError: state.farmData.salesForProfitError,
		// profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTurnoverData: (duration, period) =>
			dispatch(getRestuarantInfoForTurnover(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTurnover);
