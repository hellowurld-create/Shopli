/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/adminPanel/layout';
import { AuthLayout } from './components/auth/layout';
import CheckAuth from './components/common/check-auth';
import { ShopLayout } from './components/shop/layout';
import { AdminDashboard } from './pages/adminPanel/dashboard';
import { AdminFeatures } from './pages/adminPanel/features';
import { AdminOrders } from './pages/adminPanel/orders';
import { AdminProducts } from './pages/adminPanel/products';
import { AuthSignIn } from './pages/auth/signin';
import { AuthSignUp } from './pages/auth/signup';
import { NotFound } from './pages/not-found';
import { ShopAccount } from './pages/shop/account';
import { ShopCheckOut } from './pages/shop/checkout';
import { ShopHome } from './pages/shop/home';
import { ShopListing } from './pages/shop/listing';
import UnauthPage from './pages/unauth-page';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from './components/ui/skeleton';

function App() {
	const { user, isAuthenticated, isLoading } = useSelector(
		(state) => state.auth
	);
	console.log(isAuthenticated, isLoading, user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	if (isLoading) return <Skeleton className='w-[800] bg-black h-[600px]' />;

	return (
		<div className='flex flex-col overflow-hidden bg-white'>
			{/* Common component */}

			<Routes>
				<Route
					path='/auth'
					element={
						<CheckAuth
							isAuthenticated={isAuthenticated}
							user={user}>
							<AuthLayout />
						</CheckAuth>
					}>
					<Route
						path='signin'
						element={<AuthSignIn />}
					/>
					<Route
						path='signup'
						element={<AuthSignUp />}
					/>
				</Route>
				<Route
					path='/admin'
					element={
						<CheckAuth
							isAuthenticated={isAuthenticated}
							user={user}>
							<AdminLayout />
						</CheckAuth>
					}>
					<Route
						path='dashboard'
						element={<AdminDashboard />}
					/>
					<Route
						path='orders'
						element={<AdminOrders />}
					/>
					<Route
						path='products'
						element={<AdminProducts />}
					/>
					<Route
						path='features'
						element={<AdminFeatures />}
					/>
				</Route>

				<Route
					path='/shop'
					element={
						<CheckAuth
							isAuthenticated={isAuthenticated}
							user={user}>
							<ShopLayout />
						</CheckAuth>
					}>
					<Route
						path='home'
						element={<ShopHome />}
					/>
					<Route
						path='listing'
						element={<ShopListing />}
					/>
					<Route
						path='checkout'
						element={<ShopCheckOut />}
					/>
					<Route
						path='account'
						element={<ShopAccount />}
					/>
				</Route>

				<Route
					path='/unauth-page'
					element={<UnauthPage />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</div>
	);
}

export default App;
