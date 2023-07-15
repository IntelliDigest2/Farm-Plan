import React, { useEffect, useState } from "react";
import { getFarmerData } from "../../../../../store/actions/marketplaceActions/farmPlanData";
import { connect } from "react-redux";
import LoadingScreen from "../../../../SubComponents/Loading/LoadingScreen";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import Aquaculture from "./FarmCategories/Aquaculture";
import Forestry from "./FarmCategories/Forestry";
import Insect from "./FarmCategories/Insect";
import Livestock from "./FarmCategories/Livestock";

import "./FarmPlan.css";

import Horticulture from "./FarmCategories/Horticulture";

function FarmPlan(props) {
	//handles loading page
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 1500);
	});
	useEffect(() => {
		props.getFarmerData();
	}, []);

	console.log(props.data);

	const Control = () => {
		switch (props.data[0].sector) {
			default:
			case "Horticulture":
				return <Horticulture />;
			case "Livestock":
				return <Livestock />;
			case "Aquaculture":
				return <Aquaculture />;
			case "Insect Farm":
				return <Insect />;
			case "Forestry":
				return <Forestry />;
		}
	};

	return (
		<>
			{!loading ? (
				<PageWrap header="My Farm Plan" goTo="/account">
					<Control />
				</PageWrap>
			) : (
				<LoadingScreen />
			)}
		</>
	);
}

function Dev({ sector }) {
	return (
		<>
			<div className="basic-title">
				We are sorry.
				<p>
					Planning for {sector} is currrently in development, we'll let you know
					when it's ready to go.
				</p>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		data: state.data.getData,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getFarmerData: () => dispatch(getFarmerData()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmPlan);
