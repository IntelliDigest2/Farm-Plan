import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Form,
	Row,
	Col,
	Accordion,
	Button,
	ListGroup,
	ListGroupItem,
	Table,
} from "react-bootstrap";
import { format } from "date-fns";
import { AddRestuarantSalesModal } from "./AddRestaurantSalesModal";
import { getRestaurantSales } from "./../../../../../store/actions/marketplaceActions/restaurantData";
import FilterComponent from "./../../Farm/Marketplace/filterComponent";

export const RestaurantSalesComponent = (props) => {
	const currentYear = new Date().getFullYear();

	const [filter, setFilter] = useState("Day");

	const [show, setShow] = useState(false);
	const [currentDuration, setcurrentDuration] = useState("Day");

	useEffect(() => {
		setFilter(currentDuration);
	}, [currentDuration, props.salesData]);

	const handleFetchData = (duration, period) => {
		setcurrentDuration(duration);

		props.getSalesData(duration, period);
	};

	const endYear = 2050;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	const generatesalesTable = () => {
		return props.salesData.map((sale, index) => {
			let formattedDate = format(sale.date.toDate(), "MMMM d, yyyy");
			return (
				<tbody>
					<tr key={`${index}`}>
						<td>{formattedDate}</td>
						<td>{sale.saleId}</td>
						<td>{sale.meal}</td>
						<td>{sale.customerInfo.customerName}</td>
						<td>{`${sale.mealCurrency}
						${sale.mealPrice}`}</td>
						<td>
							{sale.quantity}
							{sale.unit}
						</td>
						<td>{sale.medium}</td>
					</tr>
				</tbody>
			);
		});
	};

	let content =
		props.salesData === null ? (
			"...loading"
		) : props.salesData.length > 0 ? (
			<div>
				<h4>Sale for {filter}</h4>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Sale Id number</th>
							<th>Product</th>
							<th>Customer Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Medium</th>
						</tr>
					</thead>
					{generatesalesTable()}
				</Table>
			</div>
		) : (
			<div>You have not made any sales for this period</div>
		);

	return (
		<div>
			<Row style={{ alignItems: "baseline" }}>
				<FilterComponent fetchData={handleFetchData} />
				<Col style={{ display: "flex", alignItems: "center" }} md={2}>
					<AddRestuarantSalesModal show={show} setShow={setShow} />
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

const mapStateToProps = (state) => ({
	salesData: state.restaurant.sales,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getSalesData: (duration, period) =>
			dispatch(getRestaurantSales(duration, period)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestaurantSalesComponent);
