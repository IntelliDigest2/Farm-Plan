import React, {Component} from 'react';
import {Form, Button, Card, Col, Row, InputGroup, DropdownButton, Modal, Dropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import { startData, createFoodWasteData } from '../../../store/actions/dataActions';
import { Redirect } from 'react-router-dom';
import {Link} from "react-router-dom"
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from "styled-components";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment"
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';
// import {fs} from "../../../config/fbConfig"
import {BsFillQuestionCircleFill} from "react-icons/bs"
import { Divider, FormControlLabel } from '@material-ui/core';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import {Autocomplete} from '@material-ui/lab';
import {TextField, Checkbox} from '@material-ui/core';
import addNotification from "react-push-notification"

// import {Chart} from "react-google-charts"

const time = moment().format("MMMM Do YYYY, h:mm:ss a")
// const chartSubmissionDay = moment().format("ddd")
// const chartSubmissionWeek = moment().format("W")
// const chartSubmissionMonth = moment().format("MMM")
// const chartSubmissionDate = moment().format("Do")
// const chartSubmissionYear = moment().format("YYYY")
// const chartSubmissionFullDate = moment().format("ddd MMM Do YYYY")

class FoodWasteBusiness extends Component {

    state = {
        name: this.props.user.firstName,
        email: this.props.auth.email,
        uid: this.props.auth.uid,
        filteredData: [],

        formWidth: "",
        formHeight: "",

        submissionType: "Waste Business",

        // meal: "",

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

        // carbsContent: 0,
        // proteinContent: 0,
        // fatContent: 0,
        // fibreContent: 0,

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

        // costOfInedibleFoodWaste: 0,

        // dropDownValueIFW: "Select Currency",
        // currencyMultiplierIFW: 0,

        chartSubmissionDay: moment().format("ddd"),
        chartSubmissionWeek: moment().format("W"),
        chartSubmissionMonth: moment().format("MMM"),
        chartSubmissionDate: moment().format("Do"),
        chartSubmissionYear: moment().format("YYYY"),
        chartSubmissionFullDate: moment().format("ddd MMM Do YYYY"),

        // showComposition: false,

        // dataChartEFW: [['Food Wastage Type', 'Food Wastage Weight']],

        // autocompleteEntries: [
        //     {}
        // ]
    }

    // handleChartSubmit(label, column){
    //     this.setState((prevState) => ({
    //         dataChartEFW: [...prevState.dataChartEFW, [label, column]],
    //     }));
    // }

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
            // carbsContent: 0,
            // proteinContent: 0,
            // fatContent: 0,
            // fibreContent: 0,
            // moisture: 0,
            ghg: 0,
            foodWasteCost: 0,
            currency: "Select Currency",
            currencyMultiplier: 0,
            formHeight: "590px"
        });
    }

    notificationTest = () => {
        addNotification({
        title: 'Success!',
        message: 'Food Waste successfully updated!',
        // theme: 'darkblue',
        // native: false,
        backgroundTop: '#aab41e', //optional, background color of top container.
        backgroundBottom: '#aab41e', //optional, background color of bottom container.
        closeButton: 'Close',
        duration: 4000
        });
    }

    changeMeal(text){
        this.setState({meal: text})
    }

    changeCurrency(text) {
        this.setState({currency: text})
    }

    // changeIFWCurrency(text) {
    //     this.setState({dropDownValueIFW: text})
    // }

    changeCurrencyMultiplier(value) {
        this.setState({currencyMultiplier: value})
    }

    // changeMultiplierIFW(value) {
    //     this.setState({currencyMultiplierIFW: value})
    // }

    changeWeightMultiplier(value) {
        this.setState({weightMultiplier: value})
    }

    handleChange = (e) => {
        // console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleEdibleInedibleSurplusChange = (e) => {
        // console.log(e)
        this.setState({edibleInedibleSurplus: e})
    }

    // handleProducedLocallyChange(text){
    //     this.setState({producedLocally: text})
    // }

    handleWeightUnitChange(text){
        this.setState({weightType: text})
    }

    // handleEdibleFoodTypeChange(text) {
    //     this.setState({edibleFoodWasteType: text})
    // }

    // handleInedibleFoodTypeChange(text) {
    //     this.setState({inedibleFoodWasteType: text})
    // }

    // handleCarbsContentChange(event) {
    //     this.setState({carbsContent: event.target.value})
    // }

    // handleProteinContentChange(event) {
    //     this.setState({proteinContent: event.target.value})
    // }

    // handleFibreContentChange(event) {
    //     this.setState({fibreContent: event.target.value})
    // }

    // handleFatContentChange(event) {
    //     this.setState({fatContent: event.target.value})
    // }

    // handleMoistureChange(event) {
    //     this.setState({moisture: event.target.value})
    // }

    // handleInedibleMoistureChange(event) {
    //     this.setState({inedibleMoisture: event.target.value})
    // }

    handleFoodWasteGHGChange = (e) => {
        //console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            ghg: Number(e.target.value) * 2.5,
        })
    }

    // handleInedibleFoodWasteGHGChange = (e) => {
    //     //console.log(e);
    //     this.setState({
    //         [e.target.id]: e.target.value,
    //         inedibleGHG: Number(e.target.value) * 2.5,
    //     })
    // }

    handleFoodCostChange = (e) => {
        //console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            foodWasteCost: (Number(e.target.value) * 0.85).toFixed(2)
        })
    }

    handleInedibleFoodCostChange = (e) => {
        //console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            costOfInedibleFoodWaste: (Number(e.target.value) * 0.85).toFixed(2)
        })

    }

    // handleTimeChange = (e) => {
    //     this.setState({
    //         chartSubmissionDay: moment().format("ddd"),
    //         chartSubmissionWeek: moment().format("W"),
    //         chartSubmissionMonth: moment().format("MMM"),
    //         chartSubmissionDate: moment().format("Do"),
    //         chartSubmissionYear: moment().format("YYYY"),
    //         chartSubmissionFullDate: moment().format("ddd MMM Do YYYY")
    //     });
    // }

    // ===========================================================================
    
    pressButton = (e) => {
        e.preventDefault();
        this.props.startData(this.state)
    }

    // handleFoodSurplusSubmit = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //     })
    //     this.props.createFoodSurplusData(this.state);
    // }

    handleFoodWasteSubmit = (e) => {
        e.preventDefault();
        this.setState({
        })
        this.props.createFoodWasteData(this.state);
    }

    handleFormHeight(text){
        if (text === "Select" || text === "Edible"){
            this.setState({formHeight: "590px"})
        } else if (text === "Inedible"){
            this.setState({formHeight: "445px"})
        }
    }

    handleCheckboxTick = (e) => {
        if (e.target.name === "checkedA"){
            this.setState({ 
                [e.target.name]: e.target.checked,
                checkedB: !e.target.checked,
                eatingInOrOut: "Eating In"
            });
        } else if (e.target.name === "checkedB"){
            this.setState({
                [e.target.name]: e.target.checked,
                checkedA: !e.target.checked,
                eatingInOrOut: "Eating Out"
            })
        }
    }

    // handleFoodNameEntry(text){
    //     this.setState({
    //         foodName: text
    //     })
    // }

    // handleAutoCompleteValueEntry(text){
    //     this.setState( (prevState) => ({
    //         autocompleteEntries: {...prevState.autocompleteEntries, text}
    //     }));
    // }

    // handleFoodWasteSubmitMobile = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //     })
    //     this.props.createFoodWasteData(this.state);
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    // //    console.log(this.state);
    //     this.props.createProduct(this.state)
    //     this.props.history.push('/products')
    // }

    componentDidMount() {
        if (isMobile){
            this.setState({formWidth: "72vw", formHeight: "590px"})
        }
        else if (isBrowser){
            this.setState({formWidth: "261px", formHeight: "590px"})
        }
    }

    render() {

        const {data, auth} = this.props;
        // console.log(data.[auth.uid].writtenFoodWasteData);
        // console.log(time);
        // console.log(Date(time));
        const {foodWaste, foodSurplus} = this.state
        if(!auth.uid) return <Redirect to='/login' />
        if (data) {
        const filteredData = data && data.filter((datas) => 
            datas.email === auth.email
        )
        // console.log(foodWaste);
        // console.log(foodSurplus);

        // 284 - paddingBottom:

        return(
            <div 
                // className="container"
                style={{width: "100%", height: "100%" }}
            >
            <MobileView><h6 style={{paddingTop: '8vh', color: 'black', justifyContent: 'center', display: 'flex'}}>Update Edible/Inedible Food Waste</h6></MobileView>
            <BrowserView><h4 style={{paddingTop: '8vh', color: 'black', justifyContent: 'center', display: 'flex'}}>Update Edible/Inedible Food Waste (Business)</h4></BrowserView>

            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%"}}>
                <Button style={{width: this.state.formWidth, borderColor: "#aab41e"}} className="custom-btn-2" as={Link} to="/account">Back</Button>
            </div>

                {filteredData.length === 0 ? <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex not-found">
        <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
        <Col className="mt-5 pt-5" xs={12}></Col>
          <Col className="" xs={12} lg={4}></Col>
                  <Col className=" justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0" xs={12} lg={4}>

            <CardStyle>
                <Card>
                    <Card.Body>
                   <Card.Text className="text-center">
                   <h1 style={{fontSize: "33px",fontWeight: "600", color: "rgb(55, 85, 54)",}}>Start tracking your food waste now</h1>
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
              : 

              <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%", height: "190%"}}>

            {/* <BrowserView> */}

                <Card 
                style={{
                    // width: "90%", 
                    width: this.state.formWidth, 
                    // height: "100%"
                    height:this.state.formHeight,
                    marginBottom: '10vh'
                    // backgroundColor: 'lightgray'
                }}
                >
                
                {/* onSubmit={this.handleFoodWasteSubmit}     */}
            <Form className= "form-layout" style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "23px",fontWeight: "600",}}>Food Waste</h5>
                
                <div>

                    {/* <div style={{padding: "0 10% 0 10%"}}>Meal</div>
                    <Form.Group
                        style={{
                            padding: "0 10% 0 10%",
                            // paddingBottom: "20px",
                            display: "flex"
                        }}>
                    <InputGroup>
                        <DDMenuStyle>
                            <Dropdown>
                                <DropdownToggle variant="secondary" style={{width: "190px"}} className="dd">{this.state.meal}</DropdownToggle>
                                <DropdownMenu>

                                    {/* as="button" 
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.changeMeal(e.target.textContent)}>
                                            Breakfast
                                        </div>
                                    </DropdownItem>

                                    {/* as="button" 
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.changeMeal(e.target.textContent)}>
                                            Lunch
                                        </div>
                                    </DropdownItem>

                                    {/* as="button" 
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.changeMeal(e.target.textContent)}>
                                            Dinner
                                        </div>
                                    </DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                        </DDMenuStyle>
                    </InputGroup>

                    </Form.Group> */}

                    {/* <div style={{padding: "0 10% 0 10%"}}>Food Name</div>
                    <Form.Group style={{padding: "0 10% 0 10%", display: "flex", marginBottom: "30px"}}>
                        <Autocomplete
                            freeSolo 
                            id="foodName"
                            options={foodOptions}
                            // getOptionLabel={(option) => option.name}
                            style={{width: "100%"}}
                            size="small"
                            onChange={(e) => this.setState({ foodName: e.target.textContent })}
                            onInputChange={(e) => this.handleChange(e)}
                            renderInput={(params) => ( <TextField {...params} label="Enter Food Name" variant="outlined" /> )}
                        />
                    </Form.Group> */}

                    {/* <div style={{padding: "0 10% 0 10%"}}>Eating In or Out?</div>
                        <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                            <FormControlLabel control={<Checkbox style={{color: '#aab41e', '&$checked': {color: '#aab41e'} }} checked={this.state.checkedA} name="checkedA" onChange={(e) => this.handleCheckboxTick(e)} />} label="Eating In" />
                        </Form.Group>
                        <Form.Group style={{padding: "0 10% 0 10%", marginTop: "-25px", display: "flex"}}>
                            <FormControlLabel control={<Checkbox style={{color: '#aab41e', '&$checked': {color: '#aab41e'} }} checked={this.state.checkedB} name="checkedB" onChange={(e) => this.handleCheckboxTick(e)} />} label="Eating Out" />
                        </Form.Group> */}

                    {/* <Divider /> */}

                    {/* <div style={{padding: "0 10% 0 10%", paddingTop: "25px"}}>Food Name <div style={{fontSize: "11px"}}>(e.g. Bread, Milk, Spaghetti, ...)</div></div>
                    <Form.Group
                        style={{
                            padding: "0 10% 0 10%",
                            display: "flex"
                        }}>
                    <InputGroup>
                    <Form.Control id="foodName" placeholder="Enter food name" onChange={(e) => {this.handleChange(e)}} width="100%" value={this.state.foodName}/>
                    </InputGroup>

                    </Form.Group> */}

                    {/* <BsFillQuestionCircleFill onClick={() => this.setState({showEdibleOrInedible: true})} style={{marginLeft: '5px'}}/> */}
                    <div style={{padding: "0 10% 0 10%", paddingTop: "25px"}}>Edible or Inedible?</div>
                    <Form.Group
                        style={{
                            padding: "0 10% 0 10%",
                            display: "flex"
                        }}>
                        <InputGroup>
                            <DDMenuStyle>
                                <Dropdown>
                                    <DropdownToggle variant="secondary" style={{width: "190px"}} className="dd">{this.state.edibleInedibleSurplus}</DropdownToggle>
                                    <DropdownMenu>

                                        {/* as="button" */}
                                        <DropdownItem as="button" type="button">
                                            <div onClick={(e) => {this.handleEdibleInedibleSurplusChange(e.target.textContent); this.handleFormHeight(e.target.textContent)}}>
                                                Edible
                                            </div>
                                        </DropdownItem>

                                        {/* as="button" */}
                                        <DropdownItem as="button" type="button">
                                            <div onClick={(e) => {this.handleEdibleInedibleSurplusChange(e.target.textContent); this.handleFormHeight(e.target.textContent)}}>
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

                    {/* <Modal show={this.state.showEdibleOrInedible} onHide={() => this.setState({showEdibleOrInedible: !this.state.showEdibleOrInedible})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edible & Inedible Food Waste Guide</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <li>Edible Food Waste examples: ...</li>
                            <li>Inedible Food Waste examples: ...</li>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({showEdibleOrInedible: false})}>Close</Button>
                        </Modal.Footer>
                    </Modal> */}

                <div>{this.state.edibleInedibleSurplus === "Edible" || this.state.edibleInedibleSurplus === "Select"  ? 
                    <div>

                        <div style={{padding: "0 10% 0 10%"}}>Weight / Volume</div>
                        <Form.Group className= "form-layout" 
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex", 
                                justifyContent: 'space-around'}} 
                        >
                        <InputGroup>
                            <Form.Control  type="number" id="foodWasteWeight" placeholder="Enter weight of food waste" onChange={(e) => {this.handleFoodWasteGHGChange(e); this.handleFoodCostChange(e)}} width="100%" value={this.state.foodWasteWeight}/>
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

                                <Dropdown.Header>Weight (Solids)</Dropdown.Header>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(1)}}>
                                        kg
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.001)}}>
                                        g
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.028)}}>
                                        oz
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.454)}}>
                                        lbs
                                    </div>
                                </DropdownItem>

                                <Dropdown.Divider />

                                <Dropdown.Header>Volume (Liquids)</Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(1)}}>
                                        l
                                    </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.001)}}>
                                        ml
                                    </div>
                                </DropdownItem>

                            </DropdownButton>

                        </InputGroup>
                        </Form.Group>

                        {/* <div style={{padding: "0 10% 0 10%"}}>Local or Non-local Produce?</div>
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
                                >
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Local Produce
                                        </div>
                                    </DropdownItem>

                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Non-local Produce
                                        </div>
                                    </DropdownItem>

                                </DropdownButton>
                            </InputGroup>

                        </Form.Group> */}

                        <div style={{padding: "0 10% 0 10%"}}>Expiry Date</div>
                        <Form.Group className="form-layout"
                            style={{
                                padding: "0 10% 0 10%",
                                display: "flex",
                                justifyContent: "space-around"
                            }}
                        >
                        <InputGroup>
                            <Form.Control id="expiryDate" placeholder="DD/MM/YYYY" onChange={(e) => this.handleChange(e)} width="100%" value={this.state.expiryDate} />
                        </InputGroup>
                        </Form.Group>

                        {/* <div style={{padding: "0 10% 0 10%"}}>Food Waste Type</div>  
                        <Form.Group
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex"}}                    
                        >
                        <InputGroup>
                            <DropdownButton
                                variant="outline-secondary"
                                title={this.state.edibleFoodWasteType}
                                id="igdd"
                                // style ={{backgroundColor: 'white'}}
                            >

                                
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                        Carbohydrates
                                    </div>
                                </DropdownItem>

                                
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                        Protein
                                    </div>
                                </DropdownItem>

                                
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                        Fat
                                    </div>
                                </DropdownItem>

                            
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                        Fibre
                                    </div>
                                </DropdownItem>                                                        

                            </DropdownButton>
                        </InputGroup>
                        </Form.Group> */}
                        {/* <div>
                            <div style={{padding: "0 10% 0 10%", fontWeight: "bold"}}>Food Waste Composition<BsFillQuestionCircleFill onClick={() => this.setState({showComposition: true})} style={{marginLeft: '5px'}}/></div>

                            <Modal show={this.state.showComposition} onHide={() => this.setState({showComposition: !this.state.showComposition})}>
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
                            </Modal>

                            <div style={{padding: "0 10% 0 10%"}}>Carbohydrate Content</div>
                            <Form.Group className="form-layout"
                                style={{
                                    padding: "0 10% 0 10%",
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                            <InputGroup>
                                <Form.Control type="number" pattern="[0-100]*" min={0} max={100 - this.state.proteinContent - this.state.fatContent - this.state.fibreContent} id="carbsContent" placeholder="Enter carbohydrate content of food waste" onChange={(e) => this.handleCarbsContentChange(e)} width="100%" value={this.state.carbsContent}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </Form.Group>

                            <div style={{padding: "0 10% 0 10%"}}>Protein Content</div>
                            <Form.Group className="form-layout"
                                style={{
                                    padding: "0 10% 0 10%",
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                            <InputGroup>
                                <Form.Control type="number" pattern="[0-100]*" min={0} max={100 - this.state.carbsContent - this.state.fatContent - this.state.fibreContent} id="proteinContent" placeholder="Enter protein content of food waste" onChange={(e) => this.handleProteinContentChange(e)} width="100%" value={this.state.proteinContent}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </Form.Group>

                            <div style={{padding: "0 10% 0 10%"}}>Fat Content</div>
                            <Form.Group className="form-layout"
                                style={{
                                    padding: "0 10% 0 10%",
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                            <InputGroup>
                                <Form.Control type="number" pattern="[0-100]*" min={0} max={100 - this.state.proteinContent - this.state.carbsContent - this.state.fibreContent} id="fatContent" placeholder="Enter fat content of food waste" onChange={(e) => this.handleFatContentChange(e)} width="100%" value={this.state.fatContent}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </Form.Group>

                            <div style={{padding: "0 10% 0 10%"}}>Fibre Content</div>
                            <Form.Group className="form-layout"
                                style={{
                                    padding: "0 10% 0 10%",
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                            <InputGroup>
                                <Form.Control type="number" pattern="[0-100]*" min={0} max={100 - this.state.proteinContent - this.state.carbsContent - this.state.fatContent} id="fibreContent" placeholder="Enter fibre content of food waste" onChange={(e) => this.handleFibreContentChange(e)} width="100%" value={this.state.fibreContent}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </Form.Group>

                            <div style={{padding: "0 10% 0 10%"}}>TOTAL</div>
                            <Form.Group className="form-layout"
                                style={{
                                    padding: "0 10% 0 10%",
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                            <InputGroup>
                                <Form.Control id="totalContent" placeholder="Total content" width="100%" value={Number(this.state.carbsContent)+Number(this.state.proteinContent)+Number(this.state.fatContent)+Number(this.state.fibreContent) + "/100"}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </Form.Group>

                        </div> */}

                        {/* <div style={{padding: "0 10% 0 10%"}}>Moisture Content<BsFillQuestionCircleFill onClick={() => this.setState({showMoisture: true})} style={{marginLeft: '5px'}}/></div>

                        <Modal show={this.state.showMoisture} onHide={() => this.setState({showMoisture: !this.state.showMoisture})}>
                            <Modal.Header closeButton>
                                <Modal.Title>Moisture Content Guide</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <li>Banana: 10%</li>
                                <li>Bread: 0%</li>
                                <li>...</li>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({showMoisture: false})}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                        <Form.Group className="form-layout"
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex",
                                justifyContent: 'space-around'}}                      
                        >
                        <InputGroup>
                            <Form.Control type="number" pattern="[0-100]*" min={0} max={100} id="moisture" placeholder="Enter moisture content of food waste" onChange={(e) => {this.handleMoistureChange(e)}} width="100%" value={this.state.moisture}/>
                            <InputGroup.Append>
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form.Group>          */}

                        <div style={{padding: "0 10% 0 10%"}}>GHG</div>
                        <Form.Group 
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex"}}
                        >
                        <InputGroup>
                            <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={(this.state.ghg*this.state.weightMultiplier).toFixed(2)} width="100%"/>{/*<p style={{width:'100px'}}>kg co2</p>*/}
                            <InputGroup.Append>
                                <InputGroup.Text>kg co2</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form.Group>

                        <div style={{padding: "0 10% 0 10%"}}>Cost</div>
                        <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
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
                                    <div onClick={(e) => {this.changeCurrency(e.target.textContent); this.changeCurrencyMultiplier(1)}}>
                                        GBP (£)
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.changeCurrency(e.target.textContent); this.changeCurrencyMultiplier(1.404)}}>
                                        USD ($)
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.changeCurrency(e.target.textContent); this.changeCurrencyMultiplier(1.161)}}>
                                        EUR (€)
                                    </div>    
                                </DropdownItem>

                            </DropdownButton>

                        <Form.Control type="number" id="foodWasteCost" placeholder="Enter cost of food surplus" value={(this.state.foodWasteCost*this.state.currencyMultiplier*this.state.weightMultiplier).toFixed(2)}/>{/*pounds*/}
                        </InputGroup>
                        </Form.Group>

                        {/* <div style={{padding: "0 10% 0 10%"}}>Daily</div>
                        <Form.Group 
                        style={{
                            padding: "0 10% 0 10%",
                            width: "90%",
                            display: "flex"
                            }}>
                            <Form.Control type="number" id="dailyFoodWaste" placeholder="Enter daily food waste value" onChange={this.handleChange} width="100%" value={this.state.dailyFoodWaste}/>kg
                        </Form.Group> */}

                        {/* this.addData([id, this.state.weightOfEdibleFoodWaste, this.state.edibleFoodWasteType, this.state.edibleMoisture, this.state.edibleGHG, this.state.dropDownValueEFW, this.state.costOfEdibleFoodWaste]) */}
                        {/* this.handleChartSubmit(this.state.edibleFoodWasteType, parseInt(this.state.weightOfEdibleFoodWaste)); */}

                        {/* this.handleFoodWasteSubmit(e); */}

                        {/* <Button style={{margin: "0 10% 0 10%", backgroundColor: '#aab41e', width: "80%", marginTop: "5px"}} onClick={(e) => {this.handleFoodWasteSubmit(e); this.notificationTest(); this.clearEFWForm() }} variant="secondary" type="button">
                            Update
                        </Button> */}

                        <div>{ this.state.edibleInedibleSurplus === "Edible" && this.state.foodWasteWeight !== 0, this.state.weightType !== "Select Unit" && this.state.expiryDate !== "" && this.state.currency !== "Select Currency" ?
                            <Button style={{margin: "0 10% 0 10%", backgroundColor: '#aab41e', width: "80%", marginTop: "5px"}} onClick={(e) => {this.handleFoodWasteSubmit(e); this.notificationTest(); this.clearEFWForm() }} variant="secondary" type="button">
                                Update
                            </Button>

                            :

                            <Button style={{margin: "0 10% 0 10%", width: "80%", marginTop: "5px"}} variant="secondary" disabled>
                                Update
                            </Button>                            
                            
                        }</div>

                    </div> : 
                    
                    <div>

                        <div style={{padding: "0 10% 0 10%"}}>Weight / Volume</div>
                        <Form.Group className= "form-layout" 
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex", 
                                justifyContent: 'space-around'}} 
                        >
                        <InputGroup>
                            <Form.Control type="number" id="foodWasteWeight" placeholder="Enter weight of food waste" onChange={(e) => {this.handleFoodWasteGHGChange(e); this.handleFoodCostChange(e)}} width="100%" value={this.state.foodWasteWeight}/>
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

                                <Dropdown.Header>Weight (Solids)</Dropdown.Header>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(1)}}>
                                        kg
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.001)}}>
                                        g
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.028)}}>
                                        oz
                                    </div>
                                </DropdownItem>

                                {/* as="button" */}
                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.454)}}>
                                        lbs
                                    </div>
                                </DropdownItem>

                                <Dropdown.Divider />

                                <Dropdown.Header>Volume (Liquids)</Dropdown.Header>

                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(1)}}>
                                        l
                                    </div>
                                </DropdownItem>

                                <DropdownItem as="button" type="button">
                                    <div onClick={(e) => {this.handleWeightUnitChange(e.target.textContent); this.changeWeightMultiplier(0.001)}}>
                                        ml
                                    </div>
                                </DropdownItem>

                            </DropdownButton>

                        </InputGroup>
                        </Form.Group>

                        {/* <div style={{padding: "0 10% 0 10%"}}>Local or Non-local Produce?</div>
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
                                >
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Local Produce
                                        </div>
                                    </DropdownItem>

                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Non-local Produce
                                        </div>
                                    </DropdownItem>

                                </DropdownButton>
                            </InputGroup>

                        </Form.Group> */}

                        {/* <div style={{padding: "0 10% 0 10%"}}>Moisture Content<BsFillQuestionCircleFill onClick={() => this.setState({showMoisture: true})} style={{marginLeft: '5px'}}/></div>

                        <Modal show={this.state.showMoisture} onHide={() => this.setState({showMoisture: !this.state.showMoisture})}>
                            <Modal.Header closeButton>
                                <Modal.Title>Moisture Content Guide</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <li>Banana: 10%</li>
                                <li>Bread: 0%</li>
                                <li>...</li>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({showMoisture: false})}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                        <Form.Group className="form-layout"
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex",
                                justifyContent: 'space-around'}}                      
                        >
                        <InputGroup>
                            <Form.Control type="number" pattern="[0-100]*" min={0} max={100} id="moisture" placeholder="Enter moisture content of food waste" onChange={(e) => {this.handleMoistureChange(e)}} width="100%" value={this.state.moisture}/>
                            <InputGroup.Append>
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form.Group>  */}

                        <div style={{padding: "0 10% 0 10%"}}>GHG</div>
                        <Form.Group 
                            style={{
                                padding: "0 10% 0 10%", 
                                display: "flex"}}
                        >
                        <InputGroup>
                            <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={(this.state.ghg*this.state.weightMultiplier).toFixed(2)} width="100%"/>{/*<p style={{width:'100px'}}>kg co2</p>*/}
                            <InputGroup.Append>
                                <InputGroup.Text>kg co2</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form.Group>
                        {/* this.handleFoodWasteSubmit(e); this.handleAutoCompleteValueEntry(this.state.foodName);*/}
                        {/* <Button style={{margin: "0 10% 0 10%", backgroundColor: '#aab41e', width: "80%", marginTop: "5px"}} onClick={(e) => {this.handleFoodWasteSubmit(e); this.notificationTest(); this.clearEFWForm() }} variant="secondary" type="button">
                            Update
                        </Button> */}

                        <div>{ this.state.edibleInedibleSurplus === "Inedible" && this.state.foodWasteWeight !== 0 && this.state.weightType !== "Select Unit" ?
                            <Button style={{margin: "0 10% 0 10%", backgroundColor: '#aab41e', width: "80%", marginTop: "5px"}} onClick={(e) => {this.handleFoodWasteSubmit(e); this.notificationTest(); this.clearEFWForm() }} variant="secondary" type="button">
                                Update
                            </Button>

                            :

                            <Button style={{margin: "0 10% 0 10%", width: "80%", marginTop: "5px"}} variant="secondary" disabled>
                                Update
                            </Button>

                        }</div>

                    </div>
        }
                </div>
                </div>
            </Form> 
            </Card>
            {/* </BrowserView> */}

            {/* <BrowserView>
            <Card
            style={{
                // width: "90%", 
                width: "261px", 
                height:'575px',
                marginBottom: '100px'
                // backgroundColor: 'lightgray'
            }}>
            <Form className= "form-layout" onSubmit={this.handleFoodSurplusSubmit} style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "32px",fontWeight: "600",}}>Inedible Food Waste</h5>

                <div>

                    <div style={{padding: "0 10% 0 10%"}}>Weight</div>
                    <Form.Group className= "form-layout" style={{padding: "0 10% 0 10%", display: "flex", justifyContent: 'space-around'}} >
                    <InputGroup>
                        <Form.Control type="number" id="weightOfInedibleFoodWaste" placeholder="Enter weight of food surplus" onChange={(e) => {this.handleInedibleFoodWasteGHGChange(e); this.handleInedibleFoodCostChange(e)}} value={this.state.weightOfInedibleFoodWaste}/>
                        <InputGroup.Append>
                            <InputGroup.Text>kg</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>

                    <div style={{padding: "0 10% 0 10%"}}>Food Waste Type</div>  
                    <Form.Group
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex"}}                    
                    >
                    <InputGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title={this.state.inedibleFoodWasteType}
                            id="igdd"
                            // style ={{backgroundColor: 'white'}}
                        >
                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Carbohydrates
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Protein
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Fat
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Fibre
                                </div>
                            </DropdownItem>                                                        

                        </DropdownButton>
                    </InputGroup>
                    </Form.Group>

                    <div style={{padding: "0 10% 0 10%"}}>Moisture Content</div>
                    <Form.Group className="form-layout"
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex",
                            justifyContent: 'space-around'}}                      
                    >
                    <InputGroup>
                        <Form.Control type="number" id="inedibleMoisture" pattern="[0-100]*" min={0} max={100} placeholder="Enter moisture content of food waste" onChange={(e) => {this.handleInedibleMoistureChange(e)}} width="100%" value={this.state.inedibleMoisture}/>
                        <InputGroup.Append>
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>                     

                    <div style={{padding: "0 10% 0 10%"}}>GHG</div>
                    <Form.Group 
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex"}}
                    >
                    <InputGroup>
                        <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={this.state.inedibleGHG} width="100%"/>
                        <InputGroup.Append>
                            <InputGroup.Text>kg co2</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>

                    <div style={{padding: "0 10% 0 10%"}}>Cost</div>
                    <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                    <InputGroup>

                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.dropDownValueIFW}
                            id="input-group-dropdown-1"
                            // style ={{backgroundColor: 'white'}}
                        >

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeIFWCurrency(e.target.textContent); this.changeMultiplierIFW(1)}}>
                                    GBP (£)
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeIFWCurrency(e.target.textContent); this.changeMultiplierIFW(1.404)}}>
                                    USD ($)
                                </div>
                            </DropdownItem>

                            <DropdownItem>
                                <div onClick={(e) => {this.changeIFWCurrency(e.target.textContent); this.changeMultiplierIFW(1.161)}}>
                                    EUR (€)
                                </div>    
                            </DropdownItem>

                        </DropdownButton>

                    <Form.Control type="number" id="costOfFoodSurplus" placeholder="Enter cost of food surplus" value={(this.state.costOfInedibleFoodWaste*this.state.currencyMultiplierIFW).toFixed(2)}/>
                    </InputGroup>
                    </Form.Group>

                    <Button style={{margin: "0 10% 0 10%"}} variant="secondary" type="submit">
                        Update
                    </Button>

                </div>
            </Form> 
            </Card>
            </BrowserView>

            <MobileView>
            <Card
            style={{
                // width: "90%", 
                width: "261px", 
                height:'575px',
                marginBottom: '60px'
                // backgroundColor: 'lightgray'
            }}>
            <Form className= "form-layout" onSubmit={this.handleFoodSurplusSubmit} style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "32px",fontWeight: "600",}}>Inedible Food Waste</h5>

                <div>

                    <div style={{padding: "0 10% 0 10%"}}>Weight</div>
                    <Form.Group className= "form-layout" style={{padding: "0 10% 0 10%", display: "flex", justifyContent: 'space-around'}} >
                    <InputGroup>
                        <Form.Control type="number" id="weightOfInedibleFoodWaste" placeholder="Enter weight of food surplus" onChange={(e) => {this.handleInedibleFoodWasteGHGChange(e); this.handleInedibleFoodCostChange(e)}} value={this.state.weightOfInedibleFoodWaste}/>
                        <InputGroup.Append>
                            <InputGroup.Text>kg</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>

                    <div style={{padding: "0 10% 0 10%"}}>Food Waste Type</div>  
                    <Form.Group
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex"}}                    
                    >
                    <InputGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title={this.state.inedibleFoodWasteType}
                            id="igdd"
                            // style ={{backgroundColor: 'white'}}
                        >
                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Carbohydrates
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Protein
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Fat
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleInedibleFoodTypeChange(e.target.textContent)}}>
                                    Fibre
                                </div>
                            </DropdownItem>                                                        

                        </DropdownButton>
                    </InputGroup>
                    </Form.Group>

                    <div style={{padding: "0 10% 0 10%"}}>Moisture Content</div>
                    <Form.Group className="form-layout"
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex",
                            justifyContent: 'space-around'}}                      
                    >
                    <InputGroup>
                        <Form.Control type="number" id="inedibleMoisture" pattern="[0-100]*" min={0} max={100} placeholder="Enter moisture content of food waste" onChange={(e) => {this.handleInedibleMoistureChange(e)}} width="100%" value={this.state.inedibleMoisture}/>
                        <InputGroup.Append>
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>                     

                    <div style={{padding: "0 10% 0 10%"}}>GHG</div>
                    <Form.Group 
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex"}}
                    >
                    <InputGroup>
                        <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={this.state.inedibleGHG} width="100%"/>
                        <InputGroup.Append>
                            <InputGroup.Text>kg co2</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>

                    <div style={{padding: "0 10% 0 10%"}}>Cost</div>
                    <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                    <InputGroup>

                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.dropDownValueIFW}
                            id="input-group-dropdown-1"
                            // style ={{backgroundColor: 'white'}}
                        >

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeIFWCurrency(e.target.textContent); this.changeMultiplierIFW(1)}}>
                                    GBP (£)
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeIFWCurrency(e.target.textContent); this.changeMultiplierIFW(1.404)}}>
                                    USD ($)
                                </div>
                            </DropdownItem>

                            <DropdownItem>
                                <div onClick={(e) => {this.changeIFWCurrency(e.target.textContent); this.changeMultiplierIFW(1.161)}}>
                                    EUR (€)
                                </div>    
                            </DropdownItem>

                        </DropdownButton>

                    <Form.Control type="number" id="costOfFoodSurplus" placeholder="Enter cost of food surplus" value={(this.state.costOfInedibleFoodWaste*this.state.currencyMultiplierIFW).toFixed(2)}/>
                    </InputGroup>
                    </Form.Group>

                    <Button style={{margin: "0 10% 0 10%"}} variant="secondary" type="submit">
                        Update
                    </Button>

                </div>
            </Form> 
            </Card>
            </MobileView> */}

            </div>
              }

            {/* <ChartStyle>
                <Chart 
                    className="chart"
                    width={500}
                    height={600}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}

                    // data={[
                    //     ['Food Wastage Type', 'Food Wastage Weight'],
                    //     [this.state.edibleFoodWasteType, parseInt(this.state.weightOfEdibleFoodWaste)],
                    //     ['Protein', 11],
                    //     ['Fat', 2],
                    //     ['Fibre', 5],
                    // ]}

                    data={this.state.dataChartEFW}

                    options={{
                        title: 'Todays Food Wastage Performance (Column)',
                        chartArea: { width: '30%' },
                        hAxis: {
                        title: 'Food Wastage Type',
                        colors: ['#aab41e'],
                        minValue: 0,
                        },
                        vAxis: {
                        title: 'Weight of Food Wastage (kg)',
                        },
                    }}
                    legendToggle              
                />
            </ChartStyle>    */}
            
            </div>
        )
        }else {
            return <div></div>
        }
    }
}

