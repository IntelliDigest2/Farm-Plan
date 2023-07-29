import React, { useState, useEffect } from "react";

import "../../../../../SubComponents/Button.css";
import "../FarmPlan.css";

import Weather from "../Weather";
import FarmPlanRow from "../FarmPlanRow";

import { Dropdown } from "../../../../../SubComponents/Dropdown";
import { PopUp } from "../../../../../SubComponents/PopUp";
// import SellerAuth from "./SellerAuth";
// import AuthIcon from "../../../../SubComponents/AuthIcon";

import { Form, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { createMarketplaceData } from "../../../../../../store/actions/dataActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const cropDB = require("../crops.json");
const nutrDB = require("../nutr.json");
const landUnits = ["Km²", "M²", "Hct"];

const Horticulture = (props) => {
	const [land, setLand] = useState(0);
	const [unit, setUnit] = useState(landUnits[0]);

	const [farmPlan, setFarmPlan] = useState([]);

	const [rows, setRows] = useState(6);
	const [totalUsed, setTotalUsed] = useState(100);
	const [totals, setTotals] = useState([]);
	const [comment, setComment] = useState(false);

	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState("");

	const setRowTotal = (data, i) => {
		totals[i] = Number(data);
		const initialValue = 0;
		const sumWithInitial = totals.reduce(
			(previousValue, currentValue) => previousValue + currentValue,
			initialValue
		);
		setTotalUsed(sumWithInitial);
	};

	const { profile } = props;

	useEffect(() => {
		if (props.auth.error)
			setMsg(
				"There was an error connnecting to the database - please try again"
			);
	}, [props.auth.error]);

	function mergeJson(target) {
		for (var argi = 1; argi < arguments.length; argi++) {
			var source = arguments[argi];
			for (var key in source) {
				if (!(key in target)) {
					target[key] = [];
				}
				for (var i = 0; i < source[key].length; i++) {
					target[key].push(source[key][i]);
				}
			}
		}
		return target;
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (totalUsed > 100) {
			setMsg("Total crop volume exceed 100%");
			return;
		}

		var data = {
			uid: props.auth.uid,
			upload: {
				...farmPlan,
				totalLand: land,
				landUnits: unit,
				comment: comment,
			},
		};

		props.createMarketplaceData(data);
		setOpen(true);
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<p>
					We recommend that you plant a range of different crops within your
					field. Crop rotation has been proven to increase yield and minimise
					the damage of pests and disease.
				</p>

				{/* {!props.profile.isSeller && (
            <div className="auth-icon">
              <Row>
                <Col>
                  <AuthIcon />
                </Col>
                <Col xs={8}>
                  You must authenticate your account with us to join the Plan to
                  Save!
                </Col>
              </Row>
            </div>
          )} */}
				<div>Farm Location: {profile.city}</div>
				<Form.Group className="mb-3 land">
					<Form.Label>Land Size</Form.Label>
					<InputGroup>
						<Form.Control
							type="number"
							id="land-size"
							onChange={(e) => setLand(e.target.value)}
							value={land}
							min={1}
							max={10000}
							required
						/>
						<Dropdown
							id="land-unit"
							styling="green dropdown-input-right"
							data={unit}
							function={(e) => {
								setUnit(e);
							}}
							items={landUnits}
						/>
					</InputGroup>
				</Form.Group>

				<Container className="p-0 text-center ">
					<Row className="mb-2 farm-row farm-header d-none d-sm-flex">
						<Col>Plot</Col>
						<Col>Crop</Col>
						<Col>% of total land</Col>
						<Col>Info</Col>
					</Row>
					{Object.keys(cropDB.categories).map((category, index) => (
						<FarmPlanRow
							key={category}
							rows={rows}
							cat={category}
							index={index}
							setRowTotal={setRowTotal}
							setFarmPlan={setFarmPlan}
							farmPlan={farmPlan}
							land={land}
							unit={unit}
						/>
					))}
				</Container>

				<h3 className={totalUsed > 100 ? "auth-error" : "success"}>
					Total of land used: {totalUsed.toFixed(0)}%
				</h3>

				{/* <Button className="sub-btn blue-btn">Add row</Button> */}

				<Weather />

				<Form.Group>
					<Form.Control
						as="textarea"
						rows={6}
						placeholder="Comments"
						id="comment"
						name="comment"
						onChange={(e) => {
							setComment(e.target.value);
						}}
					/>
				</Form.Group>

				{msg && <p className="auth-error">{msg}</p>}
				<Button type="submit" className="sub-btn blue-btn">
					Save Plan
				</Button>
			</Form>
			<PopUp
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				// text="View my products"
				// to="/view-products"
			>
				Successfully Saved!
			</PopUp>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		data: state.firestore.ordered.data,
		profile: state.firebase.profile,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		createMarketplaceData: (product) =>
			dispatch(createMarketplaceData(product)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => {
		if (!props.auth.uid) return [];
		return [
			{
				collection: "data",
				doc: props.auth.uid,
			},
		];
	})
)(Horticulture);
