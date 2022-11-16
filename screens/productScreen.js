import React from "react";
import Product from "../components/Product/Product";



function ProductScreen(props) {


  const productDetail = props.productDetails;
  const addToCartHandler = () => {
    console.log("Add to cart:", productDetail.productD._id);
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
          addToCartHandler={addToCartHandler}
          qtyDown={props.qtyDown}
          qtyUp={props.qtyUp}
        />
      </div>
      )}
    </>
  );
}

export default ProductScreen;


