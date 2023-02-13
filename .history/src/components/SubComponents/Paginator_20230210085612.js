import React from "react";
import "./Paginator.css";

function Paginator() {
	return (
		<div className="paginator_container">
			<button className="paginatorBtn"></button>
			<div className="paginator_prev_pg"></div>

			<input type="text" className="paginator_input" />
			<div className="paginator_next_pg"></div>
			<button className="paginatorBtn"></button>
		</div>
	);
}

export default Paginator;
