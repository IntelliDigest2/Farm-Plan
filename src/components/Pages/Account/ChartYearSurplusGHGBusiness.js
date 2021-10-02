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

class Chart71 extends Component {

    state = {
        uid: this.props.auth.uid,
        janSurplusGHGBusiness: 0,
        febSurplusGHGBusiness: 0,
        marSurplusGHGBusiness: 0,
        aprSurplusGHGBusiness: 0,
        maySurplusGHGBusiness: 0,
        junSurplusGHGBusiness: 0,
        julSurplusGHGBusiness: 0,
        augSurplusGHGBusiness: 0,
        sepSurplusGHGBusiness: 0,
        octSurplusGHGBusiness: 0,
        novSurplusGHGBusiness: 0,
        decSurplusGHGBusiness: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var year = doc.data().YEAR
                var month = doc.data().MONTH
                var ghg = doc.data().GHG
                // var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE
                var los = doc.data().LOCALORNOT

                if (year === time && month === "Jan" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      janSurplusGHGBusiness: prevState.janSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Feb" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      febSurplusGHGBusiness: prevState.febSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Mar" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      marSurplusGHGBusiness: prevState.marSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Apr" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      aprSurplusGHGBusiness: prevState.aprSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "May" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      maySurplusGHGBusiness: prevState.maySurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Jun" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      junSurplusGHGBusiness: prevState.junSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Jul" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      julSurplusGHGBusiness: prevState.julSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Aug" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      augSurplusGHGBusiness: prevState.augSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Sep" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      sepSurplusGHGBusiness: prevState.sepSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Oct" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      octSurplusGHGBusiness: prevState.octSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Nov" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      novSurplusGHGBusiness: prevState.novSurplusGHGBusiness += ghg
                    }));
                  } else if (year === time && month === "Dec" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      decSurplusGHGBusiness: prevState.decSurplusGHGBusiness += ghg
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
                                ['Month', 'Food Surplus GHG Saved'],
                                ['January', this.state.janSurplusGHGBusiness],
                                ['February', this.state.febSurplusGHGBusiness],
                                ['March', this.state.marSurplusGHGBusiness],
                                ['April', this.state.aprSurplusGHGBusiness],
                                ['May', this.state.maySurplusGHGBusiness],
                                ['June', this.state.junSurplusGHGBusiness],
                                ['July', this.state.julSurplusGHGBusiness],
                                ['August', this.state.augSurplusGHGBusiness],
                                ['September', this.state.sepSurplusGHGBusiness],
                                ['October', this.state.octSurplusGHGBusiness],
                                ['November', this.state.novSurplusGHGBusiness],
                                ['December', this.state.decSurplusGHGBusiness],
                            ]}
                            options={{
                                title: 'This year\'s Food Surplus GHG Saved Performance (' + time + ', Business)',
                                chartArea: {width: '75%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions Saved from Food Surplus (kg co2)'
                                }
                            }}
                            legendToggle
                        />
                      </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHGBusiness">View Previous (Monthly Surplus GHG)</Button>
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
                                ['Month', 'GHG Saved '],
                                ['Jan', this.state.janSurplusGHGBusiness],
                                ['Feb', this.state.febSurplusGHGBusiness],
                                ['Mar', this.state.marSurplusGHGBusiness],
                                ['Apr', this.state.aprSurplusGHGBusiness],
                                ['May', this.state.maySurplusGHGBusiness],
                                ['Jun', this.state.junSurplusGHGBusiness],
                                ['Jul', this.state.julSurplusGHGBusiness],
                                ['Aug', this.state.augSurplusGHGBusiness],
                                ['Sep', this.state.sepSurplusGHGBusiness],
                                ['Oct', this.state.octSurplusGHGBusiness],
                                ['Nov', this.state.novSurplusGHGBusiness],
                                ['Dec', this.state.decSurplusGHGBusiness],
                            ]}
                            options={{
                                title: 'Food Surplus GHG Saved Performance (' + time + ', Business)',
                                chartArea: {width: '62.5%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions Saved from Food Surplus (kg co2)'
                                }
                            }}
                        />
                      </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHGBusiness">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart71);
