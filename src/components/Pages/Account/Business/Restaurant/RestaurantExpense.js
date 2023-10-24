import React from "react";
import { connect } from "react-redux";
import { PageWrap } from "./../../../../SubComponents/PageWrap";
import { Tab, Tabs } from "react-bootstrap";
import RestExpense from "./RestExpense";

export const RestaurantExpense = (props) => {
	return (
		<div>
			<div>
				<PageWrap goTo="/account" header={"Expense Page"}>
					{/* <WaveLoader /> */}

					<Tabs
						defaultActiveKey="Expense"
						id="meal-plan-tabs"
						className="mb-3 mealtabs basic-title"
						fill
					>
						<Tab
							eventKey="Expense"
							// title={t("description.meal_diary")}
							title={"Expense"}
							className="mealtab"
						>
							<RestExpense />
						</Tab>
						{/* <Tab
							eventKey="Weekly"
							// title={t("description.meal_diary")}
							title={"Weekly"}
							className="mealtab"
						>
							<WeeklyExpense />
						</Tab>
						<Tab eventKey="Monthly" title={"Monthly"} className="mealtab">
							<MonthlyExpense />
						</Tab>

						<Tab eventKey="Yearly" title={"Yearly"} className="mealtab">
							<YearlyExpense />
						</Tab> */}
					</Tabs>

					{/* input available locations for picking up */}
					{/* shopping list */}
				</PageWrap>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantExpense);
