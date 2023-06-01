import React from "react";
import { IconButton } from "../../../../SubComponents/Button";
import "../../UserAccount.css";

export function Dashboard({ setShow, setChooseModal}) {
  return (
    <>

     <IconButton
        icon="notes" 
        label="Rent"
        color="turquoise"
        goTo="/rent"
        />

      <IconButton
        icon="notes" 
        label="Buy"
        color="turquoise"
        goTo="/buy"
        />
    </>
  );
}

