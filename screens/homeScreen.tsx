
import ProductList from "../components/productList";
import React from "react";
function HomeScreen(props) {
    
  const productList= props.productList;
  return (
    <>
      {productList.loading ? (
        <h2> loading... </h2>
      ) : productList.error ? (
        <h3>{productList.error}</h3>
      ) : (
        <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
          <div className="container">
            <div className="flex flex-wrap -mx-4 max-h-10">
              {productList.map((product) => (
                <ProductList
                  key={product._id}
                  productListTitle={product.name}
                  productListImg={product.image}
                  productListDesctiption={product.description}
                  productListBtn={product.price + "$"}
                  productLink={`/products/${product._id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default HomeScreen;
