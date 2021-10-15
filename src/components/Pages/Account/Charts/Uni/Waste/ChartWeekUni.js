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

class Chart43 extends Component {

  state = {
    uid: this.props.auth.uid,
    mondayWeightUni: 0,
    tuesdayWeightUni: 0,
    wednesdayWeightUni: 0,
    thursdayWeightUni: 0,
    fridayWeightUni: 0,
    saturdayWeightUni: 0,
    sundayWeightUni: 0,

    weekBeginning: "",
    weekEnding: "",

    // prevOption: ""
  }

      // fetch db.json data
      fetchData = async () => {
        // const res = await fetch('http://localhost:5000/edible-food-waste-data')
        // const data = await res.json();

        // data.forEach(efw => {
        //   if (efw.week === time && efw.day === "Mon"){

        //     this.setState({weekBeginning: efw.month + " " + efw.date})

        //     this.setState( (prevState) => ({
        //       mondayWeight: prevState.mondayWeight += efw.weight
        //     }));
        //   } else if (efw.week === time && efw.day === "Tue"){
        //     this.setState( (prevState) => ({
        //       tuesdayWeight: prevState.tuesdayWeight += efw.weight
        //     }));
        //   } else if (efw.week === time && efw.day === "Wed"){
        //     this.setState( (prevState) => ({
        //       wednesdayWeight: prevState.wednesdayWeight += efw.weight
        //     }));
        //   } else if (efw.week === time && efw.day === "Thu"){
        //     this.setState( (prevState) => ({
        //       thursdayWeight: prevState.thursdayWeight += efw.weight
        //     }));
        //   } else if (efw.week === time && efw.day === "Fri"){
        //     this.setState( (prevState) => ({
        //       fridayWeight: prevState.fridayWeight += efw.weight
        //     }));
        //   } else if (efw.week === time && efw.day === "Sat"){
        //     this.setState( (prevState) => ({
        //       saturdayWeight: prevState.saturdayWeight += efw.weight
        //     }));
        //   } else if (efw.week === time && efw.day === "Sun"){
        //     this.setState( (prevState) => ({
        //       sundayWeight: prevState.sundayWeight += efw.weight
        //     }));
        //   }
        // })

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
              } else if (wu === "g" || wu === "ml"){
                newWeight = Number((weight * 0.001).toFixed(3))
              } else if (wu === "oz"){
                newWeight = Number((weight * 0.028).toFixed(3))
              } else if (wu === "lbs"){
                newWeight = Number((weight * 0.454).toFixed(3))
              }

            if (week === time && day === "Mon" && st === "Waste Academic"){
                this.setState({weekBeginning: month + " " + mdate})

                this.setState( (prevState) => ({
                  mondayWeightUni: prevState.mondayWeightUni += newWeight
                }));
              } else if (week === time && day === "Tue" && st === "Waste Academic"){
                this.setState( (prevState) => ({
                  tuesdayWeightUni: prevState.tuesdayWeightUni += newWeight
                })); 
              } else if (week === time && day === "Wed" && st === "Waste Academic"){
                this.setState( (prevState) => ({
                  wednesdayWeightUni: prevState.wednesdayWeightUni += newWeight
                }));
              } else if (week === time && day === "Thu" && st === "Waste Academic"){
                this.setState( (prevState) => ({
                  thursdayWeightUni: prevState.thursdayWeightUni += newWeight
                }));
              } else if (week === time && day === "Fri" && st === "Waste Academic"){
                this.setState( (prevState) => ({
                  fridayWeightUni: prevState.fridayWeightUni += newWeight
                }));
              } else if (week === time && day === "Sat" && st === "Waste Academic"){
                this.setState( (prevState) => ({
                  saturdayWeightUni: prevState.saturdayWeightUni += newWeight
                }));
              } else if (week === time && day === "Sun" && st === "Waste Academic"){
                this.setState( (prevState) => ({
                  sundayWeightUni: prevState.sundayWeightUni += newWeight
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

  render(){
    return (
      <React.Fragment className="row">
        <br/>
        <br/>
        <br/>
       
          <MobileView>

              <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>

              <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Day', 'Weight '],
                  ['Mon', this.state.mondayWeightUni],
                  ['Tue', this.state.tuesdayWeightUni],
                  ['Wed', this.state.wednesdayWeightUni],
                  ['Thu', this.state.thursdayWeightUni],
                  ['Fri', this.state.fridayWeightUni],
                  ['Sat', this.state.saturdayWeightUni],
                  ['Sun', this.state.sundayWeightUni],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Wastage Performance (Uni)',
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
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthUni">Next</Button>
                  </ButtonGroup>
                </Card>
            </div>

          </MobileView>

          <BrowserView>

                <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>

                  <Chart className='bar-chart'
                  width={'78vw'}
                  height={'600px'}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Day', 'Food Wastage Weight'],
                    ['Monday', this.state.mondayWeightUni],
                    ['Tuesday', this.state.tuesdayWeightUni],
                    ['Wednesday', this.state.wednesdayWeightUni],
                    ['Thursday', this.state.thursdayWeightUni],
                    ['Friday', this.state.fridayWeightUni],
                    ['Saturday', this.state.saturdayWeightUni],
                    ['Sunday', this.state.sundayWeightUni],
                  ]}
                  options={{
                    // backgroundColor: 'lightgray',
                    title: 'This week\'s Food Wastage Performance (Academic)',
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

              <div style={{height: "40px", marginBottom: "10%"}}>
                <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                  <ButtonGroup>
                    <Button style={{width: "15%"}} className="custom-btn" disabled>View Previous</Button>
                    <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                    <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthUni">View Next (Monthly Weight)</Button>
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

export default connect(mapStateToProps, null)(Chart43);