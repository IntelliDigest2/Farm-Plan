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

class Chart83 extends Component {

    state = {
        uid: this.props.auth.uid,
        janSurplusCostFarm: 0,
        febSurplusCostFarm: 0,
        marSurplusCostFarm: 0,
        aprSurplusCostFarm: 0,
        maySurplusCostFarm: 0,
        junSurplusCostFarm: 0,
        julSurplusCostFarm: 0,
        augSurplusCostFarm: 0,
        sepSurplusCostFarm: 0,
        octSurplusCostFarm: 0,
        novSurplusCostFarm: 0,
        decSurplusCostFarm: 0,
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

                  if (year === time && month === "Jan" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      janSurplusCostFarm: prevState.janSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Feb" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      febSurplusCostFarm: prevState.febSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Mar" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      marSurplusCostFarm: prevState.marSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Apr" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      aprSurplusCostFarm: prevState.aprSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "May" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      maySurplusCostFarm: prevState.maySurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Jun" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      junSurplusCostFarm: prevState.junSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Jul" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      julSurplusCostFarm: prevState.julSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Aug" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      augSurplusCostFarm: prevState.augSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Sep" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      sepSurplusCostFarm: prevState.sepSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Oct" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      octSurplusCostFarm: prevState.octSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Nov" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      novSurplusCostFarm: prevState.novSurplusCostFarm += newCost
                    }));
                  } else if (year === time && month === "Dec" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      decSurplusCostFarm: prevState.decSurplusCostFarm += newCost
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
                                ['January', this.state.janSurplusCostFarm],
                                ['February', this.state.febSurplusCostFarm],
                                ['March', this.state.marSurplusCostFarm],
                                ['April', this.state.aprSurplusCostFarm],
                                ['May', this.state.maySurplusCostFarm],
                                ['June', this.state.junSurplusCostFarm],
                                ['July', this.state.julSurplusCostFarm],
                                ['August', this.state.augSurplusCostFarm],
                                ['September', this.state.sepSurplusCostFarm],
                                ['October', this.state.octSurplusCostFarm],
                                ['November', this.state.novSurplusCostFarm],
                                ['December', this.state.decSurplusCostFarm],
                            ]}
                            options={{
                                title: 'This year\'s Food Surplus Costs Saved Performance (' + time + ', Farm)',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostFarm">View Previous (Monthly Surplus Cost)</Button>
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
                                ['Jan', this.state.janSurplusCostFarm],
                                ['Feb', this.state.febSurplusCostFarm],
                                ['Mar', this.state.marSurplusCostFarm],
                                ['Apr', this.state.aprSurplusCostFarm],
                                ['May', this.state.maySurplusCostFarm],
                                ['Jun', this.state.junSurplusCostFarm],
                                ['Jul', this.state.julSurplusCostFarm],
                                ['Aug', this.state.augSurplusCostFarm],
                                ['Sep', this.state.sepSurplusCostFarm],
                                ['Oct', this.state.octSurplusCostFarm],
                                ['Nov', this.state.novSurplusCostFarm],
                                ['Dec', this.state.decSurplusCostFarm],
                            ]}
                            options={{
                                title: 'Food Surplus Costs Saved Performance (' + time + ', Farm)',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostFarm">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart83);
