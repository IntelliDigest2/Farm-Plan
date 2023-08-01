import React from "react";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
Chart.register(...registerables);

const ChartProduce = () => {
	// Sample data
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
			<Doughnut data={data} />
		</MDBContainer>
	);
};

export default ChartProduce;
