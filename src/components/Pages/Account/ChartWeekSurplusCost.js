import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("W")

class Chart23 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusCost: 0,
        tuesdaySurplusCost: 0,
        wednesdaySurplusCost: 0,
        thursdaySurplusCost: 0,
        fridaySurplusCost: 0,
        saturdaySurplusCost: 0,
        sundaySurplusCost: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                var isSurplus = doc.data().EDIBLEORINEDIBLE

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

                // if (week === time && day === "Mon" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         mondayCost: prevState.mondayCost += newCost
                //     }));
                // } else if (week === time && day === "Tue" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         tuesdayCost: prevState.tuesdayCost += newCost
                //     }));
                // } else if (week === time && day === "Wed" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         wednesdayCost: prevState.wednesdayCost += newCost
                //     }));
                // } else if (week === time && day === "Thu" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         thursdayCost: prevState.thursdayCost += newCost
                //     }));
                // } else if (week === time && day === "Fri" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         fridayCost: prevState.fridayCost += newCost
                //     }));
                // } else if (week === time && day === "Sat" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         saturdayCost: prevState.saturdayCost += newCost
                //     }));
                // } else if (week === time && day === "Sun" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         sundayCost: prevState.sundayCost += newCost
                //     }));
                // }

                if (week === time && day === "Mon" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        mondaySurplusCost: prevState.mondaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        tuesdaySurplusCost: prevState.tuesdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        wednesdaySurplusCost: prevState.wednesdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        thursdaySurplusCost: prevState.thursdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        fridaySurplusCost: prevState.fridaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        saturdaySurplusCost: prevState.saturdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        sundaySurplusCost: prevState.sundaySurplusCost += newCost
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
                                ['Day', 'Food Surplus Costs Saved'],
                                ['Monday', this.state.mondaySurplusCost],
                                ['Tuesday', this.state.tuesdaySurplusCost],
                                ['Wednesday', this.state.wednesdaSurplusCost],
                                ['Thursday', this.state.thursdaySurplusCost],
                                ['Friday', this.state.fridaySurplusCost],
                                ['Saturday', this.state.saturdaySurplusCost],
                                ['Sunday', this.state.sundaySurplusCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Costs Saved Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Costs Saved from Food Surplus (GBP (£))'
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
                                ['Day', 'Costs Saved '],
                                ['Mon', this.state.mondaySurplusCost],
                                ['Tue', this.state.tuesdaySurplusCost],
                                ['Wed', this.state.wednesdaSurplusCost],
                                ['Thu', this.state.thursdaySurplusCost],
                                ['Fri', this.state.fridaySurplusCost],
                                ['Sat', this.state.saturdaySurplusCost],
                                ['Sun', this.state.sundaySurplusCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Costs Saved Performance',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Costs Saved from Food Surplus (GBP (£))'
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

export default connect(mapStateToProps, null)(Chart23);
