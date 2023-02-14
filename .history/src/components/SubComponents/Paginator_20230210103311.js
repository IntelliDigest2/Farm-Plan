import React from "react";
import "./Paginator.css";

function Paginator() {
	return (
		<div className="paginator_container">
			<button className="paginatorBtn"></button>
			<div className="paginator_prev_pg">4</div>

			{/* <input type="text" className="paginator_input">
				5
			</input> */}
			<input></input>
			<div className="paginator_next_pg">6</div>
			<button className="paginatorBtn"></button>
		</div>
	);
}

export default Paginator;