const foodOptions = [
    "Cereal",
    "Bacon",
    "Baked Beans",
    "Porridge",
    "Pancake", 
    "Beef",
    "Chicken",
    "Pork",
    "Apple",
    "Banana",
    "Orange",
    "Pear",
    "Grapes",
    "Chocolate",
    "Crisps",
    "Pasta",
    "Bolognese",
    "Potato",
    "Chips",
    "Milk",
    "Fruit Juice",
    "Onion",
]

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        data: state.firestore.ordered.data,
        user: state.firebase.profile,
        profile: state.firebase.profile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        startData: (product) => dispatch(startData(product)),
        createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
        // createFoodSurplusData: (product) => dispatch(createFoodSurplusData(product)),
    }
}

const CardStyle = styled.div`
      .card{
        color: rgb(59, 59, 59);
        background-color: rgb(238, 238, 238);
        border: none;
        border-radius:5px;
        padding:70px 0 50px 0;
      }
      
      .card-body{
          height:200px;
      }

`;

const FormStyle = styled.div`
      .form{
          display: flex;
          align-items: center;
          top: 50%;
          transform: translateY(20%)
      }
`;

const ChartStyle = styled.div`
    .chart{
        position: absolute;
        left: 17%;
        padding: 20px
    }
`;

const DDMenuStyle = styled.div`
    .dd{
        background-color: white;
        color: grey;
        border-color: grey;

    }
`;

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: "data" }]))(FoodWasteBusiness);