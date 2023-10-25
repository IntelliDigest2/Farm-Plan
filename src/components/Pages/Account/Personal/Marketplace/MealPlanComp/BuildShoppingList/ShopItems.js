import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Alert, Table, Modal } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList, getShoppingListUpdate } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { addToShoppingListUpdate } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { addToPurchaseItems, getInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { getAllItems, getPlanData } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
// import { addToPurchaseItems } from "../../../../../../../store/actions/dataActions";
import { useTranslation, Trans } from 'react-i18next';

import BoughtItemIcon from "../Icons/BoughtItemIcon";
import AddToCartIcon from "../Icons/AddToCartIcon";
import Edit from "../Icons/EditIconShop";
import EditAddedItems from "../Icons/EditIconShopAddedItems";
import Checkbox from '@mui/material/Checkbox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { submitNotification } from "../../../../../../lib/Notifications";
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import "./ShopItems.css"

const { nanoid } = require('nanoid');

function ShopItems(props) {
  
  // console.log("All hail props", props)

  const { t } = useTranslation();

// Function to generate a random code using uuid
function generateRandomCode() {
  // Generate a random 5-character code using nanoid
  return nanoid(6);
}

  const [list, setList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showModal, setShow] = useState(false);
  const [showModalList, setShowList] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [clicked, setClicked] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState('delivery'); 
  const [address, setAddress] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cartIsEmpty, setCartIsEmpty] = useState(true);

  //this sends data request
  useEffect(() => {
    props.getInventory();
  }, [props.value, props.update]);

  useEffect(() => {
    forceUpdate()
  }, [props.data]);

  const getInventoryList = async () => {
    //clears the items array before each update- IMPORTANT
    setInventory([]);

    //sets a new item object in the array for every document
    props.inventory.forEach((doc) => {
      // id is the docref for deletion
      var item = doc.item;
      var measure = doc.measure;
      var quantity = doc.quantity;

      setInventory((list) => [
        ...list,
        {
          item: item,
          quantity: quantity,
          measure: measure,
        },
      ]);
    });
  };

  //this sends data request
  useEffect(() => {
    getInventoryList();
    //console.log("xx======>>>>>", inventory)
  }, [props.update]);

  //trigger this when editing/deleting items
 const [update, setUpdate] = useState(0);
 
 const forceUpdate = () => {
   setUpdate(update + 1);
 };

 function notify(ingr){
  submitNotification(`${ingr}` + " added to cart");
 }

 function Refresh() {
  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          aria-label="Refresh"
          sx={{ ml: 2 }}
          onClick={() => {
            forceUpdate();
            submitNotification("Refreshing..");
          }}
        >
          <SyncIcon style={{ fontSize: 35 }} 
          />
        </IconButton>
      </Tooltip>
  </>
  );
 }

 const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [cart, setCart] = useState([]);


const addToCart = (ingr) => {
  setCart([...cart, ingr]);
  setCartIsEmpty(false);
  };

  const removeFromCart = (ingr) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== ingr.id);
    setCart(hardCopy);
    };

  const cartItems = cart.map((ingr, index) => (
    <List>
      <ListItem
          key={`ingr${index}`}
          className="list"
          style={{ alignItems: "flex-end" }}
        >      
        <b>{`${ingr.data}: `}  </b> &nbsp; {`${ingr.quantity} ${ingr.measure}`} &nbsp;
        {/* <input type="text" value={ingr.data} /> */}
        {/* <input type="submit" value="remove" onClick={() => removeFromCart(ingr)} /> */}
        <Tooltip title="Remove">
                    <IconButton
                      aria-label="Remove"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        removeFromCart(ingr)
                      }}
                    >
                      <HighlightOffIcon fontSize="50"/>
                    </IconButton>
                  </Tooltip>
      </ListItem>
    </List>
    ));

    const PurchaseItem = () => {

      const cartList = cart
  
      const data = {
  
        upload: {
         cartList,
          profile: props.profile,
          // FirstName: props.profile.firstName, 
          // LastName: props.profile.lastName,
          // Country: props.profile.country,
          // City: props.profile.city,
          // Email: props.profile.email,
          date: props.value.format("YYYY/MM/DD"),
          status: "pending",
          delivery_option: deliveryOption, // Add delivery option to the data
          address: deliveryOption === 'delivery' ? address : "", // Add address if delivery is chosen
          phone_number: phoneNumber,
          delivery_code: generateRandomCode(),
        }
       
      };

      props.addToPurchaseItems(data);
    submitNotification(
    "Thanks for placing your order with us", 
    "We will contact local sustainable farmers and grocery shops and get back to you shortly with prices and delivery time");

    }

    const AllPurchaseItem = () => {

      const firstList = allList
      const secondList = newList 

      const combinedList = [...firstList, ...secondList]; 
  
      const data = {
  
        upload: {
          cartList: combinedList,
          profile: props.profile,
          // FirstName: props.profile.firstName, 
          // LastName: props.profile.lastName,
          // Country: props.profile.country,
          // City: props.profile.city,
          // Email: props.profile.email,
          date: props.value.format("YYYY/MM/DD"),
          status: "pending"
        }
       
      };

      props.addToPurchaseItems(data);
    submitNotification("Order Successful", "You will be contacted shortly..");

    }
  

