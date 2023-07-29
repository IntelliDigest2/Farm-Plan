import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormGroup, Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
	createFoodWasteData,
	createMapData,
} from "./../../../../store/actions/dataActions";
import { Redirect } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { PageWrap } from "../../../SubComponents/PageWrap";
import { Dropdown } from "../../../SubComponents/Dropdown";
import { DefaultButton } from "../../../SubComponents/Button";
import { Divider } from "@mui/material";
import { submitNotification } from "../../../lib/Notifications";

const FoodLoss = (props) => {
	const [redirectTo, setRedirectTo] = useState(false);
	//useEffect to redirect if not correct account type

	useEffect(() => {
		if (props.profile.type) {
			if (!String(props.profile.type).includes("farm")) {
				setRedirectTo(true);
			}
		}
		if (props.profile.isLoaded) {
			if (props.profile.buildingFunction === "Farm") {
				defaultUpload.wasteType = "unharvested";
				defaultUpload.wasteSource = "pest infestation";

				setUpload(defaultUpload);
			} else if (props.profile.buildingFunction !== "Farm") {
				defaultUpload.edibleInedible = "Edible";
				setUpload(defaultUpload);
			}
		}
	}, [props.profile]);

	const defaultUpload = {
		// edibleInedible: "Edible"
		foodName: "",
		foodWasteWeight: 0,
		weightType: "Select Unit",
		expiryDate: "",
		ghg: 0,
		foodWasteCost: 0,
		currency: "Select Currency",
	};

	const defaultMultipliers = {
		weightMultiplier: 0,
		currencyMultiplier: 0,
	};

	//Upload state
	const [upload, setUpload] = useState(defaultUpload);

	console.log(upload, `this is the upload`);

	//Multiplier state
	const [multipliers, setMultipliers] = useState(defaultMultipliers);

	//Update foodWasteCost and ghg when edibleInedible or foodWasteWeight or weightType changes
	useEffect(() => {
		handleCostGHGChange();
	}, [
		upload.edibleInedible,
		upload.foodWasteWeight,
		upload.weightType,
		upload.currency,
	]);

	const updateStateValue = (e) => {
		console.log(e.target);
		if (e.target.textContent) {
			setUpload({ ...upload, [e.target.id]: e.target.textContent });
		} else {
			setUpload({ ...upload, [e.target.id]: e.target.value });
		}
	};

	const setOtherWaste = (value) => {
		setUpload({ ...upload, otherWastes: value });
	};
	const updateWasteType = (e) => {
		setUpload({ ...upload, wasteType: e });
	};

	const updateWasteSource = (e) => {
		console.log(e, `this sis the e for the update Waste`);
		if (e === "other") {
			setUpload({ ...upload, otherWastes: "", wasteSource: e });
		} else if (e !== "other" && upload.otherWastes) {
			delete upload.otherWasteInput;
			setUpload({ ...upload, wasteSource: e });
		} else {
			setUpload({ ...upload, wasteSource: e });
		}
	};

	const changeMultiplier = (e) => {
		let stringArray = e.target.id.toString().split(/PerUnit|Type/);
		let typeString = stringArray[0] + "Multiplier";
		let val;
		switch (e.target.textContent) {
			//Weight (Food Waste)
			case "kg":
			case "l":
				val = 1;
				break;
			case "g":
			case "ml":
				val = 0.001;
				break;
			case "oz":
				val = 0.028;
				break;
			case "lbs":
				val = 0.454;
				break;
			//Currency Unit (GBP (£), USD ($), EUR (€))
			case "GBP (£)":
				val = 1;
				break;
			case "USD ($)":
				val = 1.404;
				break;
			case "EUR (€)":
				val = 1.161;
				break;
			default:
				val = 1;
		}
		setMultipliers({ ...multipliers, [typeString]: val });
	};

	const handleCostGHGChange = () => {
		setUpload({
			...upload,
			ghg: Number(upload.foodWasteWeight * multipliers.weightMultiplier * 2.5),
			foodWasteCost: (
				Number(upload.foodWasteWeight) *
				0.85 *
				multipliers.weightMultiplier *
				multipliers.currencyMultiplier
			).toFixed(2),
		});
	};

	const handleFoodWasteSubmit = () => {
		var wm;
		switch (upload.weightType) {
			default:
			case "kg":
			case "l":
				wm = 1;
				break;
			case "g":
			case "ml":
				wm = 0.001;
				break;
			case "oz":
				wm = 0.028;
				break;
			case "lbs":
				wm = 0.454;
				break;
		}

		const mapData = {
			masterCollection: "mapData",
			uid: props.auth.uid,
			upload: {
				foodWasteWeight: upload.foodWasteWeight * wm,
			},
		};

		var uid, masterCollection;
		switch (props.profile.type) {
			case "business_admin":
				masterCollection = "business_users";
				uid = props.auth.uid;
				break;
			case "business_sub":
				masterCollection = "business_users";
				uid = props.profile.admin;
				break;
			case "academic_admin":
				masterCollection = "academic_users";
				uid = props.auth.uid;
				break;
			case "academic_sub":
				masterCollection = "academic_users";
				uid = props.profile.admin;
				break;
			case "farm_admin":
				masterCollection = "farm_users";
				uid = props.auth.uid;
				break;
			case "farm_sub":
				masterCollection = "farm_users";
				uid = props.profile.admin;
				break;
			case "household_admin":
				masterCollection = "household_users";
				uid = props.auth.uid;
				break;
			case "household_sub":
				masterCollection = "household_users";
				uid = props.profile.admin;
				break;
			default:
				masterCollection = "data";
				uid = props.auth.uid;
				break;
		}

		const data = {
			uid: uid,
			masterCollection: masterCollection,
			collection: "writtenFoodLossData",
			upload: {
				date: getFirebase().firestore.Timestamp.fromDate(new Date()),
				...upload,
			},
		};

		console.log(data, `this is the data that will be sent`);

		// props.createFoodWasteData(data);
		// props.createMapData(mapData);
		// submitNotification("Success", "Food Loss successfully uploaded!");
		// setUpload(defaultUpload);
		// setMultipliers(defaultMultipliers);
	};

	//Redirect if not logged in
	if (!props.auth.uid) return <Redirect to="/login" />;

	//Redirect if not an academic user
	if (redirectTo) return <Redirect to="/account" />;

	let foodWasteType = props.profile.isLoaded ? (
		props.profile.buildingFunction === "Farm" ? (
			<>
				<FormGroup className="mb-3">
					<Form.Label style={{ backgroundColor: "white" }}>
						Waste Type
					</Form.Label>
					<Dropdown
						id="waste type"
						styling="grey dropdown-input"
						data={upload.wasteType}
						function={(e) => {
							updateWasteType(e);
						}}
						items={[
							"unsold harvest",
							"unharvested",
							"pre-farm gate processing waste",
						]}
					/>
				</FormGroup>
			</>
		) : (
			<>
				<FormGroup className="mb-3">
					<Form.Label style={{ backgroundColor: "white" }}>
						Edible or Inedibe
					</Form.Label>
					<Dropdown
						id="edibleInedible"
						styling="grey dropdown-input"
						data={upload.edibleInedible}
						function={(ekey, e) => {
							updateStateValue(e);
						}}
						items={["Edible", "Inedible"]}
					/>
				</FormGroup>
			</>
		)
	) : (
		""
	);

	let wasteSource =
		upload.wasteType === "unharvested" ? (
			<>
				<FormGroup className="mb-3">
					<Form.Label style={{ backgroundColor: "white" }}>
						Waste Source
					</Form.Label>
					<Dropdown
						id="waste source"
						styling="grey dropdown-input"
						data={upload.wasteSource}
						function={(e) => {
							updateWasteSource(e);
						}}
						items={["pest infestation", "poor growth/maturity", "other"]}
					/>
				</FormGroup>
			</>
		) : (
			""
		);

	let wasteInputTxt =
		upload.wasteSource === "other" ? (
			<FormGroup className="mb-3">
				<Form.Label style={{ backgroundColor: "white" }}>
					please type other waste source here
				</Form.Label>
				<Form.Control
					type="text"
					id="otherWastes"
					onChange={(e) => {
						// setUpload({ ...upload, otherWastes: e });
						setOtherWaste(e.target.value);
					}}
					value={upload.otherWastes}
				/>
			</FormGroup>
		) : (
			""
		);

	return (
		<PageWrap
			header="Update Food Waste"
			subtitle="Upload Edible or Inedible Food Waste"
			goTo="/account"
		>
			<Container fluid className="web-center">
				<Form>
					<FormGroup className="mb-3">
						<Form.Label style={{ backgroundColor: "white" }}>
							Food Name
						</Form.Label>
						<Form.Control
							type="text"
							id="foodName"
							onChange={(e) => {
								updateStateValue(e);
							}}
							value={upload.foodName}
						/>
					</FormGroup>
					{foodWasteType}
					{wasteSource}
					{wasteInputTxt}

					<FormGroup className="mb-3">
						<Form.Label style={{ backgroundColor: "white" }}>
							Weight / Volume
						</Form.Label>
						<InputGroup>
							<Form.Control
								type="number"
								id="foodWasteWeight"
								onChange={(e) => {
									updateStateValue(e);
								}}
								value={upload.foodWasteWeight}
							/>
							<Dropdown
								id="weightType"
								styling="grey dropdown-input-right"
								data={upload.weightType}
								function={(ekey, e) => {
									changeMultiplier(e);
									updateStateValue(e);
								}}
								items={["kg", "g", "/", "oz", "lbs", "/", "l", "ml"]}
							/>
						</InputGroup>
					</FormGroup>

					<EdibleInedible
						upload={upload}
						multipliers={multipliers}
						changeMultiplier={changeMultiplier}
						updateStateValue={updateStateValue}
					/>

					<FormGroup className="mb-3">
						<Form.Label style={{ backgroundColor: "white" }}>GHG</Form.Label>
						<InputGroup>
							<Form.Control
								type="ghg"
								value={upload.ghg}
								title={upload.ghg}
								readOnly
							/>
							<InputGroup.Append>
								<InputGroup.Text>kg co2</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</FormGroup>

					<EnableSubmit
						upload={upload}
						handleFoodWasteSubmit={handleFoodWasteSubmit}
					/>
				</Form>
			</Container>
		</PageWrap>
	);
};

