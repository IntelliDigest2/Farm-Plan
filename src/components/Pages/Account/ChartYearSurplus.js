import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("YYYY")

class Chart13 extends Component {

  state = {
    uid: this.props.auth.uid,
    janSurplus: 0,
    febSurplus: 0,
    marSurplus: 0,
    aprSurplus: 0,
    maySurplus: 0,
    junSurplus: 0,
    julSurplus: 0,
    augSurplus: 0,
    sepSurplus: 0,
    octSurplus: 0,
    novSurplus: 0,
    decSurplus: 0,
  }

    // fetch db.json data
    fetchData = async () => {
      // const res = await fetch('http://localhost:5000/edible-food-waste-data')
      // const data = await res.json();

      // data.forEach(efw => {
      //   if (efw.year === time && efw.month === "Jan"){
      //     this.setState ( (prevState) => ({
      //       janWeight: prevState.janWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Feb"){
      //     this.setState ( (prevState) => ({
      //       febWeight: prevState.febWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Mar"){
      //     this.setState ( (prevState) => ({
      //       marWeight: prevState.marWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Apr"){
      //     this.setState ( (prevState) => ({
      //       aprWeight: prevState.aprWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "May"){
      //     this.setState ( (prevState) => ({
      //       mayWeight: prevState.mayWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Jun"){
      //     this.setState ( (prevState) => ({
      //       junWeight: prevState.junWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Jul"){
      //     this.setState ( (prevState) => ({
      //       julWeight: prevState.julWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Aug"){
      //     this.setState ( (prevState) => ({
      //       augWeight: prevState.augWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Sep"){
      //     this.setState ( (prevState) => ({
      //       sepWeight: prevState.sepWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Oct"){
      //     this.setState ( (prevState) => ({
      //       octWeight: prevState.octWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Nov"){
      //     this.setState ( (prevState) => ({
      //       novWeight: prevState.novWeight += efw.weight
      //     }));
      //   } else if (efw.year === time && efw.month === "Dec"){
      //     this.setState ( (prevState) => ({
      //       decWeight: prevState.decWeight += efw.weight
      //     }));
      //   }
      // })

      fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {

            var year = doc.data().YEAR
            var month = doc.data().MONTH
            var weight = doc.data().weight
            var wu = doc.data().WEIGHTUNIT
            var isSurplus = doc.data().EDIBLEORINEDIBLE

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

            // var carbCon = doc.data().CARBSCONTENT
            // var proCon = doc.data().PROTEINCONTENT
            // var fatCon = doc.data().FATCONTENT
            // var fibCon = doc.data().FIBRECONTENT

            if (year === time && month === "Jan" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                janSurplus: prevState.janSurplus += newWeight
              }));
            } else if (year === time && month === "Feb" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                febSurplus: prevState.febSurplus += newWeight
              }));
            } else if (year === time && month === "Mar" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                marSurplus: prevState.marSurplus += newWeight
              }));
            } else if (year === time && month === "Apr" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                aprSurplus: prevState.aprSurplus += newWeight
              }));
            } else if (year === time && month === "May" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                maySurplus: prevState.maySurplus += newWeight
              }));
            } else if (year === time && month === "Jun" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                junSurplus: prevState.junSurplus += newWeight
              }));
            } else if (year === time && month === "Jul" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                julSurplus: prevState.julSurplus += newWeight
              }));
            } else if (year === time && month === "Aug" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                augSurplus: prevState.augSurplus += newWeight
              }));
            } else if (year === time && month === "Sep" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                sepSurplus: prevState.sepSurplus += newWeight
              }));
            } else if (year === time && month === "Oct" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                octSurplus: prevState.octSurplus += newWeight
              }));
            } else if (year === time && month === "Nov" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                novSurplus: prevState.novSurplus += newWeight
              }));
            } else if (year === time && month === "Dec" && isSurplus === "Surplus"){
              this.setState( (prevState) => ({
                decSurplus: prevState.decSurplus += newWeight
              }));
            }
            
            // else if (year === time && month === "Jan" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     janWeight: prevState.janWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Feb" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     febWeight: prevState.febWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Mar" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     marWeight: prevState.marWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Apr" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     aprWeight: prevState.aprWeight -= newWeight
            //   }));
            // } else if (year === time && month === "May" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     mayWeight: prevState.mayWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Jun" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     junWeight: prevState.junWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Jul" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     julWeight: prevState.julWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Aug" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     augWeight: prevState.augWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Sep" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     sepWeight: prevState.sepWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Oct" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     octWeight: prevState.octWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Nov" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     novWeight: prevState.novWeight -= newWeight
            //   }));
            // } else if (year === time && month === "Dec" && isSurplus === "Surplus"){
            //   this.setState( (prevState) => ({
            //     decWeight: prevState.decWeight -= newWeight
            //   }));
            // }

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
            {/* <ChartStyle> */}

            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>

              <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Month', 'Food Surplus Weight Saved'],
                  ['January', this.state.janSurplus],
                  ['February', this.state.febSurplus],
                  ['March', this.state.marSurplus],
                  ['April', this.state.aprSurplus],
                  ['May', this.state.maySurplus],
                  ['June', this.state.junSurplus],
                  ['July', this.state.julSurplus],
                  ['August', this.state.augSurplus],
                  ['September', this.state.sepSurplus],
                  ['October', this.state.octSurplus],
                  ['November', this.state.novSurplus],
                  ['December', this.state.decSurplus],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Surplus Weight Saved Performance (' + time + ')',
                  chartArea: { width: '75%' },
                  colors: ['rgb(13, 27, 92)'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Saved (kg)',
                  },
                }}
                legendToggle
              />

            </div>
            {/* </ChartStyle> */}

            <div style={{height: "40px", marginBottom: "10%"}}>
              <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplus">View Previous (Monthly Surplus Weight)</Button>
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
                    ['Month', 'Weight Saved '],
                    ['Jan', this.state.janSurplus],
                    ['Feb', this.state.febSurplus],
                    ['Mar', this.state.marSurplus],
                    ['Apr', this.state.aprSurplus],
                    ['May', this.state.maySurplus],
                    ['Jun', this.state.junSurplus],
                    ['Jul', this.state.julSurplus],
                    ['Aug', this.state.augSurplus],
                    ['Sep', this.state.sepSurplus],
                    ['Oct', this.state.octSurplus],
                    ['Nov', this.state.novSurplus],
                    ['Dec', this.state.decSurplus],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Surplus Weight Saved Performance (' + time + ')',
                  chartArea: { width: '60%' },
                  legend: 'none',
                  colors: ['rgb(13, 27, 92)'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Saved (kg)',
                  },
                }}
                legendToggle
              />

            </div>
            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
              <Card  style={{width: '90vw', height: '95px', marginBottom: "10%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplus">View Previous</Button>
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

export default connect(mapStateToProps, null)(Chart13);