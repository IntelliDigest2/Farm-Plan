import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("W")

class Chart19 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusGHG: 0,
        tuesdaySurplusGHG: 0,
        wednesdaySurplusGHG: 0,
        thursdaySurplusGHG: 0,
        fridaySurplusGHG: 0,
        saturdaySurplusGHG: 0,
        sundaySurplusGHG: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
                var month = doc.data().MONTH
                var mdate = doc.data().MDATE
                var ghg = doc.data().GHG
                var isSurplus = doc.data().EDIBLEORINEDIBLE

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                if (week === time && day === "Mon" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        mondaySurplusGHG: prevState.mondaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        tuesdaySurplusGHG: prevState.tuesdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        wednesdaySurplusGHG: prevState.wednesdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        thursdaySurplusGHG: prevState.thursdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        fridaySurplusGHG: prevState.fridaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        saturdaySurplusGHG: prevState.saturdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        sundaySurplusGHG: prevState.sundaySurplusGHG += ghg
                    }));
                }

                // else if (week === time && day === "Mon" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         mondayGHG: prevState.mondayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         tuesdayGHG: prevState.tuesdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         wednesdayGHG: prevState.wednesdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         thursdayGHG: prevState.thursdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         fridayGHG: prevState.fridayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         saturdayGHG: prevState.saturdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         sundayGHG: prevState.sundayGHG -= ghg
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
                                ['Day', 'Food Surplus GHG Saved'],
                                ['Monday', this.state.mondaySurplusGHG],
                                ['Tuesday', this.state.tuesdaySurplusGHG],
                                ['Wednesday', this.state.wednesdaySurplusGHG],
                                ['Thursday', this.state.thursdaySurplusGHG],
                                ['Friday', this.state.fridaySurplusGHG],
                                ['Saturday', this.state.saturdaySurplusGHG],
                                ['Sunday', this.state.sundaySurplusGHG],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus GHG Saved Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions Saved from Food Surplus (kg co2)'
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
                                ['Day', 'GHG Saved '],
                                ['Mon', this.state.mondaySurplusGHG],
                                ['Tue', this.state.tuesdaySurplusGHG],
                                ['Wed', this.state.wednesdaySurplusGHG],
                                ['Thu', this.state.thursdaySurplusGHG],
                                ['Fri', this.state.fridaySurplusGHG],
                                ['Sat', this.state.saturdaySurplusGHG],
                                ['Sun', this.state.sundaySurplusGHG],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus GHG Saved Performance',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions Saved from Food Surplus (kg co2)'
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

export default connect(mapStateToProps, null)(Chart19);
