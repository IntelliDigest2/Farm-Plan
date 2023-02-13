import React from "react";

function productRequestInfo({ quantity, price }) {
	return (
		<>
			<div className="accordion_dropdown_info">
				<div>
					Qty : {quantity} <span>Price : {price}$</span>
				</div>
				<div>Farm : Divine Farms</div>
			</div>
		</>
	);
}

export default productRequestInfo;
