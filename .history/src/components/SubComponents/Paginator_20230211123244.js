import React from "react";
import "./Paginator.css";
import ArrowIcon from "../../icons/ArrowIcon";
import { useFormik } from "formik";

function Paginator() {
	const resultPageForm = useFormik({
		initialValues: {
			pageNumber: "",
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<div className="paginator">
			<button className="paginatorBtn paginatorBtn-left">
				<ArrowIcon />
			</button>
			<form
				onSubmit={resultPageForm.handleSubmit}
				className=" paginator_form"
				action=""
			>
				<input
					id="pageNumber"
					name="pageNumber"
					type="number"
					placeholder="1"
					onChange={resultPageForm.handleChange}
					value={resultPageForm.values.pageNumber}
				></input>
				<button type="submit" className=" paginator_goBtn paginatorBtn ">
					GO
				</button>
			</form>

			<button className="paginatorBtn paginatorBtn-right">
				<ArrowIcon />
			</button>
		</div>
	);
}

export default Paginator;
