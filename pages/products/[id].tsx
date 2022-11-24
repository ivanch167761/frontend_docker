import ProductScreen from "../../screens/productScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getStore, {
  getProductDetail,
  selectProductDetail,
  selectProductQty,
  setQty,
  addToCart,
  selectCart,
  setCart

} from "../../store";

function DetailContainer() {
  const dispatch = useDispatch();
  const [cartStore, setCartStore] = useState('')
  useEffect(() => {
  // Perform localStorage action
  const cartStorage = localStorage.getItem('cartItemsList')
  const setInitialCart = () => dispatch(setCart(cartStorage))
  setInitialCart();
}, [dispatch])

  const qtyUp = ()=>dispatch(setQty(qtyProduct+1));
  const qtyDown = ()=>dispatch(setQty(qtyProduct-1));
  const toCart = ()=>dispatch(addToCart({item:productData.productD, qty:qtyProduct}));
  const cart = useSelector(selectCart);
  const qtyProduct=useSelector(selectProductQty);
  const productData = useSelector(selectProductDetail);
  return (
     <ProductScreen id={1} 
     productDetails={productData} 
     qtyUp={qtyUp} 
     qtyDown={qtyDown} 
     counter={qtyProduct}
     cart={cart}
     addToCart={toCart}
     />
  );
}

export async function getServerSideProps(context) {

  const { id } = context.query;
  const store = getStore();

  await store.dispatch(getProductDetail(id));
  return {
    props: {
      initialState: store.getState(),
    },
  };
}

export default DetailContainer;
