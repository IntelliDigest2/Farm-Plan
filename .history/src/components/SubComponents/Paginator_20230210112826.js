import React from "react";
import "./Paginator.css";
import ArrowIcon from "../../icons/ArrowIcon";

function Paginator() {
	return (
		<div className="paginator">
			<button className="paginatorBtn">
				<ArrowIcon />
			</button>
			<button className="paginatorBtn paginator_prev_pg">4</button>

			{/* <input type="text" className="paginator_input">
				5
			</input> */}
			<input></input>
			<button className="paginatorBtn paginator_next_pg">6</button>
			<button className="paginatorBtn">
				<ArrowIcon />
			</button>
		</div>
	);
}

export default Paginator;
