import React, { useState, useEffect } from "react";

import { Dropdown } from "../../../../../../SubComponents/Dropdown";

import { useTranslation, Trans } from 'react-i18next';


export default function DayOfWeek({ setDayOfWeek }) {

  const { t } = useTranslation();

  const [control, setControl] = useState("Monday");

  //mediates between the state of the dropdown and the format needed for the API
  const handleDropdown = () => {
    switch (control) {
      default:
      case "Monday":
        setDayOfWeek("Monday");
        break;
      case "Tuesday":
        setDayOfWeek("Tuesday");
        break;
      case "Wednesday":
        setDayOfWeek("Wednesday");
        break;
      case "Thursday":
        setDayOfWeek("Thursday");
        break;
      case "Friday":
        setDayOfWeek("Friday");
        break;
      case "Saturday":
        setDayOfWeek("Saturday");
        break;
      case "Sunday":
        setDayOfWeek("Sunday");
        break;
    }
  };

  useEffect(() => {
    handleDropdown();
  }, [control]);

  const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];

  return (
    <Dropdown
      id="meal-type"
      styling="green dropdown-input"
      data={control}
      items={Days}
      function={(e) => setControl(e)}
    />
  );
}
