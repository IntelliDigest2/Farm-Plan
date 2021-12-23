import React from "react";
import "../../../App.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./UserAccount.css";
import "../Pages.css";
import { FoodBubble } from "./Personal/FoodBubble";
import { FoodWasteBubble } from "./Personal/FoodWasteBubble";
import { FoodSurplusBubble } from "./Personal/FoodSurplusBubble";
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
//import { BsFillExclamationCircleFill } from "react-icons/bs";

//userAccount is built using components called "bubbles", some bubbles are specific to the account type, eg FarmBubble- and these components will be found in the specific account type folder.

function Account(props) {
  if (!props.auth.uid) {
    return <Redirect to="/login" />;
  }
  //so far each of these are identical (needs to be changed)
  switch (props.profile.buildingFunction) {
    case "Farm":
      console.log(props.auth.uid);
      return (
        <>
          <Container fluid className="web-center">
            <Profile name={props.profile.firstName + props.profile.lastName} />
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

    case "Schools":
      console.log(props.profile.buildingFunction);
      return (
        <>
          <Container fluid className="web-center">
            <Profile name={props.profile.firstName + props.profile.lastName} />
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
      "Recreational Centers":
      console.log(props.profile.buildingFunction);
      return (
        <>
          <Container fluid className="web-center">
            <Profile name={props.profile.firstName + props.profile.lastName} />
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
      console.log(props.auth.uid);
      return (
        <>
          <Container fluid className="web-center">
            <Profile
              name={props.profile.firstName + " " + props.profile.lastName}
            />
            <FoodBubble />
            <FoodSurplusBubble />
            <FoodWasteBubble />
            <SubButton
              styling="blue"
              goTo="/change-password"
              text="Change Password"
            />
          </Container>
        </>
      );

    default:
      console.log(props.profile.buildingFunction);
      return (
        <>
          <Container fluid className="web-center">
            <Profile name={props.profile.firstName + props.profile.lastName} />
            <FoodBubble />
            <FoodSurplusBubble />
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
  firestoreConnect([{ collection: "users" }])
)(Account);
