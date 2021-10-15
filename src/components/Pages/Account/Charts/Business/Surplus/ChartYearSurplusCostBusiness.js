import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../../../../config/fbConfig'

import { Button, ButtonGroup } from 'react-bootstrap';
import "../../../../Pages.css"
import "../../../../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("YYYY")

class Chart74 extends Component {

    state = {
        uid: this.props.auth.uid,
        janSurplusCostBusiness: 0,
        febSurplusCostBusiness: 0,
        marSurplusCostBusiness: 0,
        aprSurplusCostBusiness: 0,
        maySurplusCostBusiness: 0,
        junSurplusCostBusiness: 0,
        julSurplusCostBusiness: 0,
        augSurplusCostBusiness: 0,
        sepSurplusCostBusiness: 0,
        octSurplusCostBusiness: 0,
        novSurplusCostBusiness: 0,
        decSurplusCostBusiness: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var year = doc.data().YEAR
                var month = doc.data().MONTH
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                // var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE
                var los = doc.data().LOCALORNOT

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                  if (year === time && month === "Jan" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      janSurplusCostBusiness: prevState.janSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Feb" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      febSurplusCostBusiness: prevState.febSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Mar" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      marSurplusCostBusiness: prevState.marSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Apr" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      aprSurplusCostBusiness: prevState.aprSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "May" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      maySurplusCostBusiness: prevState.maySurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Jun" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      junSurplusCostBusiness: prevState.junSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Jul" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      julSurplusCostBusiness: prevState.julSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Aug" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      augSurplusCostBusiness: prevState.augSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Sep" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      sepSurplusCostBusiness: prevState.sepSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Oct" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      octSurplusCostBusiness: prevState.octSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Nov" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      novSurplusCostBusiness: prevState.novSurplusCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Dec" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      decSurplusCostBusiness: prevState.decSurplusCostBusiness += newCost
                    }));
                  }
            })

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
                                ['Month', 'Food Surplus Costs Saved'],
                                ['January', this.state.janSurplusCostBusiness],
                                ['February', this.state.febSurplusCostBusiness],
                                ['March', this.state.marSurplusCostBusiness],
                                ['April', this.state.aprSurplusCostBusiness],
                                ['May', this.state.maySurplusCostBusiness],
                                ['June', this.state.junSurplusCostBusiness],
                                ['July', this.state.julSurplusCostBusiness],
                                ['August', this.state.augSurplusCostBusiness],
                                ['September', this.state.sepSurplusCostBusiness],
                                ['October', this.state.octSurplusCostBusiness],
                                ['November', this.state.novSurplusCostBusiness],
                                ['December', this.state.decSurplusCostBusiness],
                            ]}
                            options={{
                                title: 'This year\'s Food Surplus Costs Saved Performance (' + time + ', Business)',
                                chartArea: {width: '75%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Costs Saved from Food Surplus (GBP (£))'
                                }
                            }}
                            legendToggle
                        />
                      </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostBusiness">View Previous (Monthly Surplus Cost)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} disabled>View Next</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>
                    {/* <ChartStyle> */}
                    <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>
                        <Chart className="bar-chart"
                            width={'90vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Month', 'Costs Saved '],
                                ['Jan', this.state.janSurplusCostBusiness],
                                ['Feb', this.state.febSurplusCostBusiness],
                                ['Mar', this.state.marSurplusCostBusiness],
                                ['Apr', this.state.aprSurplusCostBusiness],
                                ['May', this.state.maySurplusCostBusiness],
                                ['Jun', this.state.junSurplusCostBusiness],
                                ['Jul', this.state.julSurplusCostBusiness],
                                ['Aug', this.state.augSurplusCostBusiness],
                                ['Sep', this.state.sepSurplusCostBusiness],
                                ['Oct', this.state.octSurplusCostBusiness],
                                ['Nov', this.state.novSurplusCostBusiness],
                                ['Dec', this.state.decSurplusCostBusiness],
                            ]}
                            options={{
                                title: 'Food Surplus Costs Saved Performance (' + time + ', Business)',
                                chartArea: {width: '62.5%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Costs Saved from Food Surplus (GBP (£))'
                                }
                            }}
                        />
                      </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostBusiness">Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} disabled>Next</Button>
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

export default connect(mapStateToProps, null)(Chart74);
