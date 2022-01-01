import { Component } from "react";
import {
  MobileView,
  BrowserView,
  isMobile,
  isBrowser,
} from "react-device-detect";
import { Divider, FormControlLabel } from "@material-ui/core";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Checkbox } from "@material-ui/core";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  InputGroup,
  DropdownButton,
  Dropdown,
  Table,
  Modal,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import addNotification from "react-push-notification";
import moment from "moment";
// import {ImCross} from "react-icons/im"
import {
  startData,
  createReserveItemsData,
} from "../../../store/actions/dataActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { fs } from "../../../config/fbConfig";

class ReserveItems extends Component {
  state = {
    uid: this.props.auth.uid,

    item: "",
    itemWeight: 0,
    weightType: "Select Unit",
    items: [],
    fromDate: "",
    toDate: "",
    frequency: "Select Frequency",

    formWidth: "",
    dropdownWidth: "",

    // showDevMessage: false,

    submissionType: "Reserve Items",

    submissionDay: moment().format("ddd"),
    submissionWeek: moment().format("W"),
    submissionMonth: moment().format("MMM"),
    submissionDate: moment().format("Do"),
    submissionYear: moment().format("YYYY"),
    submissionFullDate: moment().format("ddd MMM Do YYYY"),

    /*testReservationList: [
            {resID: 1, itemList: [{name: "Onion", weight: "200g"}, {name: "Pepper", weight: "250g"}, {name: "Beef", weight: "1kg"}], fromDate: "2022-06-01", toDate: "2022-09-01", frequency: "Weekly"},
            {resID: 2, itemList: [{name: "Pork", weight: "750g"}, {name: "Cod", weight: "450g"}], fromDate: "2022-06-07", toDate: "2022-10-07", frequency: "Fortnightly"},
            {resID: 3, itemList: [{name: "Apple", weight: "180g"}, {name: "Banana", weight: "190g"}, {name: "Pear", weight: "200g"}, {name: "Grapes", weight: "100g"}], fromDate: "2022-07-01", toDate: "2022-08-01", frequency: "Weekly"}
        ],*/
    myReservations: [],
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleWeightUnitChange(text) {
    this.setState({ weightType: text });
  }

  handleFreqChange(value) {
    this.setState({
      frequency: value,
    });
  }

  isItemsEmpty(array) {
    if (array.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  handleAddClick() {
    this.setState({
      itemWeight: 0,
      weightType: "Select Unit",
    });

    this.setState((prevState) => ({
      items: prevState.items.concat({
        name: this.state.item,
        weight: this.state.itemWeight + this.state.weightType,
      }),
    }));
  }

  // testItemList(){
  //     console.log(this.state.items)
  // }

  clearForm = () => {
    this.setState({
      item: "",
      itemWeight: 0,
      weightType: "Select Unit",
      items: [],
      fromDate: "",
      toDate: "",
      frequency: "Select Frequency",
      myReservations: [],
    });
    this.fetchMyReservationsData();
  };

  showNotification = () => {
    addNotification({
      // from react-push-notification
      //could do if browser not native, if mobile native
      title: "Success!",
      message:
        "Thank you for reserving items, you have helped a farmer plan their harvest more sustainably. We will contact you by the end of January via email about your reservation.",
      backgroundTop: "#9D5F1A",
      backgroundBottom: "#EA9434",
      closeButton: "Close",
      duration: 20000,
    });
  };

  deleteReservation = (rID) => {
    const newRes = this.state.myReservations.filter((res) => res.resID !== rID);
    this.setState({ myReservations: newRes });
    fs.collection("data")
      .doc(this.state.uid)
      .collection("writtenFoodWasteData")
      .doc(rID)
      .delete();
  };

  // testDeleteReservation = (rID) => {
  //     const newRes = this.state.testReservationList.filter(res => res.resID !== rID);
  //     this.setState({testReservationList: newRes});
  // }

  // testDeleteItem = (name, items) => {
  //     const newItemList = items.filter(item => item.name !== name);
  //     this.setState
  // }

  // Method below is what sends relevant form data to Firebase collection, 'createReserveItemsData' const is imported from 'dataActions.js' file in the 'store/actions/...' directory
  // Similar methods used for other forms with relevant const imported from 'dataActions.js' file (e.g. 'createFoodWasteData' const used for Food Waste form submissions)

  handleReserveItemSubmit = (e) => {
    e.preventDefault();
    this.setState({});
    this.props.createReserveItemsData(this.state);
  };

  // =================================

  // handleTestSubmission = (e) => {
  //     const id = Math.floor(Math.random() * 10000) + 1

  //     this.setState( (prevState) => ({
  //         testReservationList: prevState.testReservationList.concat({resID: id, itemList: this.state.items, fromDate: this.state.fromDate, toDate: this.state.toDate, frequency: this.state.frequency})
  //     }))
  // }

  // =================================

  // Method below is what gathers relevant data from user's Firebase collection to be shown in the 'My Reservations' section. Data in Firebase is stored as collections of documents: relevant collection is iterated through and relevant pieces of info in each
  // document (in this case FROMDATE, TODATE, etc.) is taken and used to populate the 'My Reservations' section with the user's own submissions from this form.
  //
  // Same technique is used for gathering chart data in all of the Chart files, and for the daily info tab in the FoodWaste.js file

  fetchMyReservationsData = async () => {
    fs.collection("data")
      .doc(this.state.uid)
      .collection("writtenFoodWasteData")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var st = doc.data().SUBMISSIONTYPE;

          var il = doc.data().ITEMLIST;
          var fd = doc.data().FROMDATE;
          var td = doc.data().TODATE;
          var freq = doc.data().FREQUENCY;

          if (st === "Reserve Items") {
            // console.log(doc.id);

            this.setState((prevState) => ({
              myReservations: prevState.myReservations.concat({
                itemList: il,
                fromDate: fd,
                toDate: td,
                frequency: freq,
                resID: doc.id,
              }),
            }));
          }
        });
      })
      .catch((error) => console.log(error));
  };

  // Similar to BrowserView & MobileView tags used elsewhere, here, 'isMobile' & 'isBrowser' booleans (also imported from 'react-device-detect' package) used to set certain elements of form as different values on browser & mobile
  // Note: 'componentDidMount' method is for executing certain functions upon the page loading.

  componentDidMount() {
    this.fetchMyReservationsData();

    if (isMobile) {
      this.setState({ formWidth: "90vw", dropdownWidth: "241px" });
    } else if (isBrowser) {
      this.setState({ formWidth: "783px", dropdownWidth: "610px" });
    }
  }

  render() {
    const { data, auth } = this.props;

    return (
      <>
        {/* <Modal show={this.state.showDevMessage} onHide={() => this.setState({showDevMessage: !this.state.showDevMessage})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This page is in the very early stages of development. If you have any suggestions
                            on how to improve it, you can send them to us via the 'Contact Us' Page.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({showDevMessage: false})}>Close</Button>
                    </Modal.Footer>
                </Modal> */}

        <div style={{ width: "100%", height: "100%" }}>
          <h4
            className="text-center"
            style={{
              marginTop: "5%",
              marginBottom: "2.5%",
              paddingTop: "8vh",
              fontWeight: 600,
            }}
          >
            Plan, Reserve, Collect, Save
          </h4>

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
              to="/pts"
            >
              Back
            </Button>
          </div>

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
            <Card
              style={{
                width: this.state.formWidth,
                height: "720px",
                marginBottom: "10vh",
                backgroundColor: "#aab41e",
              }}
            >
              <Form className="form-layout" style={{ padding: "10px" }}>
                <h5
                  className="text-center"
                  style={{
                    margin: "30px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Plan, Reserve, Collect, Save
                </h5>

                <div>
                  {/* For 'Select Items' input below, Autocomplete component is used rather than ordinary text field. Info on this (and possible future alternatives) found here: https://mui.com/components/autocomplete/ */}

                  <div style={{ padding: "0 10% 0 10%" }}>Select Items</div>
                  <BrowserView>
                    <Form.Group
                      style={{ padding: "0 10% 0 10%", display: "flex" }}
                    >
                      <Autocomplete
                        // multiple
                        freeSolo
                        id="item"
                        options={foodOptions.map((option) => option.title)}
                        style={{ width: "100%", backgroundColor: "white" }}
                        size="small"
                        onInputChange={(e) => this.handleChange(e)}
                        onChange={(e) =>
                          this.setState({ item: e.target.textContent })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Enter Items"
                            variant="outlined"
                          />
                        )}
                      />
                    </Form.Group>
                  </BrowserView>

                  <MobileView>
                    <Form.Group
                      style={{ padding: "0 10% 0 10%", display: "flex" }}
                    >
                      <Autocomplete
                        // multiple
                        freeSolo
                        id="item"
                        options={foodOptions.map((option) => option.title)}
                        style={{ width: "70%", backgroundColor: "white" }}
                        size="small"
                        onInputChange={(e) => this.handleChange(e)}
                        onChange={(e) =>
                          this.setState({ item: e.target.textContent })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Enter Items"
                            variant="outlined"
                          />
                        )}
                      />
                    </Form.Group>
                  </MobileView>

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
                        id="itemWeight"
                        placeholder="Enter weight"
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                        width="100%"
                        value={this.state.itemWeight}
                      />

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
                            }}
                          >
                            l
                          </div>
                        </DropdownItem>

                        <DropdownItem as="button" type="button">
                          <div
                            onClick={(e) => {
                              this.handleWeightUnitChange(e.target.textContent);
                            }}
                          >
                            ml
                          </div>
                        </DropdownItem>
                      </DropdownButton>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    className="form-layout"
                    style={{
                      padding: "0 10% 0 10%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {this.state.item !== "" &&
                    this.state.itemWeight !== 0 &&
                    this.state.weightType !== "Select Unit" ? (
                      <Button
                        type="button"
                        style={{ width: "50%", backgroundColor: "#040335" }}
                        onClick={() => this.handleAddClick()}
                      >
                        Add
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        style={{ width: "50%" }}
                        variant="secondary"
                        disabled
                      >
                        Add
                      </Button>
                    )}
                  </Form.Group>

                  <div style={{ padding: "0 10% 0 10%" }}>Selected Items</div>
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "85px",
                      width: "80%",
                      marginLeft: "10%",
                      backgroundColor: "white",
                      marginBottom: "10px",
                    }}
                  >
                    <ListGroup>
                      <ListGroupItem
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(13, 27, 92, 0.8)",
                          color: "white",
                          width: "100%",
                          fontWeight: 600,
                          padding: "0 1px 0 1px",
                          borderRadius: "0px",
                        }}
                      >
                        Items Added
                      </ListGroupItem>
                    </ListGroup>
                    <BrowserView>
                      <Table striped bordered hover size="sm">
                        {/* <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white", width: "200%"}}><b>Items Added</b></thead> */}
                        <tbody>
                          <tr>
                            <th style={{ textAlign: "center", width: "50%" }}>
                              <b>Item Name</b>
                            </th>
                            <th style={{ textAlign: "center", width: "50%" }}>
                              <b>Weight / Volume</b>
                            </th>
                          </tr>
                          {this.state.items.map((item) => (
                            <tr>
                              <th>{item.name}</th>
                              <th>{item.weight}</th>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </BrowserView>

                    <MobileView>
                      <Table striped bordered hover size="sm">
                        {/* <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white", width: "200%"}}><b>Items Added</b></thead> */}
                        <tbody>
                          <tr>
                            <th style={{ textAlign: "center", width: "50%" }}>
                              <b style={{ fontSize: "85%" }}>Item Name</b>
                            </th>
                            <th style={{ textAlign: "center", width: "50%" }}>
                              <b style={{ fontSize: "85%" }}>Weight/Volume</b>
                            </th>
                          </tr>
                          {this.state.items.map((item) => (
                            <tr>
                              <th>{item.name}</th>
                              <th>{item.weight}</th>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </MobileView>
                  </div>
                  <ButtonGroup
                    style={{
                      width: "80%",
                      marginLeft: "10%",
                      marginTop: "-10px",
                      marginBottom: "10px",
                    }}
                  >
                    {!this.isItemsEmpty(this.state.items) ? (
                      <Button
                        style={{
                          backgroundColor: "#040335",
                          width: "50%",
                          fontSize: "75%",
                        }}
                        onClick={() =>
                          this.setState({
                            items: this.state.items.filter(
                              (item, index) =>
                                index !== this.state.items.length - 1
                            ),
                          })
                        }
                      >
                        Remove Last Item
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        style={{ width: "50%", fontSize: "75%" }}
                        disabled
                      >
                        Remove Last Item
                      </Button>
                    )}

                    {!this.isItemsEmpty(this.state.items) ? (
                      <Button
                        style={{
                          backgroundColor: "#040335",
                          width: "50%",
                          fontSize: "75%",
                        }}
                        onClick={() => this.setState({ items: [] })}
                      >
                        Clear
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        style={{ width: "50%", fontSize: "75%" }}
                        disabled
                      >
                        Clear
                      </Button>
                    )}
                  </ButtonGroup>

                  {/* For below, 'type=date' added to <Form.Control ... /> tag to allow date to be entered via a calendar pop-up, rather than just text */}

                  <div style={{ padding: "0 10% 0 10%" }}>From</div>
                  <Form.Group
                    style={{
                      padding: "0 10% 0 10%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <InputGroup>
                      <Form.Control
                        id="fromDate"
                        type="date"
                        min="2022-06-01"
                        placeholder="DD/MM/YYYY"
                        onChange={(e) => this.handleChange(e)}
                        width="100%"
                        value={this.state.fromDate}
                      />
                    </InputGroup>
                  </Form.Group>

                  <div style={{ padding: "0 10% 0 10%" }}>To</div>
                  <Form.Group
                    style={{
                      padding: "0 10% 0 10%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <InputGroup>
                      <Form.Control
                        id="toDate"
                        type="date"
                        min="2022-07-01"
                        placeholder="DD/MM/YYYY"
                        onChange={(e) => this.handleChange(e)}
                        width="100%"
                        value={this.state.toDate}
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Dropdown menu below updates value shown on menu on screen, and simultaneously updates value of 'frequency' value in state. Dropdown menus in other forms (e.g. Food Waste) work in the same way */}

                  <div style={{ padding: "0 10% 0 10%" }}>Frequency</div>
                  <Form.Group
                    style={{ padding: "0 10% 0 10%", display: "flex" }}
                  >
                    <InputGroup>
                      <DDMenuStyle>
                        <Dropdown>
                          <DropdownToggle
                            variant="secondary"
                            width="100%"
                            className="dd"
                          >
                            {this.state.frequency}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as="button" type="button">
                              <div
                                onClick={(e) =>
                                  this.handleFreqChange(e.target.textContent)
                                }
                              >
                                Weekly
                              </div>
                            </DropdownItem>

                            <DropdownItem as="button" type="button">
                              <div
                                onClick={(e) =>
                                  this.handleFreqChange(e.target.textContent)
                                }
                              >
                                Fortnightly
                              </div>
                            </DropdownItem>

                            <DropdownItem as="button" type="button">
                              <div
                                onClick={(e) =>
                                  this.handleFreqChange(e.target.textContent)
                                }
                              >
                                Monthly
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </DDMenuStyle>
                    </InputGroup>
                  </Form.Group>

                  <Divider style={{ marginBottom: "10px" }} />

                  {/* this.handleReserveItemSubmit(e); */}

                  {/* 
                                        Reserve/Submit button is rendered in a 'ternary operator' to make the button clickable only once the form has been fully correctly filled out. 
                                        Same technique is used for submit buttons on other forms (e.g. FoodWaste.js), and also used similarly for 'Add' & 'Remove Last Item'/'Clear' buttons above.
                                    */}

                  {this.state.items !== [] &&
                  this.state.fromDate !== "" &&
                  this.state.toDate !== "" &&
                  this.state.frequency !== "Select Frequency" ? (
                    <Button
                      style={{
                        margin: "0 10% 0 10%",
                        backgroundColor: "#040335",
                        width: "80%",
                        marginTop: "5px",
                      }}
                      onClick={(e) => {
                        this.handleReserveItemSubmit(e);
                        this.clearForm();
                        this.showNotification();
                      }}
                      variant="secondary"
                      type="button"
                    >
                      Reserve
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
                      Reserve
                    </Button>
                  )}
                </div>
              </Form>
            </Card>

            <Card
              style={{
                width: this.state.formWidth,
                // height: "100%"
                height: "720px",
                //maxHeight: "300px",
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
                My Reservations
              </h5>

              {/* "collection".map("each item in collection" => ( <>...</> ) ) method used here to render boxes shown in My Reservations section in the same way for all "Reserve Items" submissions in user's Firebase collection data */}

              <div>
                {this.state.myReservations.map((res) => (
                  <>
                    <BrowserView>
                      <Card
                        style={{
                          width: "95%",
                          marginLeft: "2.5%",
                          backgroundColor: "rgb(38, 120, 214)",
                          height: "160px",
                          marginBottom: "50px",
                        }}
                      >
                        <div
                          className="text-center"
                          style={{ marginBottom: "7.5px" }}
                        >
                          <span style={{ marginRight: "20%" }}>
                            <b>From: </b> {res.fromDate}
                          </span>{" "}
                          <b>To: </b> {res.toDate}
                        </div>

                        <div
                          onClick={() => this.deleteReservation(res.resID)}
                          style={{
                            fontSize: "150%",
                            fontWeight: 600,
                            marginLeft: "97.5%",
                            marginTop: "-4.5%",
                          }}
                        >
                          X
                        </div>
                        {/* <ImCross onClick={() => this.testDeleteReservation(res.resID)} style={{marginLeft: "96.5%", marginTop: "-3.5%"}} /> */}

                        <div
                          className="text-center"
                          style={{ marginBottom: "10px" }}
                        >
                          <b>Frequency: </b> {res.frequency} {res.resID}
                        </div>

                        <div
                          style={{ overflowY: "scroll", marginBottom: "10px" }}
                        >
                          <ListGroup>
                            <ListGroupItem
                              style={{
                                textAlign: "center",
                                backgroundColor: "rgb(13, 27, 92, 0.8)",
                                color: "white",
                                width: "99.5%",
                                marginLeft: "0.5%",
                                fontWeight: 600,
                                padding: "0 1px 0 1px",
                                borderRadius: "0px",
                              }}
                            >
                              Items Reserved
                            </ListGroupItem>
                          </ListGroup>
                          <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            style={{
                              width: "99.5%",
                              marginLeft: "0.5%",
                              height: "50px",
                              backgroundColor: "white",
                            }}
                          >
                            {/* <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white"}}><tr><b>Items Reserved</b></tr></thead> */}
                            <tbody>
                              <tr>
                                <th
                                  style={{ textAlign: "center", width: "50%" }}
                                >
                                  <b>Item Name</b>
                                </th>
                                <th
                                  style={{ textAlign: "center", width: "50%" }}
                                >
                                  <b>Weight / Volume</b>
                                </th>
                              </tr>

                              {/* 'map' method used again to add each item in each document's "ITEMLIST" array to table */}

                              {res.itemList.map((item) => (
                                <>
                                  <tr>
                                    <th>{item.name}</th>
                                    <th>{item.weight}</th>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </Table>

                          {/* <ListGroup style={{width: "98%", marginLeft: "2%"}}>
                                                        <ListGroup.Item  style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white"}}>Items Added</ListGroup.Item>
                                                        {res.itemList.map(item => (
                                                            <ListGroup.Item>{item.name} <div style={{marginLeft: "95%", marginTop: "-3.5%", fontWeight: 600}}>X</div></ListGroup.Item>
                                                        ))}
                                                    </ListGroup> */}
                        </div>
                      </Card>
                    </BrowserView>

                    <MobileView>
                      <Card
                        style={{
                          width: "95%",
                          marginLeft: "2.5%",
                          backgroundColor: "rgb(38, 120, 214)",
                          height: "160px",
                          marginBottom: "50px",
                        }}
                      >
                        <div
                          className="text-center"
                          style={{ marginBottom: "5px" }}
                        >
                          <span style={{ marginRight: "8.5%" }}>
                            <b>From: </b> {res.fromDate}{" "}
                          </span>{" "}
                          <b>To: </b> {res.toDate}
                        </div>

                        <div
                          onClick={() => this.deleteReservation(res.resID)}
                          style={{
                            marginLeft: "95%",
                            marginTop: "-10%",
                            fontWeight: 600,
                            fontSize: "150%",
                          }}
                        >
                          X
                        </div>
                        {/* <ImCross onClick={() => this.testDeleteReservation(res.resID)} style={{marginLeft: "93.5%", marginTop: "-5.5%"}} /> */}

                        <div
                          className="text-center"
                          style={{ marginBottom: "10px" }}
                        >
                          <b>Frequency: </b> {res.frequency}
                        </div>

                        <div
                          style={{ overflowY: "scroll", marginBottom: "10px" }}
                        >
                          <ListGroup>
                            <ListGroupItem
                              style={{
                                textAlign: "center",
                                backgroundColor: "rgb(13, 27, 92, 0.8)",
                                color: "white",
                                width: "99.5%",
                                marginLeft: "0.25%",
                                fontWeight: 600,
                                padding: "0 1px 0 1px",
                                borderRadius: "0px",
                              }}
                            >
                              Items Reserved
                            </ListGroupItem>
                          </ListGroup>

                          <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            style={{
                              width: "99.5%",
                              marginLeft: "0.25%",
                              height: "50px",
                              backgroundColor: "white",
                            }}
                          >
                            {/* <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white"}}><tr><b>Items Reserved</b></tr></thead> */}
                            <tbody>
                              <tr>
                                <th
                                  style={{ textAlign: "center", width: "50%" }}
                                >
                                  <b style={{ fontSize: "85%" }}>Item Name</b>
                                </th>
                                <th
                                  style={{ textAlign: "center", width: "50%" }}
                                >
                                  <b style={{ fontSize: "85%" }}>
                                    Weight/Volume
                                  </b>
                                </th>
                              </tr>

                              {res.itemList.map((item) => (
                                <tr>
                                  <th>{item.name}</th>
                                  <th>{item.weight}</th>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                    </MobileView>
                  </>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

const foodOptions = [
  { title: "Ham" },
  { title: "Beef" },
  { title: "Chicken" },
  { title: "Pork" },
  { title: "Cod" },
  { title: "Haddock" },
  { title: "Lamb" },
  { title: "Apple" },
  { title: "Banana" },
  { title: "Orange" },
  { title: "Pear" },
  { title: "Grapes" },
  { title: "Potato" },
  { title: "Milk" },
  { title: "Onion" },
  { title: "Cucumber" },
  { title: "Peppers" },
  { title: "Cabbage" },
];

// 'mapStateToProps' & 'mapDispatchToProps' consts below necessary to get & submit data to user's specific Firebase collection (notice 'uid' used in 'fetchMyReservationsData' to get correct collection)

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
    // createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
    // createFoodSurplusData: (product) => dispatch(createFoodSurplusData(product)),
    // createFoodIntakeData: (product) => dispatch(createFoodIntakeData(product)),
    createReserveItemsData: (product) =>
      dispatch(createReserveItemsData(product)),
  };
};

const DDMenuStyle = styled.div`
  .dd {
    background-color: white;
    color: grey;
    border-color: grey;
  }
`;

// files that require use of Firebase collection data require this kind of export statement rather than just 'export default FileName'

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
)(ReserveItems);
// export default ReserveItems
