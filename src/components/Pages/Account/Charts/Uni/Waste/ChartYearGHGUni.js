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

class Chart44 extends Component {

    state = {
        uid: this.props.auth.uid,
        janGHGUni: 0,
        febGHGUni: 0,
        marGHGUni: 0,
        aprGHGUni: 0,
        mayGHGUni: 0,
        junGHGUni: 0,
        julGHGUni: 0,
        augGHGUni: 0,
        sepGHGUni: 0,
        octGHGUni: 0,
        novGHGUni: 0,
        decGHGUni: 0,
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

                  if (year === time && month === "Jan" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      janGHGUni: prevState.janGHGUni += ghg
                    }));
                  } else if (year === time && month === "Feb" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      febGHGUni: prevState.febGHGUni += ghg
                    }));
                  } else if (year === time && month === "Mar" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      marGHGUni: prevState.marGHGUni += ghg
                    }));
                  } else if (year === time && month === "Apr" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      aprGHGUni: prevState.aprGHGUni += ghg
                    }));
                  } else if (year === time && month === "May" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      mayGHGUni: prevState.mayGHGUni += ghg
                    }));
                  } else if (year === time && month === "Jun" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      junGHGUni: prevState.junGHGUni += ghg
                    }));
                  } else if (year === time && month === "Jul" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      julGHGUni: prevState.julGHGUni += ghg
                    }));
                  } else if (year === time && month === "Aug" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      augGHGUni: prevState.augGHGUni += ghg
                    }));
                  } else if (year === time && month === "Sep" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      sepGHGUni: prevState.sepGHGUni += ghg
                    }));
                  } else if (year === time && month === "Oct" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      octGHGUni: prevState.octGHGUni += ghg
                    }));
                  } else if (year === time && month === "Nov" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      novGHGUni: prevState.novGHGUni += ghg
                    }));
                  } else if (year === time && month === "Dec" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      decGHGUni: prevState.decGHGUni += ghg
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

                        <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                          <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Month', 'Food Wastage GHG'],
                                ['January', this.state.janGHGUni],
                                ['February', this.state.febGHGUni],
                                ['March', this.state.marGHGUni],
                                ['April', this.state.aprGHGUni],
                                ['May', this.state.mayGHGUni],
                                ['June', this.state.junGHGUni],
                                ['July', this.state.julGHGUni],
                                ['August', this.state.augGHGUni],
                                ['September', this.state.sepGHGUni],
                                ['October', this.state.octGHGUni],
                                ['November', this.state.novGHGUni],
                                ['December', this.state.decGHGUni],
                            ]}
                            options={{
                                title: 'This year\'s Food Wastage GHG Performance (' + time + ', Academic)',
                                chartArea: {width: '75%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
                                }
                            }}
                            legendToggle
                          />
                        </div>

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthGHGUni">View Previous (Monthly GHG)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} disabled>View Next</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>

                      <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>
                        <Chart className="bar-chart"
                            width={'90vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Month', 'GHG '],
                                ['Jan', this.state.janGHGUni],
                                ['Feb', this.state.febGHGUni],
                                ['Mar', this.state.marGHGUni],
                                ['Apr', this.state.aprGHGUni],
                                ['May', this.state.mayGHGUni],
                                ['Jun', this.state.junGHGUni],
                                ['Jul', this.state.julGHGUni],
                                ['Aug', this.state.augGHGUni],
                                ['Sep', this.state.sepGHGUni],
                                ['Oct', this.state.octGHGUni],
                                ['Nov', this.state.novGHGUni],
                                ['Dec', this.state.decGHGUni],
                            ]}
                            options={{
                                title: 'Food Wastage GHG Performance (' + time + ', Uni)',
                                chartArea: {width: '62.5%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
                                }
                            }}
                        />
                      </div>

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthGHGUni">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart44);
