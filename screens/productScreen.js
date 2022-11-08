import React from "react";
import Product from "../components/Product/Product";



function ProductScreen(props) {
  const { loading, error, product } = props.productDetails;

  const addToCartHandler = () => {
    console.log("Add to cart:", props.id);
    console.log("QTY:", props.counter);
  };
  console.log("productDetails from screen:");
  console.log(productDetails);
  return (
    <>
      {loading ? (
        <h2> loading</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
      <div>
        <Product
          productImg={product.image}
          productText={product.description}
          productTitle={product.name}
          productCountInStok={product.countInStock}
          counter={props.counter}
          dispatch={5}
          addToCartHandler={addToCartHandler}
        />
      </div>
      )}
    </>
  );
}

export default ProductScreen;


