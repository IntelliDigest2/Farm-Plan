import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("MMM")
const fullMonth = moment().format("MMMM")

class Chart2 extends Component {

  // var weekNo1 = moment("01-06-2021", "DD-MM-YYYY").week(); // 23
  // var weekNo2 = moment("14-06-2021", "DD-MM-YYYY").week(); // 25
  // var weekNo3 = moment("20-06-2021", "DD-MM-YYYY").week(); // 26
  // var weekNo4 = moment("30-06-2021", "DD-MM-YYYY").week(); // 27
  // var weekNo5 = moment("06-06-2021", "DD-MM-YYYY").week(); // 24
  // var weekNo6 = moment("07-06-2021", "DD-MM-YYYY").week(); // 24
  // var weekNo7 = moment("08-06-2021", "DD-MM-YYYY").week(); // 24

  state = {
    uid: this.props.auth.uid,
    weeks: [],
    week1Weight: 0,
    week2Weight: 0,
    week3Weight: 0,
    week4Weight: 0,
    // week5Weight: 0,
    // chartData: [["Week/Period", "Food Wastage Weight"]],
    monthEnd: "",
  }

  // fetch db.json data
  fetchData = async () => {
    // const res = await fetch('http://localhost:5000/edible-food-waste-data')
    // const data = await res.json();

    // data.forEach(efw => {
    //   if (efw.month === time && (efw.date === "1st" || efw.date === "2nd" || efw.date === "3rd" || efw.date === "4th" || efw.date === "5th" || efw.date === "6th" || efw.date === "7th")){
    //     this.setState ( (prevState) => ({
    //       week1Weight: prevState.week1Weight += efw.weight
    //     }));
    //   } else if (efw.month === time && (efw.date === "8th" || efw.date === "9th" || efw.date === "10th" || efw.date === "11th" || efw.date === "12th" || efw.date === "13th" || efw.date === "14th")){
    //     this.setState ( (prevState) => ({
    //       week2Weight: prevState.week2Weight += efw.weight
    //     }));
    //   } else if (efw.month === time && (efw.date === "15th" || efw.date === "16th" || efw.date === "17th" || efw.date === "18th" || efw.date === "19th" || efw.date === "20th" || efw.date === "21st")){
    //     this.setState ( (prevState) => ({
    //       week3Weight: prevState.week3Weight += efw.weight
    //     }));
    //   } else if (efw.month === time && (efw.date === "22nd" || efw.date === "23rd" || efw.date === "24th" || efw.date === "25th" || efw.date === "26th" || efw.date === "27th" || efw.date === "28th" || efw.date === "29th" || efw.date === "30th" || efw.date === "31st")){
    //     this.setState ( (prevState) => ({
    //       week4Weight: prevState.week4Weight += efw.weight
    //     }));
    //   }
    // })

    fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
      .get()
      .then( snapshot => {
        snapshot.forEach(doc => {

          var month = doc.data().MONTH
          var mdate = doc.data().MDATE
          var weight = doc.data().weight
          var wu = doc.data().WEIGHTUNIT
          var isSurplus = doc.data().EDIBLEORINEDIBLE

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

          // var carbCon = doc.data().CARBSCONTENT
          // var proCon = doc.data().PROTEINCONTENT
          // var fatCon = doc.data().FATCONTENT
          // var fibCon = doc.data().FIBRECONTENT

          if (month === time && (mdate === "1st" || mdate === "2nd" || mdate === "3rd" || mdate === "4th" || mdate === "5th" || mdate === "6th" || mdate === "7th") && isSurplus !== "Surplus"){
            this.setState( (prevState) => ({
              week1Weight: prevState.week1Weight += newWeight
            }));
          } else if (month === time && (mdate === "8th" || mdate === "9th" || mdate === "10th" || mdate === "11th" || mdate === "12th" || mdate === "13th" || mdate === "14th") && isSurplus !== "Surplus"){
            this.setState( (prevState) => ({
              week2Weight: prevState.week2Weight += newWeight
            }));
          } else if (month === time && (mdate === "15th" || mdate === "16th" || mdate === "17th" || mdate === "18th" || mdate === "19th" || mdate === "20th" || mdate === "21st") && isSurplus !== "Surplus"){
            this.setState( (prevState) => ({
              week3Weight: prevState.week3Weight += newWeight
            }));
          } else if (month === time && (mdate === "22nd" || mdate === "23rd" || mdate === "24th" || mdate === "25th" || mdate === "26th" || mdate === "27th" || mdate === "28th" || mdate === "29th" || mdate === "30th" || mdate === "31st") && isSurplus !== "Surplus"){
            this.setState( (prevState) => ({
              week4Weight: prevState.week4Weight += newWeight
            }));
          } 

        })
      })

    // var tempWeeks = []

    // data.forEach(efw => {
    //   if (efw.month === time){
    //     tempWeeks = [...tempWeeks, efw.week]
    //   }
    //   this.setState({
    //     weeks: [...new Set(tempWeeks)]
    //   })
    // })

    // var i;

    // for (i=0; i < this.state.weeks.length; i++){
    //   data.forEach(efw => {
    //     if (efw.month === time && i === 0 && efw.week === this.state.weeks[i]){
    //       this.setState ( (prevState) => ({
    //         week1Weight: prevState.week1Weight += efw.weight
    //       }));
    //     } else if (efw.month === time && i === 1 && efw.week === this.state.weeks[i]){
    //       this.setState ( (prevState) => ({
    //         week2Weight: prevState.week2Weight += efw.weight
    //       }));
    //     } else if (efw.month === time && i === 2 && efw.week === this.state.weeks[i]){
    //       this.setState ( (prevState) => ({
    //         week3Weight: prevState.week3Weight += efw.weight
    //       }));
    //     } else if (efw.month === time && i === 3 && efw.week === this.state.weeks[i]){
    //       this.setState ( (prevState) => ({
    //         week4Weight: prevState.week4Weight += efw.weight
    //       }));
    //     } else if (efw.month === time && i === 4 && efw.week === this.state.weeks[i]){
    //       this.setState ( (prevState) => ({
    //         week5Weight: prevState.week5Weight += efw.weight
    //       }));
    //     }
    //   })
    // }

    // if (this.state.weeks.length === 1){
    //   this.setState ( (prevState) => ({
    //     chartData: [...prevState.chartData, ["ex", this.state.week1Weight]]
    //   }));
    // }

    // console.log(this.state.weeks)
    // return data
  }
  
