import React from "react";
import "../../../App.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./UserAccount.css";
import "../Pages.css";
import { FoodBubble } from "./Personal/FoodBubble";
import { FoodWasteBubble } from "./Personal/FoodWasteBubble";
//import { FoodSurplusBubble } from "./Personal/FoodSurplusBubble";
import { PersonalBubble } from "./Personal/PersonalBubble";
import { FarmBubble } from "./Farm/FarmBubble";
import { BusinessBubble } from "./Business/BusinessBubble";
import { AcademicBubble } from "./Academic/AcademicBubble";
import { SubButton } from "../SubComponents/Button";
import { Profile } from "../SubComponents/Profile";
import { Container } from "react-bootstrap";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//import { BrowserView, MobileView } from "react-device-detect";
//import { BsFillExclamationCircleFill } from "react-icons/bs"; (le)

//userAccount is built using components called "bubbles", some bubbles are specific to the account type, eg FarmBubble- and these components will be found in the specific account type folder (components/Pages/Account/[type]).

function Account(props) {
  if (!props.auth.uid) {
    return <Redirect to="/login" />;
  }
  switch (props.profile.buildingFunction) {
    case "Farm":
      //console.log(props.auth.uid);
      return (
        <>
          <Container fluid className="web-center">
            <Profile profile={props.profile} />
            <FarmBubble />
            <PersonalBubble />
            <SubButton
              styling="blue"
              goTo="/change-password"
              text="Change Password"
            />
          </Container>
        </>
      );

    case "Schools" || "Academic":
      //console.log(props.profile);
      return (
        <>
          <Container fluid className="web-center">
            <Profile profile={props.profile} />
            <AcademicBubble />
            <PersonalBubble />
            <SubButton
              styling="blue"
              goTo="/change-password"
              text="Change Password"
            />
          </Container>
        </>
      );

    //business profile
    case "Hospitals" ||
      "Hotels" ||
      "Offices" ||
      "Restaurants" ||
      "Shop/Supermarket" ||
      "Recreational Centers" ||
      "Business":
      //console.log(props.profile.buildingFunction);
      return (
        <>
          <Container fluid className="web-center">
            <Profile profile={props.profile} />
            <BusinessBubble />
            <PersonalBubble />
            <SubButton
              styling="blue"
              goTo="/change-password"
              text="Change Password"
            />
          </Container>
        </>
      );

    //personal profile
    case "Households":
    default:
      //console.log(props.auth.uid);
      return (
        <>
          <Container fluid className="web-center">
            <Profile profile={props.profile} />
            <FoodBubble />
            <FoodWasteBubble />
            <SubButton
              styling="blue"
              goTo="/change-password"
              text="Change Password"
            />
          </Container>
        </>
      );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "users",
        doc: props.auth.uid,
      },
    ];
  })
)(Account);
