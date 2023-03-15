import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import ScannerInventory from "../../../../../../SubComponents/QRCode/ScannerInventory";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";
import { foodIdAPI, nutritionAPI } from "./InputRecipe/NutritionApi";
import { submitNotification } from "../../../../../../lib/Notifications";

import { connect } from "react-redux";
import { addToShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";

const AddMealFormShop = (props) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState("+ scan from barcode");
  const [show, setShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [err, setErr] = useState("");


  const defaultLocal = {
    food: "",
    quantity: 0,
    measure: "g", 
    foodId: "",
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
    }
  };

  const handleFoodSearch = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, food: e.target.textContent });
    } else {
      setLocal({ ...local, food: e.target.value });
    }
  };

  //when local.food changes, fetch the id for the food item
  //which is needed to fetch nutrition
  const setFoodId = (foodId) => {
    setLocal({ ...local, foodId: foodId });
  };


  //control modal
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
  }

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //fired when click "done"
  const handleSubmit = () => {
    const data = {      
      week: props.value.format("w"),
      upload: {
        ingredient: {
          food: local.food + " " + local.quantity + "" + local.measure,
          data: local.food,
          measure: local.measure,
          quantity: local.quantity,
          week: props.value.format("w"),
          createdAt: new Date()

        }
      },
    }; 

    props.addToShoppingList(data);
    // props.createMealPlanData(data);
    submitNotification("Success", "Item added to Shopping List!");
    forceUpdate();
  };

  const handleSetScan = () => {
    setScan(!scan);
    if (scan) {
      setExpand("+ scan from barcode");
    } else {
      setExpand("- input manually");
    }
  };

  useEffect(() => {
    forceUpdate()
  }, []);

  return (
    <div>
      {/* <button
        className="btn success shadow-none qrcode-btn"
        onClick={() => handleSetScan()}
      >
        {expand}
      </button> */}
      {scan ? (
        <ScannerInventory handleFormClose={handleFormClose}/>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            props.handleFormClose();
          }}
        >
          
        <FoodItemSearch handleFoodSearch={handleFoodSearch} />
        <Form.Group>
        <Form.Label>Amount</Form.Label>
        <InputGroup>
          <Form.Control
            id="quantity"
            type="number"
            min="0"
            step=".1"
            onChange={(e) => handleLocal(e)}
            value={local.quantity}
          />
          <Dropdown
            id="measure"
            styling="grey dropdown-input"
            data={local.measure}
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups", "units", "pcs", "oz", "lbs"]}
            function={(e) => {
              setLocal({ ...local, measure: e });
            }}
          />
        </InputGroup>
      </Form.Group>

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
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMealFormShop);

