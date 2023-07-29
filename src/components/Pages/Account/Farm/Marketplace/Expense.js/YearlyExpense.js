import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

export const YearlyExpense = (props) => {
	const currentDate = new Date();

	let year = format(currentDate, "yyyy");

	return (
		<div>
			Expense for {year}
			{/* <div style={{ width: "80px" }}>
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
			</div> */}
			{/* Data for week
			<ul>{weeklyExpense}</ul> */}
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YearlyExpense);
