import React, { useEffect, useState, useRef } from "react";
import "./Accordion.css";
import "./Button.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";
import ExternalLink from "../../icons/externalLink";
import { v4 as uuidv4 } from "uuid";

const Accordion = () =>
	// { status, requestedProducts }
	{
		const [color, setColor] = useState();
		const [accordionOpen, setAccordionOpen] = useState(false);
		const gridItem = useRef([]);

		const requestedProducts = Array.from(Array(10).keys());

		useEffect((value) => {}, [accordionOpen]);

		// useEffect(() => {
		// 	console.log(gridItem.current); // logs <div>I'm an element</div>
		// }, [gridItem]);

		// const [dropDownContent , setDropDownContent] = useState(status)

		// switch (status) {
		// 	case "completed":
		// 		setColor("green");

		// 		break;
		// 	case "progress":
		// 		setColor("purple");
		// 		break;
		// 	case "canceled":
		// 		setColor("red");
		// 		break;
		// 	case "pending":
		// 		setColor("yellow");
		// 		break;

		// 	default:
		// 		setColor("grey");
		// }

		let products = requestedProducts.map((product) => {
			return (
				<div
					ref={gridItem}
					key={`gridItem-${uuidv4()}`}
					className="accordion_dropdown_productItem"
					onMouseEnter={() => extraInfoHandler(true)}
					onMouseLeave={() => extraInfoHandler(false)}
				>
					{/* {product.name} */}
					Name
					<div className="accordion_dropdown_info">
						<div>Qty : 8</div>
						<div>Farm : Divine Farms</div>
					</div>
				</div>
			);
		});

		function accordionHandler() {
			if (accordionOpen) {
				setAccordionOpen(false);
			} else {
				setAccordionOpen(true);
			}
		}

		function extraInfoHandler() {}
		// let productName = product.name

		// if (product.name.length > 7){
		// 	function divide(str, index) {
		// 		const result = [str.slice(0, index), str.slice(index)];

		// 		return result;
		// 	  }
		// 	const [first,second]= divide(product.name, 4)
		// 	productName = <><span className="">{first}</span><span>{second}</span></>

		// }

		//         Name of user
		// Email
		// City
		// Name of item
		// Measure
		// Quantity

		// let extraDetails = extraInfoShown ? (
		// 	<div className="accordion_dropdown_info">
		// 		<div>Qty : 8</div>
		// 		<div>Farm : Divine Farms</div>
		// 	</div>
		// ) : (
		// 	""
		// );

		let accordionDropDown = accordionOpen ? (
			<div className="accordion_dropDown">
				<div>
					<div>
						status : <span className="status-green">Completed</span>
						{/* {status className= */}
					</div>
					<div>
						Link to mail{" "}
						<span>
							<ExternalLink />
						</span>
					</div>
				</div>
				<div className="accordion_dropdown_products">
					requested Products :{/* <span>{products}</span> */}
					<div className="accordion_dropdown_productItems">{products}</div>
				</div>
			</div>
		) : (
			""
		);

		return (
			<div className="accordion">
				<div onClick={accordionHandler} className="accordion_top">
					<div className="accordion_top_left">
						<div className="accordion_top_date">date</div>
						<div className="accordion_top_userInfo">
							<span> James Cameron</span>
							<span> Edinburgh</span>
						</div>
					</div>
					<div className="accordion_top_right">
						{/* status: {status} */}
						<span>completed</span>

						<StatusBulb
							color={"red"}
							// color={color}
						/>
						{/* <button className="btn-plain" onClick={accordionHandler}> */}
						<DropDownArrowIcon />
						{/* </button> */}
					</div>
				</div>
				{accordionDropDown}
			</div>
		);
	};

export default Accordion;
