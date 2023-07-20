import React, { useState, useEffect } from "react";

import ProduceBox from "./ProduceBox";

import { connect } from "react-redux";
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { getProduceData } from "../../../../../../store/actions/marketplaceActions/farmPlanData";

function ProduceItems(props) {

  const [produce, setProduce] = useState([]);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  function Refresh() {
    return (
      <>
        <Tooltip title="Refresh">
          <IconButton
            aria-label="Refresh"
            sx={{ ml: 2 }}
            onClick={() => {
              forceUpdate();
            }}
          >
            <SyncIcon style={{ fontSize: 35 }} 
            />
          </IconButton>
        </Tooltip>
    </>
    );
   }

  
  //this sends data request
  useEffect(() => {
    props.getProduceData();
  }, [props.value, update]);

  
  const updateProduce = async () => {
    //clears the meals array before each update- IMPORTANT
    setProduce([]);

    //sets a new meal object in the array for every document with this date attached
    props.produce.forEach((doc) => {
      var item = doc.item;
      var id = doc.id;
      var farmType = doc.farmType;
      var measure = doc.measure;
      var quantity = doc.quantity;
      var price = doc.price;
      var currency = doc. currency;
      var date = doc.date;

      setProduce((produce) => [
        ...produce,
        {
          item: item,
          farmType: farmType,
          id: id,
          measure: measure,
          quantity: quantity,
          price: price,
          currency: currency,
          date: date,
        },
      ]);
    });
  };
 
  useEffect(() => {
    updateProduce();
  }, [props.produce, props.update]);

  return (
    <>
    <Refresh />
      {produce.length ? (
        <div>
          <ProduceBox
            forceUpdate={forceUpdate}
            produce={produce}
          />
        </div>
      ) : (
        <div className="empty basic-title-left">
          <p> No Item yet 🙂 use the add button </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    produce: state.farmData.produce,
  }; 
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduceData: (data) => dispatch(getProduceData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProduceItems);
