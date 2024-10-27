/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	productList: [],
	productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
	'/products/fetchAllProducts',
	async ({ filterParams, sortParams }) => {
		console.log(fetchAllFilteredProducts, 'fetchAllFilteredProducts');

		const query = new URLSearchParams({
			...filterParams,
			sortBy: sortParams,
		});

		const result = await axios.get(
			`http://localhost:3000/api/shop/products/get?${query}`
		);

		console.log(result);

		return result?.data;
	}
);

export const fetchProductDetails = createAsyncThunk(
	'/products/fetchProductDetails',
	async (id) => {
		console.log(fetchAllFilteredProducts, 'fetchAllFilteredProducts');

		const result = await axios.get(
			`http://localhost:3000/api/shop/products/get/${id}`
		);

		return result?.data;
	}
);

const shopProductSlice = createSlice({
	name: 'shopProducts',
	initialState,
	reducers: {
		setProductDetails: (state) => {
			state.productDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllFilteredProducts.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllFilteredProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.productList = [];
			})
			.addCase(fetchProductDetails.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchProductDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productDetails = action.payload.data;
			})
			.addCase(fetchProductDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.productList = null;
			});
	},
});

export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer;