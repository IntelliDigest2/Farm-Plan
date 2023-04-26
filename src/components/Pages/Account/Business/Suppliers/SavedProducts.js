import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from 'react-i18next';


import ProductBox from "./ProductBox";
import { connect } from "react-redux";
import { getProducts} from "../../../../../store/actions/supplierActions/supplierData";
const SavedProducts = (props) => {

  const { t } = useTranslation();

  const [sProducts, setSProducts] = useState([]);



  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    props.getProducts();
  }, [update]);

  

  const updateSProducts = async () => {
    //clears the meals array before each update- IMPORTANT
    setSProducts([]);

    //sets a new meal object in the array for every document with this date attached
    props.Products.forEach((doc) => {
      var productName = doc.productName;
      var productDescription = doc.productDescription;
      var id = doc.id;
      var productCurrency = doc.productCurrency;
      var productPrice = doc.productPrice;
      var productMeasure = doc.productMeasure;
      var productQty = doc.productQty

      setSProducts((sProducts) => [
        ...sProducts,
        {
          productName: productName,
          productDescription: productDescription,
          productCurrency: productCurrency,
          id: id,
          productPrice: productPrice,
          productMeasure: productMeasure,
          productQty: productQty,
        },
      ]);
    });
  };

  useEffect(() => {
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    updateSProducts();
    console.log("Saved Meals", sProducts);
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.Products]);

  return (
    <>
      <div className="row">
        <div className="col-8 basic-title-left mb-3">My available products listing</div>
      </div>
      <div className="saved-meals">
        <ProductBox
          forceUpdate={forceUpdate}
          onChange={props.onChange}
          products={sProducts}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Products: state.supplier.savedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (saved) => dispatch(getProducts(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedProducts);
