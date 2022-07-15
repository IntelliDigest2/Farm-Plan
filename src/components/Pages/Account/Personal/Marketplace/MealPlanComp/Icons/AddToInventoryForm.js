import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

const AddToInventoryForm = (props) => {

    const [itemName, setItemName] = useState("");

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


    return (
        <div>
            <Form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                props.setUpdate(props.update + 1);
                props.handleFormClose();
                }}
            >
                <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                    type="text"
                    id="itemName"
                    onChange={(e) => {
                        setItemName(e.target.value);
                    }}
                    required
                    />
                </Form.Group>

                <div style={{ alignItems: "center" }}>
                    <Button className="blue-btn shadow-none" type="submit">
                    Done
                    </Button>
                </div>
            </Form>
        </div>
    )
}

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