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
  createFoodSurplusData,
} from "../../../../store/actions/dataActions";
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
import { fs } from "../../../../config/fbConfig";
import { Divider } from "@material-ui/core";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Checkbox } from "@material-ui/core";
import addNotification from "react-push-notification";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

// import {Chart} from "react-google-charts"

const time = moment().format("MMMM Do YYYY, h:mm:ss a");

const dailyTabTime = moment().format("ddd MMM Do YYYY");

// const chartSubmissionDay = moment().format("ddd")
// const chartSubmissionWeek = moment().format("W")
// const chartSubmissionMonth = moment().format("MMM")
// const chartSubmissionDate = moment().format("Do")
// const chartSubmissionYear = moment().format("YYYY")
// const chartSubmissionFullDate = moment().format("ddd MMM Do YYYY")

class AddProductsFarm extends Component {
  state = {
    // name: this.props.user.firstName,
    // email: this.props.auth.email,
    uid: this.props.auth.uid,
    // filteredData: [],

    formWidth: "",
    dropdownWidth: "",

    submissionType: "Surplus Farm",

    foodName: "",
    foodCategory: "Select Category",

    foodSurplusWeight: 0,
    weightType: "Select Unit",
    weightMultiplier: 0,

    postcode: "",

    showComposition: false,

    carbsContent: 0,
    proteinContent: 0,
    fibreContent: 0,
    fatContent: 0,

    producedLocally: "Select",

    price: 0.0,

    expiryDate: "",

    ghg: 0,

    foodSurplusCost: 0,
    currency: "Select Currency",
    currencyMultiplier: 0,

    notes: "n/a",

    chartSubmissionDay: moment().format("ddd"),
    chartSubmissionWeek: moment().format("W"),
    chartSubmissionMonth: moment().format("MMM"),
    chartSubmissionDate: moment().format("Do"),
    chartSubmissionYear: moment().format("YYYY"),
    chartSubmissionFullDate: moment().format("ddd MMM Do YYYY"),

    testProductlist: [
      {
        foodName: "Chicken",
        category: "Meat",
        weight: 240,
        wtUnit: "g",
        price: 2.99,
        expiryDate: "2021-10-07",
        postcode: "ML6 9TY",
      },
      {
        foodName: "Milk",
        category: "Dairy",
        weight: 1,
        wtUnit: "l",
        price: 0.99,
        expiryDate: "2021-09-30",
        postcode: "ML5 4QX",
      },
      {
        foodName: "Beef Mince",
        category: "Meat",
        weight: 450,
        wtUnit: "g",
        price: 3.19,
        expiryDate: "2021-10-04",
        postcode: "ML6 7AW",
      },
      {
        foodName: "Carrots",
        category: "Vegetable",
        weight: 250,
        wtUnit: "g",
        price: 1.59,
        expiryDate: "2021-10-05",
        postcode: "ML6 5BF",
      },
    ],
    myProducts: [],
  };

  clearEFWForm = () => {
    this.setState({
      foodName: "",
      foodCategory: "Select Category",
      foodSurplusWeight: 0,
      weightType: "Select Unit",
      postcode: "",
      producedLocally: "Select",
      price: 0.0,
      expiryDate: "",
      ghg: 0,
      foodSurplusCost: 0,
      currency: "Select Currency",
      currencyMultiplier: 0,
      carbsContent: 0,
      proteinContent: 0,
      fibreContent: 0,
      fatContent: 0,
      showComposition: false,
    });
  };

  notificationTest = () => {
    addNotification({
      title: "Success!",
      message: "Product Added!",
      // theme: 'darkblue',
      // native: false,
      backgroundTop: "rgb(29, 207, 29)", //optional, background color of top container.
      backgroundBottom: "rgb(29, 207, 29)", //optional, background color of bottom container.
      closeButton: "Close",
      duration: 4000,
    });
  };

  // changeMeal(text){
  //     this.setState({meal: text})
  // }

  changeCurrency(text) {
    this.setState({ currency: text });
  }

  changeCurrencyMultiplier(value) {
    this.setState({ currencyMultiplier: value });
  }

  changeWeightMultiplier(value) {
    this.setState({ weightMultiplier: value });
  }