useEffect(() => {
  console.log("cart", cart);
}, [cart]);

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD-MM-yyyy"),
    };
    props.getPlanData(data);
  }, [props.value, update]);

  //const year = props.value.format("YYYY")

  useEffect(() => {
    const data = {
      week: props.value.format("w"),
    };

    props.getShoppingList(data);
    props.getShoppingListUpdate(data);
  }, [props.value, update]);

  // shopping list added by user using the add button
  const ShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setAllList([]);

    //sets a new meal object in the array for every document with this date attached
    props.UpdatedShoppingList.forEach((doc) => {

      
      //id is the docref for deletion
      var id = doc.id;
      var food = doc.ingredient.food;
      var data = doc.ingredient.data;
      var quantity = doc.ingredient.quantity;
      var measure = doc.ingredient.measure;
      var week = doc.ingredient.week;

      setAllList((list) => [
        ...list,
        {
          food: food,
          data: data,
          measure: measure,
          quantity: quantity,
          week: week,
          id: id,
        },
      ]);
    });
  };

  // shopping list from ingredient of generated meal plan
  const newShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setNewList([]);

    //sets a new meal object in the array for every document with this date attached
    props.newShoppingList.forEach((doc) => {

      //id is the docref for deletion
      var id = doc.id;
      var food = doc.ingredient.food;
      var data = doc.ingredient.data
      var quantity = doc.ingredient.quantity;
      var measure = doc.ingredient.measure;
      var week = doc.ingredient.week;

      setNewList((list) => [
        ...list,
        {
          food: food,
          data: data,
          measure: measure,
          quantity: quantity,
          week: week,
          id: id,
        },
      ]);
    });
  };


  useEffect(() => {
    ShoppingList();
    newShoppingList();
  }, [props.UpdatedShoppingList, props.newShoppingList]);


  const updateShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    if (props.newPlans == undefined || props.newPlans == '' ) return (<div><p>Loading...</p></div>)


    //sets a new meal object in the array for every document with this date attached
    props.newPlans.forEach((doc ) => {

      const items = doc.ingredients

      items.forEach((data) => {
        //we dont need the ID from the food item yet since we are not relating them
        //var id = doc.id
        var start = moment(doc.start).utc().format('YYYY-MM-DD')
        var item = data.food
        var quantity = data.quantity;
        var measure = data.measure;

        setList((list) => [
          ...list,
          {
            week: moment(start, "YYYY-MM-DD").week(),
            data: item,
            food: item + " " + quantity + " " + measure,
            measure: measure,
            quantity: quantity,
          },
        ]);
      })
        
    });
  };

  useEffect(() => {
    updateShoppingList();
  }, [props.newPlans, update]);

  function getFilteredProducts() {
    return list.filter(product => {
      const week = props.value.format("w")
    
      return week == product.week;
    });
  }

  useEffect(() => {
    getFilteredProducts();
  }, [props.newPlans]);
 
