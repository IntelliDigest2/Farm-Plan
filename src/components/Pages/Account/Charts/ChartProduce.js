import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { format } from "date-fns";
import { Dropdown } from "./../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { getFarmProductsForDuration } from "./../../../../store/actions/marketplaceActions/farmPlanData";

Chart.register(...registerables);

const ChartProduce = (props) => {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM");
	const [day, setDay] = useState(new Date());
	const [filter, setFilter] = useState("day");
	const [month, setMonth] = useState(currentMonth);
	const [week, setWeek] = useState("1");
	const [year, setYear] = useState(currentYear);
	// Sample data

	useEffect(() => {
		props.getData(filter);
	}, [filter]);

	const endYear = 2050;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	let componentToRender =
		filter === "Week" ? (
			<>
				<Dropdown
					id="week"
					styling="grey dropdown-input"
					data={week}
					// data={local.measure}
					required
					items={["1", "2", "3", "4"]}
					function={(e) => setWeek(e)}
				/>
				<span style={{ marginLeft: "5px" }}> of {currentMonth}</span>
			</>
		) : filter === "Month" ? (
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
		) : filter === "Year" ? (
			<Dropdown
				id="year"
				styling="grey dropdown-input"
				data={year}
				// data={local.measure}
				required
				items={years}
				function={(e) => setYear(e)}
			/>
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
	const data = {
		labels: ["Horticulture", "Aquaculture", "Livestock"],
		datasets: [
			{
				label: "Produce Summary",
				data: [2, 5, 6],
				backgroundColor: ["blue", "green", "orange"],
			},
		],
	};

	return (
		<MDBContainer>
			<Row style={{ alignItems: "center" }}>
				<Col md={2}>Filter by</Col>
				<Col md={4}>
					<Dropdown
						// id="nutrientUnit"
						styling="grey dropdown-input"
						data={filter}
						// data={local.measure}
						required
						items={["Day", "Week", "Month", "Year"]}
						function={(e) => setFilter(e)}
					/>
				</Col>
				<Col style={{ display: "flex", alignItems: "center" }} md={4}>
					{componentToRender}
				</Col>
			</Row>
			<Doughnut data={data} />
		</MDBContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produce,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration) => {
			dispatch(getFarmProductsForDuration(duration));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartProduce);
