import React, {Component} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("W")

class Chart34 extends Component {

  state = {
    uid: this.props.auth.uid,
    mondayGHG: 0,
    tuesdayGHG: 0,
    wednesdayGHG: 0,
    thursdayGHG: 0,
    fridayGHG: 0,
    saturdayGHG: 0,
    sundayGHG: 0,
    weekBeginning: "",
    weekEnding: "",
  }

    fetchData = async () => {

        fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
          .get()
          .then( snapshot => {
            snapshot.forEach(doc => {

              var week = doc.data().WEEK
              var day = doc.data().WDAY
              var ghg = doc.data().GHG

              if (week === time && day === "Mon"){
                this.setState( (prevState) => ({
                  mondayGHG: prevState.mondayGHG += ghg
                }));
              } else if (week === time && day === "Tue"){
                this.setState( (prevState) => ({
                  tuesdayGHG: prevState.tuesdayGHG += ghg
                })); 
              } else if (week === time && day === "Wed"){
                this.setState( (prevState) => ({
                  wednesdayGHG: prevState.wednesdayGHG += ghg
                }));
              } else if (week === time && day === "Thu"){
                this.setState( (prevState) => ({
                  thursdayGHG: prevState.thursdayGHG += ghg
                }));
              } else if (week === time && day === "Fri"){
                this.setState( (prevState) => ({
                  fridayGHG: prevState.fridayGHG += ghg
                }));
              } else if (week === time && day === "Sat"){
                this.setState( (prevState) => ({
                  saturdayGHG: prevState.saturdayGHG += ghg
                }));
              } else if (week === time && day === "Sun"){
                this.setState( (prevState) => ({
                  sundayGHG: prevState.sundayGHG += ghg
                }));
              } 

            })
          })
          .catch(error => console.log(error))

        // console.log(data)
        // return data
    }

    componentDidMount(){
      this.fetchData();
    }

    // fetchDataItem = async (id) => {
    //     const res = await fetch(`http://localhost:5000/edible-food-waste-data/${id}`)
    //     const data = await res.json();

    //     console.log(data)
    //     // return data
    // }

  render(){
    return (
      <React.Fragment className="row">
        <br/>
        <br/>
        <br/>

          <MobileView>
            {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
              <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Day', 'GHG '],
                  ['Mon', this.state.mondayGHG],
                  ['Tue', this.state.tuesdayGHG],
                  ['Wed', this.state.wednesdayGHG],
                  ['Thu', this.state.thursdayGHG],
                  ['Fri', this.state.fridayGHG],
                  ['Sat', this.state.saturdayGHG],
                  ['Sun', this.state.sundayGHG],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Loss GHG Performance',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  legend: 'none',
                  hAxis: {
                    title: 'Day',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'GHG of Food Loss (kg co2)',
                  },
                }}
                // legendToggle='false'
              />
            </div>

            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
                <Card  style={{width: '78vw', height: '95px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                  <ButtonGroup>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/dayLossGHG">View Previous</Button>
                    <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthLossGHG">View Next</Button>
                  </ButtonGroup>
                </Card>
            </div>

          </MobileView>

          <BrowserView>
              {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Day', 'Food Loss GHG'],
                  ['Monday', this.state.mondayGHG],
                  ['Tuesday', this.state.tuesdayGHG],
                  ['Wednesday', this.state.wednesdayGHG],
                  ['Thursday', this.state.thursdayGHG],
                  ['Friday', this.state.fridayGHG],
                  ['Saturday', this.state.saturdayGHG],
                  ['Sunday', this.state.sundayGHG],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Loss GHG Performance',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Day of the Week',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'GHG of Food Loss (kg co2)',
                  },
                }}
                legendToggle
                />
              </div>
              {/* </ChartStyle> */}

              <div style={{height: "40px", marginBottom: "10%"}}>
                <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                  <ButtonGroup>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/dayLossGHG">View Previous (Daily Loss GHG)</Button>
                    <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthLossGHG">View Next (Monthly Loss GHG)</Button>
                  </ButtonGroup>
                </Card>
              </div>

          </BrowserView>
           
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

export default connect(mapStateToProps, null)(Chart34);
