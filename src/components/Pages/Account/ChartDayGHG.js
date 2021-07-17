import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("ddd MMM Do YYYY")

class Chart8 extends Component {

    state = {
        uid: this.props.auth.uid,
        // totalCarbsGHG: 0,
        // totalProteinGHG: 0,
        // totalFatGHG: 0,
        // totalFibreGHG: 0,
        totalBreakfastGHG: 0,
        totalLunchGHG: 0,
        totalDinnerGHG: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var fd = doc.data().FULLDATE
                var ghg = doc.data().GHG
                var meal = doc.data().MEAL
                var isSurplus = doc.data().EDIBLEORINEDIBLE

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT 

                // if (fd === time && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                //     this.setState( (prevState) => ({
                //         totalCarbsGHG: prevState.totalCarbsGHG += Number((ghg*(carbCon/100)).toFixed(3)),
                //         totalProteinGHG: prevState.totalProteinGHG += Number((ghg*(proCon/100)).toFixed(3)),
                //         totalFatGHG: prevState.totalFatGHG += Number((ghg*(fatCon/100)).toFixed(3)),
                //         totalFibreGHG: prevState.totalFibreGHG += Number((ghg*(fibCon/100)).toFixed(3)),
                //     }))
                // }

                if (fd === time && meal === "Breakfast" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        totalBreakfastGHG: prevState.totalBreakfastGHG += ghg
                    }));
                } else if (fd === time && meal === "Lunch" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        totalLunchGHG: prevState.totalLunchGHG += ghg
                    }));
                } else if (fd === time && meal === "Dinner" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        totalDinnerGHG: prevState.totalDinnerGHG += ghg
                    }));
                } 
                
                else if (fd === time && meal === "Breakfast" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalBreakfastGHG: prevState.totalBreakfastGHG -= ghg
                    }));
                } else if (fd === time && meal === "Lunch" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalLunchGHG: prevState.totalLunchGHG -= ghg
                    }));
                } else if (fd === time && meal === "Dinner" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalDinnerGHG: prevState.totalDinnerGHG -= ghg
                    }));
                }
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
                                ['Meal of the Day', 'Food Wastage GHG'],
                                ['Breakfast', this.state.totalBreakfastGHG],
                                ['Lunch', this.state.totalLunchGHG],
                                ['Dinner', this.state.totalDinnerGHG],
                            ]}
                            options={{
                                title: 'Today\'s Food Wastage GHG Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Meal of the Day',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
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
                                ['Meal of the Day', 'GHG '],
                                ['Breakfast', this.state.totalBreakfastGHG],
                                ['Lunch', this.state.totalLunchGHG],
                                ['Dinner', this.state.totalDinnerGHG],
                            ]}
                            options={{
                                title: 'Today\'s Food Wastage GHG Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Meal of the Day',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
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

export default connect(mapStateToProps, null)(Chart8);