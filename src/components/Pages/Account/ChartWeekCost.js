import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("W")

class Chart11 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondayCost: 0,
        tuesdayCost: 0,
        wednesdayCost: 0,
        thursdayCost: 0,
        fridayCost: 0,
        saturdayCost: 0,
        sundayCost: 0,
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

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                var carbCon = doc.data().CARBSCONTENT
                var proCon = doc.data().PROTEINCONTENT
                var fatCon = doc.data().FATCONTENT
                var fibCon = doc.data().FIBRECONTENT

                if (week === time && day === "Mon" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        mondayCost: prevState.mondayCost += newCost
                    }));
                } else if (week === time && day === "Tue" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        tuesdayCost: prevState.tuesdayCost += newCost
                    }));
                } else if (week === time && day === "Wed" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        wednesdayCost: prevState.wednesdayCost += newCost
                    }));
                } else if (week === time && day === "Thu" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        thursdayCost: prevState.thursdayCost += newCost
                    }));
                } else if (week === time && day === "Fri" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        fridayCost: prevState.fridayCost += newCost
                    }));
                } else if (week === time && day === "Sat" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        saturdayCost: prevState.saturdayCost += newCost
                    }));
                } else if (week === time && day === "Sun" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                        sundayCost: prevState.sundayCost += cost
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
                                ['Day', 'Food Wastage Cost'],
                                ['Monday', this.state.mondayCost],
                                ['Tuesday', this.state.tuesdayCost],
                                ['Wednesday', this.state.wednesdayCost],
                                ['Thursday', this.state.thursdayCost],
                                ['Friday', this.state.fridayCost],
                                ['Saturday', this.state.saturdayCost],
                                ['Sunday', this.state.sundayCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage Cost Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
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
                                ['Day', 'Cost '],
                                ['Mon', this.state.mondayCost],
                                ['Tue', this.state.tuesdayCost],
                                ['Wed', this.state.wednesdayCost],
                                ['Thu', this.state.thursdayCost],
                                ['Fri', this.state.fridayCost],
                                ['Sat', this.state.saturdayCost],
                                ['Sun', this.state.sundayCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage Cost Performance',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
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

export default connect(mapStateToProps, null)(Chart11);