const EdibleInedible = (props) => {
	if (props.upload.edibleInedible === "Edible") {
		return (
			<>
				<FormGroup className="mb-3">
					<Form.Label style={{ backgroundColor: "white" }}>
						Expiry Date
					</Form.Label>
					<Form.Control
						id="expiryDate"
						placeholder="DD/MM/YYYY"
						onChange={(e) => {
							props.updateStateValue(e);
						}}
						value={props.upload.expiryDate}
					/>
				</FormGroup>

				<FormGroup className="mb-3">
					<Form.Label style={{ backgroundColor: "white" }}>Cost</Form.Label>
					<InputGroup>
						<Form.Control
							id="foodWasteCost"
							value={props.upload.foodWasteCost}
							readOnly
						/>
						<Dropdown
							id="currency"
							styling="grey dropdown-input-right"
							data={props.upload.currency}
							function={(eventKey, e) => {
								props.changeMultiplier(e);
								props.updateStateValue(e);
							}}
							items={["GBP (£)", "USD ($)", "EUR (€)"]}
						/>
					</InputGroup>
				</FormGroup>
			</>
		);
	} else {
		return null;
	}
};

const EnableSubmit = (props) => {
	if (props.upload.edibleInedible === "Edible") {
		if (
			props.upload.projectName !== "" &&
			props.upload.foodName !== "" &&
			props.upload.foodWasteWeight > 0 &&
			props.upload.weightType !== "Select Unit" &&
			props.upload.expiryDate !== "" &&
			props.upload.currency !== "Select Currency"
		) {
			return (
				<FormGroup className="mb-3">
					<Divider />
					<DefaultButton
						text="Update"
						styling="green"
						onClick={(e) => {
							props.handleFoodWasteSubmit();
						}}
					/>
				</FormGroup>
			);
		} else {
			return <DefaultButton text="Update" styling="green" disabled="true" />;
		}
	} else {
		if (
			props.upload.projectName !== "" &&
			props.upload.foodName !== "" &&
			props.upload.foodWasteWeight > 0 &&
			props.upload.weightType !== "Select Unit"
		) {
			return (
				<FormGroup className="mb-3">
					<Divider />
					<DefaultButton
						text="Update"
						styling="green"
						onClick={(e) => {
							props.handleFoodWasteSubmit();
						}}
					/>
				</FormGroup>
			);
		} else {
			return <DefaultButton text="Update" styling="green" disabled="true" />;
		}
	}
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		data: state.firestore.ordered.data,
		user: state.firebase.profile,
		profile: state.firebase.profile,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
		createMapData: (product) => dispatch(createMapData(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodLoss);
