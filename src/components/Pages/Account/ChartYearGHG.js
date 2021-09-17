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

class Chart5 extends Component {

    state = {
        uid: this.props.auth.uid,
        janGHG: 0,
        febGHG: 0,
        marGHG: 0,
        aprGHG: 0,
        mayGHG: 0,
        junGHG: 0,
        julGHG: 0,
        augGHG: 0,
        sepGHG: 0,
        octGHG: 0,
        novGHG: 0,
        decGHG: 0,
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

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                if (year === time && month === "Jan" && st === "Waste"){
                    this.setState( (prevState) => ({
                      janGHG: prevState.janGHG += ghg
                    }));
                  } else if (year === time && month === "Feb" && st === "Waste"){
                    this.setState( (prevState) => ({
                      febGHG: prevState.febGHG += ghg
                    }));
                  } else if (year === time && month === "Mar" && st === "Waste"){
                    this.setState( (prevState) => ({
                      marGHG: prevState.marGHG += ghg
                    }));
                  } else if (year === time && month === "Apr" && st === "Waste"){
                    this.setState( (prevState) => ({
                      aprGHG: prevState.aprGHG += ghg
                    }));
                  } else if (year === time && month === "May" && st === "Waste"){
                    this.setState( (prevState) => ({
                      mayGHG: prevState.mayGHG += ghg
                    }));
                  } else if (year === time && month === "Jun" && st === "Waste"){
                    this.setState( (prevState) => ({
                      junGHG: prevState.junGHG += ghg
                    }));
                  } else if (year === time && month === "Jul" && st === "Waste"){
                    this.setState( (prevState) => ({
                      julGHG: prevState.julGHG += ghg
                    }));
                  } else if (year === time && month === "Aug" && st === "Waste"){
                    this.setState( (prevState) => ({
                      augGHG: prevState.augGHG += ghg
                    }));
                  } else if (year === time && month === "Sep" && st === "Waste"){
                    this.setState( (prevState) => ({
                      sepGHG: prevState.sepGHG += ghg
                    }));
                  } else if (year === time && month === "Oct" && st === "Waste"){
                    this.setState( (prevState) => ({
                      octGHG: prevState.octGHG += ghg
                    }));
                  } else if (year === time && month === "Nov" && st === "Waste"){
                    this.setState( (prevState) => ({
                      novGHG: prevState.novGHG += ghg
                    }));
                  } else if (year === time && month === "Dec" && st === "Waste"){
                    this.setState( (prevState) => ({
                      decGHG: prevState.decGHG += ghg
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
                                ['Month', 'Food Wastage GHG'],
                                ['January', this.state.janGHG],
                                ['February', this.state.febGHG],
                                ['March', this.state.marGHG],
                                ['April', this.state.aprGHG],
                                ['May', this.state.mayGHG],
                                ['June', this.state.junGHG],
                                ['July', this.state.julGHG],
                                ['August', this.state.augGHG],
                                ['September', this.state.sepGHG],
                                ['October', this.state.octGHG],
                                ['November', this.state.novGHG],
                                ['December', this.state.decGHG],
                            ]}
                            options={{
                                title: 'This year\'s Food Wastage GHG Performance (' + time + ')',
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
                    {/* </ChartStyle> */}

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthGHG">View Previous (Monthly GHG)</Button>
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
                                ['Month', 'GHG '],
                                ['Jan', this.state.janGHG],
                                ['Feb', this.state.febGHG],
                                ['Mar', this.state.marGHG],
                                ['Apr', this.state.aprGHG],
                                ['May', this.state.mayGHG],
                                ['Jun', this.state.junGHG],
                                ['Jul', this.state.julGHG],
                                ['Aug', this.state.augGHG],
                                ['Sep', this.state.sepGHG],
                                ['Oct', this.state.octGHG],
                                ['Nov', this.state.novGHG],
                                ['Dec', this.state.decGHG],
                            ]}
                            options={{
                                title: 'Food Wastage GHG Performance (' + time + ')',
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
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthGHG">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart5);
