import React, { useState, useEffect } from "react";

import { Form, Row, Col, Accordion, Button } from "react-bootstrap";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import YearFilterComponent from "./../Suppliers/yearFilterComponent";

export const RestaurantProfitDataComponent = (props) => {
	let mealQuantity;

	let mealTypesSet = new Set();

	let mealTypeObjects = {};

	props.mealProfitData?.forEach((meal) => {
		mealTypesSet.add(meal.menuSection);

		if (!mealTypeObjects[meal.menuSection]) {
			mealTypeObjects[meal.menuSection] = {};
			mealTypeObjects[meal.menuSection].meals = [];
		}
		mealTypeObjects[meal.menuSection].meals.push(meal);
	});

	//

	const listItems = (key) => {
		let productTypes = mealTypeObjects[key];
		let salesForKey = props.mealProfitData?.filter((meal) => {
			return key === meal.menuSection;
		});

		const resultMap = new Map();
		const turnOverMap = new Map();

		productTypes.meals.forEach((item) => {
			if (resultMap.has(item.meal)) {
				let newQuantity =
					parseInt(resultMap.get(item.meal).quantity) + parseInt(item.quantity);

				resultMap.get(item.meal).quantity = `${newQuantity}`;
			} else {
				resultMap.set(item.meal, { ...item });
			}
		});

		salesForKey?.forEach((product) => {
			if (turnOverMap.has(product.meal)) {
				let totalSale =
					parseInt(product.quantity) * parseInt(product.mealPrice);
				let newTurnOver =
					parseInt(turnOverMap.get(product.meal).turnover) +
					parseInt(totalSale);

				turnOverMap.get(product.meal).turnover = `${newTurnOver}`;
			} else {
				turnOverMap.set(product.meal, {
					turnover: parseInt(product.mealPrice) * parseInt(product.quantity),
					meal: product.meal,
				});
			}
		});

		let resultArray = Array.from(resultMap.values());
		let turnOverArray = Array.from(turnOverMap.values());

		mealQuantity = resultArray.reduce((accumulator, currentValue) => {
			return accumulator + parseInt(currentValue.quantity);
		}, 0);

		return resultArray.map((value, index) => {
			let over = turnOverArray.filter((product) => {
				return product.meal === value.meal;
			});
			console.log(value);

			return (
				<ListGroupItem>
					<p>Meal name: {value.meal.toUpperCase()}</p>

					<p>Quantity Sold: {resultArray ? value?.quantity : "No sale yet"} </p>

					<p>
						Turnover:{" "}
						{over ? `${over[0].turnover} ${value.mealCurrency}` : "Pending"}
					</p>
				</ListGroupItem>
			);
		});
	};

	let content = Object.keys(mealTypeObjects).map((key) => {
		return (
			<ListGroupItem style={{ textAlign: "left" }}>
				<h5>Meal Type: {key}</h5>

				<ListGroup className="list-group-flush">{listItems(key)}</ListGroup>
			</ListGroupItem>
		);
	});

	return (
		<div>
			<Row>
				<YearFilterComponent fetchData={props.getProfitData} />
			</Row>

			<div>
				<p>
					Total meals sold : {mealQuantity ? mealQuantity : "no meals sold yet"}
				</p>
				{content}
			</div>
		</div>
	);
};

export default RestaurantProfitDataComponent;