  componentDidMount(){
    this.fetchData();

    if (time === "Jan" || time === "Mar" || time === "May" || time === "July" || time === "Aug" || time === "Oct" || time === "Dec"){
      this.setState({monthEnd: "31st"})
    } else if (time === "Apr" || time === "Jun" || time === "Sep" || time === "Nov"){
      this.setState({monthEnd: "30th"})
    } else if (time === "Feb"){
      this.setState({monthEnd: "28th"})
    }
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
                title: 'My Monthly Food Waste Performance',
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { title:'hi', minValue: 0 },
                // For the legend to fit, we make the chart area smaller
                chartArea: { width: '50%', height: '70%' },
                // lineWidth: 25
              }}
              // For tests
              rootProps={{ 'data-testid': '1' }}
            /> */}
          <BrowserView>
            <ChartStyle>

              <Chart className='bar-chart'
                width={'85%'}
                height={'85%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Week/Period', 'Food Wastage Weight'],
                  ['1st-7th', this.state.week1Weight],
                  ['8th-14th', this.state.week2Weight],
                  ['15th-21st', this.state.week3Weight],
                  ['22nd-'+this.state.monthEnd, this.state.week4Weight],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This month\'s Food Wastage Performance (' + fullMonth + ' 2021)',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Week/Period of ' + fullMonth,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                  },
                }}
                legendToggle
              />

              {/* <Chart 
                className="area-chart"
                width={1000}
                height={500}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data = {[
                  ['Month', 'Food Wastage'],
                  ['Jan', 1189],
                  ['Feb', 691],
                  ['Mar', 777],
                  ['Apr', 1001],
                  ['May', 913],
                  ['Jun', 1492],
                  ['Jul', 900],
                  ['Aug', 1067],
                  ['Sep', 588],
                  ['Oct', 710],
                  ['Nov', 955],
                  ['Dec', 1888],
                ]}
                options={{
                  title: 'Monthly Food Wastage Performance (Line)',
                  chartArea: {width: '50%', height: '70%'},
                  hAxis: {
                    title: 'Month', titleTextStyle: {color: '#333'}
                  },
                  vAxis: {
                    minValue: 0, title: 'Weight of Food Wastage (kg)'
                  }
                }}
              />   */}

            </ChartStyle>
          </BrowserView>

          <MobileView>
            <ChartStyle>
              <Chart className='bar-chart'
                width={'85%'}
                height={'85%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Week/Period', 'Weight '],
                  ['1st-7th', this.state.week1Weight],
                  ['8th-14th', this.state.week2Weight],
                  ['15th-21st', this.state.week3Weight],
                  ['22nd-'+this.state.monthEnd, this.state.week4Weight],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Wastage Performance (' + fullMonth + ' 2021)',
                  chartArea: { width: '50%' },
                  legend: 'none',
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Week/Period of ' + fullMonth,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                  },
                }}
                // legendToggle
              />
            </ChartStyle>
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
                title: 'My Monthly Food Surplus Performance',
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

export default connect(mapStateToProps, null)(Chart2);
