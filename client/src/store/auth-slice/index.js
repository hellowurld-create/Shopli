/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
	error: null, // Add error state
};

// Thunk to register a user
export const registerUser = createAsyncThunk(
	'auth/signup', // Note the slice name 'auth'
	async (FormData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/auth/signup', // Ensure this is correct
				FormData,
				{
					withCredentials: true,
				}
			);
			return response.data;
		} catch (error) {
			// Return a rejected value with a custom error message
			return rejectWithValue(
				error.response?.data?.message || 'Registration failed'
			);
		}
	}
);

// Thunk to login a user
export const loginUser = createAsyncThunk(
	'auth/signin', // Note the slice name 'auth'
	async (FormData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/auth/signin', // Ensure this is correct
				FormData,
				{
					withCredentials: true,
				}
			);
			return response.data;
		} catch (error) {
			// Return a rejected value with a custom error message
			return rejectWithValue(
				error.response?.data?.message || 'Registration failed'
			);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'/auth/logout',

	async () => {
		const response = await axios.post(
			'http://localhost:3000/api/auth/logout',
			{},
			{
				withCredentials: true,
			}
		);

		return response.data;
	}
);

export const checkAuth = createAsyncThunk(
	'auth/checkauth', // Note the slice name 'auth'
	async () => {
		try {
			const response = await axios.get(
				'http://localhost:3000/api/auth/check-auth', // Ensure this is correct
				{
					withCredentials: true,
					headers: {
						'Cache-Control':
							'no-store, no-cache, must-revalidate, proxy-revalidate',
					},
				}
			);
			return response.data;
		} catch (error) {
			// Return a rejected value with a custom error message
			return error.response?.data?.message || 'Registration failed';
		}
	}
);

// Slice to handle authentication state
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null; // Reset error state
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
				state.error = null; // Clear error state
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = action.payload; // Set error state with rejection payload
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null; // Reset error state
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.success ? action.payload.user : null;
				state.isAuthenticated = action.payload.success;
				state.error = null; // Clear error state
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = action.payload; // Set error state with rejection payload
			})
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
				state.error = null; // Reset error state
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.success ? action.payload.user : null;
				state.isAuthenticated = action.payload.success;
				state.error = null; // Clear error state
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = action.payload; // Set error state with rejection payload
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
