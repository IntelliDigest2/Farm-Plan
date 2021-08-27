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

class Chart36 extends Component {

  state = {
    uid: this.props.auth.uid,
    janCost: 0,
    febCost: 0,
    marCost: 0,
    aprCost: 0,
    mayCost: 0,
    junCost: 0,
    julCost: 0,
    augCost: 0,
    sepCost: 0,
    octCost: 0,
    novCost: 0,
    decCost: 0,
  }

    fetchData = async () => {

      fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {

            var year = doc.data().YEAR
            var month = doc.data().MONTH
            var cost = doc.data().COST
            var curr = doc.data().CURRENCY
            var eoi = doc.data().EDIBLEORINEDIBLE

            var newCost = 0;

            if (curr === "GBP (£)"){
                newCost = Number(cost*1)
            } else if (curr === "USD ($)"){
                newCost = Number((cost/1.404).toFixed(2))
            } else if (curr === "EUR (€)"){
                newCost = Number((cost/1.161).toFixed(2))
            }

            // var carbCon = doc.data().CARBSCONTENT
            // var proCon = doc.data().PROTEINCONTENT
            // var fatCon = doc.data().FATCONTENT
            // var fibCon = doc.data().FIBRECONTENT

            if (year === time && month === "Jan" && eoi === "Edible"){
              this.setState( (prevState) => ({
                janCost: prevState.janCost += newCost
              }));
            } else if (year === time && month === "Feb" && eoi === "Edible"){
              this.setState( (prevState) => ({
                febCost: prevState.febCost += newCost
              }));
            } else if (year === time && month === "Mar" && eoi === "Edible"){
              this.setState( (prevState) => ({
                marCost: prevState.marCost += newCost
              }));
            } else if (year === time && month === "Apr" && eoi === "Edible"){
              this.setState( (prevState) => ({
                aprCost: prevState.aprCost += newCost
              }));
            } else if (year === time && month === "May" && eoi === "Edible"){
              this.setState( (prevState) => ({
                mayCost: prevState.mayCost += newCost
              }));
            } else if (year === time && month === "Jun" && eoi === "Edible"){
              this.setState( (prevState) => ({
                junCost: prevState.junCost += newCost
              }));
            } else if (year === time && month === "Jul" && eoi === "Edible"){
              this.setState( (prevState) => ({
                julCost: prevState.julCost += newCost
              }));
            } else if (year === time && month === "Aug" && eoi === "Edible"){
              this.setState( (prevState) => ({
                augCost: prevState.augCost += newCost
              }));
            } else if (year === time && month === "Sep" && eoi === "Edible"){
              this.setState( (prevState) => ({
                sepCost: prevState.sepCost += newCost
              }));
            } else if (year === time && month === "Oct" && eoi === "Edible"){
              this.setState( (prevState) => ({
                octCost: prevState.octCost += newCost
              }));
            } else if (year === time && month === "Nov" && eoi === "Edible"){
              this.setState( (prevState) => ({
                novCost: prevState.novCost += newCost
              }));
            } else if (year === time && month === "Dec" && eoi === "Edible"){
              this.setState( (prevState) => ({
                decCost: prevState.decCost += newCost
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
                  ['Month', 'Food Loss Cost'],
                  ['January', this.state.janCost],
                  ['February', this.state.febCost],
                  ['March', this.state.marCost],
                  ['April', this.state.aprCost],
                  ['May', this.state.mayCost],
                  ['June', this.state.junCost],
                  ['July', this.state.julCost],
                  ['August', this.state.augCost],
                  ['September', this.state.sepCost],
                  ['October', this.state.octCost],
                  ['November', this.state.novCost],
                  ['December', this.state.decCost],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Loss Cost Performance (' + time + ')',
                  chartArea: { width: '75%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Cost of Food Loss (GBP (£))',
                  },
                }}
                legendToggle
              />
            </div>

            {/* </ChartStyle> */}

            <div style={{height: "40px", marginBottom: "10%"}}>
              <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthLossCost">View Previous (Monthly Loss Cost)</Button>
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
                  ['Month', 'Cost '],
                  ['Jan', this.state.janCost],
                  ['Feb', this.state.febCost],
                  ['Mar', this.state.marCost],
                  ['Apr', this.state.aprCost],
                  ['May', this.state.mayCost],
                  ['Jun', this.state.junCost],
                  ['Jul', this.state.julCost],
                  ['Aug', this.state.augCost],
                  ['Sep', this.state.sepCost],
                  ['Oct', this.state.octCost],
                  ['Nov', this.state.novCost],
                  ['Dec', this.state.decCost],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Loss Cost Performance (' + time + ')',
                  chartArea: { width: '62.5%' },
                  legend: 'none',
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Cost of Food Loss (GBP (£))',
                  },
                }}
              />
            </div>
            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
              <Card  style={{width: '90vw', height: '95px', marginBottom: "10%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthLossCost">View Previous</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} disabled>View Next</Button>
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

export default connect(mapStateToProps, null)(Chart36);