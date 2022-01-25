import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Tab, Container, Nav } from "react-bootstrap";
import styled from "styled-components";
import "../UserAccount.css";

import { connect } from "react-redux";
import { getFirestoreData } from "../../../../store/actions/dataActions";
import { DefaultButton } from "../../SubComponents/Button";
import { Dropdown } from "../../SubComponents/Dropdown";

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
        vAxis: { title: props.dropdownType + " of Food Wastage " + props.unit },
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

  function clearState() {
    //Days
    setMon(0);
    setTue(0);
    setWed(0);
    setThur(0);
    setFri(0);
    setSat(0);
    setSun(0);
    //Weeks
    setFirst(0);
    setSecond(0);
    setThird(0);
    setFourth(0);
    //Months
    setJan(0);
    setFeb(0);
    setMar(0);
    setApr(0);
    setMay(0);
    setJun(0);
    setJul(0);
    setAug(0);
    setSep(0);
    setOct(0);
    setNov(0);
    setDec(0);
  }

  //Weight-GHG-Cost
  const [dropdownType, setDropdownType] = useState("Weight");
  const [unit, setUnit] = useState("KG");

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
    clearState();
    updateCharts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, dropdownType]);

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
      var wm = 0;

      var edibleIndeible = doc.edibleIndeible;

      var cpu = doc.carbsPerUnit;
      var cc = doc.carbsContent;
      var cm = 0;
      var fpu = doc.fatPerUnit;
      var fc = doc.fatContent;
      var fm = 0;
      var ppu = doc.proteinPerUnit;
      var pc = doc.proteinContent;
      var pm = 0;

      var cost = doc.foodWasteCost;
      var currency = doc.currency;
      var curm = 0;

      var newValue = 0;

      //Multipliers
      switch (wu) {
        default:
        case "kg":
        case "l":
          wm = 1;
          break;
        case "g":
        case "ml":
          wm = 0.001;
          break;
        case "oz":
          wm = 0.028;
          break;
        case "lbs":
          wm = 0.454;
          break;
      }
      switch (cpu) {
        default:
        case "100g":
        case "100ml":
          cm = 0.01;
          break;
        case "500g":
        case "500ml":
          cm = 0.002;
          break;
        case "1l":
        case "1kg":
          cm = 0.001;
          break;
      }
      switch (fpu) {
        default:
        case "100g":
        case "100ml":
          fm = 0.01;
          break;
        case "500g":
        case "500ml":
          fm = 0.002;
          break;
        case "1l":
        case "1kg":
          fm = 0.001;
          break;
      }
      switch (ppu) {
        default:
        case "100g":
        case "100ml":
          pm = 0.01;
          break;
        case "500g":
        case "500ml":
          pm = 0.002;
          break;
        case "1l":
        case "1kg":
          pm = 0.001;
          break;
      }
      switch (currency) {
        case "GBP (£)":
          curm = 1;
          break;
        case "USD ($)":
          curm = 1.404;
          break;
        case "EUR (€)":
          curm = 1.161;
          break;
        default:
          curm = 1;
      }

      //Weight-GHG-Cost
      if (dropdownType === "Weight") {
        newValue = Number((weight * wm).toFixed(3));
        setUnit("(KG)");
      } else if (dropdownType === "GHG") {
        if (edibleIndeible === "Edible") {
          newValue = Number(
            20 *
              16.0424 *
              wm *
              weight *
              (0.01852 * cm * cc + 0.01744 * pm * pc + 0.04608 * fm * fc)
          );
        } else {
          newValue = Number(weight * wm * 2.5);
        }
        setUnit("(KG CO2)");
      } else {
        newValue = Number(cost * curm * wm);
        setUnit("(£)");
      }

      //Update Monthly
      if (year === currentDate.getFullYear()) {
        switch (month) {
          case 0:
            setJan((jan) => jan + newValue);
            break;
          case 1:
            setFeb((feb) => feb + newValue);
            break;
          case 2:
            setMar((mar) => mar + newValue);
            break;
          case 3:
            setApr((apr) => apr + newValue);
            break;
          case 4:
            setMay((may) => may + newValue);
            break;
          case 5:
            setJun((jun) => jun + newValue);
            break;
          case 6:
            setJul((jul) => jul + newValue);
            break;
          case 7:
            setAug((aug) => aug + newValue);
            break;
          case 8:
            setSep((sep) => sep + newValue);
            break;
          case 9:
            setOct((oct) => oct + newValue);
            break;
          case 10:
            setNov((nov) => nov + newValue);
            break;
          case 11:
            setDec((dec) => dec + newValue);
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
          setFirst((first) => first + newValue);
        } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
          setSecond((second) => second + newValue);
        } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
          setThird((third) => third + newValue);
        } else {
          setFourth((fourth) => fourth + newValue);
        }
      }

      //Update Daily
      if (year === currentDate.getFullYear() && currentWeek === week) {
        switch (day) {
          case 0:
            setSun((sun) => sun + newValue);
            break;
          case 1:
            setMon((mon) => mon + newValue);
            break;
          case 2:
            setTue((tue) => tue + newValue);
            break;
          case 3:
            setWed((wed) => wed + newValue);
            break;
          case 4:
            setThur((thur) => thur + newValue);
            break;
          case 5:
            setFri((fri) => fri + newValue);
            break;
          case 6:
            setSat((sat) => sat + newValue);
            break;
          default:
            break;
        }
      }
    });
  };

  //Daily
  const dailyChart = [
    ["Day", dropdownType],
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
    ["Week", dropdownType],
    ["1st-7th", first],
    ["8th-14th", second],
    ["15th-21st", third],
    ["22nd-31st", fourth],
  ];

  //Monthly
  const monthlyChart = [
    ["Month", dropdownType],
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
      <Dropdown
        id="Chart Switch"
        styling="grey"
        data={dropdownType}
        items={["Weight", "GHG", "Cost"]}
        function={(eventKey, e) => {
          setDropdownType(e.target.textContent);
          // forceUpdate();
        }}
      />
      <Tab.Container defaultActiveKey="daily">
        <Tab.Content>
          <Tab.Pane eventKey="daily" title="Daily">
            <ChartBuilder
              title="Daily"
              chartType={chartType("Daily")}
              dropdownType={dropdownType}
              unit={unit}
              {...props}
            />
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey="weekly" title="Weekly">
            <ChartBuilder
              title="Weekly"
              chartType={chartType("Weekly")}
              dropdownType={dropdownType}
              unit={unit}
              {...props}
            />
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey="monthly" title="Monthly">
            <ChartBuilder
              title="Monthly"
              chartType={chartType("Monthly")}
              dropdownType={dropdownType}
              unit={unit}
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
