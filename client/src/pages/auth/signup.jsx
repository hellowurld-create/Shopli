/** @format */

import { CommonForm } from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Added selector
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
	userName: '',
	email: '',
	password: '',
};

export const AuthSignUp = () => {
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();
	const { isLoading } = useSelector((state) => state.auth); // Added isLoading state for button disable

	// Form submission handler
	function onSubmit(event) {
		event.preventDefault();
		// Dispatch the registerUser action
		dispatch(registerUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: 'Success',
					description: data?.payload?.message,
					status: 'success',
				});
				// Navigate to the login page upon successful registration
				navigate('/auth/signin');
			} else {
				toast({
					title: data?.payload?.message,
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
					Create new account
				</div>
				<p className='mt-2'>
					<span className='inline-block'>Already have an account?</span>
					<Link
						className='font-medium ml-2 text-primary hover:underline inline-block'
						to={'/auth/signin'}>
						Login
					</Link>
				</p>
			</div>

			{/* Form component */}
			<CommonForm
				formControls={registerFormControls}
				buttonText={isLoading ? 'Creating Account...' : 'Create Account'} // Show loading state
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
				disabled={isLoading} // Disable the button while submitting
			/>
		</div>
	);
};
