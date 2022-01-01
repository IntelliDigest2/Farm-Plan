import React, { Component } from "react";
import { Form, InputGroup, FormGroup, Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  startData,
  createFoodWasteData,
} from "../../../store/actions/dataActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect, getFirebase } from "react-redux-firebase";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment";
//import { BrowserView, MobileView } from "react-device-detect";
import { fs } from "../../../config/fbConfig";
//import { Divider } from "@material-ui/core";
import addNotification from "react-push-notification";
import { Card } from "../SubComponents/Card";
import { InputForm } from "../SubComponents/Form";
import { Heading } from "../SubComponents/Heading";
import { Dropdown } from "../SubComponents/Dropdown";
import { DefaultButton } from "../SubComponents/Button";

// import {Chart} from "react-google-charts"

//const time = moment().format("MMMM Do YYYY, h:mm:ss a");

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

    collection: "writtenFoodWasteData",

    submissionType: "Waste",
    projectName: "",
    foodName: "",

    weightMultiplier: 0,
    ghg: 0,
    currencyMultiplier: 0,
    carbsMultiplier: 0,
    proteinMultiplier: 0,
    fatMultiplier: 0,
    totalEdibleWeight: 0,
    totalEdibleGHG: 0,
    totalEdibleCost: 0,

    totalInedibleWeight: 0,
    totalInedibleGHG: 0,

    date: "",
    edibleInedible: "Edible",
    foodWasteWeight: 0,
    weightType: "Select Unit",

    carbsContent: 0,
    carbsPerUnit: "Select Unit",

    proteinContent: 0,
    proteinPerUnit: "Select Unit",

    fatContent: 0,
    fatPerUnit: "Select Unit",

    expiryDate: "",

    foodWasteCost: 0,
    currency: "Select Currency",
  };

  //Copy of empty state for resetting
  initialState = {
    name: this.props.user.firstName,
    email: this.props.auth.email,
    uid: this.props.auth.uid,
    filteredData: [],

    collection: "writtenFoodWasteData",

    submissionType: "Waste",
    projectName: "",
    foodName: "",

    weightMultiplier: 0,
    ghg: 0,
    currencyMultiplier: 0,
    carbsMultiplier: 0,
    proteinMultiplier: 0,
    fatMultiplier: 0,

    totalInedibleWeight: 0,
    totalInedibleGHG: 0,

    date: getFirebase().firestore.Timestamp.fromDate(new Date()),
    edibleInedible: "Edible",
    foodWasteWeight: 0,
    weightType: "Select Unit",

    carbsContent: 0,
    carbsPerUnit: "Select Unit",

    proteinContent: 0,
    proteinPerUnit: "Select Unit",

    fatContent: 0,
    fatPerUnit: "Select Unit",

    expiryDate: "",

    foodWasteCost: 0,
    currency: "Select Currency",
  };

  //Dropdown options
  dropdown = {
    measurements: ["kg", "g", "/", "oz", "lbs", "/", "l", "ml"],
    content: ["100g", "500g", "1kg", "/", "100ml", "500ml", "1l"],
    currency: ["GBP (£)", "USD ($)", "EUR (€)"],
  };

  startDataButton = (e) => {
    e.preventDefault();
    this.props.startData(this.state);
  };

  //Change to upload specific data from state
  handleFoodWasteSubmit = (e) => {
    e.preventDefault();

    //Setup data to be sent to generic create firestore function (TO BE RENAMED LATER)
    const data = {
      uid: this.props.auth.uid,
      collection: this.state.collection,
      upload: {
        date: getFirebase().firestore.Timestamp.fromDate(new Date()),
        edibleInedible: this.state.edibleInedible,
        foodWasteWeight: this.state.foodWasteWeight,
        weightType: this.state.weightType,

        carbsContent: this.state.carbsContent,
        carbsPerUnit: this.state.carbsPerUnit,

        proteinContent: this.state.proteinContent,
        proteinPerUnit: this.state.proteinPerUnit,

        fatContent: this.state.fatContent,
        fatPerUnit: this.state.fatPerUnit,

        expiryDate: this.state.expiryDate,

        foodWasteCost: this.state.foodWasteCost,
        currency: this.state.currency,
      },
    };
    this.props.createFoodWasteData(data);
    this.clearEFWForm();
    this.submitNotification();
  };

  clearEFWForm = () => {
    this.setState(this.initialState);
  };

  submitNotification = () => {
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

  //Generic setState() function
  updateStateValue = (e) => {
    //If text or number
    if (e.target.textContent) {
      this.setState({ [e.target.id]: e.target.textContent }, () => {
        this.handleFoodWasteGHGChange();
        this.handleFoodCostChange();
      });
    } else {
      //If date
      let stringval = e.target.value.toString();
      if (stringval.includes("/")) {
        this.setState({ [e.target.id]: e.target.value }, () => {
          this.handleFoodWasteGHGChange();
          this.handleFoodCostChange();
        });
      } else {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
          this.setState({ [e.target.id]: "" }, () => {
            this.handleFoodWasteGHGChange();
            this.handleFoodCostChange();
          });
        } else {
          val = val >= 0 ? val : 0;
          this.setState({ [e.target.id]: val }, () => {
            this.handleFoodWasteGHGChange();
            this.handleFoodCostChange();
          });
        }
      }
    }
  };

  convertCurrency(e) {
    //TODO find a free reliable realtime currency converter
  }

  changeMultiplier(e) {
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
    this.setState({ [typeString]: val }, () => {
      this.handleFoodWasteGHGChange();
      this.handleFoodCostChange();
    });
  }

  handleFoodCostChange() {
    this.setState({
      foodWasteCost: (Number(this.state.foodWasteWeight) * 0.85).toFixed(2),
    });
  }

  handleFoodWasteGHGChange() {
    if (this.state.edibleInedible === "Edible") {
      this.setState({
        ghg: Number(
          20 *
            16.0424 *
            this.state.weightMultiplier *
            this.state.foodWasteWeight *
            (0.01852 * this.state.carbsMultiplier * this.state.carbsContent +
              0.01744 *
                this.state.proteinMultiplier *
                this.state.proteinContent +
              0.04608 * this.state.fatMultiplier * this.state.fatContent)
        ),
      });
    } else {
      this.setState({
        ghg: Number(
          this.state.foodWasteWeight * this.state.weightMultiplier * 2.5
        ),
      });
    }
  }

  componentDidMount() {
    //this.fetchData();
  }

  fetchData = async () => {
    fs.collection("data")
      .doc(this.state.uid)
      .collection("writtenFoodWasteData")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var fd = doc.data().date;

          var weight = doc.data().foodWasteWeight;
          var wu = doc.data().weightType;
          var ghg = doc.data().GHG;
          var cost = doc.data().COST;
          var curr = doc.data().CURRENCY;
          var eis = doc.data().EDIBLEORINEDIBLE;

          var newWeight = 0;
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

          if (curr === "GBP (£)") {
            newCost = Number(cost * 1);
          } else if (curr === "USD ($)") {
            newCost = Number((cost / 1.404).toFixed(2));
          } else if (curr === "EUR (€)") {
            newCost = Number((cost / 1.161).toFixed(2));
          }

          if (fd === dailyTabTime && eis === "Edible") {
            this.setState((prevState) => ({
              totalEdibleWeight: (prevState.totalEdibleWeight += newWeight),
              totalEdibleGHG: (prevState.totalEdibleGHG += ghg),
              totalEdibleCost: (prevState.totalEdibleCost += newCost),
            }));
          } else if (fd === dailyTabTime && eis === "Inedible") {
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

  render() {
    const { data, auth } = this.props;

    if (!auth.uid) return <Redirect to="/login" />;
    if (!data) return <div></div>;
    const filteredData =
      data && data.filter((datas) => datas.email === auth.email);

    return (
      <Container fluid className="web-center">
        <Heading priority="2" text="Update Edible/Inedible Food Waste" />
        <DefaultButton text="Back" styling="green" goTo="/account" />

        {filteredData.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Text className="text-center">
                <Heading
                  priority="1"
                  text="Start tracking your food waste now"
                />
                <DefaultButton
                  text="Start now"
                  styling="green"
                  onClick={this.startDataButton}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Container fluid className="justify-content-md-center">
            {/* <BrowserView> */}
            <Card>
              <InputForm>
                <Heading priority="1" text="Food Waste" />
                {/* Edible/Inedible */}
                <FormGroup>
                  <Heading priority="6" text="Edible / Inedible" />
                  <Dropdown
                    id="edibleInedible"
                    styling="grey"
                    data={this.state.edibleInedible}
                    function={(eventKey, e) => {
                      this.updateStateValue(e);
                    }}
                    items={["Edible", "Inedible"]}
                  />
                </FormGroup>
                {/* Edible Form */}
                {this.state.edibleInedible !== "Inedible" ? (
                  <FormGroup>
                    <Heading priority="6" text="Weight / Volume" />
                    <InputGroup>
                      <Form.Control
                        type="number"
                        id="foodWasteWeight"
                        onChange={(e) => {
                          this.updateStateValue(e);
                        }}
                        value={this.state.foodWasteWeight}
                      />
                      <Dropdown
                        id="weightType"
                        styling="grey dropdown-input-right"
                        data={this.state.weightType}
                        function={(eventKey, e) => {
                          this.updateStateValue(e);
                          this.changeMultiplier(e);
                        }}
                        items={this.dropdown.measurements}
                      />
                    </InputGroup>
                    <FormGroup>
                      <Heading priority="6" text="Carbs Content" />
                      <InputGroup>
                        <Form.Control
                          type="number"
                          id="carbsContent"
                          onChange={(e) => {
                            this.updateStateValue(e);
                          }}
                          value={this.state.carbsContent}
                        />
                        <Dropdown
                          id="carbsPerUnit"
                          styling="grey dropdown-input-right"
                          data={this.state.carbsPerUnit}
                          function={(eventKey, e) => {
                            this.updateStateValue(e);
                            this.changeMultiplier(e);
                          }}
                          items={this.dropdown.content}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Protein Content" />
                      <InputGroup>
                        <Form.Control
                          type="number"
                          id="proteinContent"
                          onChange={(e) => {
                            this.updateStateValue(e);
                          }}
                          value={this.state.proteinContent}
                        />
                        <Dropdown
                          id="proteinPerUnit"
                          styling="grey dropdown-input-right"
                          data={this.state.proteinPerUnit}
                          function={(eventKey, e) => {
                            this.updateStateValue(e);
                            this.changeMultiplier(e);
                          }}
                          items={this.dropdown.content}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Fat Content" />
                      <InputGroup>
                        <Form.Control
                          type="number"
                          id="fatContent"
                          onChange={(e) => {
                            this.updateStateValue(e);
                          }}
                          value={this.state.fatContent}
                        />
                        <Dropdown
                          id="fatPerUnit"
                          styling="grey dropdown-input-right"
                          data={this.state.fatPerUnit}
                          function={(eventKey, e) => {
                            this.updateStateValue(e);
                            this.changeMultiplier(e);
                          }}
                          items={this.dropdown.content}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Expiry Date" />
                      <Form.Control
                        id="expiryDate"
                        placeholder="DD/MM/YYYY"
                        onChange={(e) => {
                          this.updateStateValue(e);
                        }}
                        value={this.state.expiryDate}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="GHG" />
                      <InputGroup>
                        <Form.Control
                          id="ghg"
                          value={this.state.ghg.toFixed(3)}
                          title={this.state.ghg}
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>kg co2</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Cost" />
                      <InputGroup>
                        <Dropdown
                          id="currency"
                          styling="grey dropdown-input-left"
                          data={this.state.currency}
                          function={(eventKey, e) => {
                            this.updateStateValue(e);
                            this.changeMultiplier(e);
                          }}
                          items={this.dropdown.currency}
                        />
                        <Form.Control
                          id="foodWasteCost"
                          value={(
                            this.state.foodWasteCost *
                            this.state.currencyMultiplier *
                            this.state.weightMultiplier
                          ).toFixed(2)}
                          readOnly
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      {this.state.foodWasteWeight > 0 &&
                      this.state.weightType !== "Select Unit" &&
                      this.state.expiryDate !== "" &&
                      this.state.currency !== "Select Currency" ? (
                        <DefaultButton
                          text="Update"
                          styling="green"
                          onClick={(e) => {
                            //this.handleFoodWasteGHGChange();
                            this.handleFoodWasteSubmit(e);
                          }}
                        />
                      ) : (
                        <DefaultButton
                          text="Update"
                          styling="green"
                          disabled="true"
                        />
                      )}
                    </FormGroup>
                    {/* TOTAL EDIBLE FOOD WASTE
                    <Divider />
                    <Heading priority="3" text="Edible Food Waste" />
                    <Heading priority="4" text={dailyTabTime} />
                    <FormGroup>
                      <Heading priority="6" text="Total Weight" />
                      <InputGroup>
                        <Form.Control
                          id="totalEdibleWeight"
                          value={(
                            this.state.totalEdibleWeight +
                            this.state.foodWasteWeight *
                              this.state.weightMultiplier
                          ).toFixed(2)}
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>kg</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Total GHG" />
                      <InputGroup>
                        <Form.Control
                          id="totalEdibleGHG"
                          value={(
                            this.state.totalEdibleGHG + this.state.ghg
                          ).toFixed(3)}
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>kg co2</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Total Cost" />
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>£</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          id="totalEdibleCost"
                          value={(
                            this.state.totalEdibleCost +
                            this.state.foodWasteCost *
                              this.state.weightMultiplier
                          ).toFixed(2)}
                          readOnly
                        />
                      </InputGroup>
                    </FormGroup>
                    */}
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <Heading priority="6" text="Weight / Volume" />
                    <FormGroup>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          id="foodWasteWeight"
                          onChange={(e) => {
                            this.updateStateValue(e);
                            //this.handleFoodCostChange(e);
                          }}
                          value={this.state.foodWasteWeight}
                        />
                        <Dropdown
                          id="weightType"
                          styling="grey dropdown-input-right"
                          data={this.state.weightType}
                          function={(eventKey, e) => {
                            this.updateStateValue(e);
                            this.changeMultiplier(e);
                          }}
                          items={this.dropdown.measurements}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="GHG" />
                      <InputGroup>
                        <Form.Control
                          id="ghg"
                          placeholder="Enter GHG value"
                          value={this.state.ghg}
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>kg co2</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      {this.state.edibleInedible === "Inedible" &&
                      this.state.foodWasteWeight !== 0 &&
                      this.state.weightType !== "Select Unit" ? (
                        <DefaultButton
                          text="Update"
                          styling="green"
                          onClick={(e) => {
                            //this.handleFoodWasteGHGChange();
                            this.handleFoodWasteSubmit(e);
                          }}
                        />
                      ) : (
                        <DefaultButton
                          text="Update"
                          styling="green"
                          disabled="true"
                        />
                      )}
                    </FormGroup>
                    {/*
                    <Divider />
                    <Heading priority="3" text="Inedible Food Waste" />
                    <Heading priority="4" text={dailyTabTime} />
                    <FormGroup>
                      <Heading priority="6" text="Total Weight" />
                      <InputGroup>
                        <Form.Control
                          id="totalInedibleWeight"
                          value={(
                            this.state.totalInedibleWeight +
                            this.state.foodWasteWeight *
                              this.state.weightMultiplier
                          ).toFixed(2)}
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>kg</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Heading priority="6" text="Total GHG" />
                      <InputGroup>
                        <Form.Control
                          id="totalInedibleGHG"
                          value={(
                            this.state.totalInedibleGHG + this.state.ghg
                          ).toFixed(3)}
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>kg co2</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </FormGroup>
                          */}
                  </FormGroup>
                )}
              </InputForm>
            </Card>
          </Container>
        )}
      </Container>
    );
  }
}

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "data",
        doc: props.auth.uid,
      },
    ];
  })
)(FoodWaste);
