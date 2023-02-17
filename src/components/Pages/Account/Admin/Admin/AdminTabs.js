import React from "react";
import { IconButton } from "../../../../SubComponents/Button";
import "../../UserAccount.css";

export function Dashboard({ setShow, setChooseModal }) {
  return (
    <>

     <IconButton
        icon="notes" 
        label="Dashboard"
        color="turquoise"
        goTo="/admin"
        />
    </>
  );
}

