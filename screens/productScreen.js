import React from "react";
import Product from "../components/Product/Product";



function ProductScreen(props) {
  const productDetail = props.productDetails;
  console.log(props.productDetails)
  console.log(productDetail);


  const addToCartHandler = () => {
    console.log("Add to cart:", props.id);
    console.log(productDetail);
  };

  return (
    <>
      {productDetail.loading ? (
        <h2> loading</h2>
      ) : productDetail.error ? (
        <h3>{error}</h3>
      ) : (
      <div>
        <Product
          productImg={productDetail.productD.image}
          productText={productDetail.productD.description}
          productTitle={productDetail.productD.name}
          productCountInStok={productDetail.productD.countInStock}
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


