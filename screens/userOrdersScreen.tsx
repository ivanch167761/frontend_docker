import Example from "../components/userOrders";
import React from "react";
import { orderByIdDetail } from "../types/storeTypes";

type propsType = {
	userOrders: [orderByIdDetail];
};
function userOrdersScreen(props: propsType) {
	return (
		<>
			<div className="bg-white">
				<div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
					<div className="max-w-xl">
						<p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
							ORDER HYSTORY:
						</p>
					</div>

					<Example userOrders={props.userOrders} />
				</div>
			</div>
		</>
	);
}
export default userOrdersScreen;
