import React, { useRef, forwardRef } from "react";
import "./Accordion.css";

const ProductRequestInfo = forwardRef(({ quantity, price, ref }) => {
	return (
		<>
			<div ref={ref} className="accordion_dropdown_info">
				<div>
					Qty : {quantity} <span>Price : {price}$</span>
				</div>
				<div>Farm : Divine Farms</div>
			</div>
		</>
	);
});

export default ProductRequestInfo;
