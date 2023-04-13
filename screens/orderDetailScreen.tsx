import Example from '../components/orderDetail'
import React from 'react'
import { orderByIdDetail } from '../types/storeTypes'

export type propsType = {
  detail: orderByIdDetail
}

export function OrderDetailScreen(props: propsType) {
  return (
    <>
      <Example orderDetail={props.detail} />
    </>
  )
}
