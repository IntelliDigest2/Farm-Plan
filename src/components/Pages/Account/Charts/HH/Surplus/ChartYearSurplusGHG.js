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

class Chart17 extends Component {

    state = {
        uid: this.props.auth.uid,
        janSurplusGHG: 0,
        febSurplusGHG: 0,
        marSurplusGHG: 0,
        aprSurplusGHG: 0,
        maySurplusGHG: 0,
        junSurplusGHG: 0,
        julSurplusGHG: 0,
        augSurplusGHG: 0,
        sepSurplusGHG: 0,
        octSurplusGHG: 0,
        novSurplusGHG: 0,
        decSurplusGHG: 0,
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

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                if (year === time && month === "Jan" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      janSurplusGHG: prevState.janSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Feb" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      febSurplusGHG: prevState.febSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Mar" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      marSurplusGHG: prevState.marSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Apr" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      aprSurplusGHG: prevState.aprSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "May" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      maySurplusGHG: prevState.maySurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Jun" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      junSurplusGHG: prevState.junSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Jul" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      julSurplusGHG: prevState.julSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Aug" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      augSurplusGHG: prevState.augSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Sep" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      sepSurplusGHG: prevState.sepSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Oct" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      octSurplusGHG: prevState.octSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Nov" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      novSurplusGHG: prevState.novSurplusGHG += ghg
                    }));
                  } else if (year === time && month === "Dec" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                      decSurplusGHG: prevState.decSurplusGHG += ghg
                    }));
                  }

                //   else if (year === time && month === "Jan" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       janGHG: prevState.janGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Feb" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       febGHG: prevState.febGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Mar" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       marGHG: prevState.marGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Apr" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       aprGHG: prevState.aprGHG -= ghg
                //     }));
                //   } else if (year === time && month === "May" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       mayGHG: prevState.mayGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Jun" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       junGHG: prevState.junGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Jul" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       julGHG: prevState.julGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Aug" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       augGHG: prevState.augGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Sep" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       sepGHG: prevState.sepGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Oct" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       octGHG: prevState.octGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Nov" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       novGHG: prevState.novGHG -= ghg
                //     }));
                //   } else if (year === time && month === "Dec" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //       decGHG: prevState.decGHG -= ghg
                //     }));
                //   }
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
                                ['January', this.state.janSurplusGHG],
                                ['February', this.state.febSurplusGHG],
                                ['March', this.state.marSurplusGHG],
                                ['April', this.state.aprSurplusGHG],
                                ['May', this.state.maySurplusGHG],
                                ['June', this.state.junSurplusGHG],
                                ['July', this.state.julSurplusGHG],
                                ['August', this.state.augSurplusGHG],
                                ['September', this.state.sepSurplusGHG],
                                ['October', this.state.octSurplusGHG],
                                ['November', this.state.novSurplusGHG],
                                ['December', this.state.decSurplusGHG],
                            ]}
                            options={{
                                title: 'This year\'s Food Surplus GHG Saved Performance (' + time + ')',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHG">View Previous (Monthly Surplus GHG)</Button>
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
                                ['Jan', this.state.janSurplusGHG],
                                ['Feb', this.state.febSurplusGHG],
                                ['Mar', this.state.marSurplusGHG],
                                ['Apr', this.state.aprSurplusGHG],
                                ['May', this.state.maySurplusGHG],
                                ['Jun', this.state.junSurplusGHG],
                                ['Jul', this.state.julSurplusGHG],
                                ['Aug', this.state.augSurplusGHG],
                                ['Sep', this.state.sepSurplusGHG],
                                ['Oct', this.state.octSurplusGHG],
                                ['Nov', this.state.novSurplusGHG],
                                ['Dec', this.state.decSurplusGHG],
                            ]}
                            options={{
                                title: 'Food Surplus GHG Saved Performance (' + time + ')',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHG">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart17);
