import React from "react";
import "./Paginator.css";
import ArrowIcon from "../../icons/ArrowIcon";

function Paginator() {
	return (
		<div className="paginator">
			<button className="paginatorBtn paginatorBtn-left">
				<ArrowIcon />
			</button>
			<button className="paginatorBtn paginator_prev_pg">4</button>

			{/* <input type="text" className="paginator_input">
				5
			</input> */}
			<form className=" paginator_form" action="">
				<input type="number"></input>
				<button className="paginatorBtn paginator_goBtn">GO</button>
			</form>

			<button className="paginatorBtn paginator_next_pg">6</button>
			<button className="paginatorBtn paginatorBtn-right">
				<ArrowIcon />
			</button>
		</div>
	);
}

export default Paginator;
