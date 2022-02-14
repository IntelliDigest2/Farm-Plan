import React, { Component } from "react";
import "../../../App.css";
import "../Pages.css";
import { PageWrapMini } from "../SubComponents/PageWrap";
import {
  Button,
  Card,
  Col,
  Row,
  Tab,
  Nav,
  InputGroup,
  Form,
  Modal,
} from "react-bootstrap";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { BrowserView, MobileView } from "react-device-detect";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@material-ui/core";
import { BsArrow90DegLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

class BrowseProducts extends Component {
  state = {
    // tabClicked: false,
    // tabColour: "#aab41e"
    showDevMessage: false,
  };

  // handleTabClick = (e) => {
  //     this.setState({tabClicked: !this.state.tabClicked})

  //     if (!this.state.tabClicked){
  //         this.setState({tabColour: "#aab41e"})
  //     } else {
  //         this.setState({tabColour: "rgb(55, 85, 54)"})
  //     }
  // }

  componentDidMount() {
    this.setState({ showDevMessage: true });
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.showDevMessage}
          onHide={() =>
            this.setState({ showDevMessage: !this.state.showDevMessage })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              This page is in the very early stages of development. If you have
              any suggestions on how to improve it, you can send them to us via
              the Contact Page.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showDevMessage: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <PageWrapMini goTo="/account" header="Marketplace">
          <BrowserView>
            <div className="main-div-layout">
              <h1
                className="text-center"
                style={{ marginTop: "5%", fontWeight: 600 }}
              >
                Buy Food
              </h1>

              <InputGroup
                style={{
                  left: "50%",
                  right: "50%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "2.5%",
                  width: "40%",
                }}
              >
                <BsSearch style={{ marginRight: "5px", fontSize: "30px" }} />
                <Form.Control placeholder="Search" />
              </InputGroup>
            </div>
            <div
              className="main-div-layout"
              style={{ marginTop: "10px", marginLeft: "25px" }}
            >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="first"
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Meat & Fish
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="second"
                          style={{
                            backgroundColor: "rgb(94, 120, 235)",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Frozen
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="third"
                          style={{
                            backgroundColor: "rgb(76, 226, 106)",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Dairy, Eggs & Chilled
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="fourth"
                          style={{
                            backgroundColor: "rgb(8, 105, 27)",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Fruit & Veg
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="fifth"
                          style={{
                            backgroundColor: "rgb(245, 211, 20)",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Bakery
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="sixth"
                          style={{
                            backgroundColor: "rgb(12, 34, 131)",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Drinks
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="seventh"
                          style={{
                            backgroundColor: "rgb(168, 113, 11)",
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          Pet
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Meat & Fish
                            </h5>
                            <Card
                              className="inner-card"
                              style={{ marginBottom: "7.5px" }}
                            >
                              <div>
                                <b>Product: </b>Beef Mince
                              </div>
                              <div>
                                <b>Weight: </b>150g
                              </div>
                              <div>
                                <b>Expiry Date: </b>30/07/2021
                              </div>
                              <div>
                                <b>Postcode </b>EX1 2XE
                              </div>
                              <Button
                                style={{
                                  backgroundColor: "red",
                                  width: "15%",
                                  marginLeft: "80%",
                                  marginTop: "-60px",
                                  marginBottom: "25px",
                                }}
                              >
                                View
                              </Button>
                            </Card>
                            <Card>
                              <div>
                                <b>Product: </b>Chicken
                              </div>
                              <div>
                                <b>Weight: </b>200g
                              </div>
                              <div>
                                <b>Expiry Date: </b>29/07/2021
                              </div>
                              <div>
                                <b>Postcode </b>AB1 2CD
                              </div>
                              <Button
                                style={{
                                  backgroundColor: "red",
                                  width: "15%",
                                  marginLeft: "80%",
                                  marginTop: "-60px",
                                  marginBottom: "25px",
                                }}
                              >
                                View
                              </Button>
                            </Card>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Frozen
                            </h5>
                            <Card className="inner-card">
                              <div>
                                <b>Product: </b>Ice Cream
                              </div>
                              <div>
                                <b>Weight: </b>500g
                              </div>
                              <div>
                                <b>Expiry Date: </b>13/11/2021
                              </div>
                              <div>
                                <b>Postcode: </b>PC1 1CP
                              </div>
                              <Button
                                style={{
                                  backgroundColor: "rgb(94, 120, 235)",
                                  width: "15%",
                                  marginLeft: "80%",
                                  marginTop: "-60px",
                                  marginBottom: "25px",
                                }}
                              >
                                View
                              </Button>
                            </Card>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Dairy, Eggs & Chilled
                            </h5>
                            {/* <Card className="inner-card">
                                                <div><b>n/a</b></div>
                                            </Card> */}
                            <div className="text-center">
                              <b>n/a</b>
                            </div>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Fruit & Veg
                            </h5>
                            <Card className="inner-card">
                              <div>
                                <b>Product: </b>Carrots
                              </div>
                              <div>
                                <b>Weight: </b>100g
                              </div>
                              <div>
                                <b>Expiry Date: </b>19/08/2021
                              </div>
                              <div>
                                <b>Postcode: </b>AA0 BB1
                              </div>
                              <Button
                                style={{
                                  backgroundColor: "rgb(8, 105, 27)",
                                  width: "15%",
                                  marginLeft: "80%",
                                  marginTop: "-60px",
                                  marginBottom: "25px",
                                }}
                              >
                                View
                              </Button>
                            </Card>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Bakery
                            </h5>
                            <div className="text-center">
                              <b>n/a</b>
                            </div>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                      <Tab.Pane eventKey="sixth">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Drinks
                            </h5>
                            <div className="text-center">
                              <b>n/a</b>
                            </div>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                      <Tab.Pane eventKey="seventh">
                        <CardStyle>
                          <Card
                            className="outer-card"
                            style={{ width: "600px", height: "450px" }}
                          >
                            <h5
                              className="text-center"
                              style={{
                                margin: "-30px",
                                fontSize: "33px",
                                fontWeight: "600",
                              }}
                            >
                              Products Available
                            </h5>
                            <h5
                              className="text-center"
                              style={{
                                margin: "30px",
                                fontSize: "20px",
                                fontWeight: "575",
                              }}
                            >
                              Pet
                            </h5>
                            <div className="text-center">
                              <b>n/a</b>
                            </div>
                          </Card>
                        </CardStyle>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </BrowserView>
          <MobileView>
            <div
              className="main-div-layout"
              style={{
                height: "180vh",
                width: "95%",
                marginTop: "13%",
                padding: "10px 10px 2.5px 4.5px",
              }}
            >
              {/* <Accordion defaultActiveKey="0">
                        <Accordion.Collapse eventKey="0">
                            <Accordion.Header>Meat & Fish</Accordion.Header>
                            <Accordion.Body>
                                Product: 
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Frozen</Accordion.Header>
                            <Accordion.Body>
                                Product:
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Dairy, Eggs & Chilled</Accordion.Header>
                            <Accordion.Body>
                                Product:
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Fruit & Veg</Accordion.Header>
                            <Accordion.Body>
                                Product:
                            </Accordion.Body> 
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Frozen</Accordion.Header>
                            <Accordion.Body>
                            Product:
                            </Accordion.Body> 
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Drinks</Accordion.Header>
                            <Accordion.Body>
                                Product:
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Pet</Accordion.Header>
                            <Accordion.Body>Product: </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}

              {/* <InputGroup style={{marginTop: "2%", marginBottom: "15px"}}>
                        <BsSearch style={{marginRight: "2%", marginTop: "1.5%", fontSize: "30px"}}/>
                        <Form.Control placeholder="Search"  />
                    </InputGroup>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col>
                                <Nav variant="pills" className="flex-column">

                                    <Nav.Item>
                                        <Nav.Link eventKey="first" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Meat & Fish</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Meat & Fish</h5>
                                                <Card className="inner-card" style={{marginBottom: "7.5px"}}>
                                                    <div><b>Product: {" "}</b>Beef Mince</div>
                                                    <div><b>Weight: {" "}</b>150g</div>
                                                    <div><b>Expiry Date: {" "}</b>23/07/2021</div>
                                                    <div><b>Postcode: {" "}</b>EX1 2XE</div>
                                                </Card>
                                                <Card className="inner-card">
                                                    <div><b>Product: {" "}</b>Chicken</div>
                                                    <div><b>Weight: {" "}</b>200g</div>
                                                    <div><b>Expiry Date: {" "}</b>22/07/2021</div>
                                                    <div><b>Postcode: {" "}</b>AB1 2CD</div>
                                                </Card>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                    {/* SECOND 
                                    <Nav.Item>
                                        <Nav.Link eventKey="second" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Frozen</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="second">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Frozen</h5>
                                                <Card className="inner-card">
                                                    <div><b>Product: {" "}</b>Ice Cream</div>
                                                    <div><b>Weight: {" "}</b>500g</div>
                                                    <div><b>Expiry Date: {" "}</b>13/11/2021</div>
                                                    <div><b>Postcode: {" "}</b>PC1 1CP</div>
                                                </Card>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                    {/* THIRD 
                                    <Nav.Item>
                                        <Nav.Link eventKey="third" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Dairy, Eggs & Chilled</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="third">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Dairy, Eggs & Chilled</h5>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                    {/* FOURTH 
                                    <Nav.Item>
                                        <Nav.Link eventKey="fourth" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Fruit & Veg</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="fourth">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Fruit & Veg</h5>
                                                <Card className="inner-card">
                                                    <div><b>Product: {" "}</b>Carrots</div>
                                                    <div><b>Weight: {" "}</b>100g</div>
                                                    <div><b>Expiry Date: {" "}</b>19/08/2021</div>
                                                    <div><b>Postcode: {" "}</b>AA0 BB1</div>
                                                </Card>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                    {/* FIFTH 
                                    <Nav.Item>
                                        <Nav.Link eventKey="fifth" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Frozen</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="fifth">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Bakery</h5>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                    {/* SIXTH 
                                    <Nav.Item>
                                        <Nav.Link eventKey="sixth" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Drinks</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="sixth">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Drinks</h5>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                    {/* SEVENTH 
                                    <Nav.Item>
                                        <Nav.Link eventKey="seventh" style={{backgroundColor: "#aab41e", color: "white", marginBottom: "10px"}}>Pet</Nav.Link>
                                    </Nav.Item>

                                    <Tab.Content>
                                    <Tab.Pane eventKey="seventh">
                                        <CardStyle style={{paddingBottom: "15px"}}>
                                            <Card className="outer-card" style={{width: "100%", height: "70%"}}>
                                                <h5 className="text-center" style={{margin: "-30px", fontSize: "33px",fontWeight: "600",}}>Products Available</h5>
                                                <h5 className="text-center" style={{margin: "30px", fontSize: "20px", fontWeight: "575" }}>Pet</h5>
                                            </Card>
                                        </CardStyle>
                                    </Tab.Pane>
                                    </Tab.Content>

                                </Nav>
                            </Col>
                        </Row>

                    </Tab.Container> */}

              <h5
                className="text-center"
                style={{
                  marginTop: "1.5%",
                  fontWeight: 600,
                  marginLeft: "20.5px",
                }}
              >
                Buy Food
              </h5>

              {/* <Link to="/account">
                <BsArrow90DegLeft
                  style={{
                    fontSize: "250%",
                    color: "black",
                    marginTop: "-52.5px",
                    marginRight: "25px",
                  }}
                />
              </Link> */}

              <InputGroup style={{ marginTop: "7.5%", marginBottom: "35px" }}>
                <BsSearch
                  style={{
                    marginRight: "2%",
                    marginTop: "1.5%",
                    fontSize: "30px",
                    marginLeft: "20.5px",
                  }}
                />
                <Form.Control placeholder="Search" />
              </InputGroup>

              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "red",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ color: "white" }}>
                    Meat & Fish
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  {/* <Typography>
                                ABCDEFGH
                            </Typography> */}

                  {/* <CardStyle><Card className="inner-card" style={{marginBottom: "7.5px"}}>
                                <div><b>Product: {" "}</b>Beef Mince</div>
                                <div><b>Weight: {" "}</b>150g</div>
                                <div><b>Expiry Date: {" "}</b>23/07/2021</div>
                                <div><b>Postcode: {" "}</b>EX1 2XE</div>
                            </Card></CardStyle> */}

                  <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                    <div>
                      <b>Product: </b>Beef Mince
                    </div>
                    <div>
                      <b>Weight: </b>150g
                    </div>
                    <div>
                      <b>Expiry Date: </b>30/07/2021
                    </div>
                    <div>
                      <b>Postcode: </b>EX1 2XE
                    </div>
                    <Button
                      style={{
                        backgroundColor: "red",
                        marginLeft: "10vw",
                        marginTop: "10px",
                      }}
                    >
                      View
                    </Button>

                    <Divider
                      style={{ marginTop: "15px", marginBottom: "15px" }}
                    />
                    <div>
                      <b>Product: </b>Chicken
                    </div>
                    <div>
                      <b>Weight: </b>200g
                    </div>
                    <div>
                      <b>Expiry Date: </b>29/07/2021
                    </div>
                    <div>
                      <b>Postcode: </b>AB1 2CD
                    </div>
                    <Button
                      style={{
                        backgroundColor: "red",
                        marginLeft: "10vw",
                        marginTop: "10px",
                      }}
                    >
                      View
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "rgb(103, 169, 226)",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ color: "white" }}>Frozen</Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  <Typography>
                    <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                      <div>
                        <b>Product: </b>Ice Cream
                      </div>
                      <div>
                        <b>Weight: </b>500g
                      </div>
                      <div>
                        <b>Expiry Date: </b>13/11/2021
                      </div>
                      <div>
                        <b>Postcode: </b>PC1 1CP
                      </div>
                      <Button
                        style={{
                          backgroundColor: "rgb(103, 169, 226)",
                          marginLeft: "10vw",
                          marginTop: "10px",
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "rgb(76, 226, 106)",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ color: "white" }}>
                    Dairy, Eggs & Chilled
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  <Typography>n/a</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "rgb(8, 105, 27)",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ color: "white" }}>
                    Fruit & Veg
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  <Typography>
                    <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                      <div>
                        <b>Product: </b>Carrots
                      </div>
                      <div>
                        <b>Weight: </b>100g
                      </div>
                      <div>
                        <b>Expiry Date: </b>19/08/2021
                      </div>
                      <div>
                        <b>Postcode: </b>AA0 BB1
                      </div>
                      <Button
                        style={{
                          backgroundColor: "rgb(8, 105, 27)",
                          marginLeft: "10vw",
                          marginTop: "10px",
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "rgb(245, 211, 20)",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ color: "white" }}>Bakery</Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  <Typography>n/a</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "rgb(31, 55, 212)",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ color: "white" }}>Drinks</Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  <Typography>n/a</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  marginBottom: "10px",
                  backgroundColor: "rgb(168, 113, 11)",
                  marginLeft: "20.5px",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ color: "white" }}>Pet</Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "white",
                    marginBottom: -1,
                  }}
                >
                  <Typography>n/a</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </MobileView>
        </PageWrapMini>
      </>
    );
  }
}

export default BrowseProducts;

const CardStyle = styled.div`
  .outer-card {
    color: rgb(59, 59, 59);
    background-color: rgb(238, 238, 238);
    border: none;
    border-radius: 5px;
    padding: 70px 15px 50px 15px;
  }

  inner-card {
    color: white;
  }

  .card-body {
    height: 200px;
  }
`;