  handleChange = (e) => {
    // console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleFoodCategoryChange = (text) => {
    this.setState({ foodCategory: text });
  };

  handleEdibleInedibleSurplusChange = (e) => {
    // console.log(e)
    this.setState({ edibleInedibleSurplus: e });
  };

  handleProducedLocallyChange(text) {
    this.setState({ producedLocally: text });
  }

  handleWeightUnitChange(text) {
    this.setState({ weightType: text });
  }

  handleFoodWasteGHGChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      ghg: Number(e.target.value) * 2.5,
    });
  };

  handleFoodCostChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      foodSurplusCost: (Number(e.target.value) * 0.85).toFixed(2),
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

  handleFibreContentChange(event) {
    this.setState({ fibreContent: event.target.value });
  }

  handleFatContentChange(event) {
    this.setState({ fatContent: event.target.value });
  }

  monthConverter(month) {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
  }

  // ===========================================================================

  pressButton = (e) => {
    e.preventDefault();
    this.props.startData(this.state);
  };

  handleFoodSurplusSubmit = (e) => {
    e.preventDefault();
    this.setState({});
    this.props.createFoodSurplusData(this.state);
  };

  // handleSubmitTest = (e) => {
  //     this.setState( (prevState) => ({
  //         myProducts: prevState.myProducts.concat({foodName: this.state.foodName, category: this.state.foodCategory, weight: this.state.foodSurplusWeight, wtUnit: this.state.weightType, price: this.state.price, postcode: this.state.postcode, expiryDate: this.state.expiryDate})
  //     }))
  // }

  fetchMyProductsData = async () => {
    fs.collection("data")
      .doc(this.state.uid)
      .collection("writtenFoodWasteData")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var st = doc.data().SUBMISSIONTYPE;
          var los = doc.data().LOCALORNOT;

          var weight = doc.data().weight;
          var wu = doc.data().WEIGHTUNIT;
          var name = doc.data().FOODNAME;
          var cat = doc.data().FOODCATEGORY;
          var exp = doc.data().EXPIRYDATE;

          // var newExp = exp.split("/").join("-")

          var pr = doc.data().PRICE;
          var pc = doc.data().POSTCODE;

          if (st === "Surplus Farm") {
            this.setState((prevState) => ({
              myProducts: prevState.myProducts.concat({
                foodName: name,
                category: cat,
                weight: weight,
                wtUnit: wu,
                price: pr,
                postcode: pc,
                expiryDate: exp,
              }),
            }));
          }
        });
      })
      .catch((error) => console.log(error));
  };

  // changeCharTest(date){
  //     // var parts = ["a", "i", "d", "a", "n"]
  //     var newString = date.split('-').join('/')

  //     console.log(newString)
  // }

  componentDidMount() {
    this.fetchMyProductsData();

    // this.changeCharTest();

    if (isMobile) {
      this.setState({
        formWidth: "90vw",
        dropdownWidth: "241px",
      });
    } else if (isBrowser) {
      this.setState({
        formWidth: "783px",
        dropdownWidth: "610px",
      });
    }
  }

  render() {
    const { data, auth } = this.props;
    // console.log(data.[auth.uid].writtenFoodWasteData);
    // console.log(time);
    // console.log(Date(time));
    // const {foodWaste, foodSurplus} = this.state
    // if(!auth.uid) return <Redirect to='/login' />
    // if (data) {
    // const filteredData = data && data.filter((datas) =>
    //     datas.email === auth.email
    // )
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
            Upload Food (Farm)
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
            Upload Food (Farm)
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
            style={{
              width: this.state.formWidth,
              borderColor: "#040335",
              backgroundColor: "#040335",
            }}
            as={Link}
            to="/account"
          >
            Back
          </Button>
        </div>

        {/* {filteredData.length === 0 ? <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex not-found">
        <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
        <Col className="mt-5 pt-5" xs={12}></Col>
          <Col className="" xs={12} lg={4}></Col>
                  <Col className=" justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0" xs={12} lg={4}>

            <CardStyle>
                <Card>
                    <Card.Body>
                   <Card.Text className="text-center">
                   <h1 style={{fontSize: "33px",fontWeight: "600", color: "rgb(55, 85, 54)",}}>Start tracking your food waste and food surplus now</h1>
                    <button onClick={this.pressButton} style={{outline: 'none', border: 'none'}}>Start now</button>
                   </Card.Text> 
                  </Card.Body>
                </Card>
            </CardStyle>
      
                  </Col>
                  <Col className="mt-5 pt-5" xs={12} lg={4}></Col>
                  <Col className="mt-5 pt-5" xs={12}></Col>
            <Col className="mt-5 pt-5" xs={12}></Col>
              </Row> 
              :  */}

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
              marginBottom: "10vh",
              backgroundColor: "#aab41e",
            }}
          >
            {/* onSubmit={this.handleFoodWasteSubmit}     */}
            <Form className="form-layout" style={{ padding: "10px" }}>
              <h5
                className="text-center"
                style={{ margin: "30px", fontSize: "23px", fontWeight: "600" }}
              >
                Add Products
              </h5>

              <div>
                <div style={{ padding: "0 10% 0 10%" }}>Food Name</div>
                <Form.Group style={{ padding: "0 10% 0 10%", display: "flex" }}>
                  <Autocomplete
                    // multiple
                    id="foodName"
                    options={foodOptions.map((option) => option.title)}
                    freeSolo
                    // limitTags={1}
                    // getOptionLabel={(option) => option.name}
                    style={{ width: "100%", backgroundColor: "white" }}
                    size="small"
                    onChange={(e) =>
                      this.setState({ foodName: e.target.textContent })
                    }
                    onInputChange={(e) => this.handleChange(e)}
                    // renderTags={(value, getTagProps) =>
                    //     value.map((option, index) => (
                    //       <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    //     ))
                    // }

                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Enter Food Name"
                        variant="outlined"
                      />
                    )}
                  />
                </Form.Group>

                <div style={{ padding: "0 10% 0 10%" }}>Food Category</div>
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
                          style={{ width: this.state.dropdownWidth }}
                          className="dd"
                        >
                          {this.state.foodCategory}
                        </DropdownToggle>
                        <DropdownMenu>
                          {/* as="button" */}
                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Meat
                            </div>
                          </DropdownItem>

                          {/* as="button" */}
                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Fruits
                            </div>
                          </DropdownItem>

                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Vegetables
                            </div>
                          </DropdownItem>

                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Dairy
                            </div>
                          </DropdownItem>

                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Pets
                            </div>
                          </DropdownItem>

                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Frozen
                            </div>
                          </DropdownItem>
                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) => {
                                this.handleFoodCategoryChange(
                                  e.target.textContent
                                );
                              }}
                            >
                              Drinks
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </DDMenuStyle>
                  </InputGroup>
                </Form.Group>

                <div style={{ padding: "0 10% 0 10%" }}>Postcode</div>
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
                      id="postcode"
                      placeholder="Enter Postcode"
                      onChange={(e) => this.handleChange(e)}
                      width="100%"
                      value={this.state.postcode}
                    />
                  </InputGroup>
                </Form.Group>

                <Divider style={{ marginBottom: "10px" }} />

                <div>
                  <>
                    {this.state.showComposition ? (
                      <div
                        onClick={() =>
                          this.setState({
                            showComposition: !this.state.showComposition,
                          })
                        }
                        style={{ padding: "0 10% 0 10%", fontWeight: "bold" }}
                      >
                        Food Composition <BsFillCaretUpFill />{" "}
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          this.setState({
                            showComposition: !this.state.showComposition,
                          })
                        }
                        style={{ padding: "0 10% 0 10%", fontWeight: "bold" }}
                      >
                        Food Composition <BsFillCaretDownFill />{" "}
                      </div>
                    )}
                  </>

                  {/* <Modal show={this.state.showComposition} onHide={() => this.setState({showComposition: !this.state.showComposition})}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Food Waste Composition Guide</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>For help with filling out this section of the form as accurately as possible,
                                        consult the 'About' page for further info on Food Waste, Macronutrients, etc.
                                    </p>
                                    <p>Note: make sure your entries total to 100</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.setState({showComposition: false})}>Close</Button>
                                </Modal.Footer>
                            </Modal> */}

                  <>
                    {" "}
                    {this.state.showComposition ? (
                      <>
                        <div style={{ padding: "0 10% 0 10%" }}>
                          Carbohydrate Content
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
                              pattern="[0-100]*"
                              min={0}
                              max={
                                100 -
                                this.state.proteinContent -
                                this.state.fatContent -
                                this.state.fibreContent
                              }
                              id="carbsContent"
                              placeholder="Enter carbohydrate content of food waste"
                              onChange={(e) => this.handleCarbsContentChange(e)}
                              width="100%"
                              value={this.state.carbsContent}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text
                                style={{
                                  backgroundColor: "#040335",
                                  color: "white",
                                }}
                              >
                                %
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>

                        <div style={{ padding: "0 10% 0 10%" }}>
                          Protein Content
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
                              pattern="[0-100]*"
                              min={0}
                              max={
                                100 -
                                this.state.carbsContent -
                                this.state.fatContent -
                                this.state.fibreContent
                              }
                              id="proteinContent"
                              placeholder="Enter protein content of food waste"
                              onChange={(e) =>
                                this.handleProteinContentChange(e)
                              }
                              width="100%"
                              value={this.state.proteinContent}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text
                                style={{
                                  backgroundColor: "#040335",
                                  color: "white",
                                }}
                              >
                                %
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>

                        <div style={{ padding: "0 10% 0 10%" }}>
                          Fat Content
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
                              pattern="[0-100]*"
                              min={0}
                              max={
                                100 -
                                this.state.proteinContent -
                                this.state.carbsContent -
                                this.state.fibreContent
                              }
                              id="fatContent"
                              placeholder="Enter fat content of food waste"
                              onChange={(e) => this.handleFatContentChange(e)}
                              width="100%"
                              value={this.state.fatContent}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text
                                style={{
                                  backgroundColor: "#040335",
                                  color: "white",
                                }}
                              >
                                %
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>

                        <div style={{ padding: "0 10% 0 10%" }}>
                          Fibre Content
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
                              pattern="[0-100]*"
                              min={0}
                              max={
                                100 -
                                this.state.proteinContent -
                                this.state.carbsContent -
                                this.state.fatContent
                              }
                              id="fibreContent"
                              placeholder="Enter fibre content of food waste"
                              onChange={(e) => this.handleFibreContentChange(e)}
                              width="100%"
                              value={this.state.fibreContent}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text
                                style={{
                                  backgroundColor: "#040335",
                                  color: "white",
                                }}
                              >
                                %
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>

                        <div style={{ padding: "0 10% 0 10%" }}>TOTAL</div>
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
                              id="totalContent"
                              placeholder="Total content"
                              width="100%"
                              value={
                                Number(this.state.carbsContent) +
                                Number(this.state.proteinContent) +
                                Number(this.state.fatContent) +
                                Number(this.state.fibreContent) +
                                "/100"
                              }
                            />
                            <InputGroup.Append>
                              <InputGroup.Text
                                style={{
                                  backgroundColor: "#040335",
                                  color: "white",
                                }}
                              >
                                %
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                </div>

                <>
                  {this.state.showComposition ? (
                    <Divider style={{ marginBottom: "10px" }} />
                  ) : (
                    <Divider
                      style={{ marginBottom: "10px", marginTop: "10px" }}
                    />
                  )}
                </>

                <div style={{ padding: "0 10% 0 10%" }}>Weight / Volume</div>
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
                      id="foodSurplusWeight"
                      placeholder="Enter weight of food waste"
                      onChange={(e) => {
                        this.handleFoodWasteGHGChange(e);
                        this.handleFoodCostChange(e);
                      }}
                      width="100%"
                      value={this.state.foodSurplusWeight}
                    />
                    {/* <Form.Control type="number" id="weightOfEdibleFoodWaste" placeholder="Enter weight of food waste" onChange={(e) => {this.handleEdibleFoodWasteGHGChange(e); this.handleEdibleFoodCostChange(e)}} width="100%" value={this.state.weightOfEdibleFoodWaste}/>
                            <InputGroup.Append>
                                <InputGroup.Text>kg</InputGroup.Text>
                            </InputGroup.Append> */}

                    <DropdownButton
                      as={InputGroup.Append}
                      variant="outline-secondary"
                      title={
                        <span style={{ color: "white" }}>
                          {this.state.weightType}
                        </span>
                      }
                      id="wtdd"
                      style={{ backgroundColor: "#040335" }}
                    >
                      <Dropdown.Header>Weight (Solids)</Dropdown.Header>

                      {/* as="button" */}
                      <DropdownItem as="button" type="button">
                        <div
                          onClick={(e) => {
                            this.handleWeightUnitChange(e.target.textContent);
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
                            this.handleWeightUnitChange(e.target.textContent);
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
                            this.handleWeightUnitChange(e.target.textContent);
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
                            this.handleWeightUnitChange(e.target.textContent);
                            this.changeWeightMultiplier(0.454);
                          }}
                        >
                          lbs
                        </div>
                      </DropdownItem>

                      <Dropdown.Divider />

                      <Dropdown.Header>Volume (Liquids)</Dropdown.Header>

                      <DropdownItem as="button" type="button">
                        <div
                          onClick={(e) => {
                            this.handleWeightUnitChange(e.target.textContent);
                            this.changeWeightMultiplier(1);
                          }}
                        >
                          l
                        </div>
                      </DropdownItem>

                      <DropdownItem as="button" type="button">
                        <div
                          onClick={(e) => {
                            this.handleWeightUnitChange(e.target.textContent);
                            this.changeWeightMultiplier(0.001);
                          }}
                        >
                          ml
                        </div>
                      </DropdownItem>
                    </DropdownButton>
                  </InputGroup>
                </Form.Group>

                {/* <div style={{padding: "0 10% 0 10%"}}>Local Produce or Surplus?</div>
                        <Form.Group 
                            style={{
                                padding: "0 10% 0 10%",
                                display: "flex"
                            }}>
                            <InputGroup>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={this.state.producedLocally}
                                    id="lnldd"
                                    style={{width: "100%"}}
                                >
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Local Produce
                                        </div>
                                    </DropdownItem>

                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Surplus
                                        </div>
                                    </DropdownItem>

                                </DropdownButton>
                            </InputGroup>

                        </Form.Group> */}

                <div style={{ padding: "0 10% 0 10%" }}>Upload Type</div>
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
                          style={{ width: this.state.dropdownWidth }}
                          className="dd"
                        >
                          {this.state.producedLocally}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) =>
                                this.handleProducedLocallyChange(
                                  e.target.textContent
                                )
                              }
                            >
                              Local Produce
                            </div>
                          </DropdownItem>

                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) =>
                                this.handleProducedLocallyChange(
                                  e.target.textContent
                                )
                              }
                            >
                              Surplus Food
                            </div>
                          </DropdownItem>

                          <DropdownItem as="button" type="button">
                            <div
                              onClick={(e) =>
                                this.handleProducedLocallyChange(
                                  e.target.textContent
                                )
                              }
                            >
                              Surplus Local Produce
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </DDMenuStyle>
                  </InputGroup>
                </Form.Group>

                <div style={{ padding: "0 10% 0 10%" }}>Price</div>
                <Form.Group
                  className="form-layout"
                  style={{
                    padding: "0 10% 0 10%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <InputGroup>
                    <InputGroup.Text
                      style={{ backgroundColor: "#040335", color: "white" }}
                    >
                      £
                    </InputGroup.Text>
                    <Form.Control
                      id="price"
                      placeholder="Enter Price"
                      onChange={(e) => this.handleChange(e)}
                      width="100%"
                      value={this.state.price}
                      type="number"
                      min="0.01"
                      step="0.01"
                    />
                  </InputGroup>
                </Form.Group>

                <div style={{ padding: "0 10% 0 10%" }}>Expiry Date</div>
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
                      type="date"
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => this.handleChange(e)}
                      width="100%"
                      value={this.state.expiryDate}
                    />
                  </InputGroup>
                </Form.Group>

                {/* <div style={{padding: "0 10% 0 10%"}}>Expiry Date</div>
                        <Form.Group className="form-layout"
                            style={{
                                padding: "0 10% 0 10%",
                                display: "flex",
                                justifyContent: "space-around"
                            }}
                        >
                        <InputGroup>
                            <Form.Control id="expiryDate" placeholder="DD/MM/YYYY" type="date" onChange={(e) => this.handleChange(e)} width="100%" value={this.state.expiryDate} />
                        </InputGroup>
                        </Form.Group> */}

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
                        this.state.ghg * this.state.weightMultiplier
                      ).toFixed(2)}
                      width="100%"
                    />
                    {/*<p style={{width:'100px'}}>kg co2</p>*/}
                    <InputGroup.Append>
                      <InputGroup.Text
                        style={{ backgroundColor: "#040335", color: "white" }}
                      >
                        kg co2
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <div style={{ padding: "0 10% 0 10%" }}>Cost</div>
                <Form.Group style={{ padding: "0 10% 0 10%", display: "flex" }}>
                  <InputGroup>
                    {/* <InputGroup.Prepend>
                                <InputGroup.Text>£</InputGroup.Text>
                            </InputGroup.Prepend> */}

                    <DropdownButton
                      as={InputGroup.Prepend}
                      variant="outline-secondary"
                      title={
                        <span style={{ color: "white" }}>
                          {this.state.currency}
                        </span>
                      }
                      id="input-group-dropdown-1"
                      style={{ backgroundColor: "#040335" }}
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
                      id="foodSurplusCost"
                      placeholder="Enter cost of food surplus"
                      value={(
                        this.state.foodSurplusCost *
                        this.state.currencyMultiplier *
                        this.state.weightMultiplier
                      ).toFixed(2)}
                    />
                    {/*pounds*/}
                  </InputGroup>
                </Form.Group>

                <Divider style={{ marginBottom: "10px" }} />

                {/* <Button style={{margin: "0 10% 0 10%", backgroundColor: '#aab41e', width: "80%", marginTop: "5px"}} onClick={(e) => {this.handleFoodSurplusSubmit(e); this.notificationTest(); this.clearEFWForm() }} variant="secondary" type="button">
                            Update
                        </Button> */}

                <div>
                  {this.state.foodName !== "" &&
                  this.state.foodCategory !== "Select Category" &&
                  this.state.foodSurplusWeight !== 0 &&
                  this.state.weightType !== "Select Unit" &&
                  this.state.postcode !== "" &&
                  this.state.producedLocally !== "Select" &&
                  this.state.price !== 0.0 &&
                  this.state.expiryDate !== "" &&
                  this.state.currency !== "Select Currency" ? (
                    <Button
                      style={{
                        margin: "0 10% 0 10%",
                        backgroundColor: "#040335",
                        width: "80%",
                        marginTop: "5px",
                      }}
                      onClick={(e) => {
                        this.handleFoodSurplusSubmit(e);
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
                        backgroundColor: "gray",
                      }}
                      disabled
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </Card>

          <Card
            style={{
              // width: "90%",
              width: this.state.formWidth,
              // height: "100%"
              height: "400px",
              maxHeight: "300px",
              marginBottom: "10vh",
              backgroundColor: "#040335",
              overflowY: "auto",
            }}
          >
            <h5
              className="text-center"
              style={{
                fontWeight: 600,
                color: "white",
                marginTop: "2.5%",
                marginBottom: "5%",
              }}
            >
              My Products
            </h5>

            <div>
              {this.state.myProducts.map((product) => (
                <>
                  <BrowserView>
                    <Card
                      style={{
                        width: "95%",
                        marginLeft: "2.5%",
                        backgroundColor: "rgb(38, 120, 214)",
                        height: "100px",
                        marginBottom: "50px",
                      }}
                    >
                      <ExpDate
                        className="exp-date"
                        style={{
                          width: "15%",
                          marginLeft: "2.5%",
                          height: "92.5%",
                          marginTop: "0.75%",
                        }}
                      >
                        <label>EXPIRY DATE</label>
                        <div className="exp-date__month">
                          {this.monthConverter(
                            product.expiryDate.split("-")[1]
                          )}
                        </div>
                        <div className="exp-date__day">
                          {product.expiryDate.split("-")[2]}
                        </div>
                        <div className="exp-date__year">
                          {product.expiryDate.split("-")[0]}
                        </div>
                      </ExpDate>

                      <div style={{ marginLeft: "20%", marginTop: "-12%" }}>
                        <li>
                          <b>Name:</b> {product.foodName}{" "}
                        </li>
                        <li>
                          <b>Category:</b> {product.category}{" "}
                        </li>
                        <li>
                          <b>Postcode:</b> {product.postcode}{" "}
                        </li>
                        <li>
                          <b>Weight/Amount:</b> {product.weight}
                          {product.wtUnit}{" "}
                        </li>
                      </div>

                      <div>
                        <div
                          className="exp-date"
                          style={{
                            marginLeft: "80%",
                            height: "20px",
                            width: "15%",
                            marginTop: "-11%",
                          }}
                        >
                          Price: £{product.price}
                        </div>

                        <Button
                          style={{
                            marginLeft: "80%",
                            width: "15%",
                            marginTop: "1.5%",
                            backgroundColor: "rgb(122, 174, 233)",
                            borderColor: "black",
                            borderWidth: "2px",
                            borderRadius: 12,
                          }}
                        >
                          Buy
                        </Button>
                      </div>
                    </Card>
                  </BrowserView>

                  <MobileView>
                    <Card
                      style={{
                        width: "95%",
                        marginLeft: "2.5%",
                        backgroundColor: "rgb(38, 120, 214)",
                        height: "100px",
                        marginBottom: "50px",
                      }}
                    >
                      <ExpDate
                        className="exp-date"
                        style={{
                          width: "25%",
                          marginLeft: "2.5%",
                          height: "95%",
                          marginTop: "1%",
                        }}
                      >
                        <label style={{ fontSize: "90%" }}>EXP. DATE</label>
                        <div className="exp-date__month">
                          {this.monthConverter(
                            product.expiryDate.split("-")[1]
                          )}
                        </div>
                        <div className="exp-date__day">
                          {product.expiryDate.split("-")[2]}
                        </div>
                        <div className="exp-date__year">
                          {product.expiryDate.split("-")[0]}
                        </div>
                      </ExpDate>

                      <div style={{ marginLeft: "30%", marginTop: "-26.5%" }}>
                        <li style={{ fontSize: "85%" }}>
                          <b style={{ fontSize: "85%" }}>Name:</b>{" "}
                          {product.foodName}{" "}
                        </li>
                        <li style={{ fontSize: "85%" }}>
                          <b style={{ fontSize: "85%" }}>Category:</b>{" "}
                          {product.category}{" "}
                        </li>
                        <li style={{ fontSize: "85%" }}>
                          <b style={{ fontSize: "85%" }}>Postcode:</b>{" "}
                          {product.postcode}{" "}
                        </li>
                        <li style={{ fontSize: "85%" }}>
                          <b style={{ fontSize: "85%" }}>Weight/Amount:</b>{" "}
                          {product.weight}
                          {product.wtUnit}{" "}
                        </li>
                      </div>

                      <div>
                        <div
                          className="exp-date"
                          style={{
                            marginLeft: "72.5%",
                            height: "60px",
                            width: "25%",
                            marginTop: "-22.5%",
                            fontSize: "85%",
                            marginBottom: "1.5%",
                            fontSize: "90%",
                          }}
                        >
                          Price: £{product.price}
                        </div>

                        <Button
                          style={{
                            marginLeft: "72.5%",
                            width: "25%",
                            marginTop: "1.5%",
                            backgroundColor: "rgb(122, 174, 233)",
                            borderColor: "black",
                            borderWidth: "2px",
                            borderRadius: 12,
                          }}
                        >
                          Buy
                        </Button>
                      </div>
                    </Card>
                  </MobileView>
                </>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
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
    // user: state.firebase.profile,
    // profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    startData: (product) => dispatch(startData(product)),
    // createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
    createFoodSurplusData: (product) =>
      dispatch(createFoodSurplusData(product)),
  };
};

const ExpDate = styled.div`
  .exp-date {
    display: flex;
    flex-direction: column;
    width: 6.5rem;
    height: 6.5rem;
    border: 1px solid #ececec;
    background-color: rgb(15, 62, 115);
    color: white;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
  }

  .exp-date__month {
    font-size: 0.75rem;
    font-weight: bold;
    margin-bottom: -0.5rem;
  }

  .exp-date__year {
    font-size: 0.75rem;
  }

  .exp-date__day {
    font-size: 1.5rem;
    font-weight: bold;
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
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "data",
        doc: props.auth.uid,
      },
    ];
  })
)(AddProductsFarm);
// export default AddProductsFarm
