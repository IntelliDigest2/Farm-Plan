import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { editPurchaseItem } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { submitNotification } from "../../../../../../lib/Notifications";

function EditPurchaseForm(props) {
  const [cart, setCart] = useState(props.cart);

  const handleSubmit = () => {
    const data = {
      id: props.id,
      upload: {
        cartList: cart,
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
                      supplier: ""
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
                      supplier: ""
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
              id="price"
              onChange={(e) => {
                setCart([
                  ...cart.slice(0, i),
                  {
                    data: item.data,
                    quantity: item.quantity,
                    measure: item.measure,
                    price: e.target.value,
                    supplier: ""
                  },
                  ...cart.slice(i + 1, cart.length),
                ]);
              }}
              placeholder="Enter price"             />
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
                    supplier: e.target.value
                  },
                  ...cart.slice(i + 1, cart.length),
                ]);
              }}
              placeholder="Name of supplier"             />
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
