import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Tab, Container, Nav } from "react-bootstrap";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

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
        legend: { position: "top", maxLines: 5 },
        colors: [Colors.brandTurqoise, Colors.brandYellow, Colors.brandGreen],
        hAxis: { title: props.title, minValue: 0 },
        vAxis: { title: "Food Wastage" },
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
  const [monGHG, setMonGHG] = useState(0);
  const [tueGHG, setTueGHG] = useState(0);
  const [wedGHG, setWedGHG] = useState(0);
  const [thurGHG, setThurGHG] = useState(0);
  const [friGHG, setFriGHG] = useState(0);
  const [satGHG, setSatGHG] = useState(0);
  const [sunGHG, setSunGHG] = useState(0);
  const [monCost, setMonCost] = useState(0);
  const [tueCost, setTueCost] = useState(0);
  const [wedCost, setWedCost] = useState(0);
  const [thurCost, setThurCost] = useState(0);
  const [friCost, setFriCost] = useState(0);
  const [satCost, setSatCost] = useState(0);
  const [sunCost, setSunCost] = useState(0);

  //Weekly State
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [firstGHG, setFirstGHG] = useState(0);
  const [secondGHG, setSecondGHG] = useState(0);
  const [thirdGHG, setThirdGHG] = useState(0);
  const [fourthGHG, setFourthGHG] = useState(0);
  const [firstCost, setFirstCost] = useState(0);
  const [secondCost, setSecondCost] = useState(0);
  const [thirdCost, setThirdCost] = useState(0);
  const [fourthCost, setFourthCost] = useState(0);

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
  const [janGHG, setJanGHG] = useState(0);
  const [febGHG, setFebGHG] = useState(0);
  const [marGHG, setMarGHG] = useState(0);
  const [aprGHG, setAprGHG] = useState(0);
  const [mayGHG, setMayGHG] = useState(0);
  const [junGHG, setJunGHG] = useState(0);
  const [julGHG, setJulGHG] = useState(0);
  const [augGHG, setAugGHG] = useState(0);
  const [sepGHG, setSepGHG] = useState(0);
  const [octGHG, setOctGHG] = useState(0);
  const [novGHG, setNovGHG] = useState(0);
  const [decGHG, setDecGHG] = useState(0);
  const [janCost, setJanCost] = useState(0);
  const [febCost, setFebCost] = useState(0);
  const [marCost, setMarCost] = useState(0);
  const [aprCost, setAprCost] = useState(0);
  const [mayCost, setMayCost] = useState(0);
  const [junCost, setJunCost] = useState(0);
  const [julCost, setJulCost] = useState(0);
  const [augCost, setAugCost] = useState(0);
  const [sepCost, setSepCost] = useState(0);
  const [octCost, setOctCost] = useState(0);
  const [novCost, setNovCost] = useState(0);
  const [decCost, setDecCost] = useState(0);

  function clearState() {
    //Days
    setMon(0);
    setTue(0);
    setWed(0);
    setThur(0);
    setFri(0);
    setSat(0);
    setSun(0);
    setMonGHG(0);
    setTueGHG(0);
    setWedGHG(0);
    setThurGHG(0);
    setFriGHG(0);
    setSatGHG(0);
    setSunGHG(0);
    setMonCost(0);
    setTueCost(0);
    setWedCost(0);
    setThurCost(0);
    setFriCost(0);
    setSatCost(0);
    setSunCost(0);
    //Weeks
    setFirst(0);
    setSecond(0);
    setThird(0);
    setFourth(0);
    setFirstGHG(0);
    setSecondGHG(0);
    setThirdGHG(0);
    setFourthGHG(0);
    setFirstCost(0);
    setSecondCost(0);
    setThirdCost(0);
    setFourthCost(0);

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
    setJanGHG(0);
    setFebGHG(0);
    setMarGHG(0);
    setAprGHG(0);
    setMayGHG(0);
    setJunGHG(0);
    setJulGHG(0);
    setAugGHG(0);
    setSepGHG(0);
    setOctGHG(0);
    setNovGHG(0);
    setDecGHG(0);
    setJanCost(0);
    setFebCost(0);
    setMarCost(0);
    setAprCost(0);
    setMayCost(0);
    setJunCost(0);
    setJulCost(0);
    setAugCost(0);
    setSepCost(0);
    setOctCost(0);
    setNovCost(0);
    setDecCost(0);
  }

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
        return;
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

      var newWeight = 0;
      var newGHG = 0;
      var newCost = 0;

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
      newWeight = Number((weight * wm).toFixed(3));
      if (edibleIndeible === "Edible") {
        newGHG = Number(
          20 *
            16.0424 *
            wm *
            weight *
            (0.01852 * cm * cc + 0.01744 * pm * pc + 0.04608 * fm * fc)
        );
      } else {
        newGHG = Number(weight * wm * 2.5);
      }
      newCost = Number(cost * curm * wm);

      //Update Monthly
      if (year === currentDate.getFullYear()) {
        switch (month) {
          case 0:
            setJan((jan) => jan + newWeight);
            setJanGHG((janGHG) => janGHG + newGHG);
            setJanCost((janCost) => janCost + newCost);
            break;
          case 1:
            setFeb((feb) => feb + newWeight);
            setFebGHG((febGHG) => febGHG + newGHG);
            setFebCost((febCost) => febCost + newCost);
            break;
          case 2:
            setMar((mar) => mar + newWeight);
            setMarGHG((marGHG) => marGHG + newGHG);
            setMarCost((marCost) => marCost + newCost);
            break;
          case 3:
            setApr((apr) => apr + newWeight);
            setAprGHG((aprGHG) => aprGHG + newGHG);
            setAprCost((aprCost) => aprCost + newCost);
            break;
          case 4:
            setMay((may) => may + newWeight);
            setMayGHG((mayGHG) => mayGHG + newGHG);
            setMayCost((mayCost) => mayCost + newCost);
            break;
          case 5:
            setJun((jun) => jun + newWeight);
            setJunGHG((junGHG) => junGHG + newGHG);
            setJunCost((junCost) => junCost + newCost);
            break;
          case 6:
            setJul((jul) => jul + newWeight);
            setJulGHG((julGHG) => julGHG + newGHG);
            setJulCost((julCost) => julCost + newCost);
            break;
          case 7:
            setAug((aug) => aug + newWeight);
            setAugGHG((augGHG) => augGHG + newGHG);
            setAugCost((augCost) => augCost + newCost);
            break;
          case 8:
            setSep((sep) => sep + newWeight);
            setSepGHG((sepGHG) => sepGHG + newGHG);
            setSepCost((sepCost) => sepCost + newCost);
            break;
          case 9:
            setOct((oct) => oct + newWeight);
            setOctGHG((octGHG) => octGHG + newGHG);
            setOctCost((octCost) => octCost + newCost);
            break;
          case 10:
            setNov((nov) => nov + newWeight);
            setNovGHG((novGHG) => novGHG + newGHG);
            setNovCost((novCost) => novCost + newCost);
            break;
          case 11:
            setDec((dec) => dec + newWeight);
            setDecGHG((decGHG) => decGHG + newGHG);
            setDecCost((decCost) => decCost + newCost);
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
          setFirstGHG((firstGHG) => firstGHG + newGHG);
          setFirstCost((firstCost) => firstCost + newCost);
        } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
          setSecond((second) => second + newWeight);
          setSecondGHG((secondGHG) => secondGHG + newGHG);
          setSecondCost((secondCost) => secondCost + newCost);
        } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
          setThird((third) => third + newWeight);
          setThirdGHG((thirdGHG) => thirdGHG + newGHG);
          setThirdCost((thirdCost) => thirdCost + newCost);
        } else {
          setFourth((fourth) => fourth + newWeight);
          setFourthGHG((fourthGHG) => fourthGHG + newGHG);
          setFourthCost((fourthCost) => fourthCost + newCost);
        }
      }

      //Update Daily
      if (year === currentDate.getFullYear() && currentWeek === week) {
        console.log(currentWeek + "/" + week);
        switch (day) {
          case 0:
            setSun((sun) => sun + newWeight);
            setSunGHG((sunGHG) => sunGHG + newGHG);
            setSunCost((sunCost) => sunCost + newCost);
            break;
          case 1:
            setMon((mon) => mon + newWeight);
            setMonGHG((monGHG) => monGHG + newGHG);
            setMonCost((monCost) => monCost + newCost);
            break;
          case 2:
            setTue((tue) => tue + newWeight);
            setTueGHG((tueGHG) => tueGHG + newGHG);
            setTueCost((tueCost) => tueCost + newCost);
            break;
          case 3:
            setWed((wed) => wed + newWeight);
            setWedGHG((wedGHG) => wedGHG + newGHG);
            setWedCost((wedCost) => wedCost + newCost);
            break;
          case 4:
            setThur((thur) => thur + newWeight);
            setThurGHG((thurGHG) => thurGHG + newGHG);
            setThurCost((thurCost) => thurCost + newCost);
            break;
          case 5:
            setFri((fri) => fri + newWeight);
            setFriGHG((friGHG) => friGHG + newGHG);
            setFriCost((friCost) => friCost + newCost);
            break;
          case 6:
            setSat((sat) => sat + newWeight);
            setSatGHG((satGHG) => satGHG + newGHG);
            setSatCost((satCost) => satCost + newCost);
            break;
          default:
            break;
        }
      }
    });
  };

  //Daily
  const dailyChart = [
    ["Day", "Weight (KG)", "GHG (KG/CO2)", "Cost (£)"],
    ["Mon", mon, monGHG, monCost],
    ["Tue", tue, tueGHG, tueCost],
    ["Wed", wed, wedGHG, wedCost],
    ["Thu", thur, thurGHG, thurCost],
    ["Fri", fri, friGHG, friCost],
    ["Sat", sat, satGHG, satCost],
    ["Sun", sun, sunGHG, sunCost],
  ];

  // Weekly LOOK AT CHARTMONTH.JS
  const weeklyChart = [
    ["Week", "Weight (KG)", "GHG (KG/CO2)", "Cost (£)"],
    ["1st-7th", first, firstGHG, firstCost],
    ["8th-14th", second, secondGHG, secondCost],
    ["15th-21st", third, thirdGHG, thirdCost],
    ["22nd-31st", fourth, fourthGHG, fourthCost],
  ];

  //Monthly
  const monthlyChart = [
    ["Month", "Weight (KG)", "GHG (KG/CO2)", "Cost (£)"],
    ["Jan", jan, janGHG, janCost],
    ["Feb", feb, febGHG, febCost],
    ["Mar", mar, marGHG, marCost],
    ["Apr", apr, aprGHG, aprCost],
    ["May", may, mayGHG, mayCost],
    ["Jun", jun, junGHG, junCost],
    ["Jul", jul, julGHG, julCost],
    ["Aug", aug, augGHG, augCost],
    ["Sep", sep, sepGHG, sepCost],
    ["Oct", oct, octGHG, octCost],
    ["Nov", nov, novGHG, novCost],
    ["Dec", dec, decGHG, decCost],
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
