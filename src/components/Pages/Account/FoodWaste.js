import React, {Component} from 'react';
import {Form, Button, Card, Col, Row, InputGroup, DropdownButton} from 'react-bootstrap';
import { connect } from 'react-redux';
import { startData, createFoodSurplusData, createFoodWasteData } from '../../../store/actions/dataActions';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from "styled-components";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment"
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import {Chart} from "react-google-charts"

const time = moment().format("MMMM Do YYYY, h:mm:ss a")
class FoodWaste extends Component {

    state = {
        name: this.props.user.firstName,
        email: this.props.auth.email,
        uid: this.props.auth.uid,
        filteredData: [],
        weightOfInedibleFoodWaste: 0,
        weightOfEdibleFoodWaste: 0,
        dailyFoodWaste: 0,

        edibleFoodWasteType: "Select Type",
        inedibleFoodWasteType: "Select Type",

        edibleMoisture: 0,
        inedibleMoisture: 0,

        EdibleGHG: 0,
        InedibleGHG: 0,
        dailyFoodSurplus: 0,
        costOfEdibleFoodWaste: 0,
        costOfInedibleFoodWaste: 0,
        dropDownValueEFW: "Select Currency",
        dropDownValueIFW: "Select Currency",
        currencyMultiplierEFW: 0,
        currencyMultiplierIFW: 0,

        // chart experiment below

        // dataChart: {
        //     datasets: [{
        //         data: [0]
        //     }],
        // },
    }

    // handleChartSubmit = () => {
    //     const {dataChart} = this.state;
    //     this.setState({
    //         dataChart: {
    //             ...dataChart,
    //             datasets: [{
    //                 data: [...dataChart.datasets[0].data,
    //                 this.state.weightOfEdibleFoodWaste]
    //             }]
    //         }
    //     })
    // }

        // chart experiment above

    changeEFWCurrency(text) {
        this.setState({dropDownValueEFW: text})
    }

    changeIFWCurrency(text) {
        this.setState({dropDownValueIFW: text})
    }

    changeMultiplierEFW(value) {
        this.setState({currencyMultiplierEFW: value})
    }

    changeMultiplierIFW(value) {
        this.setState({currencyMultiplierIFW: value})
    }

    handleChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleEdibleFoodTypeChange(text) {
        this.setState({edibleFoodWasteType: text})
    }

    handleInedibleFoodTypeChange(text) {
        this.setState({inedibleFoodWasteType: text})
    }

    handleEdibleMoistureChange(event) {
        this.setState({edibleMoisture: event.target.value})
    }

    handleInedibleMoistureChange(event) {
        this.setState({inedibleMoisture: event.target.value})
    }

    handleEdibleFoodWasteGHGChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            EdibleGHG: Number(e.target.value) * 2.5,
        })
    }

    handleInedibleFoodWasteGHGChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            InedibleGHG: Number(e.target.value) * 2.5,
        })
    }

    handleEdibleFoodCostChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            costOfEdibleFoodWaste: Number(e.target.value) * 0.85
        })

    }

    handleInedibleFoodCostChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value,
            costOfInedibleFoodWaste: Number(e.target.value) * 0.85
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
                height:'575px'
            }}
            >
                
            <Form className= "form-layout" onSubmit={this.handleFoodWasteSubmit} style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "33px",fontWeight: "600",}}>Edible Food Waste (FW)</h5>
                <div>

                    <div style={{padding: "0 10% 0 10%"}}>Weight</div>
                    <Form.Group className= "form-layout" 
                        style={{
                            padding: "0 10% 0 10%", 
                            display: "flex", 
                            justifyContent: 'space-around'}} 
                    >
                    <InputGroup>
                        <Form.Control type="number" id="weightOfEdibleFoodWaste" placeholder="Enter weight of food waste" onChange={(e) => {this.handleEdibleFoodWasteGHGChange(e); this.handleEdibleFoodCostChange(e)}} width="100%" value={this.state.weightOfEdibleFoodWaste}/>{/*kg*/}
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
                            title={this.state.edibleFoodWasteType}
                            id="igdd"
                        >
                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                    Carbohydrates
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                    Protein
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
                                    Fat
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.handleEdibleFoodTypeChange(e.target.textContent)}}>
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
                        <Form.Control type="number" pattern="[0-100]*" min={0} max={100} id="edibleMoisture" placeholder="Enter moisture content of food waste" onChange={(e) => {this.handleEdibleMoistureChange(e)}} width="100%" value={this.state.edibleMoisture}/>
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
                        <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={this.state.EdibleGHG} width="100%"/>{/*<p style={{width:'100px'}}>kg co2</p>*/}
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
                            title={this.state.dropDownValueEFW}
                            id="input-group-dropdown-1"
                        >

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeEFWCurrency(e.target.textContent); this.changeMultiplierEFW(1)}}>
                                    GBP (£)
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeEFWCurrency(e.target.textContent); this.changeMultiplierEFW(1.404)}}>
                                    USD ($)
                                </div>
                            </DropdownItem>

                            <DropdownItem as="button">
                                <div onClick={(e) => {this.changeEFWCurrency(e.target.textContent); this.changeMultiplierEFW(1.161)}}>
                                    EUR (€)
                                </div>    
                            </DropdownItem>

                        </DropdownButton>

                    <Form.Control type="number" id="costOfFoodSurplus" placeholder="Enter cost of food surplus" value={(this.state.costOfEdibleFoodWaste*this.state.currencyMultiplierEFW).toFixed(2)}/>{/*pounds*/}
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
                height:'575px'
            }}>
            <Form className= "form-layout" onSubmit={this.handleFoodSurplusSubmit} style={{padding: "10px"}}>  
                <h5 className="text-center" style={{margin: "30px", fontSize: "32px",fontWeight: "600",}}>Inedible Food Waste</h5>

                <div>

                    <div style={{padding: "0 10% 0 10%"}}>Weight</div>
                    <Form.Group className= "form-layout" style={{padding: "0 10% 0 10%", display: "flex", justifyContent: 'space-around'}} >
                    <InputGroup>
                        <Form.Control type="number" id="weightOfInedibleFoodWaste" placeholder="Enter weight of food surplus" onChange={(e) => {this.handleInedibleFoodWasteGHGChange(e); this.handleInedibleFoodCostChange(e)}} value={this.state.weightOfInedibleFoodWaste}/>{/*kg*/}
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
                        <Form.Control type="number" id="GHG" placeholder="Enter GHG value" value={this.state.InedibleGHG} width="100%"/>{/*<p style={{width:'100px'}}>kg co2</p>*/}
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
                            title={this.state.dropDownValueIFW}
                            id="input-group-dropdown-1"
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

                    <Form.Control type="number" id="costOfFoodSurplus" placeholder="Enter cost of food surplus" value={(this.state.costOfInedibleFoodWaste*this.state.currencyMultiplierIFW).toFixed(2)}/>{/*pounds*/}
                    </InputGroup>
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

              {/* <Chart 
                className="bar-chart"
                width={500}
                height={700}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}

                data={[
                    ['Food Wastage Type', 'Food Wastage Weight'],
                    [this.state.edibleFoodWasteType, parseInt(this.state.weightOfEdibleFoodWaste)],
                    ['Protein', 11],
                    ['Fat', 2],
                    ['Fibre', 5],
                ]}

                // data={chartData}

                options={{
                    title: 'Todays Food Wastage Performance (Column)',
                    chartArea: { width: '30%' },
                    hAxis: {
                    title: 'Food Wastage Type',
                    minValue: 0,
                    },
                    vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                    },
                }}
                legendToggle              
              /> */}
            
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

export default compose(connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{ collection: "data" }]))(FoodWaste);
