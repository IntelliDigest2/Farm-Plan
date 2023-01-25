import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormGroup, Container, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createGiftFoodData,
  createMapData,
} from "./../../../../store/actions/dataActions";
import { Redirect } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { PageWrap } from "../../../SubComponents/PageWrap";
import { Dropdown } from "../../../SubComponents/Dropdown";
import { DefaultButton, SubButton } from "../../../SubComponents/Button";
import { Divider } from "@mui/material";
import { submitNotification } from "../../../lib/Notifications";

const GiftFood = (props) => {
  const [redirectTo, setRedirectTo] = useState(false);
  

  //useEffect to redirect if not correct account type
  useEffect(() => {
    if (props.profile.type) {
      if (
        !String(props.profile.type).includes("household") &&
        !String(props.profile.type).includes("user")
      ) {
        console.log(props.profile.type);
        // setRedirectTo(true);
      }
    }
  }, [props.profile]);

  const defaultUpload = {
    edibleInedible: "Inedible",
    foodWasteWeight: 0,
    weightType: "Select Unit",
    carbsContent: 0,
    carbsPerUnit: "Select Unit",
    proteinContent: 0,
    proteinPerUnit: "Select Unit",
    fatContent: 0,
    fatPerUnit: "Select Unit",
    ghg: 0,
    expiryDate: "",
    foodWasteCost: 0,
    currency: "Select Currency",
  };

  const defaultMultipliers = {
    weightMultiplier: 0,
    currencyMultiplier: 0,
    carbsMultiplier: 0,
    proteinMultiplier: 0,
    fatMultiplier: 0,
  };

  //Upload state
  const [upload, setUpload] = useState({ ...defaultUpload });

  //Multiplier state
  const [multipliers, setMultipliers] = useState({ ...defaultMultipliers });

  useEffect(() => {
    handleGHGChange();
  }, [
    upload.edibleInedible,
    upload.foodWasteWeight,
    upload.weightType,
    upload.currency,
    upload.carbsContent,
    upload.carbsPerUnit,
    upload.proteinContent,
    upload.proteinPerUnit,
    upload.fatContent,
    upload.fatPerUnit,
  ]);

  //Update upload state
  const updateStateValue = (e) => {
    if (e.target.textContent) {
      setUpload({ ...upload, [e.target.id]: e.target.textContent });
    } else {
      setUpload({ ...upload, [e.target.id]: e.target.value });
    }
  };

  //Change multiplier values
  const changeMultiplier = (e) => {
    let stringArray = e.target.id.toString().split(/PerUnit|Type/);
    let typeString = stringArray[0] + "Multiplier";
    let val;
    switch (e.target.textContent) {
      //Weight (Food Waste)
      case "kg":
      case "l":
        val = 1;
        break;
      case "g":
      case "ml":
        val = 0.001;
        break;
      case "oz":
        val = 0.028;
        break;
      case "lbs":
        val = 0.454;
        break;
      //Weight Unit (Carbs, Fat, Protein)
      case "100g":
      case "100ml":
        val = 0.01;
        break;
      case "500g":
      case "500ml":
        val = 0.002;
        break;
      case "1l":
      case "1kg":
        val = 0.001;
        break;
      //Currency Unit (GBP (£), USD ($), EUR (€))
      case "GBP (£)":
        val = 1;
        break;
      case "USD ($)":
        val = 1.404;
        break;
      case "EUR (€)":
        val = 1.161;
        break;
      default:
        val = 1;
    }
    setMultipliers({ ...multipliers, [typeString]: val });
  };

  const handleGHGChange = () => {
    // if (upload.edibleInedible === "Edible") {
    //   var ghg = Number(
    //     20 *
    //       16.0424 *
    //       multipliers.weightMultiplier *
    //       upload.foodWasteWeight *
    //       (0.01852 * multipliers.carbsMultiplier * upload.carbsContent +
    //         0.01744 * multipliers.proteinMultiplier * upload.proteinContent +
    //         0.04608 * multipliers.fatMultiplier * upload.fatContent)
    //   );
    // } else {
    var ghg = Number(
      upload.foodWasteWeight * multipliers.weightMultiplier * 2.5
    );
    // }
    setUpload({
      ...upload,
      ghg: ghg,
      foodWasteCost: (
        Number(upload.foodWasteWeight) *
        0.85 *
        multipliers.weightMultiplier *
        multipliers.currencyMultiplier
      ).toFixed(2),
    });
  };

  const handleFoodWasteSubmit = () => {
    var wm;
    switch (upload.weightType) {
      default:
      case "kg":
      case "l":
        wm = 1;
        break;
      case "g":
      case "ml":
        wm = 0.001;
        break;
      case "oz":
        wm = 0.028;
        break;
      case "lbs":
        wm = 0.454;
        break;
    }

    const mapData = {
      masterCollection: "mapData",
      uid: props.auth.uid,
      upload: {
        foodWasteWeight: upload.foodWasteWeight * wm,
      },
    };

    //Setup data to be sent to generic create firestore function (TO BE RENAMED LATER)
    //If sub account, use admin uid, if admin or personal use your own
    var uid, masterCollection;
    switch (props.profile.type) {
      case "business_admin":
        masterCollection = "business_users";
        uid = props.auth.uid;
        break;
      case "business_sub":
        masterCollection = "business_users";
        uid = props.profile.admin;
        break;
      case "academic_admin":
        masterCollection = "academic_users";
        uid = props.auth.uid;
        break;
      case "academic_sub":
        masterCollection = "academic_users";
        uid = props.profile.admin;
        break;
      case "farm_admin":
        masterCollection = "farm_users";
        uid = props.auth.uid;
        break;
      case "farm_sub":
        masterCollection = "farm_users";
        uid = props.profile.admin;
        break;
      case "household_admin":
        masterCollection = "household_users";
        uid = props.auth.uid;
        break;
      case "household_sub":
        masterCollection = "household_users";
        uid = props.profile.admin;
        break;
      default:
        masterCollection = "data";
        uid = props.auth.uid;
        break;
    }

    const data = {
      uid: uid,
      masterCollection: masterCollection,
      collection: "writtenGiftFoodData",
      upload: {
        date: getFirebase().firestore.Timestamp.fromDate(new Date()),
        ...upload,
      },
    };

    props.createGiftFoodData(data);
    props.createMapData(mapData);
    submitNotification("Success", "Food had been added to your gifted items!");
    setUpload(defaultUpload);
    setMultipliers(defaultMultipliers);
  };

  //Redirect if not loged in
  if (!props.auth.uid) return <Redirect to="/login" />;

  //Redirect if not a personal/household account
  if (redirectTo) return <Redirect to="/account" />;

  return (
    <PageWrap
      header="Update Food Waste"
      subtitle="Upload Edible or Inedible Food Waste"
      goTo="/account"
    >
      <Container fluid className="web-center">
        <Form>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Edible or Inedible
            </Form.Label>
            <Dropdown
              id="edibleInedible"
              styling="grey dropdown-input"
              data={upload.edibleInedible}
              function={(ekey, e) => {
                updateStateValue(e);
              }}
              items={["Edible", "Inedible"]}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Weight / Volume
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                id="foodWasteWeight"
                onChange={(e) => {
                  updateStateValue(e);
                }}
                value={upload.foodWasteWeight}
              />
              <Dropdown
                id="weightType"
                styling="grey dropdown-input-right"
                data={upload.weightType}
                function={(ekey, e) => {
                  changeMultiplier(e);
                  updateStateValue(e);
                }}
                items={["kg", "g", "/", "oz", "lbs", "/", "l", "ml"]}
              />
            </InputGroup>
          </FormGroup>
          <EdibleInedible
            upload={upload}
            multipliers={multipliers}
            changeMultiplier={changeMultiplier}
            updateStateValue={updateStateValue}
          />
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>GHG</Form.Label>
            <InputGroup>
              <Form.Control
                type="ghg"
                value={upload.ghg}
                title={upload.ghg}
                readOnly
              />
              <InputGroup.Append>
                <InputGroup.Text>kg co2</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
          <EnableSubmit
            upload={upload}
            handleFoodWasteSubmit={handleFoodWasteSubmit}
          />
        </Form>
      </Container>
    </PageWrap>
  );
};

