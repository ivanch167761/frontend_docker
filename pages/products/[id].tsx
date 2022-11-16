import ProductScreen from "../../screens/productScreen";
import { useDispatch, useSelector } from "react-redux";
import getStore, {
  getProductDetail,
  selectProductDetail,
  selectProductQty,
  setQty,

} from "../../store";

function DetailContainer() {
  const dispatch = useDispatch();
  const qtyUp = ()=>dispatch(setQty(qtyProduct+1))
  const qtyDown = ()=>dispatch(setQty(qtyProduct-1))
  const qtyProduct=useSelector(selectProductQty);
  const productData = useSelector(selectProductDetail);
  return (
     <ProductScreen id={1} productDetails={productData} qtyUp={qtyUp} qtyDown={qtyDown} counter={qtyProduct}/>
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