import React from "react";
import Link from "next/dist/client/link";
import { orderByIdDetail } from "../types/storeTypes";
type propsType = {
	userOrders: [orderByIdDetail];
};

const uuu = [
	{
		_id: 0,
		orderItems: [
			{
				_id: 0,
				name: "",
				qty: "",
				price: "",
				image: "",
				product: 0,
				order: 0,
			},
		],
		shippingAddress: false,
		user: {
			id: 0,
			_id: 0,
			username: "",
			email: "",
			name: "",
			isAdmin: false,
		},
		paymentMethod: "",
		taxPrice: "",
		shippingPrice: "",
		totalPrice: "",
		isPaid: false,
		paidAt: null,
		isDelivered: false,
		deliveredAt: null,
		createdAt: "",
	},
];

export default function Example(props: propsType) {
	//const orders = props.userOrders;
	const orders = props.userOrders;
	return (
		<div className="mt-10 border-t border-gray-200">
			<h2 className="sr-only">Your order</h2>
			<h3 className="sr-only">Items</h3>
			{orders ? (
				orders.map((order) => (
					<div
						key={order._id}
						className="py-10 border-b border-gray-200 flex space-x-6"
					>
						<div className="flex-auto flex flex-col">
							<div>
								<h4 className="font-medium text-gray-900">
									<Link
										href={`https://localhost:3001/order_detail/${order._id}`}
									>
										{order.createdAt}
									</Link>
								</h4>
								<p className="mt-2 text-sm text-gray-600">{order.isPaid}</p>
							</div>
							<div className="mt-6 flex-1 flex items-end">
								<dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
									<div className="flex">
										<dt className="font-medium text-gray-900">date:</dt>
										<div className='px-4'>
											<span className='outline-none text-center bg-gray-300 inline-block w-10 font-semibold hover:text-black items-center text-gray-700'>
												{order.createdAt}
											</span>
										</div>
									</div>
									<div className="pl-4 flex sm:pl-6">
										<dt className="font-medium text-gray-900">price</dt>
										<dd className="ml-2 text-gray-700">{order.totalPrice}</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				))
			) : (
				<div>NO ORDERS FOUND</div>
			)}
		</div>
	);
}
