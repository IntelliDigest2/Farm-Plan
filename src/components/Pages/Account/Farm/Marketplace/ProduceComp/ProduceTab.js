import React, { useState, useEffect } from "react";

import "./ProduceTab.css";
import { PageWrapFarm } from "../../../../../SubComponents/PageWrapFarm";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { ProducePlan } from "./ProducePlan";
import moment from "moment";
import ChartProduce from "../../../Charts/ChartProduce";
import Sales from "./Sales";
import SalesChart from "./SalesChart";

export default function ProduceTab() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1500);
	});

	const [value, setValue] = useState(moment());

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<PageWrapFarm goTo="/account" header="Produce">
			{/* <WaveLoader /> */}
			<Tabs
				defaultActiveKey="calendar"
				id="meal-plan-tabs"
				className="mb-3 mealtabs basic-title"
				fill
			>
				<Tab eventKey="calendar" title="PRODUCE LIST" className="mealtab">
					<ProducePlan value={value} onChange={setValue} />
				</Tab>
				<Tab eventKey="recipes" title="PRODUCE CHART" className="mealtab">
					<ChartProduce />
					<h2>Produce Summary</h2>
				</Tab>
				<Tab eventKey="sales" title="SALES" className="mealtab">
					<Sales />
					<h2>sale Summary</h2>
				</Tab>
				<Tab eventKey="sale chart" title="SALES CHART" className="mealtab">
					<SalesChart />
					<h2>sales chart</h2>
				</Tab>
			</Tabs>

			{/* input available locations for picking up */}
			{/* shopping list */}
		</PageWrapFarm>
	);
}
