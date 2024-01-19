import React, { useState } from "react";
import Control from "./control";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import { useEffect } from "react";

export default function SupAuth() {
  //stage 0 are you an existing farm
  const [delivery, setDelivery] = useState(false);

  //stage 1 (are you a famring association member)
  const [market, setMarket] = useState("");

  //stage 2 (certificate of incorporation)
  const [turnover, setTurnover] = useState("");

  //stage 3 location
  const [sales, setSales] = useState("");

  //stage 4
  const [interest, setInterest] = useState("")


  return (
    <PageWrap goTo="/account" header="My Farm Plan" subtitle="Build your plan">
      <Control
        delivery={ delivery}
        setDelivery={ setDelivery}
        market={ market}
        setMarket={ setMarket}
        turnover={ turnover}
        setTurnover={ setTurnover}
        sales={ sales}
        setSales={ setSales}
        setInterest={ setInterest} 
        interest={ interest}
      />
    </PageWrap>
  );
}
