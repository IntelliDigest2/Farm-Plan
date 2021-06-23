import React, {Component, useState, useEffect} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import chartData from "../../../data/chart-data.json";
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"
import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("ddd MMM Do YYYY")

// const [fwData, setFwData] = useState([])

class Chart4 extends Component {

    state = {
      uid: this.props.auth.uid,
      totalCarbsWeight: 0,
      totalProteinWeight: 0,
      totalFatWeight: 0,
      totalFibreWeight: 0,
      efwData: [],
    }


  // useEffect ( () => {
  //   fetchFwData();
  // }, [])

  // http://localhost:5000/edible-food-waste-data

  // fetch db.json data
  fetchData = async () => {

    fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
      .get()
      .then( snapshot => {
        // var tempFwTypes = []
        // var tempFullDates = []
        snapshot.forEach(doc => {

          // var fwt = doc.data().FWTYPE
          var fd = doc.data().FULLDATE
          var weight = doc.data().weight
          var wu = doc.data().WEIGHTUNIT

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

          // if (fwt === "Carbohydrates" && fd === time){
          //   this.setState( (prevState) => ({
          //     totalCarbsWeight: prevState.totalCarbsWeight += newWeight
          //   }));
          // } else if (fwt === "Protein" && fd === time){
          //   this.setState( (prevState) => ({
          //     totalProteinWeight: prevState.totalProteinWeight += newWeight
          //   }));
          // } else if (fwt === "Fat" && fd === time){
          //   this.setState( (prevState) => ({
          //     totalFatWeight: prevState.totalFatWeight += newWeight
          //   }));
          // } else if (fwt === "Fibre" && fd === time){
          //   this.setState( (prevState) => ({
          //     totalFibreWeight: prevState.totalFibreWeight += newWeight
          //   }));
          // }

          var carbCon = doc.data().CARBSCONTENT
          var proCon = doc.data().PROTEINCONTENT
          var fatCon = doc.data().FATCONTENT
          var fibCon = doc.data().FIBRECONTENT

          // if (fd === time && (carbCon >= 0 && carbCon <= 100)){
          //   this.setState( (prevState) => ({
          //     totalCarbsWeight: prevState.totalCarbsWeight += Number((newWeight*(carbCon/100)).toFixed(3))
          //   }));
          // } else if (fd === time && (proCon >= 0 && proCon <= 100)){
          //   this.setState( (prevState) => ({
          //     totalProteinWeight: prevState.totalProteinWeight += Number((newWeight*(proCon/100)).toFixed(3))
          //   }));
          // } else if (fd === time && (fatCon >= 0 && fatCon <= 100)){
          //   this.setState( (prevState) => ({
          //     totalFatWeight: prevState.totalFatWeight += Number((newWeight*(fatCon/100)).toFixed(3))
          //   }));
          // } else if (fd === time && (fibCon >= 0 && fibCon <= 100)){
          //   this.setState( (prevState) => ({
          //     totalFibreWeight: prevState.totalFibreWeight += Number((newWeight*(fibCon/100)).toFixed(3))
          //   }));
          // }

          if (fd === time && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
            this.setState( (prevState) => ({
              totalCarbsWeight: prevState.totalCarbsWeight += Number((newWeight*(carbCon/100)).toFixed(3)),
              totalProteinWeight: prevState.totalProteinWeight += Number((newWeight*(proCon/100)).toFixed(3)),
              totalFatWeight: prevState.totalFatWeight += Number((newWeight*(fatCon/100)).toFixed(3)),
              totalFibreWeight: prevState.totalFibreWeight += Number((newWeight*(fibCon/100)).toFixed(3))
            }))
          }

          // tempFwTypes.push(fwt)
          // tempFullDates.push(fd)
        })
        // console.log(tempFwTypes)
        // console.log(tempFullDates)
      })
      .catch(error => console.log(error))

  }

  componentDidMount(){

    // console.log(this.state.uid)

    // fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
    //   .get()
    //   .then( snapshot => {
    //     var tempData = []
    //     snapshot.forEach(doc => {
    //       var dt = doc.data()
    //       tempData.push(dt)
    //     })
    //     console.log(tempData)
    //   })
    //   .catch(error => console.log(error))

    this.fetchData();
  }

  fetchDataItem = async (id) => {
      const res = await fetch(`http://localhost:5000/edible-food-waste-data/${id}`)
      const data = await res.json();

      // console.log(data)
      // return data
  }

  render(){

    const {auth} = this.props;

    return (
      <React.Fragment className="row">
        {/* {this.fetchData()} */}
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
                title: 'My Daily Food Waste Performance',
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
                  ['Food Wastage Type', 'Food Wastage Weight'],
                  ['Carbohydrates', this.state.totalCarbsWeight],
                  ['Protein', this.state.totalProteinWeight],
                  ['Fat', this.state.totalFatWeight],
                  ['Fibre', this.state.totalFibreWeight],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Today\'s Food Wastage Performance (' + time + ')',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Food Wastage Type',
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

         <MobileView>
           <ChartStyle>
            <Chart className='bar-chart'
                width={'85%'}
                height={'85%'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Food Wastage Type', ' Weight '],
                  ['Carbs', this.state.totalCarbsWeight],
                  ['Protein', this.state.totalProteinWeight],
                  ['Fat', this.state.totalFatWeight],
                  ['Fibre', this.state.totalFibreWeight],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Today\'s Food Wastage Performance (' + time + ')',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  legend: 'none',
                  hAxis: {
                    title: 'Food Wastage Type',
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
              className="area-chart"
              width={600}
              height={500}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data = {[
                ['Day', 'Food Wastage'],
                ['Mon', 20],
                ['Tue', 29],
                ['Wed', 11],
                ['Thu', 27],
                ['Fri', 36],
                ['Sat', 41],
                ['Sun', 19],
              ]}
              options={{
                title: 'Daily Food Wastage Performance (Line)',
                chartArea: {width: '50%', height: '70%'},
                hAxis: {
                  title: 'Day of the Week', titleTextStyle: {color: '#333'}
                },
                vAxis: {
                  minValue: 0, title: 'Weight of Food Wastage (kg)'
                }
              }}
            />   */}

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
                title: 'My Daily Food Surplus Performance',
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

// position: absolute;
// left: 14%;

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

export default connect(mapStateToProps, null)(Chart4);
