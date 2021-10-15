import { Component } from "react";
import { MobileView, BrowserView, isMobile, isBrowser } from "react-device-detect";
import { Divider, FormControlLabel } from '@material-ui/core';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {Autocomplete} from '@material-ui/lab';
import {TextField, Checkbox} from '@material-ui/core';
import {Form, Button, Card, Col, Row, InputGroup, DropdownButton, Dropdown, Table, Modal, ButtonGroup} from 'react-bootstrap';
import styled from "styled-components";
import {Link} from "react-router-dom"
import addNotification from "react-push-notification"
import moment from "moment"
import { startData, createReserveItemsData } from '../../../store/actions/dataActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class ReserveItems extends Component{

    state = {
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
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleListUpdateText = (e) => {
        this.setState( (prevState) => ({
            items: prevState.items.concat(e.target.value)
        }))
    }

    handleListUpdateClick = (e) => {
        this.setState( (prevState) => ({
            items: prevState.items.concat(e.target.textContent)
        }))
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

    handleReserveItemSubmit = (e) => {
        e.preventDefault();
        this.setState({
        })
        this.props.createReserveItemsData(this.state);
    }

    componentDidMount(){
        // this.setState({ showDevMessage: true })

        if (isMobile){
            this.setState({formWidth: "90vw", dropdownWidth: "241px"})
        } else if (isBrowser){
            this.setState({formWidth: "783px", dropdownWidth: "610px"})
        }
    }

    render(){
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

                    <h2 className="text-center" style={{marginBottom: "2.5%", paddingTop: "8vh", fontWeight: 600}}>Reserve Items</h2>

                    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%"}}>
                        <Button style={{width: this.state.formWidth, borderColor: "#040335", backgroundColor: "#040335"}} as={Link} to="/account">Back</Button>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%", height: "190%"}}>

                        <Card style={{width: this.state.formWidth, height: "615px", marginBottom: "10vh", backgroundColor: "#aab41e"}}>

                            <Form className="form-layout" style={{padding: "10px"}}>

                                <h5 className="text-center" style={{margin: "30px", fontSize: "23px",fontWeight: "600"}}>Reserve Items</h5>

                                <div>

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

                                    {this.state.items !== [] && this.state.fromDate !== "" && this.state.toDate !== "" && this.state.frequency !== "Select Frequency" ?
                                        <Button style={{margin: "0 10% 0 10%", backgroundColor: "#040335", width: "80%", marginTop: "5px"}} onClick={(e) => { this.handleReserveItemSubmit(e); this.clearForm(); this.showNotification(); }} variant="secondary" type="button">Reserve</Button>
                                    :
                                        <Button style={{margin: "0 10% 0 10%", width: "80%", marginTop: "5px"}} variant="secondary" disabled>Reserve</Button>
                                    }

                                </div>

                            </Form>

                        </Card>

                    </div>

                </div>

            </>
        )
    }

}

const foodOptions = [
    {title: "Cereal"},
    {title: "Bacon"},
    {title: "Baked Beans"},
    {title: "Porridge"},
    {title: "Pancake"}, 
    {title: "Beef"},
    {title: "Chicken"},
    {title: "Pork"},
    {title: "Apple"},
    {title: "Banana"},
    {title: "Orange"},
    {title: "Pear"},
    {title: "Grapes"},
    {title: "Chocolate"},
    {title: "Crisps"},
    {title: "Pasta"},
    {title: "Bolognese"},
    {title: "Potato"},
    {title: "Chips"},
    {title: "Milk"},
    {title: "Fruit Juice"},
    {title: "Onion"},
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

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: "data" }]))(ReserveItems);
// export default ReserveItems