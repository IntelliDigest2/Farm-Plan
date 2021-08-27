import React, {Component, useState, useEffect} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import chartData from "../../../data/chart-data.json";
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"
import moment from "moment"

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("ddd MMM Do YYYY")

class Chart39 extends Component {

    state = {
        uid: this.props.auth.uid,
        totalEdibleCost: 0,
        totalInedibleCost: 0
    }

    fetchData = async () => {

        fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
          .get()
          .then( snapshot => {
            // var tempFwTypes = []
            // var tempFullDates = []
            snapshot.forEach(doc => {
    
              // var fwt = doc.data().FWTYPE
              var fd = doc.data().FULLDATE
              var cost = doc.data().COST
              var curr = doc.data().CURRENCY
              var eoi = doc.data().EDIBLEORINEDIBLE
    
              var newCost = 0;

              if (curr === "GBP (£)"){
                  newCost = Number(cost*1)
              } else if (curr === "USD ($)"){
                  newCost = Number((cost/1.404).toFixed(2))
              } else if (curr === "EUR (€)"){
                  newCost = Number((cost/1.161).toFixed(2))
              }
    
              if (fd === time && eoi === "Edible"){
                this.setState( (prevState) => ({
                  totalEdibleCost: prevState.totalEdibleCost += newCost
                }));
              } 
    
            })
            // console.log(tempFwTypes)
            // console.log(tempFullDates)
          })
          .catch(error => console.log(error))
    
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){

        const {auth} = this.props;

        return(
            <React.Fragment className="row">

                <br/>
                <br/>
                <br/>

                <BrowserView>
                    {/* <ChartStyle> */}
                   <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Food Loss Type', 'Food Loss Cost'],
                                ['Edible', this.state.totalEdibleCost],
                            ]}
                            options={{
                                title: 'Today\'s Food Loss Cost Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Food Loss Type',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Loss (GBP (£))'
                                }
                            }}
                            legendToggle
                        />
                    </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} disabled>View Previous</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekLossCost">View Next (Weekly Loss Cost)</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>
                    {/* <ChartStyle> */}
                   <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Food Loss Type', 'Cost '],
                                ['Edible', this.state.totalEdibleCost],
                            ]}
                            options={{
                                title: 'Today\'s Food Loss Cost Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Food Loss Type',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Loss (GBP (£))'
                                }
                            }}
                        />
                    </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '95px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} disabled>Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekLossCost">Next</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </MobileView>

            </React.Fragment>
        )

    }

}

const ChartStyle = styled.div`
  .bar-chart{
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .area-chart{
    padding: 10px;
  }
`;

const mapStateToProps = (state) => { 
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, null)(Chart39);