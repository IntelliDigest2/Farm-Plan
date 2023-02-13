import React from "react";
import "./Paginator.css";

function Paginator() {
	return (
		<div className="paginator">
			<button className="paginatorBtn"></button>
			<button className="paginatorBtn paginator_prev_pg">4</button>

			{/* <input type="text" className="paginator_input">
				5
			</input> */}
			<input></input>
			<button className="paginatorBtn paginator_next_pg">6</button>
			<button className="paginatorBtn"></button>
		</div>
	);
}

export default Paginator;
