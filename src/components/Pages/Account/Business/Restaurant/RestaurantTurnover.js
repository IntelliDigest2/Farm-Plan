import React from "react";

import { Tab, Tabs } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import { connect } from "react-redux";

import { PageWrap } from "./../../../../SubComponents/PageWrap";
import RestaurantProfitDataComponent from "./RestaurantProfitDataComponent";
import { getRestuarantInfoForTurnover } from "./../../../../../store/actions/marketplaceActions/restaurantData";

function RestaurantTurnover(props) {
	const { t } = useTranslation();
	const handleGetProfitData = (period, duration) => {
		props.getTurnoverData(period, duration);
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
					<Tab
						eventKey="Profit/Turnover Data"
						title={"Profit/Turnover  Data"}
						className="mealtab"
					>
						<RestaurantProfitDataComponent
							getProfitData={handleGetProfitData}
							mealProfitData={props.salesData}
						/>
					</Tab>
				</Tabs>

				{/* input available locations for picking up */}
				{/* shopping list */}
			</PageWrap>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		salesData: state.restaurant.turnoverSales,
		menuData: state.restaurant.turnoverProduce,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTurnoverData: (duration, period) =>
			dispatch(getRestuarantInfoForTurnover(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTurnover);
