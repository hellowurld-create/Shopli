/** @format */

import { CommonForm } from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
	email: '',
	password: '',
};

export const AuthSignIn = () => {
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const { toast } = useToast();
	const { isLoading } = useSelector((state) => state.auth); // Added isLoading state for button disable

	function onSubmit(event) {
		event.preventDefault();
		dispatch(loginUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: 'Success',
					description: data?.payload?.message,
					status: 'success',
				});
				// Navigate to the login page upon successful registration
				// navigate('/auth/signin');
			} else {
				toast({
					title: 'Error',
					description: data?.payload?.message || 'Email already in use',
					status: 'error',
					variant: 'destructive',
				});
			}
		});
	}

	return (
		<div className='w-full mx-auto max-w-md space-y-6'>
			<div className='text-center'>
				<div className='font-bold text-3xl tracking-tight text-foreground'>
					Login to your account
				</div>
				<p className='mt-2'>
					<span className='inline-block'>Don&apos;t have an account?</span>
					<Link
						className='font-medium ml-2 text-primary hover:underline inline-block'
						to={'/auth/signup'}>
						Register
					</Link>
				</p>
			</div>
			<CommonForm
				formControls={loginFormControls}
				buttonText={isLoading ? 'Creating Account...' : 'Create Account'} // Show loading state
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
				disabled={isLoading} // Disable the button while submitting
			/>
		</div>
	);
};
