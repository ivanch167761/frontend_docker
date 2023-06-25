import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { OrderDetailScreen } from '../../../screens/orderDetailScreen'
import getStore, {
  checkLoginStatus, getOrderItemDetail,setIsPaid, setOrderId, setTracking, selectOrderDetail, AppDispatch, RootState, setIsDelivered
} from '../../../store'
import { orderByIdDetail } from '../../../types/storeTypes'

function OrderDetailContainer() {
  type OrderDetail = ReturnType<typeof selectOrderDetail>;
  const dispatch: AppDispatch = useDispatch()
  const orderDetail: OrderDetail = useSelector(selectOrderDetail)
  const [trackingNumber, setTrackingNumber] = useState<string>('')


  useEffect(() => {
    dispatch(checkLoginStatus())
    dispatch(getOrderItemDetail(orderDetail._id))
  },  [dispatch, orderDetail._id])



  return (<>

  <OrderDetailScreen detail={orderDetail as orderByIdDetail} />
<div className='border-2 border-blue-500 border-spacing-2 border-dotted justify-start '>
<button className='bg-green-500' onClick={dispatch(()=>setIsPaid(orderDetail._id))}>SET IS PAID</button>
<button className='bg-yellow-500' onClick={dispatch(()=>setIsDelivered(orderDetail._id))}>SET IS PAID</button>
<div>
<input
  className='text-base leading-normal text-gray-600 dark:text-white mt-2 border-2 border-blue-500 border-spacing-2 '
  type='text'
  onChange={(e) => setTrackingNumber(e.target.value)}
  placeholder={'Set Tracking Number'}
/>
<button className='bg-blue-500' onClick={dispatch(()=>setTracking(orderDetail._id, trackingNumber))}>APPLY TRACKING NUMBER</button>
</div>
</div>
  </>
  )


}

export async function getServerSideProps(context) {
  const { id } = context.query
  const store = getStore()
  store.dispatch(setOrderId(id))
  { /* await store.dispatch(getOrderItemDetail(id)) */ }

  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default OrderDetailContainer
