import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "../../../../../SubComponents/Dropdown";
import MenuSection from "../../../Personal/Marketplace/MealPlanComp/Search/menuSection";
import MealType from "../../../Personal/Marketplace/MealPlanComp/Search/mealType";
import { Form, InputGroup, Button, Col } from "react-bootstrap";
import FoodItemSearch from "../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/FoodItemSearch";
import "../../../../../SubComponents/Button.css";

import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import ClearIcon from "@mui/icons-material/Clear";

import {
	foodIdAPI,
	nutritionAPI,
} from "../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/NutritionApi";
import SaveMealIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/SaveMealIcon";
import { AddSupplierProduct } from "../../../../../../store/actions/supplierActions/supplierData";
import { submitNotification } from "../../../../../lib/Notifications";
import { AddButton } from "./../../../../../SubComponents/Button";

function AddProductForm_supply(props) {
	const [productName, setProductName] = useState("");
	const [brandName, setBrandName] = useState("");
	const [batchNumber, setBatchNumber] = useState("");
	const [stockType, setStockType] = useState("Sale");
	const [currency, setCurrency] = useState("$");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productCurrency, setProductCurrency] = useState("$");
	const [productQty, setProductQty] = useState("");
	const [productMeasure, setProductMeasure] = useState("units");
	const [image, setImage] = useState(null);
	const [Url, setUrl] = useState("");
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [date, setDate] = useState(new Date());
	const defaultRate = [{ id: 1, rateDuration: "", ratePeriod: "hour" }];

	const [inputGroups, setInputGroups] = useState(defaultRate);

	// useEffect(() => {
	// 	if (Url !== "") {
	// 		handleSubmit();
	// 	}
	// }, [Url]);

	useEffect(() => {}, [inputGroups]);

	const handleRatePeriodChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, ratePeriod: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleRateDurationChange = (index, value) => {
		// console.log(value);
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, rateDuration: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	function addRentageRateHandler() {
		if (inputGroups.length <= 5) {
			setInputGroups([
				...inputGroups,
				{
					id: inputGroups.length + 1,
					rateDuration: "",
					ratePeriod: "hour",
					// nutrientUnit: "units",
				},
			]);
		}
	}

	function deleteNutrientHandler(index) {
		const updatedInputGroups = inputGroups.filter((group, i) => i !== index);
		setInputGroups(updatedInputGroups);
	}

	let nutrientGroup = inputGroups.map((group, index) => {
		return (
			<>
				<InputGroup
					key={`nut-${index}`}
					style={{ margin: "5px 0", alignItems: "baseline" }}
				>
					<Col md={7}>
						<Form.Control
							// id="nutrientName"
							type="text"
							// min="0"
							// step=".5"
							required
							onChange={(e) => handleRateDurationChange(index, e.target.value)}
							value={group.rateDuration}
							placeholder="amount"
						/>
					</Col>
					<Col md={1}>
						<Dropdown
							// id="nutrientUnit"
							styling="grey dropdown-input"
							data={currency}
							// data={local.measure}
							required
							items={["$", "€", "£"]}
							function={(e) => setCurrency(e)}
						/>
					</Col>
					{/* &#47; */}
					per
					{/* <Col md={2}>
						<Form.Control
							// id="nutrientQuantity"
							type="number"
							min="0"
							required
							// step=".5"
							onChange={(e) =>
								handleRatePeriodChange(index, e.target.value)
							}
							value={group.nutrientQuantity}
							// function={(e) => {
							//   setLocal({ ...local, measure: e });
							// }}
							placeholder="qty"
						/>
					</Col> */}
					<Col md={2}>
						<Dropdown
							// id="nutrientUnit"
							styling="grey dropdown-input"
							data={group.ratePeriod}
							// data={local.measure}
							required
							items={["hour", "day", "week", "month", "year"]}
							function={(e) => handleRatePeriodChange(index, e)}
						/>
					</Col>
					<Col md={1}>
						{index >= 1 ? (
							<ClearIcon
								onClick={() => deleteNutrientHandler(index)}
							></ClearIcon>
						) : (
							""
						)}
					</Col>
				</InputGroup>
			</>
		);
	});

	//upload immage to cloudinary
	const uploadImage = async () => {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", "product_upload");
		formData.append("cloud_name", "dghm4xm7k");
		formData.append("resize", "fill");
		formData.append("width", "500");
		formData.append("height", "500");
		try {
			const response = await fetch(
				"https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",
				{
					method: "POST",
					body: formData,
				}
			);
			const responseData = await response.json();
			return responseData.url;
		} catch (error) {
			console.log(error);
		}
	};

	const formRef = useRef(null);

	// const [mealType, setMealType] = useState("");
	const [err, setErr] = useState("");

	//trigger this when editing/deleting items
	// const [update, setUpdate] = useState(0);
	// const forceUpdate = () => {
	// 	setUpdate(update + 1);
	// };

	//fired when click "done"

	let rentageRate =
		stockType === "Rentage" ? (
			<div>
				<div style={{ textAlign: "left" }}>
					Add additional rate
					<AddButton onClick={addRentageRateHandler} />
				</div>

				{nutrientGroup}
			</div>
		) : (
			""
		);

	const handleSubmit = () => {
		const data = {
			upload: {
				productName: productName,
				productDescription: productDescription,

				productQty: parseInt(productQty),
				imageURL: Url,
				brandName: brandName,
				currentQuantity: parseInt(productQty),
				batchNumber: batchNumber,
				// mealType: mealType,
				productMeasure: productMeasure,
				companyID: props.profile.uid,
				companyName: props.profile.companyName,
				city: props.profile.city,
				region: props.profile.region,
				mobile: props.profile.mobile,
				email: props.profile.email,
				createdAt: new Date(),
				currency: currency,
				stockType: stockType,
			},
		};

		if (stockType === "Rentage") {
			data.upload.rentRates = inputGroups;
		}
		if (stockType === "Sale") {
			data.upload.productPrice = productPrice;
			data.upload.productCurrency = productCurrency;
		}
		// console.log(data.upload);

		setLoadingSubmit(true);
		uploadImage()
			.then((resp) => {
				console.log(resp, `this is ithe image url response`);
				data.upload.imageURL = resp;
				return resp;
				// props.createProduct(data);
			})
			.then((resp) => {
				console.log(data.upload, `the data we want to upload`);
				props.createProduct(data);
			})
			.then((resp) => {
				submitNotification("Success", `${productName} has been added!`);
				setLoadingSubmit(false);
				formRef.current.reset();
				setProductPrice("");
				setProductQty("");
			})
			.catch((err) => {
				console.log(err);
				submitNotification("Error", `Something went wrong`);
				setLoadingSubmit(false);
			});

		// forceUpdate();

		// if (save) {
		//   props.createMenu(data);
		// }
		// props.addToShoppingList(data);
	};

	const pricing =
		stockType === "Sale" ? (
			<Form.Group>
				<Form.Label>Product price</Form.Label>
				<InputGroup>
					<Form.Control
						id="mealPrice"
						type="number"
						min="0"
						step="1"
						placeholder="0"
						onChange={(e) => {
							setProductPrice(e.target.value);
						}}
						defaultValue={productPrice}
					/>

					<Dropdown
						id="currency"
						styling="grey dropdown-input"
						data={productCurrency}
						items={["$", "€", "£"]}
						function={(e) => {
							setProductCurrency(e);
						}}
					/>
				</InputGroup>
			</Form.Group>
		) : (
			""
		);

	return (
		<Form
			ref={formRef}
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(); // Call uploadImage
				// props.handleFormClose();
			}}
		>
			{/* <button
        onClick={() => {
          nutritionAPI(local);
        }}
      >
        send test
      </button> */}

			<Form.Group>
				<Form.Label>Product name</Form.Label>
				<div
					style={{
						color: "grey",
						display: "inline-block",
						fontSize: "12px",
						textAlign: "left",
					}}
				>
					* Products with distinct descriptions that set them apart should be
					given names that reflect their differences, such as 'green apple' and
					'red apple,' to facilitate efficient grouping.
				</div>
				<Form.Control
					type="text"
					id="mealName"
					onChange={(e) => {
						setProductName(e.target.value);
					}}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Col style={{ alignItems: "baseline" }} md="4">
					<Form.Label>Stock type</Form.Label>
					<Dropdown
						id="stockType"
						styling="grey dropdown-input"
						data={stockType}
						items={["Sale", "Rentage"]}
						function={(e) => {
							setStockType(e);
						}}
					/>
				</Col>
			</Form.Group>
			{rentageRate}
			{pricing}

			<Form.Label>Product description</Form.Label>
			<div
				style={{
					color: "grey",
					display: "inline-block",
					fontSize: "12px",
					textAlign: "left",
				}}
			>
				* Provide a concise product description, highlighting its key features
				and attributes. For example, mention materials used ('made of plastic'),
				intended purpose ('for watering plants'), and dimensions ('10m x 3m').
			</div>
			<Form.Control
				as="textarea"
				id="mealDescription"
				onChange={(e) => {
					setProductDescription(e.target.value);
				}}
				style={{ minHeight: "150px" }}
			/>

			<Form.Group>
				<Form.Label>Brand name</Form.Label>
				<Form.Control
					type="text"
					id="mealName"
					onChange={(e) => {
						setBrandName(e.target.value);
					}}
					placeholder="product brand name"
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Batch Number</Form.Label>
				<Form.Control
					type="text"
					id="batchNumber"
					placeholder="eg 24-9-2023-Q"
					onChange={(e) => {
						setBatchNumber(e.target.value);
					}}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Quantity</Form.Label>
				<InputGroup>
					<Form.Control
						id="quantity"
						type="number"
						min="0"
						placeholder="0"
						step=".1"
						onChange={(e) => {
							setProductQty(e.target.value);
						}}
						value={productQty}
					/>
					<Dropdown
						id="measure"
						styling="grey dropdown-input"
						data={productMeasure}
						items={[
							"units",
							"pcs",
							"g",
							"kg",
							"/",
							"mL",
							"L",
							"/",
							"tsp",
							"tbsp",
							"cups",
						]}
						function={(e) => {
							setProductMeasure(e);
						}}
					/>
				</InputGroup>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Add product image</Form.Label>
				<Form.Control
					type="file"
					placeholder="Upload Image"
					defaultValue={""}
					required
					onChange={(e) => {
						setImage(e.target.files[0]);
					}}
				/>
			</Form.Group>
			<Form.Group style={{ textAlign: "left" }}>
				<Form.Label>Date</Form.Label>
				<DatePicker
					selected={date}
					onChange={(date) => setDate(date)}
					dateFormat="dd/MM/yyyy"
				/>
			</Form.Group>

			<div style={{ alignItems: "center" }}>
				<Button
					className="blue-btn shadow-none"
					type="submit"
					disabled={
						(stockType === "Sale"
							? productPrice <= "0" || productCurrency === ""
							: "") ||
						(stockType === "Rentage"
							? inputGroups[0].rateDuration.trim() === ""
							: "") ||
						productName.trim() === "" ||
						productDescription.trim() === "" ||
						productQty <= "0" ||
						brandName.trim() === "" ||
						image === null ||
						batchNumber.trim() === ""
					}
				>
					{/* <Button className="blue-btn shadow-none" type="submit"> */}

					{loadingSubmit ? "...Loading" : "Submit"}
				</Button>
			</div>
		</Form>
	);
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createProduct: (data) => dispatch(AddSupplierProduct(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddProductForm_supply);
