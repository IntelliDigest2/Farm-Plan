import React, {Component} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("W")

class Chart3 extends Component {

  state = {
    uid: this.props.auth.uid,
    mondayWeight: 0,
    tuesdayWeight: 0,
    wednesdayWeight: 0,
    thursdayWeight: 0,
    fridayWeight: 0,
    saturdayWeight: 0,
    sundayWeight: 0,
    weekBeginning: "",
    weekEnding: "",
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

              var newWeight = 0
    
              if (wu === "kg"){
                newWeight = Number(weight * 1)
                // console.log(newWeight)
              } else if (wu === "g"){
                newWeight = Number((weight * 0.001).toFixed(3))
                // console.log(newWeight)
              } else if (wu === "oz"){
                newWeight = Number((weight * 0.028).toFixed(3))
                // console.log(newWeight)
              } else if (wu === "lbs"){
                newWeight = Number((weight * 0.454).toFixed(3))
                // console.log(newWeight)
              }

              var carbCon = doc.data().CARBSCONTENT
              var proCon = doc.data().PROTEINCONTENT
              var fatCon = doc.data().FATCONTENT
              var fibCon = doc.data().FIBRECONTENT

              if (week === time && day === "Mon" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState({weekBeginning: month + " " + mdate})

                this.setState( (prevState) => ({
                  mondayWeight: prevState.mondayWeight += newWeight
                }));
              } else if (week === time && day === "Tue" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState( (prevState) => ({
                  tuesdayWeight: prevState.tuesdayWeight += newWeight
                })); 
              } else if (week === time && day === "Wed" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState( (prevState) => ({
                  wednesdayWeight: prevState.wednesdayWeight += newWeight
                }));
              } else if (week === time && day === "Thu" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState( (prevState) => ({
                  thursdayWeight: prevState.thursdayWeight += newWeight
                }));
              } else if (week === time && day === "Fri" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState( (prevState) => ({
                  fridayWeight: prevState.fridayWeight += newWeight
                }));
              } else if (week === time && day === "Sat" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState( (prevState) => ({
                  saturdayWeight: prevState.saturdayWeight += newWeight
                }));
              } else if (week === time && day === "Sun" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                this.setState( (prevState) => ({
                  sundayWeight: prevState.sundayWeight += newWeight
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
                  ['Day', 'Weight '],
                  ['Mon', this.state.mondayWeight],
                  ['Tue', this.state.tuesdayWeight],
                  ['Wed', this.state.wednesdayWeight],
                  ['Thu', this.state.thursdayWeight],
                  ['Fri', this.state.fridayWeight],
                  ['Sat', this.state.saturdayWeight],
                  ['Sun', this.state.sundayWeight],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Wastage Performance',
                  chartArea: { width: '50%' },
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

              {/* <Chart 
                className="area-chart"
                width={600}
                height={500}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data = {[
                  ['Week', 'Food Wastage'],
                  ['03/05 - 09/05', 250],
                  ['10/05 - 16/05', 189],
                  ['17/05 - 23/05', 221],
                  ['24/05 - 30/05', 273],
                ]}
                options={{
                  title: 'Weekly Food Wastage Performance (Line)',
                  chartArea: {width: '50%', height: '70%'},
                  hAxis: {
                    title: 'Week', titleTextStyle: {color: '#333'}
                  },
                  vAxis: {
                    minValue: 0, title: 'Weight of Food Wastage (kg)'
                  }
                }}
              />   */}

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
                  ['Day', 'Food Wastage Weight'],
                  ['Monday', this.state.mondayWeight],
                  ['Tuesday', this.state.tuesdayWeight],
                  ['Wednesday', this.state.wednesdayWeight],
                  ['Thursday', this.state.thursdayWeight],
                  ['Friday', this.state.fridayWeight],
                  ['Saturday', this.state.saturdayWeight],
                  ['Sunday', this.state.sundayWeight],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This week\'s Food Wastage Performance',
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
              </ChartStyle>
          </BrowserView>
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
                title: 'My Weekly Food Surplus Performance',
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

  .area-chart{
    padding: 10px;
  }
`;

const mapStateToProps = (state) => { 
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, null)(Chart3);
