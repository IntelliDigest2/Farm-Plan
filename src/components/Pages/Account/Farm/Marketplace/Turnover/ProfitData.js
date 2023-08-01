import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
export const ProfitData = (props) => {
	const currentDate = new Date();

	const currentMonth = format(currentDate, "MMMM");
	const [day, setDay] = useState(new Date());
	const [filter, setFilter] = useState("day");
	const [month, setMonth] = useState("jan");
	const [week, setWeek] = useState("1");
	const { farmCycle, setFarmCycle } = useState("1");

	filter === "Month" ? (
		<Dropdown
			id="month"
			styling="grey dropdown-input"
			data={month}
			// data={local.measure}
			required
			items={[
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			]}
			function={(e) => setMonth(e)}
		/>
	) : filter === "Farm Cycle" ? (
		<>
			<Dropdown
				id="farmCycle"
				styling="grey dropdown-input"
				data={farmCycle}
				// data={local.measure}
				required
				items={farmCycle}
				function={(e) => setFarmCycle(e)}
			/>
			months
		</>
	) : (
		<div style={{ display: "flex" }}>
			<span>pick date</span>
			<span>
				<DatePicker
					selected={day}
					onChange={(date) => setDay(date)}
					// dateFormat="dd/m/yyyy"
				/>
			</span>
		</div>
	);
	return <div>ProfitData</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitData);
