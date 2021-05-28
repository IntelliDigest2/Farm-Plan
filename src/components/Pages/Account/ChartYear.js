import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';

export default class Chart1 extends Component {
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
                title: 'My Yearly Food Waste Performance',
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
                width={1100}
                height={550}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Month', 'Food Wastage Weight'],
                  ['January', 250],
                  ['February', 189],
                  ['March', 201],
                  ['April', 190],
                  ['May', 268],
                  ['June', 275],
                  ['July', 204],
                  ['August', 305],
                  ['September', 178],
                  ['October', 285],
                  ['November', 214],
                  ['December', 343],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Wastage Performance (2021)',
                  chartArea: { width: '75%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Month of 2021',
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
                width={550}
                height={500}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data = {[
                  ['Year', 'Food Wastage'],
                  ['2021', 12501],
                  ['2022', 10997],
                  ['2023', 9410],
                ]}
                options={{
                  title: 'Yearly Food Wastage Performance (Line)',
                  chartArea: {width: '50%', height: '70%'},
                  hAxis: {
                    title: 'Year', titleTextStyle: {color: '#333'}
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
              <Chart className='bar-chart-mobile'
                width={350}
                height={600}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Month', 'Weight '],
                  ['Jan', 250],
                  ['Feb', 189],
                  ['Mar', 201],
                  ['Apr', 190],
                  ['May', 268],
                  ['Jun', 275],
                  ['Jul', 204],
                  ['Aug', 305],
                  ['Sep', 178],
                  ['Oct', 285],
                  ['Nov', 214],
                  ['Dec', 343],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Wastage Performance (2021)',
                  chartArea: { width: '65%' },
                  legend: 'none',
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Month of 2021',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                  },
                }}
                legendToggle
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
    left: 14%;
  }

  .bar-chart.mobile{
    left: 4%
  }

  .area-chart{
    padding: 10px;
  }
`;