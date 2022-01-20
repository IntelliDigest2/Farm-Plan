import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Tab, Container, Nav } from "react-bootstrap";
import styled from "styled-components";
import "../UserAccount.css";

import { connect } from "react-redux";
import { getFirestoreData } from "../../../../store/actions/dataActions";
import { DefaultButton } from "../../SubComponents/Button";

// Get current Date and week number
const currentDate = new Date();
var oneJan = new Date(currentDate.getFullYear(), 0, 1);
var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
var currentWeek = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);

// function daysInMonth(month, year) {
//   return new Date(year, month, 0).getDate();
// }

//Calculate week number
function getWeekNumber(date, year, day) {
  var oneJan = new Date(year, 0, 1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  var week = Math.ceil((day + 1 + numberOfDays) / 7);
  return week;
}

function MyChart(props) {
  return (
    <Chart
      chartType="ColumnChart"
      data={props.data}
      height="500px"
      loader={<div>Loading Chart</div>}
      options={props.options}
    />
  );
}

const ChartBuilder = (props) => {
  return (
    <MyChart
      data={props.chartType}
      options={{
        title: `${props.title} Food Waste Performance`,
        legend: "none",
        colors: ["#aab41e"],
        hAxis: { title: props.title, minValue: 0 },
        vAxis: { title: "Weight of Food Wastage (kg)" },
      }}
    />
  );
};

function ChartView(props) {
  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1); //Update state to force render
  }

  const forceUpdate = useForceUpdate();

  //* Ideally these should be a single array/object for each type (i.e. Daily, Weekly, Monthly)
  //* But I could not get that working, so this will do for the time being.
  //Daily State
  const [mon, setMon] = useState(0);
  const [tue, setTue] = useState(0);
  const [wed, setWed] = useState(0);
  const [thur, setThur] = useState(0);
  const [fri, setFri] = useState(0);
  const [sat, setSat] = useState(0);
  const [sun, setSun] = useState(0);

  //Weekly State
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);

  //Monthly State
  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [mar, setMar] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [aug, setAug] = useState(0);
  const [sep, setSep] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);

  //this defines fetchCharts method, maybe bring out method into chartfunction specific folder so that this can be generalised.
  function fetchData() {
    var data = {
      masterCollection: "data",
      collection: "writtenFoodWasteData",
      uid: props.auth.uid,
    };
    props.getFirestoreData(data);
  }

  //this sends data request
  useEffect(() => {
    if (props.data.length <= 0) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateCharts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const updateCharts = async () => {
    props.data.forEach((doc) => {
      try {
        var date = new Date(doc.date.seconds * 1000);
        var year = date.getFullYear();
        var month = date.getMonth();
        var dayOfMonth = date.getDate();
        var day = date.getDay();
        var week = getWeekNumber(date, year, day);
      } catch (err) {
        console.error(err);
      }

      var weight = doc.foodWasteWeight;
      var wu = doc.weightType;

      var newWeight = 0;

      //Calculate weight conversions
      switch (wu) {
        case "kg":
        case "l":
        default:
          newWeight = Number(weight * 1);
          break;
        case "g":
        case "ml":
          newWeight = Number((weight * 0.001).toFixed(3));
          break;
        case "oz":
          newWeight = Number((weight * 0.028).toFixed(3));
          break;
        case "lbs":
          newWeight = Number((weight * 0.454).toFixed(3));
          break;
      }

      //Update Monthly
      if (year === currentDate.getFullYear()) {
        switch (month) {
          case 0:
            setJan((jan) => jan + newWeight);
            break;
          case 1:
            setFeb((feb) => feb + newWeight);
            break;
          case 2:
            setMar((mar) => mar + newWeight);
            break;
          case 3:
            setApr((apr) => apr + newWeight);
            break;
          case 4:
            setMay((may) => may + newWeight);
            break;
          case 5:
            setJun((jun) => jun + newWeight);
            break;
          case 6:
            setJul((jul) => jul + newWeight);
            break;
          case 7:
            setAug((aug) => aug + newWeight);
            break;
          case 8:
            setSep((sep) => sep + newWeight);
            break;
          case 9:
            setOct((oct) => oct + newWeight);
            break;
          case 10:
            setNov((nov) => nov + newWeight);
            break;
          case 11:
            setDec((dec) => dec + newWeight);
            break;
          default:
            break;
        }
      }
      //Update Weekly
      if (
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        if (dayOfMonth >= 0 && dayOfMonth <= 7) {
          setFirst((first) => first + newWeight);
        } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
          setSecond((second) => second + newWeight);
        } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
          setThird((third) => third + newWeight);
        } else {
          setFourth((fourth) => fourth + newWeight);
        }
      }

      //Update Daily
      if (year === currentDate.getFullYear() && currentWeek === week) {
        switch (day) {
          case 0:
            setSun((sun) => sun + newWeight);
            break;
          case 1:
            setMon((mon) => mon + newWeight);
            break;
          case 2:
            setTue((tue) => tue + newWeight);
            break;
          case 3:
            setWed((wed) => wed + newWeight);
            break;
          case 4:
            setThur((thur) => thur + newWeight);
            break;
          case 5:
            setFri((fri) => fri + newWeight);
            break;
          case 6:
            setSat((sat) => sat + newWeight);
            break;
          default:
            break;
        }
      }
    });
  };

  //Daily
  const dailyChart = [
    ["Day", "Weight "],
    ["Mon", mon],
    ["Tue", tue],
    ["Wed", wed],
    ["Thu", thur],
    ["Fri", fri],
    ["Sat", sat],
    ["Sun", sun],
  ];

  // Weekly LOOK AT CHARTMONTH.JS
  const weeklyChart = [
    ["Week", "Weight "],
    ["1st-7th", first],
    ["8th-14th", second],
    ["15th-21st", third],
    ["22nd-31st", fourth],
  ];

  //Monthly
  const monthlyChart = [
    ["Month", "Weight "],
    ["Jan", jan],
    ["Feb", feb],
    ["Mar", mar],
    ["Apr", apr],
    ["May", may],
    ["Jun", jun],
    ["Jul", jul],
    ["Aug", aug],
    ["Sep", sep],
    ["Oct", oct],
    ["Nov", nov],
    ["Dec", dec],
  ];

  function chartType(title) {
    switch (title) {
      case "Daily":
        return dailyChart;
      case "Weekly":
        return weeklyChart;
      case "Monthly":
        return monthlyChart;
      default:
        return dailyChart;
    }
  }

  return (
    //tabbed window with daily weekly monthly yearly
    <Container fluid className="web-center">
      <DefaultButton text="Back" styling="green" goTo="/account" />
      <Tab.Container defaultActiveKey="daily">
        <Tab.Content>
          <Tab.Pane eventKey="daily" title="Daily">
            <ChartBuilder
              title="Daily"
              chartType={chartType("Daily")}
              {...props}
            />
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey="weekly" title="Weekly">
            <ChartBuilder
              title="Weekly"
              chartType={chartType("Weekly")}
              {...props}
            />
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey="monthly" title="Monthly">
            <ChartBuilder
              title="Monthly"
              chartType={chartType("Monthly")}
              {...props}
            />
          </Tab.Pane>
        </Tab.Content>
        <Nav justify variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="daily" onClick={forceUpdate}>
              Daily
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="weekly" onClick={forceUpdate}>
              Weekly
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="monthly" onClick={forceUpdate}>
              Monthly
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Tab.Container>
    </Container>
  );
}

// Maps values in store to props in this file
/*
 * Example using auth:
 * in class component, accessed via: this.props.auth
 * in functional component, accessed via: props.auth
 */
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.data.getData,
  };
};

//Maps specific function calls to dispatch (I think...)
const mapDispatchToProps = (dispatch) => {
  return {
    getFirestoreData: (product) => dispatch(getFirestoreData(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartView);
