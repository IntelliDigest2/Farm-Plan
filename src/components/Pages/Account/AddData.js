import React, {Component} from 'react';
import {Form, Button, Card, Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { startData, createFoodSurplusData, createFoodWasteData } from '../../../store/actions/dataActions';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from "styled-components";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment"

const time = moment().format("MMMM Do YYYY, h:mm:ss a")
class AddData extends Component {

    state = {
        name: this.props.user.firstName,
        email: this.props.auth.email,
        uid: this.props.auth.uid,
        filteredData: [],
        weightOfFoodSurplus: 0,
        weightOfFoodWaste: 0,
        dailyFoodWaste: 0,
        GHG: 0,
        dailyFoodSurplus: 0,
        costOfFoodSurplus: 0,
    }

    handleChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleFoodWasteChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            GHG: Number(e.target.value) * 2.5,
        })
    }

    handleFoodSurplusChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            costOfFoodSurplus: Number(e.target.value) * 0.85
        })

    }
    
    pressButton = (e) => {
        e.preventDefault();
        this.props.startData(this.state)
    }

    handleFoodSurplusSubmit = (e) => {
        e.preventDefault();
        this.setState({
        })
        this.props.createFoodSurplusData(this.state);
    }

    handleFoodWasteSubmit = (e) => {
        e.preventDefault();
        this.setState({
        })
        this.props.createFoodWasteData(this.state);
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    // //    console.log(this.state);
    //     this.props.createProduct(this.state)
    //     this.props.history.push('/products')
    // }

    render() {
        const {data, auth} = this.props;
        // console.log(data.[auth.uid].writtenFoodWasteData);
        console.log(time);
        console.log(Date(time));
        const {foodWaste, foodSurplus} = this.state
        if(!auth.uid) return <Redirect to='/login' />
        if (data) {
        const filteredData = data && data.filter((datas) => 
            datas.email === auth.email
        )
        console.log(foodWaste);
        console.log(foodSurplus);
        return(
            <div 
                // className="container"
                style={{width: "100%", height: "100%" }}
            >
                {filteredData.length === 0 ? <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex not-found">
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
              : 
              <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: "100%", height: "100vh" }}>
            <Card 
            style={{
                // width: "90%", 
                width: "261px", 
                // height: "100%"
                height:'400px'
            }}
            >
            <Form className= "form-layout" onSubmit={this.handleFoodWasteSubmit} style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "33px",fontWeight: "600",}}>Food Waste</h5>
                <div>
                <div style={{padding: "0 10% 0 10%"}}>Weight</div>
                <Form.Group className= "form-layout" 
                style={{
                    padding: "0 10% 0 10%", 
                    display: "flex", 
                    justifyContent: 'space-around'}} 
                >
                    <Form.Control type="number" id="weightOfFoodWaste" placeholder="Enter weight of food waste" onChange={this.handleFoodWasteChange} width="100%" value={this.state.weightOfFoodWaste}/>kg
                </Form.Group>
                <div style={{padding: "0 10% 0 10%"}}>GHG</div>
                <Form.Group 
                style={{
                    padding: "0 10% 0 10%", 
                    display: "flex"
                    }}>
                    <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={this.state.GHG} width="100%"/><p style={{width:'100px'}}>kg co2</p>
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

                <Button style={{margin: "0 10% 0 10%"}} variant="secondary" type="submit">
                    Update
                </Button>
            </div>
            </Form> 
            </Card>
            <Card
            style={{
                // width: "90%", 
                width: "261px", 
                height:'400px'
            }}>
            <Form className= "form-layout" onSubmit={this.handleFoodSurplusSubmit} style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "32px",fontWeight: "600",}}>Food Surplus</h5>

                <div>
                <div style={{padding: "0 10% 0 10%"}}>Weight</div>
                <Form.Group className= "form-layout" style={{padding: "0 10% 0 10%", display: "flex", justifyContent: 'space-around'}} >
                    <Form.Control type="number" id="weightOfFoodSurplus" placeholder="Enter weight of food surplus" onChange={this.handleFoodSurplusChange} value={this.state.weightOfFoodSurplus}/>kg
                </Form.Group>
                <div style={{padding: "0 10% 0 10%"}}>Cost</div>
                <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                <Form.Control type="number" id="costOfFoodSurplus" placeholder="Enter cost of food surplus" value={this.state.costOfFoodSurplus}/>pounds
                </Form.Group>
                {/* <div style={{padding: "0 10% 0 10%"}}>Daily</div>
                <Form.Group style={{padding: "0 10% 0 10%", display: "flex"}}>
                    <Form.Control type="number" id="dailyFoodSurplus" placeholder="Enter daily food surplus value" onChange={this.handleChange} value={this.state.dailyFoodSurplus}/>kg
                </Form.Group> */}

                <Button style={{margin: "0 10% 0 10%"}} variant="secondary" type="submit">
                    Update
                </Button>
                </div>
            </Form> 
            </Card>
            </div>
              }
            
            </div>
        )
        }else {
            return <div></div>
        }
    }
}

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
        createFoodSurplusData: (product) => dispatch(createFoodSurplusData(product)),
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

      `

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: "data" }]))(AddData);
