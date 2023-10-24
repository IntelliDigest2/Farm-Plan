import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { format, parse } from "date-fns";

import { Table } from "react-bootstrap";
import FilterComponent from "./../../Farm/Marketplace/filterComponent";
import { AddRestExpenseModal } from "./AddRestaurantExpenseModal";
import { getRestaurantExpenseForDuration } from "./../../../../../store/actions/marketplaceActions/restaurantData";

export const RestExpense = (props) => {
	const [filter, setFilter] = useState("Day");

	const [show, setShow] = useState(false);
	const [duration, setduration] = useState(null);

	const handleFetchData = (duration, period) => {
		setduration(duration);
		props.getRestaurantExpenseData(duration, period);
	};

	useEffect(() => {
		setFilter(duration);
	}, [props.expenseData]);

	const generateTable = (_, index) => {
		return props.expenseData.map((data) => {
			return (
				<tbody>
					<tr key={`${index}`}>
						<td>{format(data.sortKey.toDate(), "dd-MM-yyyy")}</td>

						<td>{data.item ? data.item : data.expense_name}</td>

						<td>
							{data.cost
								? data.cost.amount + data.cost.currency
								: data.price + data.currency}
						</td>
						<td>{data.retailer ? data.retailer : data.supplier}</td>
						<td>
							{data.description
								? data.description
								: "this is a purchase/inventory entry"}
						</td>
						<td>{data.medium ? data.medium : "inApp"}</td>
					</tr>
				</tbody>

				// 	// {/* {actualDay.toUpperCase()} */}
			);
		});
	};

	let content;

	if (props.expenseData === null) {
		content = "...loading";
	} else if (props.expenseData.length > 0) {
		content = (
			<div>
				<h4>Expense for {filter}</h4>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Expense</th>
							<th>Cost</th>
							<th>Supplier</th>
							<th>Description</th>
							<th>Medium</th>
						</tr>
					</thead>
					{generateTable()}
				</Table>
			</div>
		);
	} else {
		content = <div>You have not made any expenses for this period</div>;
	}

	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<FilterComponent fetchData={handleFetchData} />

				<Col style={{ display: "flex", alignItems: "center" }} md={2}>
					<AddRestExpenseModal show={show} setShow={setShow} />
				</Col>
			</Row>

			<div>
				<div
					style={{
						margin: "10px auto",
					}}
				>
					{content}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		expenseData: state.restaurant.restaurantExpense,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRestaurantExpenseData: (duration, period) => {
			dispatch(getRestaurantExpenseForDuration(duration, period));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestExpense);
