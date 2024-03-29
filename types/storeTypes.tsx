export interface Product {
	_id: number;
	category: string;
	user: string;
	name: string;
	image: string;
	brand: string;
	description: string;
	price: number;
	countInStock: number;
	createdAt: string;
}

//__________PRODUCT LIST__________
export type ProductListState = {
	productList: Product[];
	search: string;
	filteredProduct: Product[];
	loading: boolean;
	error: string | null;
};
export const initialProductListState: ProductListState = {
	productList: [],
	filteredProduct: [],
	search: "SEARCH",
	loading: false,
	error: null,
};
//__________END PRODUCT LIST__________

//______PRODUCT DETAIL______
export type ProductDetailtState = {
	product: Product;
	available: boolean;
	error: string | null;
	loading: boolean;
	qty: number;
};
export const initialProductDetailState: ProductDetailtState = {
	product: {
		_id: 1,
		category: "category",
		user: "string",
		name: "string",
		image: "string",
		brand: "string",
		description: "string",
		price: 0,
		countInStock: 1000,
		createdAt: "string",
	},
	available: false,
	error: null,
	loading: false,
	qty: 1,
};
//______END PRODUCT DETAIL______

//_______________CART_______________
export interface cartItem {
	product_ID: Product["_id"];
	qty: number;
}
export interface cartItemDetail extends Product {
	qty: number | null;
}

export interface cartItemsState {
	cartItemsDetailList: cartItemDetail[] | null;
	cartItemsList: cartItem[];
	cartTotalProductPrice: number;
	loading: boolean;
	error: string | null;
}
export const initialCartItemsState: cartItemsState = {
	cartItemsDetailList: [],
	cartItemsList: [],
	cartTotalProductPrice: 0,
	loading: false,
	error: null,
};

/* export const defaultItemDetail: cartItemDetail = {
  cartProductDetail: {
    _id: 1,
    category: 'category',
    user: 'string',
    name: 'string',
    image: 'string',
    brand: 'string',
    description: 'string',
    price: 'string',
    countInStock: 1000,
    createdAt: 'string'
  },
  qty: 0,
  error: false,
  loading: false
} */

// export const initialCartItem: cartItem = {
//   product_ID: 1,
//   qty: 2
// }

//_______________END CART_______________

//_______________USER LOGIN PROFILE_______________
export interface User {
	_id: number;
	username: string;
	email: string;
	name: string;
	isAdmin: boolean;
}
export interface LoginState {
	loading: boolean;
	error: string | null;
	user: User | null;
}
export const initialLoginState: LoginState = {
	loading: false,
	error: null,
	user: null,
};
//_______________USER LOGIN PROFILE_______________

//_______________MAKE ORDER______________________________
export interface makeOrderItem {
	name: string;
	address: string;
	city: string;
	country: string;
	postcode: number | null;
	phoneNumber: number | null;
	comment: string;
	payment: string;
	shippingOption: string;
}
export interface makeOrder {
	makeOrderDetail: makeOrderItem;
	error: string | null;
	loading: boolean;
}
export const initialMakeOrderState: makeOrder = {
	makeOrderDetail: {
		name: "",
		address: "",
		city: "",
		country: "",
		postcode: null,
		phoneNumber: null,
		comment: "",
		payment: "PayPal",
		shippingOption: "standard",
	},
	error: null,
	loading: false,
};
//_______________END MAKE ORDER______________________________
//

//_______________GET ORDER BY ID______________________________
export type shippingAddressType =
	| {
			_id: number;
			address: string;
			city: string;
			postalCode: string;
			country: string;
			shippingPrice: string;
			order: number;
	  }
	| boolean;
export interface orderByIdDetail {
	_id: number;
	orderItems: [
		{
			_id: number;
			name: string;
			qty: string;
			price: string;
			image: string;
			product: number;
			order: number;
		},
	];
	shippingAddress: shippingAddressType;
	user: {
		id: number;
		_id: number;
		username: string;
		email: string;
		name: string;
		isAdmin: boolean;
	};
	paymentMethod: string;
	taxPrice: string;
	shippingPrice: string;
	totalPrice: string;
	isPaid: boolean;
	paidAt: null;
	isDelivered: boolean;
	deliveredAt: null;
	createdAt: string;
}
export const initialOrderByIdDetail: orderByIdDetail = {
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
};
export interface OrderByIdState {
	orderByIdDetail: orderByIdDetail;
	error: string | null;
	loading: boolean;
}
export const initialOrderByIdState: OrderByIdState = {
	orderByIdDetail: initialOrderByIdDetail,
	error: null,
	loading: false,
};
export interface userOrdersState {
	userOrders: [orderByIdDetail];
	error: string | null;
	loading: boolean;
}
export const initialUserOrdersState: userOrdersState = {
	userOrders: [initialOrderByIdDetail],
	error: null,
	loading: false,
};
