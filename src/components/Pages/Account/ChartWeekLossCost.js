import React, {Component} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("W")

class Chart38 extends Component {

  state = {
    uid: this.props.auth.uid,
    mondayCost: 0,
    tuesdayCost: 0,
    wednesdayCost: 0,
    thursdayCost: 0,
    fridayCost: 0,
    saturdayCost: 0,
    sundayCost: 0,
    weekBeginning: "",
    weekEnding: "",
  }

    fetchData = async () => {

        fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
          .get()
          .then( snapshot => {
            snapshot.forEach(doc => {

              // var fwt = doc.data().FWTYPE
              var week = doc.data().WEEK
              var day = doc.data().WDAY
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

              if (week === time && day === "Mon" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  mondayCost: prevState.mondayCost += newCost
                }));
              } else if (week === time && day === "Tue" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  tuesdayCost: prevState.tuesdayCost += newCost
                })); 
              } else if (week === time && day === "Wed" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  wednesdayCost: prevState.wednesdayCost += newCost
                }));
              } else if (week === time && day === "Thu" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  thursdayCost: prevState.thursdayCost += newCost
                }));
              } else if (week === time && day === "Fri" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  fridayCost: prevState.fridayCost += newCost
                }));
              } else if (week === time && day === "Sat" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  saturdayCost: prevState.saturdayCost += newCost
                }));
              } else if (week === time && day === "Sun" && eoi === "Edible"){
                this.setState( (prevState) => ({
                  sundayCost: prevState.sundayCost += newCost
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
        {/* <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex not-found">
          <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
          <Col className="mt-5 pt-5" xs={12}></Col> 
          <Col className="" xs={12} lg={4}></Col>
          <Col className=" justify-content-center display-flex align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0 center text-center" xs={90} lg={4}> */}
            {/* <CardStyle>
              <Card>
                <Card.Body>
                  <Card.Text className="text-center">
                    <h1 className="page-not-found">404 - Page Not Found</h1>
                    <h1 className="not-found-message">The page you were looking for does not exist.</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardStyle> */}

            {/* <Chart
            className="row"
            style={{width:'1684px', height:'650px'}}
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
                title: 'My Weekly Food Waste Performance',
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { title:'hi', minValue: 0 },
                // For the legend to fit, we make the chart area smaller
                chartArea: { width: '50%', height: '70%' },
                // lineWidth: 25
              }}
              // For tests
              rootProps={{ 'data-testid': '1' }}
            /> */}
          <MobileView>
            <ChartStyle>

              <Chart className='bar-chart'
                width={'85%'}
                height={'85%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Day', 'Cost '],
                  ['Mon', this.state.mondayCost],
                  ['Tue', this.state.tuesdayCost],
                  ['Wed', this.state.wednesdayCost],
                  ['Thu', this.state.thursdayCost],
                  ['Fri', this.state.fridayCost],
                  ['Sat', this.state.saturdayCost],
                  ['Sun', this.state.sundayCost],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Loss Cost Performance',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  legend: 'none',
                  hAxis: {
                    title: 'Day',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Cost of Food Loss (GBP (£))',
                  },
                }}
                // legendToggle='false'
              />

            </ChartStyle>
          </MobileView>

          <BrowserView>
              <ChartStyle>
                <Chart className='bar-chart'
                width={'85%'}
                height={'85%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Day', 'Food Loss Cost'],
                  ['Monday', this.state.mondayCost],
                  ['Tuesday', this.state.tuesdayCost],
                  ['Wednesday', this.state.wednesdayCost],
                  ['Thursday', this.state.thursdayCost],
                  ['Friday', this.state.fridayCost],
                  ['Saturday', this.state.saturdayCost],
                  ['Sunday', this.state.sundayCost],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Loss Cost Performance',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Day of the Week',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Cost of Food Loss (GBP (£))',
                  },
                }}
                legendToggle
                />
              </ChartStyle>
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

export default connect(mapStateToProps, null)(Chart38);
