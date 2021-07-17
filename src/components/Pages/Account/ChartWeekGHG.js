import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("W")

class Chart7 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondayGHG: 0,
        tuesdayGHG: 0,
        wednesdayGHG: 0,
        thursdayGHG: 0,
        fridayGHG: 0,
        saturdayGHG: 0,
        sundayGHG: 0,
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

                if (week === time && day === "Mon" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        mondayGHG: prevState.mondayGHG += ghg
                    }));
                } else if (week === time && day === "Tue" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        tuesdayGHG: prevState.tuesdayGHG += ghg
                    }));
                } else if (week === time && day === "Wed" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        wednesdayGHG: prevState.wednesdayGHG += ghg
                    }));
                } else if (week === time && day === "Thu" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        thursdayGHG: prevState.thursdayGHG += ghg
                    }));
                } else if (week === time && day === "Fri" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        fridayGHG: prevState.fridayGHG += ghg
                    }));
                } else if (week === time && day === "Sat" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        saturdayGHG: prevState.saturdayGHG += ghg
                    }));
                } else if (week === time && day === "Sun" && isSurplus !== "Surplus"){
                    this.setState( (prevState) => ({
                        sundayGHG: prevState.sundayGHG += ghg
                    }));
                }

                else if (week === time && day === "Mon" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        mondayGHG: prevState.mondayGHG -= ghg
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        tuesdayGHG: prevState.tuesdayGHG -= ghg
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        wednesdayGHG: prevState.wednesdayGHG -= ghg
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        thursdayGHG: prevState.thursdayGHG -= ghg
                    }));
                } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        fridayGHG: prevState.fridayGHG -= ghg
                    }));
                } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        saturdayGHG: prevState.saturdayGHG -= ghg
                    }));
                } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        sundayGHG: prevState.sundayGHG -= ghg
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
                                ['Day', 'Food Wastage GHG'],
                                ['Monday', this.state.mondayGHG],
                                ['Tuesday', this.state.tuesdayGHG],
                                ['Wednesday', this.state.wednesdayGHG],
                                ['Thursday', this.state.thursdayGHG],
                                ['Friday', this.state.fridayGHG],
                                ['Saturday', this.state.saturdayGHG],
                                ['Sunday', this.state.sundayGHG],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage GHG Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Day of the Week',
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
                                ['Food Wastage Type', 'GHG '],
                                ['Mon', this.state.mondayGHG],
                                ['Tue', this.state.tuesdayGHG],
                                ['Wed', this.state.wednesdayGHG],
                                ['Thu', this.state.thursdayGHG],
                                ['Fri', this.state.fridayGHG],
                                ['Sat', this.state.saturdayGHG],
                                ['Sun', this.state.sundayGHG],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage GHG Performance',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
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

export default connect(mapStateToProps, null)(Chart7);
