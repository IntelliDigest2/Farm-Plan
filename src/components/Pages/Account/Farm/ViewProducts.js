import React, { useEffect, useState } from "react";

import { PageWrap } from "../../SubComponents/PageWrap";
import { Card } from "../../SubComponents/Card";

import { getFirestoreData } from "../../../../store/actions/dataActions";
import { connect } from "react-redux";

export function ViewProducts(props) {
  const [myProducts, setMyProducts] = useState([]);

  //fetches all product data
  function fetchProducts() {
    var data = {
      masterCollection: "marketplace",
      collection: "products",
      uid: props.auth.uid,
    };
    props.getFirestoreData(data);
  }

  //this sends data request
  useEffect(() => {
    if (props.data.length <= 0) fetchProducts();
  }, []);

  useEffect(() => {
    sortProducts();
  }, [props.data]);

  const sortProducts = async () => {
    props.data.forEach((doc) => {
      var id = doc.id;
      var food = doc.food;
      var category = doc.category;
      var weight = doc.weight[0];
      var unit = doc.weight[1];
      var producedLocally = doc.producedLocally;
      var price = doc.price[0];
      var currency = doc.price[1];
      var expires = doc.expires;
      var comment = doc.comment;

      setMyProducts((myProducts) => [
        ...myProducts,
        {
          id: id,
          food: food,
          category: category,
          weight: weight,
          unit: unit,
          producedLocally: producedLocally,
          price: price,
          currency: currency,
          expires: expires,
          comment: comment,
        },
      ]);
    });
  };

  return (
    <PageWrap goTo="/account" header="Sell Products" subtitle="My Products">
      {myProducts.map((product) => (
        <Card styling="product" key={product.id}>
          <p>{product.food}</p>
          <p>
            {product.weight} {product.unit}
          </p>
          <p>{product.category}</p>
          <p> expiry date: {product.expires}</p>
          <p>
            {product.currency} {product.price}
          </p>
          {/* if produced locally have a lil tick thing */}
          <p>{product.comment}</p>
        </Card>
      ))}
    </PageWrap>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirestoreData: (product) => dispatch(getFirestoreData(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
