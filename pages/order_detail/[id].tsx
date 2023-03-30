import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { OrderDetailScreen } from '../../screens/orderDetailScreen'
import getStore, {
  checkLoginStatus, getOrderItemDetail, setOrderId, selectOrderDetail, AppDispatch, RootState 
} from '../../store'
import { orderByIdDetail } from '../../types/storeTypes'

function OrderDetailContainer () {
  type OrderDetail = ReturnType<typeof selectOrderDetail>;
  const dispatch: AppDispatch = useDispatch();
  const orderDetail:OrderDetail = useSelector(selectOrderDetail);

  useEffect(() => {
    dispatch(checkLoginStatus())
    dispatch(getOrderItemDetail(orderDetail._id))
  }, [])
  return (<OrderDetailScreen detail={orderDetail as orderByIdDetail} />)
}

export async function getServerSideProps (context) {
  const { id } = context.query
  const store = getStore()
  store.dispatch(setOrderId(id))
  {/*await store.dispatch(getOrderItemDetail(id))*/}

  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default OrderDetailContainer
