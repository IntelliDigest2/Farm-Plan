import React from "react";
import { connect } from "react-redux";
import { PageWrap } from "../../../../components/SubComponents/PageWrap";


const Intervention = () => {
  return <>
  <PageWrap goTo="/account"></PageWrap></>;
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, null)(Intervention);

