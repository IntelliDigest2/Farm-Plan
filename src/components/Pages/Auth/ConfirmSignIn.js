import React, { useState } from "react";

import { MobileWrap } from "./Mobile/MobComponents";

import { signIn } from "../../../store/actions/authActions";

function ConfirmSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <MobileWrap
      header="settings"
      subtitle="Sign in to change your details"
    ></MobileWrap>
  );
}

export default ConfirmSignIn;
