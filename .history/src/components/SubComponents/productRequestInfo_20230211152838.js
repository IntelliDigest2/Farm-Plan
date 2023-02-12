import React, { useRef, forwardRef } from "react";
import "./Accordion.css";

const ProductRequestInfo = forwardRef((props, ref) => {
	console.log(props.key);
	let content = props.price ? (
		<>
			<div>
				Qty : {props.quantity} <span>Price : {props.price}$</span>
			</div>
			<div>Farm : Divine Farms</div>
		</>
	) : (
		"pending"
	);

	return (
		<>
			<div ref={ref} className="accordion_dropdown_info">
				{content}
			</div>
		</>
	);
});

export default ProductRequestInfo;
