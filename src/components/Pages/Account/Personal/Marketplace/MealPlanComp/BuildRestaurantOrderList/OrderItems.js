import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Alert, Table, Modal } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import {
	getOrderList,
} from "../../../../../../../store/actions/marketplaceActions/shoppingListData";

// import { addToPurchaseItems } from "../../../../../../../store/actions/dataActions";
import { useTranslation, Trans } from "react-i18next";

import BoughtItemIcon from "../Icons/BoughtItemIcon";
import AddToCartIcon from "../Icons/AddToCartIcon";
import Edit from "../Icons/EditIconShop";
import EditAddedItems from "../Icons/EditIconShopAddedItems";
import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { submitNotification } from "../../../../../../lib/Notifications";
import SyncIcon from "@mui/icons-material/Sync";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import "./OrderItems.css";
import { getRestaurantList, sendToRes } from "../../../../../../../store/actions/marketplaceActions/restaurantData";

const { nanoid } = require("nanoid");

function OrderItems(props) {
	// console.log("All hail props", props)

	const { t } = useTranslation();

	// Function to generate a random code using uuid
	function generateRandomCode() {
		// Generate a random 5-character code using nanoid
		return nanoid(6);
	}

	const [allList, setAllList] = useState([]);
	const [showModal, setShow] = useState(false);
	const [deliveryOption, setDeliveryOption] = useState("delivery");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [cartIsEmpty, setCartIsEmpty] = useState(true);
	const [restaurantList, setRestaurantList] = useState([])
	const [selectedRestaurant, setSelectedRestaurant] = useState("");

	useEffect(() => {
		forceUpdate();
	}, [props.data]);

	
	//trigger this when editing/deleting items
	const [update, setUpdate] = useState(0);

	const forceUpdate = () => {
		setUpdate(update + 1);
	};

	function notify(ingr) {
		submitNotification(`${ingr}` + " added to orders");
	}

	function Refresh() {
		return (
			<>
				<Tooltip title="Refresh">
					<IconButton
						aria-label="Refresh"
						sx={{ ml: 2 }}
						onClick={() => {
							forceUpdate();
							submitNotification("Refreshing..");
						}}
					>
						<SyncIcon style={{ fontSize: 35 }} />
					</IconButton>
				</Tooltip>
			</>
		);
	}

	const label = { inputProps: { "aria-label": "Checkbox demo" } };

	const [cart, setCart] = useState([]);

	const addToCart = (meal) => {
		setCart([...cart, meal]);
		setCartIsEmpty(false);
	};

	const removeFromCart = (meal) => {
		let hardCopy = [...cart];
		hardCopy = hardCopy.filter((cartItem) => cartItem.id !== meal.id);
		setCart(hardCopy);
	};

	const cartItems = cart.map((meal, index) => (
		<List>
			<ListItem
				key={`ingr${index}`}
				className="list"
				style={{ alignItems: "flex-end" }}
			>
				<b>{`${meal.meal_name}: `} </b>{" "}
				&nbsp;
				{/* Input for the number of seat reservations */}
                {/* <label htmlFor={`seatsInput${index}`}>Seats:</label>
                <input
                    type="number"
                    id={`seatsInput${index}`}
                    value={meal.seatReservations || 0}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        const updatedCart = cart.map((item, i) => (i === index ? { ...item, seatReservations: value } : item));
                        setCart(updatedCart);
                    }}
                /> */}
				<Tooltip title="Remove">
					<IconButton
						aria-label="Remove"
						sx={{ ml: 2 }}
						onClick={() => {
							removeFromCart(meal);
						}}
					>
						<HighlightOffIcon fontSize="50" />
					</IconButton>
				</Tooltip>
			</ListItem>
		</List>
	));

	const PurchaseItem = () => {
		const cartList = cart;

		const data = {
			restaurantID: selectedRestaurant,
			upload: {
				order: cartList,
				seat: "1",
				fullname: props.profile.firstName + " " + props.profile.lastName,
				status: "IN PROGRESS",
				userID: props.profile.uid,
				userRequestAccountType: props.profile.buildingFunction,
			},
		};

			props.sendToRes(data).then((resp)=>{
			submitNotification("Success", "Order has been sent to restaurant");
		
			}).catch(()=>{
			submitNotification("Error", "Something went wrong, pls try again");
		
			});
	};

	useEffect(() => {
		console.log("cart", cart);
	}, [cart]);


	useEffect(() => {
		const data = {
			week: props.value.format("w"),
		};

		props.getOrderList(data);
	}, [props.value, update]);


	useEffect(() => {
		const data = {
			city: "Abuja",
		};
  
		props.getRestaurantList(data);
	}, [props.value]);

	// shopping list added by user using the add button
	const RestaurantList = async () => {
		//clears the meals array before each update- IMPORTANT
		setRestaurantList([]);

		//sets a new meal object in the array for every document with this date attached
		props.restaurantList.forEach((doc) => {
			//id is the docref for deletion
			var uid = doc.uid;
			var restaurantName = doc.restaurantName;
			var address = doc.address;

			setRestaurantList((list) => [
				...list,
				{
					uid: uid,
					restaurantName: restaurantName,
					address: address,
				},
			]);
		});
	}; 
	
	useEffect(() => {
		RestaurantList();
		console.log("res list", restaurantList)
	}, [props.retaurantList]);

	// shopping list added by user using the add button
	const OrderList = async () => {
		//clears the meals array before each update- IMPORTANT
		setAllList([]);

		//sets a new meal object in the array for every document with this date attached
		props.OrderList.forEach((doc) => {
			//id is the docref for deletion
			var id = doc.id;
			var day_of_week = doc.day_of_week;
			var restaurant_name = doc.restaurant_name;
			var meal_name = doc.recipe.meal_name;
			var meal_type = doc.recipe.meal_type;

			setAllList((list) => [
				...list,
				{
					meal_name: meal_name,
					meal_type: meal_type,
					day_of_week: day_of_week,
					restaurant_name: restaurant_name,
					id: id,
				},
			]);
		});
	};
	
	useEffect(() => {
		OrderList();
		console.log("res orders", allList)
	}, [props.OrderList]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	return (
		<>
		
			<Refresh />

			{allList.length ? (
				<>
					<List>
						{allList.map((meal, index) => (
							<ListItem
								key={`ingr${index}`}
								className="list"
								style={{ alignItems: "flex-end" }}
							>
								<div>
									<p>
										{meal.meal_name}
									</p>
									<br />
									<p>
										{meal.restaurant_name}
										{meal.day_of_week}
									</p>
								</div>
								<div style={{ marginLeft: "20px" }}></div>
								<div className="button">
									{/* <AddToCartIcon 
                   item={ingr.data}
                   measure={ingr.measure}
                   quantity={ingr.quantity}
                  />  */}
									<Tooltip title="Add to cart">
										<IconButton
											aria-label="Add to cart"
											sx={{ ml: 2 }}
											onClick={(e) => {
												addToCart(meal);
												notify(meal.meal_name);
												e.target.disabled = true;
											}}
										>
											<AddCircleOutlineIcon fontSize="25" />
										</IconButton>
									</Tooltip>

									<BoughtItemIcon
										value={props.value}
										// food={ingr.food}
										// item={ingr.data}
										// id={ingr.id}
										// measure={ingr.measure}
										// quantity={ingr.quantity}
										update={update}
										setUpdate={setUpdate}
									/>

									<EditAddedItems
										value={props.value}
										// food={ingr.food}
										// data={ingr.data}
										// week={ingr.week}
										// id={ingr.id}
										// measure={ingr.measure}
										// quantity={ingr.quantity}
										update={update}
										setUpdate={setUpdate}
									/>

								</div>
							</ListItem>
						))}
					</List>


					<Stack
						spacing={2}
						direction="row"
						style={{ justifyContent: "center" }}
					>
						<Button
							className="blue-btn shadow-none"
							type="submit"
							onClick={handleShow}
						>
							View Orders
						</Button>

					
					</Stack>

					<Modal show={showModal} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>{t("description.list_of_items")} </Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{cartItems.length > 0 ? (
								<>
									{/* Render cart items if the cart is not empty */}
									{cartItems}	


									<select
										value={selectedRestaurant}
										onChange={(e) => setSelectedRestaurant(e.target.value)}
										className="restaurant-dropdown"
									>
										<option value="" disabled>Select a restaurant</option>
										{restaurantList.map((restaurant) => (
											<option key={restaurant.uid} value={restaurant.uid}>
												{restaurant.restaurantName} - {restaurant.address}
											</option>
										))}
									</select>							
								</>
							) : (
								// Display a message when the cart is empty
								<p>No order added</p>
							)}
						</Modal.Body>

						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => {
									PurchaseItem();
									setCart([]);
									handleClose();
								}}
								// disabled={
								// 	cartIsEmpty ||
								// 	!selectedRestaurant
									
								// }
							>
								{t("description.button_confirm")}
							</Button>
							<Button variant="secondary" onClick={handleClose}>
								{t("description.button_cancel")}
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			) : (
				<div className="empty basic-title-left">
					<p>
						There are no items in the list yet :( please refresh page
						{t("description.list_of_items")}
					</p>
					<Button
						className="blue-btn shadow-none"
						type="submit"
						onClick={handleShow}
					>
						Generate{t("description.list_of_items")}
					</Button>

				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		OrderList: state.mealPlan.OrderList,
		restaurantList: state.restaurant.restaurantList,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOrderList: (item) => dispatch(getOrderList(item)),
		getRestaurantList: (data) => dispatch(getRestaurantList(data)),
		sendToRes: (data) => dispatch(sendToRes(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);
