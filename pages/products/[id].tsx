import ProductScreen from "../../screens/productScreen";
import { useSelector } from "react-redux";

import getStore, {
  getProductDetail,
  selectProductDetail,
} from "../../store";

function DetailContainer() {
  const productData = useSelector(selectProductDetail);
  return (
     <ProductScreen id={1} productDetails={productData} /> 
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