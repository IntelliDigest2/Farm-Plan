import React, {Component} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
import { Button, ButtonGroup } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"
import "../../../../Pages.css"
import "../../../../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../../../../config/fbConfig"

const time = moment().format("W")

class Chart61 extends Component {

  state = {
    uid: this.props.auth.uid,
    mondayWeightBusiness: 0,
    tuesdayWeightBusiness: 0,
    wednesdayWeightBusiness: 0,
    thursdayWeightBusiness: 0,
    fridayWeightBusiness: 0,
    saturdayWeightBusiness: 0,
    sundayWeightBusiness: 0,
    weekBeginning: "",
    weekEnding: "",
  }

      fetchData = async () => {

        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {
            snapshot.forEach(doc => {

              // var fwt = doc.data().FWTYPE
              var week = doc.data().WEEK
              var day = doc.data().WDAY
              var month = doc.data().MONTH
              var mdate = doc.data().MDATE
              var weight = doc.data().weight
              var wu = doc.data().WEIGHTUNIT
              // var isSurplus = doc.data().EDIBLEORINEDIBLE

              var st = doc.data().SUBMISSIONTYPE

              var newWeight = 0
    
              if (wu === "kg" || wu === "l"){
                newWeight = Number(weight * 1)
                // console.log(newWeight)
              } else if (wu === "g" || wu === "ml"){
                newWeight = Number((weight * 0.001).toFixed(3))
                // console.log(newWeight)
              } else if (wu === "oz"){
                newWeight = Number((weight * 0.028).toFixed(3))
                // console.log(newWeight)
              } else if (wu === "lbs"){
                newWeight = Number((weight * 0.454).toFixed(3))
                // console.log(newWeight)
              }

              if (week === time && day === "Mon" && st === "Waste Business"){
                this.setState({weekBeginning: month + " " + mdate})

                this.setState( (prevState) => ({
                  mondayWeightBusiness: prevState.mondayWeightBusiness += newWeight
                }));
              } else if (week === time && day === "Tue" && st === "Waste Business"){
                this.setState( (prevState) => ({
                  tuesdayWeightBusiness: prevState.tuesdayWeightBusiness += newWeight
                })); 
              } else if (week === time && day === "Wed" && st === "Waste Business"){
                this.setState( (prevState) => ({
                  wednesdayWeightBusiness: prevState.wednesdayWeightBusiness += newWeight
                }));
              } else if (week === time && day === "Thu" && st === "Waste Business"){
                this.setState( (prevState) => ({
                  thursdayWeightBusiness: prevState.thursdayWeightBusiness += newWeight
                }));
              } else if (week === time && day === "Fri" && st === "Waste Business"){
                this.setState( (prevState) => ({
                  fridayWeightBusiness: prevState.fridayWeightBusiness += newWeight
                }));
              } else if (week === time && day === "Sat" && st === "Waste Business"){
                this.setState( (prevState) => ({
                  saturdayWeightBusiness: prevState.saturdayWeightBusiness += newWeight
                }));
              } else if (week === time && day === "Sun" && st === "Waste Business"){
                this.setState( (prevState) => ({
                  sundayWeightBusiness: prevState.sundayWeightBusiness += newWeight
                }));
              } 

            })
          })
          .catch(error => console.log(error))

    }

    componentDidMount(){
      //this.getPrevOption();

      this.fetchData();
    }

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
                  ['Day', 'Weight '],
                  ['Mon', this.state.mondayWeightBusiness],
                  ['Tue', this.state.tuesdayWeightBusiness],
                  ['Wed', this.state.wednesdayWeightBusiness],
                  ['Thu', this.state.thursdayWeightBusiness],
                  ['Fri', this.state.fridayWeightBusiness],
                  ['Sat', this.state.saturdayWeightBusiness],
                  ['Sun', this.state.sundayWeightBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Wastage Performance (Business)',
                  chartArea: { width: '52.5%' },
                  colors: ['#aab41e'],
                  legend: 'none',
                  hAxis: {
                    title: 'Day',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                  },
                }}
                // legendToggle='false'
              />

            </div>
            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
                <Card  style={{width: '78vw', height: '95px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                  <ButtonGroup>
                    <Button style={{width: "15%"}} disabled>Prev</Button>
                    <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthBusiness">Next</Button>
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
                  ['Day', 'Food Wastage Weight'],
                  ['Monday', this.state.mondayWeightBusiness],
                  ['Tuesday', this.state.tuesdayWeightBusiness],
                  ['Wednesday', this.state.wednesdayWeightBusiness],
                  ['Thursday', this.state.thursdayWeightBusiness],
                  ['Friday', this.state.fridayWeightBusiness],
                  ['Saturday', this.state.saturdayWeightBusiness],
                  ['Sunday', this.state.sundayWeightBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Wastage Performance (Business)',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Day of the Week',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                  },
                }}
                legendToggle
                />

              </div>
              {/* </ChartStyle> */}

              <div style={{height: "40px", marginBottom: "10%"}}>
                <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                  <ButtonGroup>
                    <Button style={{width: "15%"}} className="custom-btn" disabled>View Previous</Button>
                    <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthBusiness">View Next (Monthly Weight)</Button>
                  </ButtonGroup>
                </Card>
              </div>

          </BrowserView>

        <br/>
        <br/>
        <br/>
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
      profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps, null)(Chart61);