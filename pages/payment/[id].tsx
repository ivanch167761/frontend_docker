import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Script from 'next/script'
import errorMessage from '../../components/errorMessage'
import userMessage from '../../components/userMessage'
import transferPayMessage from '../../components/transferMoneyMessage'
import getStore, {
  checkLoginStatus,
  getOrderItemDetail,
  selectError,
  selectUserDetail,
  selectOrderDetail,
  setOrderId,
  AppDispatch,
  setUser
} from '../../store'
import { children, MyForm } from '../../components/payForms'
import PaymentScreen from '../../screens/paymentScreen'
import { set } from 'immer/dist/internal'
declare global {
  interface Window {
    pay: (target: EventTarget) => void;
  }
}
type OrderDetail = ReturnType<typeof selectOrderDetail>;
type SubmitHandlerType = (e: React.FormEvent<HTMLFormElement>) => void;
interface MyFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  allow?: string;
}
function PayPage(){
  const dispatch:AppDispatch = useDispatch()
  const loginError = useSelector(selectError)
  const order_pay = useSelector(selectOrderDetail)
  const orderDetail: OrderDetail = useSelector(selectOrderDetail)
  const [show, setShow] = useState(false)
  const [showPaypal, setShowPaypal] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [payButton, setButton] = useState(<></>)
  const [payment, setPayment] = useState<string>('creditCard')
  const paypalMessage = 'В связи с нынешними обстоятельствами PayPal приостанавливает работу своего сервиса на территории Российской Федерации.'
  const [transferMessage, setTransferMessage] = useState<ReactNode>(<></>)
  useEffect(() => {
    dispatch(getOrderItemDetail(orderDetail._id))
    const script = document.createElement('script')
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'
    script.async = true
    script.onload = () => {
    }
    document.body.appendChild(script)
  },[dispatch, orderDetail._id])

  useEffect(() => {
    dispatch(checkLoginStatus())
    if (order_pay.totalPrice > 0){
    console.log("setting button")
    setTransferMessage(
        <>
          <div className='text-fuchsia-800 py-5'> Сделать банковский перевод, указав следующие данные: </div>
          <div className='border-black border-spacing-x-4 border-4 w-full p-2'>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Денежная сумма перевода:</dt>
                <dd className="text-gray-700">{order_pay.totalPrice}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Назначение перевода</dt>
                <dd className="text-gray-900">{`id_${order_pay._id}`}</dd>
              </div>
              </div>
        </>)

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (typeof window.pay === 'function') {
    window.pay(e.target);
  } else {
    console.error('Payment function not available on window object.');
  }
};


    setButton(
      <div>
          <p className='py-4'>Произвести оплату с помощью кредитной карты.</p>
      <button className='bg-black rounded-md object-center py-2 px-4 text-zinc-50' >
      <MyForm  allow="payment" name="TinkoffPayForm" onSubmit={handleSubmit}>{children(order_pay)}</MyForm>
      </button>
      </div>
      )}
  }, [dispatch, order_pay])

  useEffect(() => {
    loginError ? setShow(true) : console.log('')

  switch (payment){
    case 'transfer':
      console.log('trsnsfering')
      setShowCard(false)
      setShowTransfer(true)
      setShowPaypal(false)
      break
    case 'PayPal':
      console.log('paypaling')
      setShowCard(false)
      setShowTransfer(false)
      setShowPaypal(true)
      break
    case 'creditCard':
      console.log('credit card')
      setShowCard(true)
      setShowTransfer(false)
      setShowPaypal(false)
      break
    default:
      console.log('cant do')
      setShowCard(false)
      setShowTransfer(false)
      setShowPaypal(false)
      break
  }
  }, [loginError, payment])
  console.log(showTransfer)
  return(
  
  <>
      <PaymentScreen totalPrice={orderDetail.totalPrice} setPayment={setPayment}/>
      {transferPayMessage(payButton, showCard, setShowCard)}
      {transferPayMessage(transferMessage, showTransfer, setShowTransfer)}
      {transferPayMessage(paypalMessage, showPaypal, setShowPaypal)}
  </>

  )
  
}


export async function getServerSideProps(context) {
  const { id } = context.query
  const store = getStore()
  store.dispatch(setOrderId(id))
  return {
    props: {
      initialState: store.getState()
    }
  }
}



export default PayPage
