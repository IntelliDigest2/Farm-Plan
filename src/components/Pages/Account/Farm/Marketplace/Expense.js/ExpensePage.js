import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { PageWrap } from "./../../../../../SubComponents/PageWrap";
import Expense from "./Expense";
import MonthlyExpense from "./MonthlyExpense";
import WeeklyExpense from "./WeeklyExpense";
import YearlyExpense from "./YearlyExpense";

function ExpensePage() {
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
							<Expense />
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
}

export default ExpensePage;
