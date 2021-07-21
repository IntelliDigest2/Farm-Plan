import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("W")

class Chart15 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplus: 0,
        tuesdaySurplus: 0,
        wednesdaySurplus: 0,
        thursdaySurplus: 0,
        fridaySurplus: 0,
        saturdaySurplus: 0,
        sundaySurplus: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
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

                // if (fd === time && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                //     this.setState( (prevState) => ({
                //         totalCarbsCost: prevState.totalCarbsCost += Number((newCost*(carbCon/100)).toFixed(2)),
                //         totalProteinCost: prevState.totalProteinCost += Number((newCost*(proCon/100)).toFixed(2)),
                //         totalFatCost: prevState.totalFatCost += Number((newCost*(fatCon/100)).toFixed(2)),
                //         totalFibreCost: prevState.totalFibreCost += Number((newCost*(fibCon/100)).toFixed(2)),
                //     }))
                // }

                if (week === time && day === "Mon" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        mondaySurplus: prevState.mondaySurplus += newWeight
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        tuesdaySurplus: prevState.tuesdaySurplus += newWeight
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        wednesdaySurplus: prevState.wednesdaySurplus += newWeight
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                      thursdaySurplus: prevState.thursdaySurplus += newWeight
                    })); 
                  } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                      fridaySurplus: prevState.fridaySurplus += newWeight
                    }));
                  } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                      saturdaySurplus: prevState.saturdaySurplus += newWeight
                    }));
                  } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                      sundaySurplus: prevState.sundaySurplus += newWeight
                    }));
                  }

                // else if (fd === time && meal === "Breakfast" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         totalBreakfastCost: prevState.totalBreakfastCost -= newCost
                //     }));
                // } else if (fd === time && meal === "Lunch" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         totalLunchCost: prevState.totalLunchCost -= newCost
                //     }));
                // } else if (fd === time && meal === "Dinner" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         totalDinnerCost: prevState.totalDinnerCost -= newCost
                //     }));
                // }
            })

          })
          .catch(error => console.log(error))
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){

        const {auth} = this.props;

        return(
            <React.Fragment className="row">

                <br/>
                <br/>
                <br/>

                <BrowserView>
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'85%'}
                            height={'85%'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Day of the Week', 'Food Surplus Weight Saved'],
                                ['Monday', this.state.mondaySurplus],
                                ['Tuesday', this.state.tuesdaySurplus],
                                ['Wednesday', this.state.wednesdaySurplus],
                                ['Thursday', this.state.thursdaySurplus],
                                ['Friday', this.state.fridaySurplus],
                                ['Saturday', this.state.saturdaySurplus],
                                ['Sunday', this.state.sundaySurplus],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Weight Saved Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Weight of Food Saved (kg)'
                                }
                            }}
                            legendToggle
                        />
                    </ChartStyle>
                </BrowserView>

                <MobileView>
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'85%'}
                            height={'85%'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Meal of the day', 'Weight Saved '],
                                ['Mon', this.state.mondaySurplus],
                                ['Tue', this.state.tuesdaySurplus],
                                ['Wed', this.state.wednesdaySurplus],
                                ['Thu', this.state.thursdaySurplus],
                                ['Fri', this.state.fridaySurplus],
                                ['Sat', this.state.saturdaySurplus],
                                ['Sun', this.state.sundaySurplus],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Weight Saved Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Weight of Food Saved (kg)'
                                }
                            }}
                        />
                    </ChartStyle>
                </MobileView>

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

export default connect(mapStateToProps, null)(Chart15);