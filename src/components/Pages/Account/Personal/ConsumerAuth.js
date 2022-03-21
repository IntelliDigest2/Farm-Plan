import React, { useState } from "react";

import { PageWrap } from "../../SubComponents/PageWrap";

import { connect } from "react-redux";

const ConsumerAuth = () => {};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ConsumerAuth);
