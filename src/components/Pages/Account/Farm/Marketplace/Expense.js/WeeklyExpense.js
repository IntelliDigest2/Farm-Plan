import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startOfMonth, getWeek, format } from "date-fns";
import {
	Accordion,
	Card,
	Table,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";

export const WeeklyExpense = (props) => {
	const currentDate = new Date();

	const startOfMonthDate = startOfMonth(currentDate);
	// Get the week number for the current date and the start of the month
	const currentWeek = getWeek(currentDate);

	const startOfMonthWeek = getWeek(startOfMonthDate);

	// Calculate the week of the month
	const weekOfMonth = currentWeek - startOfMonthWeek;

	// Format the result
	const formattedResult = `${weekOfMonth}th week of ${format(
		currentDate,
		"MMMM"
	)}`;

	// useEffect(() => {}, [weeklyExpense]);

	let weeklyExpense = {
		monday: {
			Labour: 16000,
			Material: 5000,
			Equipment: 600,
			Energy: 700,
			Water: 200,
			Seed: 500,
			Nutrient: 300,

			"Land lease": 250,

			others: 200,
		},
		Tuesday: {
			Labour: 6000,
			Material: 8000,
			Equipment: 1600,
			Energy: 500,
			Water: 100,
			Seed: 550,
			Nutrient: 300,

			"Land lease": 250,

			others: 200,
		},
	};
	// "Tuesday", "Wednesday", "Thursday", "Friday"

	let days = Object.keys(weeklyExpense);
	console.log(days, `all the days`);

	let expenses = days.map((day, index) => {
		let actualDay = days[index];
		console.log(actualDay, `this is the actual day`);
		return (
			<div>
				{actualDay.toUpperCase()}
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Labour</th>
							<th>Material</th>
							<th>Equipment</th>
							<th>Energy</th>
							<th>Water</th>
							<th>Seed</th>
							<th>Nutrient</th>
							<th>Land lease</th>
							<th>others</th>
						</tr>
					</thead>
					<tbody>
						<tr key={`${index}`}>
							<td>{weeklyExpense[day].Labour}</td>
							<td>{weeklyExpense[day].Material}</td>
							<td>{weeklyExpense[day].Equipment}</td>
							<td>{weeklyExpense[day].Energy}</td>
							<td>{weeklyExpense[day].Water}</td>
							<td>{weeklyExpense[day].Seed}</td>
							<td>{weeklyExpense[day]["Land lease"]}</td>
							<td>{weeklyExpense[day].others}</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	});

	return (
		<div>
			<div>All expense cost for {formattedResult}</div>
			{expenses}
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyExpense);
