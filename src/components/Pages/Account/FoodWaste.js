import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  startData,
  createFoodWasteData,
} from "../../../store/actions/dataActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";
import { fs } from "../../../config/fbConfig";
import { Divider } from "@material-ui/core";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import addNotification from "react-push-notification";

// import {Chart} from "react-google-charts"

const time = moment().format("MMMM Do YYYY, h:mm:ss a");

const dailyTabTime = moment().format("ddd MMM Do YYYY");

// const chartSubmissionDay = moment().format("ddd")
// const chartSubmissionWeek = moment().format("W")
// const chartSubmissionMonth = moment().format("MMM")
// const chartSubmissionDate = moment().format("Do")
// const chartSubmissionYear = moment().format("YYYY")
// const chartSubmissionFullDate = moment().format("ddd MMM Do YYYY")

class FoodWaste extends Component {
  state = {
    name: this.props.user.firstName,
    email: this.props.auth.email,
    uid: this.props.auth.uid,
    filteredData: [],

    formWidth: "",
    formHeight: "",

    submissionType: "Waste",

    // meal: "Select Meal",

    // foodName: "",

    // checkedA: false,
    // checkedB: false,
    // eatingInOrOut: "",

    edibleInedibleSurplus: "Select",

    foodWasteWeight: 0,
    weightType: "Select Unit",
    weightMultiplier: 0,

    // edibleFoodWasteType: "Select Type",
    // inedibleFoodWasteType: "Select Type",

    carbsContent: 0,
    carbsPer: "Select Unit",
    /*meaning carbs per given unit eg carbs per 100g */
    carbsMultiplier: 0,
    proteinContent: 0,
    proteinPer: "Select Unit",
    proteinMultiplier: 0,
    fatContent: 0,
    fatPer: "Select Unit",
    fatMultiplier: 0,

    // producedLocally: "Select Local or Non-local",

    expiryDate: "",

    // moisture: 0,
    // showMoisture: false,

    // inedibleMoisture: 0,

    // volumeOfFoodWaste: 0,

    ghg: 0,

    // inedibleGHG: 0,
    // dailyFoodSurplus: 0,

    foodWasteCost: 0,
    currency: "Select Currency",
    currencyMultiplier: 0,

    notes: "n/a",
    projectName: "n/a",
    foodName: "n/a",

    // costOfInedibleFoodWaste: 0,

    // dropDownValueIFW: "Select Currency",
    // currencyMultiplierIFW: 0,

    chartSubmissionDay: moment().format("ddd"),
    chartSubmissionWeek: moment().format("W"),
    chartSubmissionMonth: moment().format("MMM"),
    chartSubmissionDate: moment().format("Do"),
    chartSubmissionYear: moment().format("YYYY"),
    chartSubmissionFullDate: moment().format("ddd MMM Do YYYY"),

    totalEdibleWeight: 0,
    totalEdibleGHG: 0,
    totalEdibleCost: 0,

    totalInedibleWeight: 0,
    totalInedibleGHG: 0,
    // totalInedibleCost: 0,

    // totalSurplusWeight: 0,
    // totalSurplusGHG: 0,
    // totalSurplusCost: 0,

    // showComposition: false,

    // dataChartEFW: [['Food Wastage Type', 'Food Wastage Weight']],

    // autocompleteEntries: [
    //     {}
    // ]
  };

  clearEFWForm = () => {
    this.setState({
      // meal: "Select Meal",
      // foodName: "",
      // checkedA: false,
      // checkedB: false,
      // eatingInOrOut: "",
      edibleInedibleSurplus: "Select",
      foodWasteWeight: 0,
      weightType: "Select Unit",
      // producedLocally: "Select Local or Non-local",
      expiryDate: "",
      // edibleFoodWasteType: "Select Type",
      carbsContent: 0,
      carbsPer: "Select Unit",
      carbsMultiplier: 0,
      proteinContent: 0,
      proteinPer: "Select Unit",
      proteinMultiplier: 0,
      fatContent: 0,
      fatPer: "Select Unit",
      fatMultiplier: 0,
      // moisture: 0,
      ghg: 0,
      foodWasteCost: 0,
      currency: "Select Currency",
      currencyMultiplier: 0,
      formHeight: "1110px",
    });
  };

  notificationTest = () => {
    addNotification({
      title: "Success!",
      message: "Food Waste successfully updated!",
      // theme: 'darkblue',
      // native: false,
      backgroundTop: "#aab41e", //optional, background color of top container.
      backgroundBottom: "#aab41e", //optional, background color of bottom container.
      closeButton: "Close",
      duration: 4000,
    });
  };

