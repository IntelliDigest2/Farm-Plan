import React from "react";

import { PageWrap } from "./../../../../../SubComponents/PageWrap";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import { connect } from "react-redux";
// import TurnOverData from "./TurnOverData";
import ProfitData from "./ProfitData";
// import TurnOverChart from "./TurnOverChart";
import ProfitChart from "./ProfitChart";

function TurnOverPage() {
	const { t } = useTranslation();

	return (
		<div>
			<PageWrap goTo="/account" header={t("description.my_plan_to_save")}>
				{/* <WaveLoader /> */}
				<div>
					<div>Projected Turnover</div>
					<div>Projected Profit</div>
				</div>
				<Tabs
					defaultActiveKey="Turnover Data"
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
					<Tab eventKey="Profit Data" title={"Profit Data"} className="mealtab">
						<ProfitData />
					</Tab>

					<Tab
						eventKey="Profit Chart"
						title={"Profit Chart"}
						className="mealtab"
					>
						<ProfitChart />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TurnOverPage);
