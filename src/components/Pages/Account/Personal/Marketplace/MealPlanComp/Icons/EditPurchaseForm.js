import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { editPurchaseItem } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { submitNotification } from "../../../../../../lib/Notifications";
import DatePicker from "react-datepicker";
import moment from "moment";


function EditPurchaseForm(props) {
  const [cart, setCart] = useState(props.cart);
  const [date, setDate] = useState(new Date())

  const handleSubmit = () => {
    const data = {
      id: props.id,
      upload: {
        cartList: cart,
        deliveryDate: date
      },
    };
    props.editPurchaseItem(data);
    submitNotification("Success", " Item has been edited!");

  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >

      {cart.map((item, i) => (
        <div className="form" key={i}>
          <Form.Group>
            <Form.Label>Edit Items</Form.Label>
            <Form.Control
              type="text"
              id="data"
              onChange={(e) => {
                setCart([
                  ...cart.slice(0, i),
                  {
                    data: e.target.value,
                    quantity: item.quantity,
                    measure: item.measure,
                    price: 0,
                    currency: "$",
                    supplier: ""
                  },
                  ...cart.slice(i + 1, cart.length),
                ]);
              }}
              defaultValue={item.data}
            />
          </Form.Group>
         
          <Form.Group>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step=".1"
                onChange={(e) => {
                  setCart([
                    ...cart.slice(0, i),
                    {
                      data: item.data,
                      quantity: e.target.value,
                      measure: item.measure,
                      price: 0,
                      supplier: "",
                    },
                    ...cart.slice(i + 1, cart.length),
                  ]);
                }}
                defaultValue={item.quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={item.measure}
                items={["g", "kg", "/", "mL", "L", "cups", "pcs"]}
                function={(e) =>
                  setCart([
                    ...cart.slice(0, i),
                    {
                      data: item.data,
                      quantity: item.quantity,
                      measure: e,
                      price: 0,
                      supplier: "",
                    },
                    ...cart.slice(i + 1, cart.length),
                  ])
                }
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
          <InputGroup>
              <Form.Control
                id="price"
                type="number"
                min="0"
                step="1"
                onChange={(e) => {
                  setCart([
                    ...cart.slice(0, i),
                    {
                      data: item.data,
                      quantity: item.quantity,
                      measure: item.measure,
                      price: e.target.value,
                      currency: "$",
                      supplier: "",
                    },
                    ...cart.slice(i + 1, cart.length),
                  ]);
                }}
                defaultValue={item.price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={item.currency}
                items={["$", "€", "£"]}
                function={(e) =>
                  setCart([
                    ...cart.slice(0, i),
                    {
                      data: item.data,
                      quantity: item.quantity,
                      measure: item.measure,
                      price: item.price,
                      currency: e,
                      supplier: "",
                    },
                    ...cart.slice(i + 1, cart.length),
                  ])
                }
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              id="supplier"
              onChange={(e) => {
                setCart([
                  ...cart.slice(0, i),
                  {
                    data: item.data,
                    quantity: item.quantity,
                    measure: item.measure,
                    price: 0,
                    supplier: e.target.value,
                  },
                  ...cart.slice(i + 1, cart.length),
                ]);
              }}
              placeholder="Name of supplier"             />
          </Form.Group>

          <Form.Group>
          <Form.Label>Delivery Date</Form.Label>
          <DatePicker 
          type="text"
          id="deliveryDate"
          selected={date} 
          onChange={(e) => {
            setDate(e)
          }}
          dateFormat="dd/MM/yyyy"  
          />
          </Form.Group> 
         
         

        </div>
      ))}

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn" type="submit">
          Done
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPurchaseItem: (data) => dispatch(editPurchaseItem(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPurchaseForm);
