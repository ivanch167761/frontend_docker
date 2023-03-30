import UserOrdersScreen from "../../screens/userOrdersScreen";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import getStore, {
	selectUserOrders,
	getUserOrders,
	checkLoginStatus,
	AppDispatch,
} from "../../store";

function UserOrdersContainer() {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		dispatch(checkLoginStatus());
		dispatch(getUserOrders());
	}, []);

	const userOrders = useSelector(selectUserOrders);
	return (
		<>
			<UserOrdersScreen userOrders={userOrders} />
		</>
	);
}

export async function getServerSideProps() {
	const store = getStore();
	return {
		props: {
			initialState: store.getState(),
		},
	};
}

export default UserOrdersContainer;
