import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits, InfiniteHits } from 'react-instantsearch-dom';

import { connect } from "react-redux";

import { Accordion, Card, Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import Image from "../../../../SubComponents/Image"
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { submitNotification } from "../../../../lib/Notifications";
import {Button, Modal } from "react-bootstrap";
import Stack from '@mui/material/Stack';
import { addToSupplyItems } from '../../../../../store/actions/supplierActions/supplierData';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
);

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([])
  const [showModal, setShow] = useState(false);


  const addToCart = (hit) => {
    setCart([...cart, hit]);
  };

  const removeFromCart = (item) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== item.id);
    setCart(hardCopy);
  };

  function notify(item){
		submitNotification(`${item}` + " added to cart");
	   }
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const cartItems = cart.map((item, index) => (
    <List>
      <ListItem
          key={`item${index}`}
          className="list"
          style={{ alignItems: "flex-end" }}
        >      
        <b>{`${item.productName}: `}  </b> &nbsp; {`${item.productCurrency} ${item.productPrice}`} &nbsp;
        {/* <input type="text" value={ingr.data} /> */}
        {/* <input type="submit" value="remove" onClick={() => removeFromCart(ingr)} /> */}
        <Tooltip title="Remove">
                    <IconButton
                      aria-label="Remove"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        removeFromCart(item)
                      }}
                    >
                      <HighlightOffIcon fontSize="50"/>
                    </IconButton>
                  </Tooltip>
      </ListItem>
    </List>
    ));

    const PurchaseItem = () => {

      cart.forEach((item) => {

        const cartList = item

        const data = {
  
          upload: {
           cartList,
            profile: props.profile,
            companyID: item.companyID,
            // FirstName: props.profile.firstName, 
            // LastName: props.profile.lastName,
            // Country: props.profile.country,
            // City: props.profile.city,
            // Email: props.profile.email,
            createdAt: new Date(),
            status: "pending"
  
          }
         
        };

        props.addToSupplyItems(data);

      })

      submitNotification("Thanks for placing your order with us", "We will contact local sustainable farmers and grocery shops and get back to you shortly with prices and delivery time");

    }


  return (
    <InstantSearch indexName="sales_dev" searchClient={searchClient}>
      <SearchBox onChange={(event) => setQuery(event.currentTarget.value)} />
      <InfiniteHits 
        hitComponent={(props) => <Hit {...props} cart={cart} setCart={setCart} addToCart={addToCart} notify={notify} profile={props.profile} PurchaseItem={PurchaseItem}/>}  hitsPerPage={10} 
      />
    </InstantSearch>
  );
};




const Hit = ({ hit, cart, setCart, addToCart, notify, PurchaseItem}) => {
  // const [cart, setCart] = useState([])
  const [showModal, setShow] = useState(false);

  const removeFromCart = (item) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== item.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((item, index) => (
    <List>
      <ListItem
          key={`item${index}`}
          className="list"
          style={{ alignItems: "flex-end" }}
        >      
        <b>{`${item.productName}: `}  </b> &nbsp; {`${item.productCurrency} ${item.productPrice}`} &nbsp;
        {/* <input type="text" value={ingr.data} /> */}
        {/* <input type="submit" value="remove" onClick={() => removeFromCart(ingr)} /> */}
        <Tooltip title="Remove">
                    <IconButton
                      aria-label="Remove"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        removeFromCart(item)
                      }}
                    >
                      <HighlightOffIcon fontSize="50"/>
                    </IconButton>
                  </Tooltip>
      </ListItem>
    </List>
    ));

    function handleAddToCart() {
      addToCart(hit);
      notify(hit.productName);
      console.log(cart)
    }

   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
      <Accordion>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                <p>{hit.dateCreated}</p>
                {hit.productName}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Card.Body>
                <div className="meal-box">
                <div className="ingredients">
                    <List
                    styles={{ paddingTop: 0, paddingBottom: 0, margin: 0, listStyle: "none" }}
                    >
                        <ListSubheader className="heading">
                            <div className="meal-name">{hit.productName}</div>
                            <div className="icons">

                            <Tooltip title="Add to cart">
                              <IconButton
                              aria-label="Add to cart"
                              sx={{ ml: 2 }}
                              onClick={() => {
                                handleAddToCart();
                              }}
                              >
                              <AddCircleOutlineIcon fontSize="25" />
                              </IconButton>
                            </Tooltip>
                            
                            </div>
                        </ListSubheader>
                        <ListItem
                        // key={`item${index}`}
                        className="list"
                        style={{ alignItems: "baseline" }}
                    >
                        <div>
                            <Image imageUrl={hit.imageURL} />
                            <p>
                            {hit.productDescription}
                            </p>
                            <p>
                            </p>
                            <p>
                            {hit.productCurrency} {hit.productPrice} 
                            </p>
                        </div>
                    </ListItem>
                    </List>

                    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
          PurchaseItem()
          setCart([])
          handleClose()
          }}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
     
                    
                </div>
                </div>
            </Card.Body>
            </Accordion.Collapse>
        </Card>
      </Accordion>
      <div className="admin_paginator">
					{/* <Paginator /> */}
					<Stack spacing={2} direction="row" style={{justifyContent: 'center'}}>
					<Button className="blue-btn shadow-none" type="submit"
					onClick={handleShow}>
						View Cart 
					</Button>
				</Stack>
				</div>
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
    addToSupplyItems: (data) => dispatch(addToSupplyItems(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);
