// import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CompleteSignUp(params) {
  // const [stage, setState] = useState(null);

  const location = useLocation();
  const { stage, uid } = location.state || {};

  // useEffect(() => {
  //   const url = new URL(window.location.href);s
  //   const params = new URLSearchParams(url.search);
  //   const stage = params.get("stage");
  //   setState(stage);
  // }, []);
  //
  console.log("After Link", { stage });

  return (
    <>
      <h1>Stage, {(stage, uid)}</h1>
    </>
  );
}
