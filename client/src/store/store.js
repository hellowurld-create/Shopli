/** @format */

import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './admin/products-slice';
import authReducer from './auth-slice';
import shopAddressSlice from './shop/address-slice';
import shopCartSlice from './shop/cart-slice';
import ShopProductSlice from './shop/products-slice';
import ShopOrderSlice from './shop/order-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: AdminProductSlice,

		ShopProducts: ShopProductSlice,
		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
		shopOrder: ShopOrderSlice,
	},
});

export default store;