  changeCurrency(text) {
    this.setState({ currency: text });
  }

  changeCurrencyMultiplier(value) {
    this.setState({ currencyMultiplier: value });
  }

  changeWeightMultiplier(value) {
    this.setState({ weightMultiplier: value });
  }

  changeCarbsUnitMultiplier(value) {
    this.setState({ carbsMultiplier: value });
  }

  changeProteinUnitMultiplier(value) {
    this.setState({ proteinMultiplier: value });
  }

  changeFatUnitMultiplier(value) {
    this.setState({ fatMultiplier: value });
  }

  handleChange = (e) => {
    // console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleEdibleInedibleSurplusChange = (e) => {
    // console.log(e)
    this.setState({ edibleInedibleSurplus: e });
  };

  handleWeightUnitChange(text) {
    this.setState({ weightType: text });
  }

  handleCarbsUnitChange(text) {
    this.setState({ carbsPer: text });
  }

  handleProteinUnitChange(text) {
    this.setState({ proteinPer: text });
  }

  handleFatUnitChange(text) {
    this.setState({ fatPer: text });
  }

  handleFoodWasteGHGChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      ghg: Number(e.target.value),
    });
  };

  handleFoodCostChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      foodWasteCost: (Number(e.target.value) * 0.85).toFixed(2),
    });
  };

  handleInedibleFoodCostChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      costOfInedibleFoodWaste: (Number(e.target.value) * 0.85).toFixed(2),
    });
  };

  handleCarbsContentChange(event) {
    this.setState({ carbsContent: event.target.value });
  }

  handleProteinContentChange(event) {
    this.setState({ proteinContent: event.target.value });
  }

  handleFatContentChange(event) {
    this.setState({ fatContent: event.target.value });
  }

  pressButton = (e) => {
    e.preventDefault();
    this.props.startData(this.state);
  };

  handleFoodWasteSubmit = (e) => {
    e.preventDefault();
    this.setState({});
    this.props.createFoodWasteData(this.state);
  };

  handleFormHeight(text) {
    if (text === "Select" || text === "Edible") {
      this.setState({ formHeight: "1110px" });
    } else if (text === "Inedible") {
      this.setState({ formHeight: "670px" });
    }
  }

  fetchData = async () => {
    fs.collection("data")
      .doc(this.state.uid)
      .collection("writtenFoodWasteData")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var fd = doc.data().FULLDATE;
          var st = doc.data().SUBMISSIONTYPE;

          var weight = doc.data().weight;
          var wu = doc.data().WEIGHTUNIT;
          /* var carbs = doc.data().carbs;
          var cu = doc.data().CARBSUNIT;
          var protein = doc.data().protein;
          var pu = doc.data().PROTEINUNIT;
          var fat = doc.data().fat;
          var fu = doc.data().FATUNIT; */
          var ghg = doc.data().GHG;
          var cost = doc.data().COST;
          var curr = doc.data().CURRENCY;
          var eis = doc.data().EDIBLEORINEDIBLE;

          var newWeight = 0;
          /*var newCarbs = 0;
          var newProtein = 0;
          var newFat = 0; */
          var newCost = 0;

          if (wu === "kg" || wu === "l") {
            newWeight = Number(weight * 1);
          } else if (wu === "g" || wu === "ml") {
            newWeight = Number((weight * 0.001).toFixed(3));
          } else if (wu === "oz") {
            newWeight = Number((weight * 0.028).toFixed(3));
          } else if (wu === "lbs") {
            newWeight = Number((weight * 0.454).toFixed(3));
          }

          /*if (cu === "1kg" || cu === "1L") {
            newCarbs = Number(carbs * 1);
          } else if (cu === "100g" || cu === "100ml") {
            newCarbs = Number((carbs * 0.1).toFixed(3));
          } else if (cu === "500g" || cu === "500ml") {
            newCarbs = Number((carbs * 0.5).toFixed(3));
          }

          if (pu === "1kg" || pu === "1L") {
            newProtein = Number(protein * 1);
          } else if (pu === "100g" || pu === "100ml") {
            newProtein = Number((protein * 0.1).toFixed(3));
          } else if (pu === "500g" || pu === "500ml") {
            newProtein = Number((protein * 0.5).toFixed(3));
          }

          if (fu === "1kg" || fu === "1L") {
            newFat = Number(fat * 1);
          } else if (fu === "100g" || fu === "100ml") {
            newFat = Number((fat * 0.1).toFixed(3));
          } else if (fu === "500g" || fu === "500ml") {
            newFat = Number((fat * 0.5).toFixed(3));
          } 
          this section will only be needed if we change the bottom section of the form*/

          if (curr === "GBP (£)") {
            newCost = Number(cost * 1);
          } else if (curr === "USD ($)") {
            newCost = Number((cost / 1.404).toFixed(2));
          } else if (curr === "EUR (€)") {
            newCost = Number((cost / 1.161).toFixed(2));
          }

          if (fd === dailyTabTime && st === "Waste" && eis === "Edible") {
            this.setState((prevState) => ({
              totalEdibleWeight: (prevState.totalEdibleWeight += newWeight),
              totalEdibleGHG: (prevState.totalEdibleGHG += ghg),
              totalEdibleCost: (prevState.totalEdibleCost += newCost),
            }));
          } else if (
            fd === dailyTabTime &&
            st === "Waste" &&
            eis === "Inedible"
          ) {
            this.setState((prevState) => ({
              totalInedibleWeight: (prevState.totalInedibleWeight += newWeight),
              totalInedibleGHG: (prevState.totalInedibleGHG += ghg),
              // totalEdibleCost: prevState.totalEdibleWeight += newCost
            }));
          }
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchData();

    if (isMobile) {
      this.setState({ formWidth: "72vw", formHeight: "1110px" });
    } else if (isBrowser) {
      this.setState({ formWidth: "261px", formHeight: "1110px" });
    }
  }

  render() {
    const { data, auth } = this.props;
    // console.log(data.[auth.uid].writtenFoodWasteData);
    // console.log(time);
    // console.log(Date(time));
    const { foodWaste, foodSurplus } = this.state;
    if (!auth.uid) return <Redirect to="/login" />;
    if (data) {
      const filteredData =
        data && data.filter((datas) => datas.email === auth.email);
      // console.log(foodWaste);
      // console.log(foodSurplus);

      // 284 - paddingBottom:

      return (
        <div
          // className="container"
          style={{ width: "100%", height: "100%" }}
        >
          <MobileView>
            <h6
              style={{
                paddingTop: "8vh",
                color: "black",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Update Edible/Inedible Food Waste
            </h6>
          </MobileView>
          <BrowserView>
            <h4
              style={{
                paddingTop: "8vh",
                color: "black",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Update Edible/Inedible Food Waste
            </h4>
          </BrowserView>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Button
              style={{ width: this.state.formWidth, borderColor: "#aab41e" }}
              className="custom-btn-2"
              as={Link}
              to="/account"
            >
              Back
            </Button>
          </div>

          {filteredData.length === 0 ? (
            <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex not-found">
              <Col
                className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2"
                xs={12}
              ></Col>
              <Col className="mt-5 pt-5" xs={12}></Col>
              <Col className="" xs={12} lg={4}></Col>
              <Col
                className=" justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0"
                xs={12}
                lg={4}
              >
                <CardStyle>
                  <Card>
                    <Card.Body>
                      <Card.Text className="text-center">
                        <h1
                          style={{
                            fontSize: "33px",
                            fontWeight: "600",
                            color: "rgb(55, 85, 54)",
                          }}
                        >
                          Start tracking your food waste now
                        </h1>
                        <button
                          onClick={this.pressButton}
                          style={{ outline: "none", border: "none" }}
                        >
                          Start now
                        </button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </CardStyle>
              </Col>
              <Col className="mt-5 pt-5" xs={12} lg={4}></Col>
              <Col className="mt-5 pt-5" xs={12}></Col>
              <Col className="mt-5 pt-5" xs={12}></Col>
            </Row>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
                height: "190%",
              }}
            >
              {/* <BrowserView> */}

              <Card
                style={{
                  // width: "90%",
                  width: this.state.formWidth,
                  // height: "100%"
                  height: this.state.formHeight,
                  marginBottom: "10vh",
                  // backgroundColor: 'lightgray'
                }}
              >
                {/* onSubmit={this.handleFoodWasteSubmit}     */}
                <Form className="form-layout" style={{ padding: "10px" }}>
                  <h5
                    className="text-center"
                    style={{
                      margin: "30px",
                      fontSize: "23px",
                      fontWeight: "600",
                    }}
                  >
                    Food Waste
                  </h5>

                  <div>
                    <div style={{ padding: "0 10% 0 10%" }}>
                      Edible or Inedible
                    </div>
                    <Form.Group
                      style={{
                        padding: "0 10% 0 10%",
                        display: "flex",
                      }}
                    >
                      <InputGroup>
                        <DDMenuStyle>
                          <Dropdown>
                            <DropdownToggle
                              variant="secondary"
                              style={{ width: "190px" }}
                              className="dd"
                            >
                              {this.state.edibleInedibleSurplus}
                            </DropdownToggle>
                            <DropdownMenu>
                              {/* as="button" */}
                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) => {
                                    this.handleEdibleInedibleSurplusChange(
                                      e.target.textContent
                                    );
                                    this.handleFormHeight(e.target.textContent);
                                  }}
                                >
                                  Edible
                                </div>
                              </DropdownItem>

                              {/* as="button" */}
                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) => {
                                    this.handleEdibleInedibleSurplusChange(
                                      e.target.textContent
                                    );
                                    this.handleFormHeight(e.target.textContent);
                                  }}
                                >
                                  Inedible
                                </div>
                              </DropdownItem>

                              {/* <DropdownItem as="button" type="button">
                                            <div onClick={(e) => {this.handleEdibleInedibleSurplusChange(e.target.textContent); this.handleFormHeight(e.target.textContent)}}>
                                                Surplus
                                            </div>
                                        </DropdownItem> */}
                            </DropdownMenu>
                          </Dropdown>
                        </DDMenuStyle>
                      </InputGroup>
                    </Form.Group>

                    <div>
                      {this.state.edibleInedibleSurplus === "Edible" ||
                      this.state.edibleInedibleSurplus === "Select" ? (
                        <div>
                          <div style={{ padding: "0 10% 0 10%" }}>
                            Weight / Volume
                          </div>
                          <Form.Group
                            className="form-layout"
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="foodWasteWeight"
                                placeholder="Enter weight of food waste"
                                onChange={(e) => {
                                  this.handleFoodWasteGHGChange(e);
                                  this.handleFoodCostChange(e);
                                }}
                                width="100%"
                                value={this.state.foodWasteWeight}
                              />
                              {/* <Form.Control type="number" id="weightOfEdibleFoodWaste" placeholder="Enter weight of food waste" onChange={(e) => {this.handleEdibleFoodWasteGHGChange(e); this.handleEdibleFoodCostChange(e)}} width="100%" value={this.state.weightOfEdibleFoodWaste}/>
                            <InputGroup.Append>
                                <InputGroup.Text>kg</InputGroup.Text>
                            </InputGroup.Append> */}

                              <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={this.state.weightType}
                                id="wtdd"
                              >
                                <Dropdown.Header>
                                  Weight (Solids)
                                </Dropdown.Header>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleWeightUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeWeightMultiplier(1);
                                    }}
                                  >
                                    kg
                                  </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleWeightUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeWeightMultiplier(0.001);
                                    }}
                                  >
                                    g
                                  </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleWeightUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeWeightMultiplier(0.028);
                                    }}
                                  >
                                    oz
                                  </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleWeightUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeWeightMultiplier(0.454);
                                    }}
                                  >
                                    lbs
                                  </div>
                                </DropdownItem>

                                <Dropdown.Divider />

                                <Dropdown.Header>
                                  Volume (Liquids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleWeightUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeWeightMultiplier(1);
                                    }}
                                  >
                                    l
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleWeightUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeWeightMultiplier(0.001);
                                    }}
                                  >
                                    ml
                                  </div>
                                </DropdownItem>
                              </DropdownButton>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Carbs Content per unit, eg carbs per 100g
                          </div>
                          <Form.Group
                            className="form-layout"
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="carbsContent"
                                placeholder="Enter carbohydrate content per unit (eg Carbs per 100g)."
                                onChange={(e) => {
                                  this.handleCarbsContentChange(e);
                                }}
                                width="100%"
                                value={this.state.carbsContent}
                              />
                              <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={this.state.carbsPer}
                                id="cperu"
                              >
                                <Dropdown.Header>
                                  Weight (Solids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleCarbsUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeCarbsUnitMultiplier(0.01);
                                    }}
                                  >
                                    100g
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleCarbsUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeCarbsUnitMultiplier(0.002);
                                    }}
                                  >
                                    500g
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleCarbsUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeCarbsUnitMultiplier(0.001);
                                    }}
                                  >
                                    1kg
                                  </div>
                                </DropdownItem>

                                <Dropdown.Divider />

                                <Dropdown.Header>
                                  Volume (Liquids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleCarbsUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeCarbsUnitMultiplier(0.01);
                                    }}
                                  >
                                    100ml
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleCarbsUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeCarbsUnitMultiplier(0.002);
                                    }}
                                  >
                                    500ml
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleCarbsUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeCarbsUnitMultiplier(0.001);
                                    }}
                                  >
                                    1L
                                  </div>
                                </DropdownItem>
                              </DropdownButton>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Protein Content per unit
                          </div>
                          <Form.Group
                            className="form-layout"
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="proteinContent"
                                placeholder="Enter protein content per unit (eg protein per 100g)."
                                onChange={(e) => {
                                  this.handleProteinContentChange(e);
                                }}
                                width="100%"
                                value={this.state.proteinContent}
                              />
                              <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={this.state.proteinPer}
                                id="pperu"
                              >
                                <Dropdown.Header>
                                  Weight (Solids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleProteinUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeProteinUnitMultiplier(0.01);
                                    }}
                                  >
                                    100g
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleProteinUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeProteinUnitMultiplier(0.002);
                                    }}
                                  >
                                    500g
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleProteinUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeProteinUnitMultiplier(0.001);
                                    }}
                                  >
                                    1kg
                                  </div>
                                </DropdownItem>

                                <Dropdown.Divider />

                                <Dropdown.Header>
                                  Volume (Liquids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleProteinUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeProteinUnitMultiplier(0.01);
                                    }}
                                  >
                                    100ml
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleProteinUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeProteinUnitMultiplier(0.002);
                                    }}
                                  >
                                    500ml
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleProteinUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeProteinUnitMultiplier(0.001);
                                    }}
                                  >
                                    1L
                                  </div>
                                </DropdownItem>
                              </DropdownButton>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Fat Content per unit
                          </div>
                          <Form.Group
                            className="form-layout"
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="fatContent"
                                placeholder="Enter fat content per unit (eg fat per 100g)."
                                onChange={(e) => {
                                  this.handleFatContentChange(e);
                                }}
                                width="100%"
                                value={this.state.fatContent}
                              />
                              <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={this.state.fatPer}
                                id="fperu"
                              >
                                <Dropdown.Header>
                                  Weight (Solids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleFatUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeFatUnitMultiplier(0.01);
                                    }}
                                  >
                                    100g
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleFatUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeFatUnitMultiplier(0.002);
                                    }}
                                  >
                                    500g
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleFatUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeFatUnitMultiplier(0.001);
                                    }}
                                  >
                                    1kg
                                  </div>
                                </DropdownItem>

                                <Dropdown.Divider />

                                <Dropdown.Header>
                                  Volume (Liquids)
                                </Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleFatUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeFatUnitMultiplier(0.01);
                                    }}
                                  >
                                    100ml
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleFatUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeFatUnitMultiplier(0.002);
                                    }}
                                  >
                                    500ml
                                  </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.handleFatUnitChange(
                                        e.target.textContent
                                      );
                                      this.changeFatUnitMultiplier(0.001);
                                    }}
                                  >
                                    1L
                                  </div>
                                </DropdownItem>
                              </DropdownButton>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Expiry Date
                          </div>
                          <Form.Group
                            className="form-layout"
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                id="expiryDate"
                                placeholder="DD/MM/YYYY"
                                onChange={(e) => this.handleChange(e)}
                                width="100%"
                                value={this.state.expiryDate}
                              />
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>GHG</div>
                          <Form.Group
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="GHG"
                                placeholder="Enter GHG value"
                                value={(
                                  20 *
                                  16.0424 *
                                  this.state.weightMultiplier *
                                  this.state.ghg *
                                  (0.01852 *
                                    this.state.carbsMultiplier *
                                    this.state.carbsContent +
                                    0.01744 *
                                      this.state.proteinMultiplier *
                                      this.state.proteinContent +
                                    0.04608 *
                                      this.state.fatMultiplier *
                                      this.state.fatContent)
                                ).toFixed(3)}
                                width="100%"
                              />
                              {/*<p style={{width:'100px'}}>kg co2</p>*/}
                              <InputGroup.Append>
                                <InputGroup.Text>kg co2</InputGroup.Text>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>Cost</div>
                          <Form.Group
                            style={{ padding: "0 10% 0 10%", display: "flex" }}
                          >
                            <InputGroup>
                              {/* <InputGroup.Prepend>
                                <InputGroup.Text>£</InputGroup.Text>
                            </InputGroup.Prepend> */}

                              <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title={this.state.currency}
                                id="input-group-dropdown-1"
                                // style ={{backgroundColor: 'white'}}
                              >
                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.changeCurrency(e.target.textContent);
                                      this.changeCurrencyMultiplier(1);
                                    }}
                                  >
                                    GBP (£)
                                  </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.changeCurrency(e.target.textContent);
                                      this.changeCurrencyMultiplier(1.404);
                                    }}
                                  >
                                    USD ($)
                                  </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                  <div
                                    onClick={(e) => {
                                      this.changeCurrency(e.target.textContent);
                                      this.changeCurrencyMultiplier(1.161);
                                    }}
                                  >
                                    EUR (€)
                                  </div>
                                </DropdownItem>
                              </DropdownButton>

                              <Form.Control
                                type="number"
                                id="foodWasteCost"
                                placeholder="Enter cost of food surplus"
                                value={(
                                  this.state.foodWasteCost *
                                  this.state.currencyMultiplier *
                                  this.state.weightMultiplier
                                ).toFixed(2)}
                              />
                              {/*pounds*/}
                            </InputGroup>
                          </Form.Group>

                          {/* this.handleFoodWasteSubmit(e); */}

                          <div>
                            {this.state.edibleInedibleSurplus !== "Select" &&
                            this.state.foodWasteWeight !== 0 &&
                            this.state.weightType !== "Select Unit" &&
                            this.state.expiryDate !== "" &&
                            this.state.currency !== "Select Currency" ? (
                              <Button
                                style={{
                                  margin: "0 10% 0 10%",
                                  backgroundColor: "#aab41e",
                                  width: "80%",
                                  marginTop: "5px",
                                }}
                                onClick={(e) => {
                                  this.handleFoodWasteSubmit(e);
                                  this.notificationTest();
                                  this.clearEFWForm();
                                }}
                                variant="secondary"
                                type="button"
                              >
                                Update
                              </Button>
                            ) : (
                              <Button
                                style={{
                                  margin: "0 10% 0 10%",
                                  width: "80%",
                                  marginTop: "5px",
                                }}
                                variant="secondary"
                                disabled
                              >
                                Update
                              </Button>
                            )}
                          </div>

                          <Divider style={{ marginTop: "25px" }} />

                          <h5
                            className="text-center"
                            style={{
                              marginTop: "25px",
                              marginBottom: "5px",
                              fontSize: "16.5px",
                              fontWeight: "600",
                            }}
                          >
                            Edible Food Waste
                          </h5>
                          <h5
                            className="text-center"
                            style={{
                              marginBottom: "25px",
                              fontSize: "16.5px",
                              fontWeight: "600",
                            }}
                          >
                            {dailyTabTime}
                          </h5>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Total Weight
                          </div>
                          <Form.Group
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="totalEdibleWeight"
                                placeholder=""
                                value={(
                                  this.state.totalEdibleWeight +
                                  this.state.foodWasteWeight *
                                    this.state.weightMultiplier
                                ).toFixed(2)}
                                width="100%"
                              />
                              {/*<p style={{width:'100px'}}>kg co2</p>*/}
                              <InputGroup.Append>
                                <InputGroup.Text>kg</InputGroup.Text>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Total GHG
                          </div>
                          <Form.Group
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                id="totalEdibleGHG"
                                placeholder=""
                                value={(
                                  this.state.totalEdibleGHG +
                                  20 *
                                    16.0424 *
                                    this.state.weightMultiplier *
                                    this.state.ghg *
                                    (0.01852 *
                                      this.state.carbsMultiplier *
                                      this.state.carbsContent +
                                      0.01744 *
                                        this.state.proteinMultiplier *
                                        this.state.proteinContent +
                                      0.04608 *
                                        this.state.fatMultiplier *
                                        this.state.fatContent)
                                ).toFixed(3)}
                                width="100%"
                              />
                              {/*<p style={{width:'100px'}}>kg co2</p>*/}
                              <InputGroup.Append>
                                <InputGroup.Text>kg co2</InputGroup.Text>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form.Group>

                          <div style={{ padding: "0 10% 0 10%" }}>
                            Total Cost
                          </div>
                          <Form.Group
                            style={{
                              padding: "0 10% 0 10%",
                              display: "flex",
                            }}
                          >
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text>£</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="number"
                                id="totalEdibleCost"
                                placeholder=""
                                value={(
                                  this.state.totalEdibleCost +
                                  this.state.foodWasteCost *
                                    this.state.weightMultiplier
                                ).toFixed(2)}
                                width="100%"
                              />
                              {/*<p style={{width:'100px'}}>kg co2</p>*/}
                            </InputGroup>
                          </Form.Group>
                        </div>
                      ) : (
                        <>
                          {this.state.edibleInedibleSurplus === "Inedible" ? (
                            <div>
                              <div style={{ padding: "0 10% 0 10%" }}>
                                Weight / Volume
                              </div>
                              <Form.Group
                                className="form-layout"
                                style={{
                                  padding: "0 10% 0 10%",
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    id="foodWasteWeight"
                                    placeholder="Enter weight of food waste"
                                    onChange={(e) => {
                                      this.handleFoodWasteGHGChange(e);
                                      this.handleFoodCostChange(e);
                                    }}
                                    width="100%"
                                    value={this.state.foodWasteWeight}
                                  />
                                  {/* <Form.Control type="number" id="weightOfEdibleFoodWaste" placeholder="Enter weight of food waste" onChange={(e) => {this.handleEdibleFoodWasteGHGChange(e); this.handleEdibleFoodCostChange(e)}} width="100%" value={this.state.weightOfEdibleFoodWaste}/>
                            <InputGroup.Append>
                                <InputGroup.Text>kg</InputGroup.Text>
                            </InputGroup.Append> */}

                                  <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title={this.state.weightType}
                                    id="wtdd"
                                  >
                                    <Dropdown.Header>
                                      Weight (Solids)
                                    </Dropdown.Header>

                                    {/* as="button" */}
                                    <DropdownItem as="button" type="button">
                                      <div
                                        onClick={(e) => {
                                          this.handleWeightUnitChange(
                                            e.target.textContent
                                          );
                                          this.changeWeightMultiplier(1);
                                        }}
                                      >
                                        kg
                                      </div>
                                    </DropdownItem>

                                    {/* as="button" */}
                                    <DropdownItem as="button" type="button">
                                      <div
                                        onClick={(e) => {
                                          this.handleWeightUnitChange(
                                            e.target.textContent
                                          );
                                          this.changeWeightMultiplier(0.001);
                                        }}
                                      >
                                        g
                                      </div>
                                    </DropdownItem>

                                    {/* as="button" */}
                                    <DropdownItem as="button" type="button">
                                      <div
                                        onClick={(e) => {
                                          this.handleWeightUnitChange(
                                            e.target.textContent
                                          );
                                          this.changeWeightMultiplier(0.028);
                                        }}
                                      >
                                        oz
                                      </div>
                                    </DropdownItem>

                                    {/* as="button" */}
                                    <DropdownItem as="button" type="button">
                                      <div
                                        onClick={(e) => {
                                          this.handleWeightUnitChange(
                                            e.target.textContent
                                          );
                                          this.changeWeightMultiplier(0.454);
                                        }}
                                      >
                                        lbs
                                      </div>
                                    </DropdownItem>

                                    <Dropdown.Divider />

                                    <Dropdown.Header>
                                      Volume (Liquids)
                                    </Dropdown.Header>

                                    <DropdownItem as="button" type="button">
                                      <div
                                        onClick={(e) => {
                                          this.handleWeightUnitChange(
                                            e.target.textContent
                                          );
                                          this.changeWeightMultiplier(1);
                                        }}
                                      >
                                        l
                                      </div>
                                    </DropdownItem>

                                    <DropdownItem as="button" type="button">
                                      <div
                                        onClick={(e) => {
                                          this.handleWeightUnitChange(
                                            e.target.textContent
                                          );
                                          this.changeWeightMultiplier(0.001);
                                        }}
                                      >
                                        ml
                                      </div>
                                    </DropdownItem>
                                  </DropdownButton>
                                </InputGroup>
                              </Form.Group>

                              <div style={{ padding: "0 10% 0 10%" }}>GHG</div>
                              <Form.Group
                                style={{
                                  padding: "0 10% 0 10%",
                                  display: "flex",
                                }}
                              >
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    id="GHG"
                                    placeholder="Enter GHG value"
                                    value={(
                                      this.state.ghg *
                                      this.state.weightMultiplier
                                    ).toFixed(2)}
                                    width="100%"
                                  />
                                  {/*<p style={{width:'100px'}}>kg co2</p>*/}
                                  <InputGroup.Append>
                                    <InputGroup.Text>kg co2</InputGroup.Text>
                                  </InputGroup.Append>
                                </InputGroup>
                              </Form.Group>
                              {/* this.handleFoodWasteSubmit(e); this.handleAutoCompleteValueEntry(this.state.foodName);*/}

                              <div>
                                {this.state.edibleInedibleSurplus ===
                                  "Inedible" &&
                                this.state.foodWasteWeight !== 0 &&
                                this.state.weightType !== "Select Unit" ? (
                                  <Button
                                    style={{
                                      margin: "0 10% 0 10%",
                                      backgroundColor: "#aab41e",
                                      width: "80%",
                                      marginTop: "5px",
                                    }}
                                    onClick={(e) => {
                                      this.handleFoodWasteSubmit(e);
                                      this.notificationTest();
                                      this.clearEFWForm();
                                    }}
                                    variant="secondary"
                                    type="button"
                                  >
                                    Update
                                  </Button>
                                ) : (
                                  <Button
                                    style={{
                                      margin: "0 10% 0 10%",
                                      width: "80%",
                                      marginTop: "5px",
                                    }}
                                    variant="secondary"
                                    disabled
                                  >
                                    Update
                                  </Button>
                                )}
                              </div>

                              <Divider style={{ marginTop: "25px" }} />

                              <h5
                                className="text-center"
                                style={{
                                  marginTop: "25px",
                                  marginBottom: "5px",
                                  fontSize: "16.5px",
                                  fontWeight: "600",
                                }}
                              >
                                Inedible Food Waste
                              </h5>
                              <h5
                                className="text-center"
                                style={{
                                  marginBottom: "25px",
                                  fontSize: "16.5px",
                                  fontWeight: "600",
                                }}
                              >
                                {dailyTabTime}
                              </h5>

                              <div style={{ padding: "0 10% 0 10%" }}>
                                Total Weight
                              </div>
                              <Form.Group
                                style={{
                                  padding: "0 10% 0 10%",
                                  display: "flex",
                                }}
                              >
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    id="totalInedibleWeight"
                                    placeholder=""
                                    value={(
                                      this.state.totalInedibleWeight +
                                      this.state.foodWasteWeight *
                                        this.state.weightMultiplier
                                    ).toFixed(2)}
                                    width="100%"
                                  />
                                  {/*<p style={{width:'100px'}}>kg co2</p>*/}
                                  <InputGroup.Append>
                                    <InputGroup.Text>kg</InputGroup.Text>
                                  </InputGroup.Append>
                                </InputGroup>
                              </Form.Group>

                              <div style={{ padding: "0 10% 0 10%" }}>
                                Total GHG
                              </div>
                              <Form.Group
                                style={{
                                  padding: "0 10% 0 10%",
                                  display: "flex",
                                }}
                              >
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    id="totalInedibleGHG"
                                    placeholder=""
                                    value={(
                                      this.state.totalInedibleGHG +
                                      this.state.ghg *
                                        this.state.weightMultiplier
                                    ).toFixed(2)}
                                    width="100%"
                                  />
                                  {/*<p style={{width:'100px'}}>kg co2</p>*/}
                                  <InputGroup.Append>
                                    <InputGroup.Text>kg co2</InputGroup.Text>
                                  </InputGroup.Append>
                                </InputGroup>
                              </Form.Group>

                              {/* <div style={{padding: "0 10% 0 10%"}}>Total Cost</div>
                        <Form.Group 
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex"}}
                        >
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>£</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={(this.state.ghg*this.state.weightMultiplier).toFixed(2)} width="100%"/>{/*<p style={{width:'100px'}}>
                        </InputGroup>
                        </Form.Group> */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Form>
              </Card>
              {/* </BrowserView> */}
            </div>
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const foodOptions = [
  { title: "Cereal" },
  { title: "Bacon" },
  { title: "Baked Beans" },
  { title: "Porridge" },
  { title: "Pancake" },
  { title: "Beef" },
  { title: "Chicken" },
  { title: "Pork" },
  { title: "Apple" },
  { title: "Banana" },
  { title: "Orange" },
  { title: "Pear" },
  { title: "Grapes" },
  { title: "Chocolate" },
  { title: "Crisps" },
  { title: "Pasta" },
  { title: "Bolognese" },
  { title: "Potato" },
  { title: "Chips" },
  { title: "Milk" },
  { title: "Fruit Juice" },
  { title: "Onion" },
];

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
    startData: (product) => dispatch(startData(product)),
    createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
    // createFoodSurplusData: (product) => dispatch(createFoodSurplusData(product)),
  };
};

const CardStyle = styled.div`
  .card {
    color: rgb(59, 59, 59);
    background-color: rgb(238, 238, 238);
    border: none;
    border-radius: 5px;
    padding: 70px 0 50px 0;
  }

  .card-body {
    height: 200px;
  }
`;

const FormStyle = styled.div`
  .form {
    display: flex;
    align-items: center;
    top: 50%;
    transform: translateY(20%);
  }
`;

const ChartStyle = styled.div`
  .chart {
    position: absolute;
    left: 17%;
    padding: 20px;
  }
`;

const DDMenuStyle = styled.div`
  .dd {
    background-color: white;
    color: grey;
    border-color: grey;
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "data" }])
)(FoodWaste);
