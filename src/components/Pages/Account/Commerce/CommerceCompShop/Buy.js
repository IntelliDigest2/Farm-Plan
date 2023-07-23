import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";
import { useTranslation, Trans } from 'react-i18next';

import Search from "./Search";

function Buy(props) {
	const { t } = useTranslation();

	return (
		<>
		<p>Search by Keywords, Product Name, Price or Location</p>
			<Search profile={props.profile}/>
		</>
		
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

const mapStateToProps = (state) => {
	return {
	  profile: state.firebase.profile,
	};
  }
  
export default connect(mapStateToProps, null)(Buy);
  

