import React from "react";
import "./Paginator.css";
import ArrowIcon from "../../icons/ArrowIcon";
import { useFormik } from "formik";

function Paginator() {


    // const currentPage=1
	const resultPageForm = useFormik({
		initialValues: {
			pageNumber: "",
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

    const goToPreviousPage=(value)=>{
        function to fetch page
    }
    const goToNextPage=(value)=>{
        if()
    }

	return (
		<div className="paginator">
			<button onClick={goToPreviousPage} className="paginatorBtn paginatorBtn-left">
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

			<button onClick={goToNextPage} className="paginatorBtn paginatorBtn-right">
				<ArrowIcon />
			</button>
		</div>
	);
}

export default Paginator;
