import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("YYYY")

class Chart56 extends Component {

    state = {
        uid: this.props.auth.uid,
        janSurplusCostUni: 0,
        febSurplusCostUni: 0,
        marSurplusCostUni: 0,
        aprSurplusCostUni: 0,
        maySurplusCostUni: 0,
        junSurplusCostUni: 0,
        julSurplusCostUni: 0,
        augSurplusCostUni: 0,
        sepSurplusCostUni: 0,
        octSurplusCostUni: 0,
        novSurplusCostUni: 0,
        decSurplusCostUni: 0,
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

                  if (year === time && month === "Jan" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      janSurplusCostUni: prevState.janSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Feb" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      febSurplusCostUni: prevState.febSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Mar" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      marSurplusCostUni: prevState.marSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Apr" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      aprSurplusCostUni: prevState.aprSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "May" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      maySurplusCostUni: prevState.maySurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Jun" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      junSurplusCostUni: prevState.junSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Jul" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      julSurplusCostUni: prevState.julSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Aug" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      augSurplusCostUni: prevState.augSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Sep" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      sepSurplusCostUni: prevState.sepSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Oct" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      octSurplusCostUni: prevState.octSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Nov" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      novSurplusCostUni: prevState.novSurplusCostUni += newCost
                    }));
                  } else if (year === time && month === "Dec" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      decSurplusCostUni: prevState.decSurplusCostUni += newCost
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
                                ['January', this.state.janSurplusCostUni],
                                ['February', this.state.febSurplusCostUni],
                                ['March', this.state.marSurplusCostUni],
                                ['April', this.state.aprSurplusCostUni],
                                ['May', this.state.maySurplusCostUni],
                                ['June', this.state.junSurplusCostUni],
                                ['July', this.state.julSurplusCostUni],
                                ['August', this.state.augSurplusCostUni],
                                ['September', this.state.sepSurplusCostUni],
                                ['October', this.state.octSurplusCostUni],
                                ['November', this.state.novSurplusCostUni],
                                ['December', this.state.decSurplusCostUni],
                            ]}
                            options={{
                                title: 'This year\'s Food Surplus Costs Saved Performance (' + time + ', Academic)',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostUni">View Previous (Monthly Surplus Cost)</Button>
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
                                ['Jan', this.state.janSurplusCostUni],
                                ['Feb', this.state.febSurplusCostUni],
                                ['Mar', this.state.marSurplusCostUni],
                                ['Apr', this.state.aprSurplusCostUni],
                                ['May', this.state.maySurplusCostUni],
                                ['Jun', this.state.junSurplusCostUni],
                                ['Jul', this.state.julSurplusCostUni],
                                ['Aug', this.state.augSurplusCostUni],
                                ['Sep', this.state.sepSurplusCostUni],
                                ['Oct', this.state.octSurplusCostUni],
                                ['Nov', this.state.novSurplusCostUni],
                                ['Dec', this.state.decSurplusCostUni],
                            ]}
                            options={{
                                title: 'Food Surplus Costs Saved Performance (' + time + ', Uni)',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostUni">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart56);
