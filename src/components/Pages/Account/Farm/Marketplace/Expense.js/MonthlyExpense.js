import React, { useState } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";

export const MonthlyExpense = (props) => {
	const currentDate = new Date();
	let currentMonth = format(currentDate, "MMMM");

	const [month, setMonth] = useState(currentMonth);

	const handleMonthSelection = (e) => {
		console.log(e);
		setMonth(e);
	};

	let weeklyExpenseCost = [1, 2, 3, 4];

	let weeklyExpense = weeklyExpenseCost.map((week, index) => {
		return (
			<li key={`index + ${index}`}>
				Data for week {parseInt(index) + parseInt(1)}
				<div>{week}</div>
			</li>
		);
	});

	return (
		<div>
			<div style={{ width: "80px" }}>
				<Dropdown
					id="month"
					styling="grey dropdown-input"
					data={month}
					// data={local.measure}
					required
					items={[
						"jan",
						"feb",
						"mar",
						"apr",
						"may",
						"jun",
						"jul",
						"aug",
						"sep",
						"oct",
						"nov",
						"dec",
					]}
					function={(e) => handleMonthSelection(e)}
				/>
			</div>
			Data for week
			<ul>{weeklyExpense}</ul>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyExpense);
