import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";

import { connect } from "react-redux";
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

const AddToInventoryForm = (props) => {
  const [itemName, setItemName] = useState("");
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState("+ scan from barcode");

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      upload: {
        item: itemName,
      },
    };

    props.addToInventory(data);
    // props.createMealPlanData(data);
    // props.forceUpdate();
  };

  const handleSetScan = () => {
    setScan(!scan);
    if (scan) {
      setExpand("+ scan from barcode");
    } else {
      setExpand("- input manually");
    }
  };

  const handleFoodSearch = (e) => {
    if (e.target.textContent) {
      setItemName(e.target.textContent);
    } else {
      setItemName(e.target.value);
    }
  };

  useEffect(() => {
    console.log("item", itemName);
  }, [itemName]);

  return (
    <div>
      <button
        className="btn success shadow-none qrcode-btn"
        onClick={() => handleSetScan()}
      >
        {expand}
      </button>
      {scan ? (
        <Scanner />
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            props.setUpdate(props.update + 1);
            props.handleFormClose();
          }}
        >
          {/* <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              id="itemName"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              required
            />
          </Form.Group> */}
          <FoodItemSearch handleFoodSearch={handleFoodSearch} />

          <div style={{ alignItems: "center" }}>
            <Button className="blue-btn shadow-none mt-3" type="submit">
              Done
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToInventory: (data) => dispatch(addToInventory(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToInventoryForm);
