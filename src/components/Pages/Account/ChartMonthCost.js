import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("MMM")
const fullMonth = moment().format("MMMM")

class Chart10 extends Component {

    state = {
        uid: this.props.auth.uid,
        week1Cost: 0,
        week2Cost: 0,
        week3Cost: 0,
        week4Cost: 0,
        monthEnd: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var month = doc.data().MONTH
                var mdate = doc.data().MDATE
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

                if (month === time && (mdate === "1st" || mdate === "2nd" || mdate === "3rd" || mdate === "4th" || mdate === "5th" || mdate === "6th" || mdate === "7th")
                && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                  this.setState( (prevState) => ({
                    week1Cost: prevState.week1Cost += newCost
                  }));
                } else if (month === time && (mdate === "8th" || mdate === "9th" || mdate === "10th" || mdate === "11th" || mdate === "12th" || mdate === "13th" || mdate === "14th")
                && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                  this.setState( (prevState) => ({
                    week2Cost: prevState.week2Cost += newCost
                  }));
                } else if (month === time && (mdate === "15th" || mdate === "16th" || mdate === "17th" || mdate === "18th" || mdate === "19th" || mdate === "20th" || mdate === "21st")
                && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                  this.setState( (prevState) => ({
                    week3Cost: prevState.week3Cost += newCost
                  }));
                } else if (month === time && (mdate === "22nd" || mdate === "23rd" || mdate === "24th" || mdate === "25th" || mdate === "26th" || mdate === "27th" || mdate === "28th" || mdate === "29th" || mdate === "30th" || mdate === "31st")
                && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                  this.setState( (prevState) => ({
                    week4Cost: prevState.week4Cost += newCost
                  }));
                }
            })

          })
          .catch(error => console.log(error))
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
                                ['Week/Period', 'Food Wastage Cost'],
                                ['1st-7th', this.state.week1Cost],
                                ['8th-14th', this.state.week2Cost],
                                ['15th-21st', this.state.week3Cost],
                                ['22nd-'+this.state.monthEnd, this.state.week4Cost],
                            ]}
                            options={{
                                title: 'This month\'s Food Wastage Cost Performance (' + fullMonth + ' 2021)',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Week/Period of ' + fullMonth,
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
                                ['Week/Period', 'Cost '],
                                ['1st-7th', this.state.week1Cost],
                                ['8th-14th', this.state.week2Cost],
                                ['15th-21st', this.state.week3Cost],
                                ['22nd-'+this.state.monthEnd, this.state.week4Cost],
                            ]}
                            options={{
                                title: 'Food Wastage Cost Performance (' + fullMonth + ' 2021)',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Week/Period of ' + fullMonth,
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

export default connect(mapStateToProps, null)(Chart10);