const EdibleInedible = (props) => {
  const [showModal, setShow] = useState(true);

  const handleClose = () => setShow(false);

  if (props.upload.edibleInedible === "Edible") {
    //setShow(true)
    return (
      <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edible Waste</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>To add edible item to the food waste,</p>
            <p>You need to add the item to your inventory </p>
          </Modal.Body>
        <Modal.Footer>
        <SubButton
              text="Go To Inventory"
              goTo="/meal-plan"
              styling="green"
            />
        </Modal.Footer>
      </Modal>
      </>
    );
  } else {
    return null;
  }
};

const EnableSubmit = (props) => {
  if (props.upload.edibleInedible === "Edible") {
    if (
      props.upload.foodWasteWeight > 0 &&
      props.upload.weightType !== "Select Unit" &&
      props.upload.expiryDate !== "" &&
      props.upload.currency !== "Select Currency"
    ) {
      return (
        <FormGroup className="mb-3">
          <Divider />
          <DefaultButton
            text="Update"
            styling="green"
            onClick={(e) => {
              props.handleFoodWasteSubmit();
            }}
          />
        </FormGroup>
      );
    } else {
      return <DefaultButton text="Update" styling="green" disabled="true" />;
    }
  } else {
    if (
      props.upload.foodWasteWeight > 0 &&
      props.upload.weightType !== "Select Unit"
    ) {
      return (
        <FormGroup className="mb-3">
          <Divider />
          <DefaultButton
            text="Update"
            styling="green"
            onClick={(e) => {
              props.handleFoodWasteSubmit();
            }}
          />
        </FormGroup>
      );
    } else {
      return <DefaultButton text="Update" styling="green" disabled="true" />;
    }
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.firestore.ordered.data,
    user: state.firebase.profile,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createGiftFoodData: (product) => dispatch(createGiftFoodData(product)),
    createMapData: (product) => dispatch(createMapData(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftFood);
