import React from "react";
import "./Paginator.css";
import ArrowIcon from "../../icons/ArrowIcon";
import { useFormik } from "formik";

function Paginator() {
	const resultPageForm = useFormik({
		initialValues: {
			page: "",
		},
	});
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
				<input
					id="pageNumber"
					name="pageNumber"
					type="number"
					placeholder="1"
					onChange={resultPageForm.handleChange}
					value={resultPageForm.values.page}
				></input>
				<button className=" paginator_goBtn paginatorBtn ">GO</button>
			</form>

			<button className="paginatorBtn paginator_next_pg">6</button>
			<button className="paginatorBtn paginatorBtn-right">
				<ArrowIcon />
			</button>
		</div>
	);
}

export default Paginator;
