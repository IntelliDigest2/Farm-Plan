// function TurnOverData() {
// 	return <div>TurnOverData</div>;
// }

// export default TurnOverData;

import React from "react";
import { connect } from "react-redux";

export const TurnOverData = (props) => {
	return <div>TurnOverData</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TurnOverData);
