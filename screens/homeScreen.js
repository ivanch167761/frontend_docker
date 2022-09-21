
import ProductList from "../components/productList";
import React from "react";
function HomeScreen(props) {
    
  const { error, loading, products } = props.productList;
  return (
    <>
      {loading ? (
        <h2> loading</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
          <div className="container">
            <div className="flex flex-wrap -mx-4 max-h-10">
              {products.map((product) => (
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
