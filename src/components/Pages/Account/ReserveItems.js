import { Component } from "react";
import { MobileView, BrowserView, isMobile, isBrowser } from "react-device-detect";
import { Divider, FormControlLabel } from '@material-ui/core';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {Autocomplete} from '@material-ui/lab';
import {TextField, Checkbox} from '@material-ui/core';
import {Form, Button, Card, Col, Row, InputGroup, DropdownButton, Dropdown, Table, Modal, ButtonGroup, ListGroup} from 'react-bootstrap';
import styled from "styled-components";
import {Link} from "react-router-dom"
import addNotification from "react-push-notification"
import moment from "moment"
import { startData, createReserveItemsData } from '../../../store/actions/dataActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {fs} from "../../../config/fbConfig"

class ReserveItems extends Component{

    state = {
        uid: this.props.auth.uid,

        item: "",
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

        testReservationList: [
            {resID: 1, itemList: [{name: "Onion"}, {name: "Pepper"}, {name: "Beef"}], fromDate: "2022-06-01", toDate: "2022-09-01", frequency: "Weekly"},
            {resID: 2, itemList: [{name: "Pork"}, {name: "Cod"}], fromDate: "2022-06-07", toDate: "2022-10-07", frequency: "Fortnightly"},
            {resID: 3, itemList: [{name: "Apple"}, {name: "Banana"}, {name: "Pear"}, {name: "Grapes"}], fromDate: "2022-07-01", toDate: "2022-08-01", frequency: "Weekly"}
        ],
        myReservations: [],

        // cardDeleted: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleFreqChange(value){
        this.setState({
            frequency: value
        })
    }

    isItemsEmpty(array){
        if (array.length === 0){
            return true
        } else {
            return false
        }
    }

    // testItemList(){
    //     console.log(this.state.items)
    // }

    clearForm = () => {
        this.setState({
            item: "",
            items: [],
            fromDate: "",
            toDate: "",
            frequency: "Select Frequency"
        })
    }

    showNotification = () => {
        addNotification({
            title: 'Success!',
            message: 'Successfully Reserved!',
            // theme: 'darkblue',
            // native: false,
            backgroundTop: 'rgb(29, 207, 29)', //optional, background color of top container.
            backgroundBottom: 'rgb(29, 207, 29)', //optional, background color of bottom container.
            closeButton: 'Close',
            duration: 4000
        });
    }

