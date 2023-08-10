import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Delete from "./Icons/DeleteIcon";
import Edit from "./Icons/EditIcon";
import { format } from "date-fns";

export default function ProduceBox(props) {
	console.log("lets fetch all produce ==> ", props.produce);
	return (
		<>
			{props.produce.map((newProduce, index) => (
				<div className="meal-box" key={`produce-box${index}`}>
					<div className="ingredients">
						<List
							key={`prod${index}`}
							styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
						>
							<ListSubheader className="heading">
								<div className="meal-name">{newProduce.meal}</div>
								<div className="meal-type">{newProduce.farmType}</div>
								<div className="icons">
									<Delete
										value={props.value}
										id={newProduce.id}
										forceUpdate={props.forceUpdate}
									/>
									<Edit
										produce={newProduce}
										id={newProduce.id}
										forceUpdate={props.forceUpdate}
									/>
								</div>
							</ListSubheader>

							<ListItem
								key={`item${index}`}
								className="list"
								style={{ alignItems: "baseline" }}
							>
								<div>
									<p>
										<b>Product Name</b> {newProduce.item.toUpperCase()}
									</p>

									<p>
										<b>Quantity</b> {newProduce.quantity} {newProduce.measure}
									</p>

									<p>
										<b>Production Cost</b> {newProduce.currency}{" "}
										{newProduce.price}
									</p>
									<p>
										<b>Selling price</b> {newProduce.currency}{" "}
										{newProduce.sellingPrice}
									</p>
									<p>
										<b>Date of Harvest: </b>
										{format(newProduce.date.toDate(), "MMMM d, yyyy")}
									</p>
								</div>
							</ListItem>
						</List>
					</div>
				</div>
			))}
		</>
	);
}