// filter products based on similar meal name
const result = Object.values(
  getFilteredProducts().reduce((acc, item) => {
    acc[item.data] = acc[item.data]
      ? { ...item, quantity: item.quantity + acc[item.data].quantity }
      : item;
    return acc;
  }, {})
);

//setNewResult(result)
//console.log("difference =>", result);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //modal for generate new shopping list
  const handleCloseList = () => setShowList(false);
  const handleShowList = () => setShowList(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Close = () => {
    setOpen(false);
  };


  function test() {
    let check = [];

   const diff = result.filter(({ data: id1 }) => !inventory.some(({ item: id2 }) => id2 === id1));

    // console.log("checked the common:",diff);

    diff.forEach(data => { check.push(data)})

    result.forEach(opt => {
      inventory.forEach(item => {
        if (opt.data == item.item) {
          check.push({
            data: opt.data,
            food: opt.food,
            measure: opt.measure,
            quantity: opt.quantity - item.quantity,
            week: opt.week
          }) 
        }
      });
    });        

    setShoppingList(check)

    // console.log("checkked ther loop bruh:",check);

  }

  useEffect(() => {
    test();
  }, [props.newPlans]);
  //add item to new shopping list
const addToList = () => {

  const data = {

    week: props.value.format("w"),
    upload: {
      result: shoppingList
    },
  };
    props.addToShoppingListUpdate(data)
    setShow(false);
  }
 

  return (
    <>
     <Button className="blue-btn shadow-none" variant="contained" onClick={handleClickOpen}>
      {t('description.button_all')} 
     </Button>
      <Refresh />

      {newList.length ? (
        <>
          <List>
            {allList.map((ingr, index) => (
              <ListItem
                key={`ingr${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>
                  {ingr.data} {ingr.quantity} {ingr.measure}
                    </p>
                    <br />

                </div>
                <div style={{ marginLeft: "20px" }}>
                  
                </div>
                <div className="button">

                  {/* <AddToCartIcon 
                   item={ingr.data}
                   measure={ingr.measure}
                   quantity={ingr.quantity}
                  />  */}
                  <Tooltip title="Add to cart">
                    <IconButton
                      aria-label="Add to cart"
                      sx={{ ml: 2 }}
                      onClick={(e) => {
                        addToCart(ingr)
                        notify(ingr.data);
                        e.target.disabled = true;
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="25" />
                    </IconButton>
                  </Tooltip>


                  <BoughtItemIcon 
                   value={props.value}
                   food={ingr.food}
                   item={ingr.data}
                   id={ingr.id}
                   measure={ingr.measure}
                   quantity={ingr.quantity}
                   update={update}
                   setUpdate={setUpdate}
                  /> 

                  <EditAddedItems
                    value={props.value}
                    food={ingr.food}
                    data={ingr.data}
                    week={ingr.week}
                    id={ingr.id}
                    measure={ingr.measure}
                    quantity={ingr.quantity}
                    update={update}
                    setUpdate={setUpdate}
                  /> 


                  
                  
                  {/* <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                    */}
                </div>
              </ListItem>
            ))}
          </List>

          <List>
            {newList.map((ingr, index) => (
              <ListItem
                key={`ingr${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>
                    {ingr.data} {ingr.quantity} {ingr.measure}
                    </p>
                    <br />


                </div>
                <div style={{ marginLeft: "20px" }}>
                  
                </div>
                
                <div className="button">
                
                  <Tooltip title="Add to cart">
                    <IconButton
                      aria-label="Add to cart"
                      sx={{ ml: 2 }}
                      onClick={(e) => {
                        addToCart(ingr)
                        notify(ingr.data);
                        e.target.disabled = true;
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="25" />
                    </IconButton>
                  </Tooltip>

                  <BoughtItemIcon 
                    value={props.value}
                    food={ingr.food}
                    item={ingr.data}
                    id={ingr.id}
                    measure={ingr.measure}
                    quantity={ingr.quantity}
                    update={update}
                    setUpdate={setUpdate}
                  /> 
                  <Edit
                    value={props.value}
                    food={ingr.food}
                    data={ingr.data}
                    week={ingr.week}
                    id={ingr.id}
                    measure={ingr.measure}
                    quantity={ingr.quantity}
                    update={update}
                    setUpdate={setUpdate}
                  /> 
                  {/* <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                    */}
                </div>
              </ListItem>
            ))}
          </List>

          <Stack spacing={2} direction="row" style={{justifyContent: 'center'}}>
            <Button className="blue-btn shadow-none" type="submit"
              onClick={handleShow}>
                {t('description.button_view_cart')} 
            </Button>

            <Button className="blue-btn shadow-none" variant="contained" onClick={handleClickOpen}>
              {t('description.button_all')} 
            </Button>
          </Stack>

          
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.list_of_items')} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cartItems.length > 0 ? (
              <>
                {/* Render cart items if the cart is not empty */}
                {cartItems}
                <div>
                  <input
                    type="radio"
                    id="delivery"
                    value="delivery"
                    checked={deliveryOption === 'delivery'}
                    onChange={() => setDeliveryOption('delivery')}
                  />
                  <label htmlFor="delivery">Delivery</label>

                  <input
                    type="radio"
                    id="pickup"
                    value="pickup"
                    checked={deliveryOption === 'pickup'}
                    onChange={() => setDeliveryOption('pickup')}
                    required  // Add the required attribute

                  />
                  <label htmlFor="pickup">Pickup</label>
                </div>

                <div>
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required  // Add the required attribute

                  />
                </div>

                {deliveryOption === 'delivery' && (
                  <>
                    <div>
                      <label htmlFor="address">Delivery Address:</label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              // Display a message when the cart is empty
              <p>Your cart is empty.</p>
            )}
          </Modal.Body>

        <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            if (!cartIsEmpty && phoneNumber && (deliveryOption !== 'delivery' || (deliveryOption === 'delivery' && address))) {
              PurchaseItem();
              setCart([]);
              handleClose();
            }
          }}
          disabled={cartIsEmpty || !phoneNumber || (deliveryOption === 'delivery' && !address)}
        >
          {t('description.button_confirm')}
        </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('description.button_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="empty basic-title-left">
          <p>{t('description.regenerate_shop_list')}</p>
          <Button className="blue-btn shadow-none" type="submit"
            onClick={handleShowList}>
              {t('description.button_generate')}
          </Button>

          <Modal show={showModalList} onHide={handleCloseList}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.generate_shop_list')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            {t('description.generate_new_list')}
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=> {
          addToList()
          submitNotification("Generating new list..");

          }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" onClick={handleCloseList}>
            {t('description.button_no')}
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Order Request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {t('description.order_food_items')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Close}>{t('description.button_cancel')}</Button>
          <Button onClick={() => {
            AllPurchaseItem()
            Close()
          }} 
            autoFocus>
            {t('description.button_yes')}
          </Button>
        </DialogActions>
      </Dialog>
          
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list yet :( please refresh page{t('description.list_of_items')}</p>
          <Button className="blue-btn shadow-none" type="submit"
            onClick={handleShow}>
              Generate{t('description.list_of_items')}
          </Button>

          <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.no_items_shop')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            {t('description.generate_new_list')}
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=> {
          addToList()
          submitNotification("Generating new list..");
          }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('description.button_no')}
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    UpdatedShoppingList: state.mealPlan.shoppingList,
    newShoppingList: state.mealPlan.newShoppingList,
    shoppingList: state.mealPlanner.allItems,
    newPlans: state.mealPlanner.newPlans,
    profile: state.firebase.profile,
    inventory: state.mealPlan.inventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingList: (product) => dispatch(getShoppingList(product)),
    getShoppingListUpdate: (product) => dispatch(getShoppingListUpdate(product)),
    getAllItems: (plan) => dispatch(getAllItems(plan)),
    addToShoppingListUpdate: (data) => dispatch(addToShoppingListUpdate(data)),
    getPlanData: (plan) => dispatch(getPlanData(plan)),
    addToPurchaseItems: (data) => dispatch(addToPurchaseItems(data)),
    getInventory: (item) => dispatch(getInventory(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);