    deleteReservation = (rID) => {
        const newRes = this.state.myReservations.filter(res => res.resID !== rID);
        this.setState({myReservations: newRes});
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData').doc(rID).delete();
    }

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
        this.setState({
        })
        this.props.createReserveItemsData(this.state);
    }

    // =================================

    // handleTestSubmission = (e) => {
    //     this.setState( (prevState) => ({
    //         testReservationList: prevState.testReservationList.concat({itemList: this.state.items, fromDate: this.state.fromDate, toDate: this.state.toDate, frequency: this.state.frequency})
    //     }))
    // }

    // =================================

    // Method below is what gathers relevant data from user's Firebase collection to be shown in the 'My Reservations' section. Data in Firebase is stored as collections of documents: relevant collection is iterated through and relevant pieces of info in each 
    // document (in this case FROMDATE, TODATE, etc.) is taken and used to populate the 'My Reservations' section with the user's own submissions from this form.
    //
    // Same technique is used for gathering chart data in all of the Chart files, and for the daily info tab in the FoodWaste.js file

    fetchMyReservationsData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
        .get()
        .then( snapshot => {

          snapshot.forEach(doc => {

              var st = doc.data().SUBMISSIONTYPE

              var il = doc.data().ITEMLIST
              var fd = doc.data().FROMDATE
              var td = doc.data().TODATE
              var freq = doc.data().FREQUENCY

              if (st === "Reserve Items"){
                  // console.log(doc.id);

                  this.setState( (prevState) => ({
                    myReservations: prevState.myReservations.concat({itemList: il, fromDate: fd, toDate: td, frequency: freq, resID: doc.id})
                  }));
              }

          })

        })
        .catch(error => console.log(error))
    }

    // Similar to BrowserView & MobileView tags used elsewhere, here, 'isMobile' & 'isBrowser' booleans (also imported from 'react-device-detect' package) used to set certain elements of form as different values on browser & mobile
    // Note: 'componentDidMount' method is for executing certain functions upon the page loading.

    componentDidMount(){
        this.fetchMyReservationsData()

        if (isMobile){
            this.setState({formWidth: "90vw", dropdownWidth: "241px"})
        } else if (isBrowser){
            this.setState({formWidth: "783px", dropdownWidth: "610px"})
        }
    }

    render(){

        const {data, auth} = this.props;

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

                <div style={{width: "100%", height: "100%"}}>

                    <h4 className="text-center" style={{marginBottom: "2.5%", paddingTop: "8vh", fontWeight: 600}}>Plan, Reserve, Collect, Save</h4>

                    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%"}}>
                        <Button style={{width: this.state.formWidth, borderColor: "#040335", backgroundColor: "#040335"}} as={Link} to="/account">Back</Button>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%", height: "190%"}}>

                        <Card style={{width: this.state.formWidth, height: "615px", marginBottom: "10vh", backgroundColor: "#aab41e"}}>

                            <Form className="form-layout" style={{padding: "10px"}}>

                                <h5 className="text-center" style={{margin: "30px", fontSize: "15px",fontWeight: "600"}}>Plan, Reserve, Collect, Save</h5>

                                <div>

                                    {/* For 'Select Items' input below, Autocomplete component is used rather than ordinary text field. Info on this (and possible future alternatives) found here: https://mui.com/components/autocomplete/ */}

                                    <div style={{padding: "0 10% 0 10%"}}>Select Items</div>
                                        <BrowserView>
                                            <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                                                <Autocomplete 
                                                    // multiple
                                                    freeSolo
                                                    id="item"
                                                    options={foodOptions.map((option) => option.title)}
                                                    style={{width: "90%", backgroundColor: "white"}}
                                                    size="small"
                                                    onInputChange={(e) => this.handleChange(e)}
                                                    onChange={(e) => this.setState({ item: e.target.textContent})}
                                                    renderInput={(params) => ( <TextField {...params} label="Enter Items" variant="outlined" /> )}
                                                />
                                                {this.state.item !== "" ?
                                                    <Button type="button" style={{width: "10%", backgroundColor: "#040335"}} onClick={() => this.setState((prevState) => ({items: prevState.items.concat({name: this.state.item})}))}>Add</Button>
                                                :
                                                    <Button type="button" style={{width: "10%"}} variant="secondary" disabled>Add</Button>
                                                }       
                                            </Form.Group>
                                        </BrowserView>

                                        <MobileView>
                                            <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                                                <Autocomplete 
                                                    // multiple
                                                    freeSolo
                                                    id="item"
                                                    options={foodOptions.map((option) => option.title)}
                                                    style={{width: "70%", backgroundColor: "white"}}
                                                    size="small"
                                                    onInputChange={(e) => this.handleChange(e)}
                                                    onChange={(e) => this.setState({ item: e.target.textContent})}
                                                    renderInput={(params) => ( <TextField {...params} label="Enter Items" variant="outlined" /> )}
                                                />
                                                {this.state.item !== "" ?
                                                    <Button type="button" style={{width: "30%", backgroundColor: "#040335"}} onClick={() => this.setState((prevState) => ({items: prevState.items.concat({name: this.state.item})}))}>Add</Button>
                                                :
                                                    <Button type="button" style={{width: "30%"}} variant="secondary" disabled>Add</Button>
                                                }
                                            </Form.Group>
                                        </MobileView>

                                    <div style={{padding: "0 10% 0 10%"}}>Selected Items</div>
                                    <div style={{overflowY: "scroll", height: "85px", width: "80%", marginLeft: "10%", backgroundColor: "white", marginBottom: "10px"}}>
                                        <Table striped bordered hover size="sm">
                                            <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white"}}><tr><b>Items Added</b></tr></thead>
                                            <tbody>
                                                {this.state.items.map(item => (                                                 
                                                    <tr>{item.name}</tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <ButtonGroup style={{width: "80%", marginLeft: "10%", marginTop: "-10px", marginBottom: "10px"}}>
                                        {!this.isItemsEmpty(this.state.items) ?
                                            <Button style={{backgroundColor: "#040335", width: "50%", fontSize: "75%"}} onClick={() => this.setState({items: this.state.items.filter((item, index) => index != this.state.items.length - 1)})}>Remove Last Item</Button>
                                        :
                                            <Button variant="secondary" style={{width: "50%", fontSize: "75%"}} disabled>Remove Last Item</Button>
                                        }

                                        {!this.isItemsEmpty(this.state.items) ?
                                            <Button style={{backgroundColor: "#040335", width: "50%", fontSize: "75%"}} onClick={() => this.setState({items: []})}>Clear</Button>
                                        :
                                            <Button variant="secondary" style={{width: "50%", fontSize: "75%"}} disabled>Clear</Button>
                                        }
                                    </ButtonGroup>

                                    {/* For below, 'type=date' added to <Form.Control ... /> tag to allow date to be entered via a calendar pop-up, rather than just text */}

                                    <div style={{padding: "0 10% 0 10%"}}>From</div>
                                    <Form.Group style={{padding: "0 10% 0 10%", display: "flex", justifyContent: "space-around"}}>
                                        <InputGroup>
                                            <Form.Control id="fromDate" type="date" min="2022-06-01" placeholder="DD/MM/YYYY" onChange={(e) => this.handleChange(e)} width="100%" value={this.state.fromDate} />
                                        </InputGroup>
                                    </Form.Group>

                                    <div style={{padding: "0 10% 0 10%"}}>To</div>
                                    <Form.Group style={{padding: "0 10% 0 10%", display: "flex", justifyContent: "space-around"}}>
                                        <InputGroup>
                                            <Form.Control id="toDate" type="date" min="2022-07-01" placeholder="DD/MM/YYYY" onChange={(e) => this.handleChange(e)} width="100%" value={this.state.toDate} />
                                        </InputGroup>
                                    </Form.Group>

                                    {/* Dropdown menu below updates value shown on menu on screen, and simultaneously updates value of 'frequency' value in state. Dropdown menus in other forms (e.g. Food Waste) work in the same way */}

                                    <div style={{padding: "0 10% 0 10%"}}>Frequency</div>
                                    <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                                        <InputGroup>
                                            <DDMenuStyle>
                                                <Dropdown>
                                                    <DropdownToggle variant="secondary" style={{width: this.state.dropdownWidth}} className="dd">{this.state.frequency}</DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem as="button" type="button">
                                                            <div onClick={(e) => this.handleFreqChange(e.target.textContent)}>
                                                                Weekly
                                                            </div>
                                                        </DropdownItem>

                                                        <DropdownItem as="button" type="button">
                                                            <div onClick={(e) => this.handleFreqChange(e.target.textContent)}>
                                                                Fortnightly
                                                            </div>
                                                        </DropdownItem>

                                                        <DropdownItem as="button" type="button">
                                                            <div onClick={(e) => this.handleFreqChange(e.target.textContent)}>
                                                                Monthly
                                                            </div>
                                                        </DropdownItem>
                                                    </DropdownMenu>  
                                                </Dropdown>
                                            </DDMenuStyle>
                                        </InputGroup>
                                    </Form.Group>

                                    <Divider style={{marginBottom: "10px"}}/>

                                    {/* this.handleReserveItemSubmit(e); */}

                                    {/* 
                                        Reserve/Submit button is rendered in a 'ternary operator' to make the button clickable only once the form has been fully correctly filled out. 
                                        Same technique is used for submit buttons on other forms (e.g. FoodWaste.js), and also used similarly for 'Add' & 'Remove Last Item'/'Clear' buttons above.
                                    */}

                                    {this.state.items !== [] && this.state.fromDate !== "" && this.state.toDate !== "" && this.state.frequency !== "Select Frequency" ?
                                        <Button style={{margin: "0 10% 0 10%", backgroundColor: "#040335", width: "80%", marginTop: "5px"}} onClick={(e) => { this.handleReserveItemSubmit(e); this.clearForm(); this.showNotification(); }} variant="secondary" type="button">Reserve</Button>
                                    :
                                        <Button style={{margin: "0 10% 0 10%", width: "80%", marginTop: "5px"}} variant="secondary" disabled>Reserve</Button>
                                    }

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
                            marginBottom: '10vh',
                            backgroundColor: "#040335",
                            overflowY: 'auto'
                        }}
                        >

                            <h5 className="text-center" style={{fontWeight: 600, color: "white", marginTop: "2.5%", marginBottom: "5%"}}>My Reservations</h5>

                            {/* "collection".map("each item in collection" => ( <>...</> ) ) method used here to render boxes shown in My Reservations section in the same way for all "Reserve Items" submissions in user's Firebase collection data */}

                            <div>
                                {this.state.myReservations.map(res => (
                                    <>
                                        <BrowserView>
                                            <Card style={{width: "95%", marginLeft: "2.5%", backgroundColor: "rgb(38, 120, 214)", height: "160px", marginBottom: "50px"}}>

                                                <div className="text-center" style={{marginBottom: "7.5px"}}>
                                                    <span style={{marginRight: "20%"}}><b>From: </b> {res.fromDate}</span> <b>To: </b> {res.toDate}
                                                </div>

                                                <div onClick={() => this.deleteReservation(res.resID)} style={{fontSize: "150%", fontWeight: 600, marginLeft: "97.5%", marginTop: "-4.5%"}}>X</div>

                                                <div className="text-center" style={{marginBottom: "10px"}}>
                                                    <b>Frequency: </b> {res.frequency}
                                                </div>

                                                <div style={{overflowY: "scroll", marginBottom: "10px"}}>
                                                    <Table striped bordered hover size="sm" style={{width: "99.5%", marginLeft: "0.5%", height: "50px", backgroundColor: "white"}}>
                                                        <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white"}}><tr><b>Items Reserved</b></tr></thead>
                                                        <tbody>

                                                            {/* 'map' method used again to add each item in each document's "ITEMLIST" array to table */}

                                                            {res.itemList.map(item => (                                                 
                                                                <tr>{item.name}</tr>
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
                                            <Card style={{width: "95%", marginLeft: "2.5%", backgroundColor: "rgb(38, 120, 214)", height: "160px", marginBottom: "50px"}}>

                                                <div className="text-center" style={{marginBottom: "5px"}}>
                                                    <span style={{marginRight: "8.5%"}}><b>From: </b> {res.fromDate} </span> <b>To: </b> {res.toDate}
                                                </div>

                                                <div onClick={() => this.deleteReservation(res.resID)} style={{marginLeft: "95%", marginTop: "-10%", fontWeight: 600, fontSize: "150%"}}>X</div>

                                                <div className="text-center" style={{marginBottom: "10px"}}>
                                                    <b>Frequency: </b> {res.frequency}
                                                </div>

                                                <div style={{overflowY: "scroll", marginBottom: "10px"}}>
                                                    <Table striped bordered hover size="sm" style={{width: "99.5%", marginLeft: "0.25%", height: "50px", backgroundColor: "white"}}>
                                                        <thead style={{textAlign: "center", backgroundColor: "rgb(13, 27, 92, 0.8)", color: "white"}}><tr><b>Items Reserved</b></tr></thead>
                                                        <tbody>
                                                            {res.itemList.map(item => (                                                 
                                                                <tr>{item.name}</tr>
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
        )
    }

}

const foodOptions = [
    {title: "Ham"},
    {title: "Beef"},
    {title: "Chicken"},
    {title: "Pork"},
    {title: "Cod"},
    {title: "Haddock"},
    {title: "Lamb"},
    {title: "Apple"},
    {title: "Banana"},
    {title: "Orange"},
    {title: "Pear"},
    {title: "Grapes"},
    {title: "Potato"},
    {title: "Milk"},
    {title: "Onion"},
    {title: "Cucumber"},
    {title: "Peppers"},
    {title: "Cabbage"},
]

// 'mapStateToProps' & 'mapDispatchToProps' consts below necessary to get & submit data to user's specific Firebase collection (notice 'uid' used in 'fetchMyReservationsData' to get correct collection)

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
        // createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
        // createFoodSurplusData: (product) => dispatch(createFoodSurplusData(product)),
        // createFoodIntakeData: (product) => dispatch(createFoodIntakeData(product)),
        createReserveItemsData: (product) => dispatch(createReserveItemsData(product)),
    }
}

const DDMenuStyle = styled.div`
    .dd{
        background-color: white;
        color: grey;
        border-color: grey;

    }
`;

// files that require use of Firebase collection data require this kind of export statement rather than just 'export default FileName'

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: "data" }]))(ReserveItems);
// export default ReserveItems