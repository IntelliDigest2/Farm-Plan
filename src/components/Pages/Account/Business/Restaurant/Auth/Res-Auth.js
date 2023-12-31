import React, { useState } from "react";
import Control from "./control";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import { useEffect } from "react";

export default function ResAuth() {
  //stage 0 are you an existing farm
  const [OMS, setOMS] = useState(false);

  //stage 1 (are you a famring association member)
  const [cost, setCost] = useState("");

  //stage 2 (certificate of incorporation)
  const [turnover, setTurnover] = useState("");

  //stage 3 location
  const [purchase, setPurchase] = useState("");
  
  //stage 4 farming sector
  const [nutritionalInfo, setNutritionalInfo] = useState(false);

  //stage 5 sustainability
  const [foodWaste, setFoodWaste] = useState(false)

  //stage 6
  const [carbonPrint, setCarbonPrint] = useState(false);

  //stage 7
  const [interest, setInterest] = useState("")


  return (
    <PageWrap goTo="/account" header="My Farm Plan" subtitle="Build your plan">
      <Control
        OMS={ OMS}
        setOMS={ setOMS}
        setCost={ setCost}
        cost={ cost}
        turnover={ turnover}
        setTurnover={ setTurnover}
        purchase={ purchase}
        setPurchase={ setPurchase}
        nutritionalInfo={nutritionalInfo}
        setNutritionalInfo={setNutritionalInfo}
        foodWaste={ foodWaste}
        setFoodWaste={ setFoodWaste}
        carbonPrint={ carbonPrint}
        setCarbonPrint={ setCarbonPrint}
        setInterest={ setInterest} 
        interest={ interest}
      />
    </PageWrap>
  );
}
