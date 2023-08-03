import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
Chart.register(...registerables);

export const SalesChart = (props) => {
	useEffect(() => {}, []);

	const data = {
		labels: ["Horticulture", "Aquaculture", "Livestock"],
		datasets: [
			{
				label: "Produce Summary",
				data: [[10, 20, 30], 5, 6],
				backgroundColor: ["blue", "green", "orange"],
			},
		],
	};

	return (
		<MDBContainer>
			<Doughnut data={data} />
		</MDBContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produce,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SalesChart);
