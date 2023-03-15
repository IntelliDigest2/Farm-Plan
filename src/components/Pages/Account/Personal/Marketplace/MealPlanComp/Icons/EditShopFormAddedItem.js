import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { editInventoryData } from "../../../../../../../store/actions/marketplaceActions/inventoryData"
import DatePicker from "react-datepicker";
import moment from "moment";
import { editShoppingListDataAddedItems } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";


function EditShopFormAddedItem(props) {
  const [food, setFood] = useState(props.food);
  const [item, setItem] = useState(props.data);
  const [quantity, setQuantity] = useState(props.quantity);
  const [measure, setMeasure] = useState(props.measure);


  const handleSubmit = () => {
    const data = {
      // day: props.value.format("DD"),
     week: props.week,
      id: props.id,
      upload: {
        id: props.id,
        ingredient: {
          food: food,
          data: item,
          quantity: quantity,
          measure: measure,
          week: props.week,
          updatedAt: new Date()
        }
      }, 
    };

    //console.log("---->>>", data.upload)

    props.editShoppingListDataAddedItems(data)
    
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >
      <Form.Group>
        <Form.Label>Ingredient</Form.Label>
        <Form.Control
          type="text"
          id="food"
          defaultValue={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
      </Form.Group>

      {/* <Form.Group>
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control
          type="text"
          id="expiry"
          selected={ExpiryDate}
          onChange={(e) => {
            setExpiryDate(e.target.selected);
          }}
        />
      </Form.Group> */}

      <Form.Group>
        <Form.Label>Weight/volume - Meal plan</Form.Label>
        <InputGroup>
          <Form.Control
            id="quantity"
            type="number"
            min="0"
            step=".1"
            defaultValue={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Dropdown
            id="measure"
            styling="grey dropdown-input"
            data={measure}
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups", "units"]}
            function={(e) => {
              setMeasure(e)
              }
            }
            //onChange={(e) => setMeasure(e)}
          />
        </InputGroup>
      </Form.Group>

     
     
      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn" type="submit">
          Done
        </Button>
      </div>
    </Form>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    editShoppingListDataAddedItems: (data) => dispatch(editShoppingListDataAddedItems(data)),   
  };
};

export default connect(null, mapDispatchToProps)(EditShopFormAddedItem);
