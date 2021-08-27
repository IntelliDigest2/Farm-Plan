import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("YYYY")

class Chart32 extends Component {

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

      fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {

            var year = doc.data().YEAR
            var month = doc.data().MONTH
            var ghg = doc.data().GHG

            if (year === time && month === "Jan"){
              this.setState( (prevState) => ({
                janGHG: prevState.janGHG += ghg
              }));
            } else if (year === time && month === "Feb"){
              this.setState( (prevState) => ({
                febGHG: prevState.febGHG += ghg
              }));
            } else if (year === time && month === "Mar"){
              this.setState( (prevState) => ({
                marGHG: prevState.marGHG += ghg
              }));
            } else if (year === time && month === "Apr"){
              this.setState( (prevState) => ({
                aprGHG: prevState.aprGHG += ghg
              }));
            } else if (year === time && month === "May"){
              this.setState( (prevState) => ({
                mayGHG: prevState.mayGHG += ghg
              }));
            } else if (year === time && month === "Jun"){
              this.setState( (prevState) => ({
                junGHG: prevState.junGHG += ghg
              }));
            } else if (year === time && month === "Jul"){
              this.setState( (prevState) => ({
                julGHG: prevState.julGHG += ghg
              }));
            } else if (year === time && month === "Aug"){
              this.setState( (prevState) => ({
                augGHG: prevState.augGHG += ghg
              }));
            } else if (year === time && month === "Sep"){
              this.setState( (prevState) => ({
                sepGHG: prevState.sepGHG += ghg
              }));
            } else if (year === time && month === "Oct"){
              this.setState( (prevState) => ({
                octGHG: prevState.octGHG += ghg
              }));
            } else if (year === time && month === "Nov"){
              this.setState( (prevState) => ({
                novGHG: prevState.novGHG += ghg
              }));
            } else if (year === time && month === "Dec"){
              this.setState( (prevState) => ({
                decGHG: prevState.decGHG += ghg
              }));
            }

          })
        })
        .catch(error => console.log(error))

      // var weekNo1 = moment("01-06-2021", "DD-MM-YYYY").week(); // 23
      // var weekNo2 = moment("14-06-2021", "DD-MM-YYYY").week(); // 25
      // var weekNo3 = moment("20-06-2021", "DD-MM-YYYY").week(); // 26
      // var weekNo4 = moment("30-06-2021", "DD-MM-YYYY").week(); // 27
      // var weekNo5 = moment("06-06-2021", "DD-MM-YYYY").week(); // 24
      // var weekNo6 = moment("07-06-2021", "DD-MM-YYYY").week(); // 24
      // var weekNo7 = moment("08-06-2021", "DD-MM-YYYY").week(); // 24

      // console.log(weekNo1, weekNo2, weekNo3, weekNo4, weekNo5, weekNo6, weekNo7)
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

          <BrowserView>
            {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
              <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Month', 'Food Loss GHG'],
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
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Loss GHG Performance (' + time + ')',
                  chartArea: { width: '75%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Month of ' + time,
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
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthLossGHG">View Previous (Monthly Loss GHG)</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} disabled>View Next</Button>
                </ButtonGroup>
              </Card>
            </div>

          </BrowserView>
            
          <MobileView>
            {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>
              <Chart className='bar-chart'
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
                  // backgroundColor: 'lightgray',
                  title: 'Food Loss GHG Performance (' + time + ')',
                  chartArea: { width: '62.5%' },
                  legend: 'none',
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'GHG of Food Loss (kg co2)',
                  },
                }}
              />
            </div>
            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
              <Card  style={{width: '90vw', height: '95px', marginBottom: "10%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthLossGHG">Prev</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} disabled>Next</Button>
                </ButtonGroup>
              </Card>
            </div>

          </MobileView>
            {/* <Chart
            className="row"
            style={{width:'1684px', height:'650px', alignItems:'center', justifyContent:'center', display:'flex'}}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Year', 'Sales', 'Expenses'],
                ['2013', 0, 400],
                ['2014', 1170, 460],
                ['2015', 660, 1120],
                ['2016', 546  , 540],
                ['2013', 1000, 400],
                ['2014', 57, 460],
                ['2015', 660, 1120],
                ['2016', 1030, 8],
                ['2013', 1000, 400],
                ['2014', 1170, 460],
                ['2015', 197, 1120],
                ['2016', 47, 789],
                ['2013', 0, 400],
                ['2014', 1170, 460],
                ['2015', 660, 1120],
                ['2016', 546  , 540],
                ['2013', 1000, 400],
                ['2014', 57, 460],
                ['2015', 660, 1120],
                ['2016', 1030, 8],
                ['2013', 1000, 400],
                ['2014', 1170, 460],
                ['2015', 197, 1120],
                ['2016', 47, 789],
              ]}
              options={{
                title: 'My Yearly Food Surplus Performance',
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { title:'hi', minValue: 0 },
                // For the legend to fit, we make the chart area smaller
                chartArea: { width: '50%', height: '70%' },
                // lineWidth: 25
              }}
              // For tests
              rootProps={{ 'data-testid': '1' }}
            /> */}

          {/* </Col>
          <Col className="mt-5 pt-5" xs={12} lg={4}></Col>
          <Col className="mt-5 pt-5" xs={12}></Col>
          <Col className="mt-5 pt-5" xs={12}></Col>
        </Row> */}
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

  .bar-chart.mobile{
    left: 4%
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

export default connect(mapStateToProps, null)(Chart32);