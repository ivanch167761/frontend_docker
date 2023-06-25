import React from 'react'

type propsType = {
  setPayment: React.Dispatch<React.SetStateAction<string>>,
  totalPrice: number
}



const paymentMethods = [
  { id: 'PayPal', title: 'PayPal' },
  { id: 'transfer', title: 'Bank Transfer' },
  { id: 'creditCard', title: 'Credit Card' }
]

export default function Example(props: propsType) {
  return (
    <>

              <div>
                <label className="text-base font-medium text-gray-900">Payment method</label>
                <p className="text-sm leading-5 text-gray-500">How do you prefer to pay?</p>
                <fieldset className="mt-4 pb-8">
                  <legend className="sr-only">Payment method</legend>
                  <div className="space-y-4">
                    {paymentMethods.map((paymentMethod) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        <input
                          id={paymentMethod.id}
                          name="payment-method"
                          type="radio"
                          onChange={(e) => props.setPayment(e.target.id)}
                          defaultChecked={paymentMethod.id === 'PayPal'}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
    </>

  )
}
