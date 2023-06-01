import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../SubComponents/Button.css"
import Scanner from "../../../../SubComponents/QRCode/Scanner";
import FoodItemSearch from "../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/FoodItemSearch";
import { connect } from "react-redux";
import { addToRestaurantShoppingList } from "../../../../../store/actions/marketplaceActions/restaurantShoppingListData";
const AddToRSLForm = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState(""); //
  const [itemMeasure, setItemMeasure] = useState(""); // 

  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState("+ scan from barcode");

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      upload: {
        item: itemName,
        quantity: itemQty,  // 
        measure: itemMeasure,  // 

      },
    };

    props.addToRestaurantShoppingList(data);
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
    console.log("item:", itemName, "quantity:", itemQty, "measure", itemMeasure); // 
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
          
          <input name  = "quantity"
           type = "number" 
           value = {itemQty} 
           label="Quantity"
           onChange = {(e) => setItemQty(e.target.value)}
           sx={{ width: "100%", lineHeight: "calc(1.5em + .75rem + 2px)" }}
           />  {/*   */}

           <input name  = "measure"
           type = "text" 
           value={itemMeasure}
           label = "Unit" 
           onChange={(e) => setItemMeasure(e.target.value)}
           sx={{ width: "100%", lineHeight: "calc(1.5em + .75rem + 2px)" }}
           />  {/*   */}

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
    addToRestaurantShoppingList: (data) => dispatch(addToRestaurantShoppingList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToRSLForm);
