import React, { ReactNode, FormEvent } from "react";
import {User, orderByIdDetail} from "../types/storeTypes"
type MyFormProps = {
  children: ReactNode;
  allow: string;
  name: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const children = (order: orderByIdDetail) => {
  console.log(order.totalPrice)
  console.log(order.user.name)
  console.log(order.orderItems)
  return(
  <>
   <input type="hidden" name="terminalkey" value={"TinkoffBankTest"} />
   <input type="hidden" name="frame" value="true" />
   <input type="hidden" name='amount' value={`${order.totalPrice}`} />
   <input type="hidden" name="language" value="ru" />
   <input type="hidden" name="order" value={order._id+48} />
   <input type="hidden" name="description" value={new Date().toLocaleString()} />
   <input type="hidden" name="name" value={`${order.user.name}`} />
   <input type="hidden" name="email" value={`${order.user.email}`} />
   <input type="hidden" name="phone" value='1654987' />
   <input type="submit" value="Оплатить" />
  </>)
}



export function MyForm(props:MyFormProps){
  return(
    <form {...props}>
      {props.children}
    </form>
    )
}
