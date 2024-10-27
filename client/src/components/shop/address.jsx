/** @format */

import { addressFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import {
	addNewAddress,
	deleteAddress,
	editAddress,
	fetchAllAddresses,
} from '@/store/shop/address-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../common/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import AddressCard from './address-card';

const initialAddressForm = {
	address: '',
	city: '',
	phone: '',
	pincode: '',
	notes: '',
};

const Address = ({ setCurrentSelectedAddress }) => {
	const [formData, setFormData] = useState(initialAddressForm);
	const [currentEditedId, setCurrentEditedId] = useState(null);
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { addressList } = useSelector((state) => state.shopAddress);
	const { toast } = useToast();

	function handleManageAddress(event) {
		event.preventDefault();

		if (addressList.length >= 3 && currentEditedId === null) {
			setFormData(initialAddressForm);
			toast({
				title: 'You can add max 3 addresses',
				variant: 'destructive',
			});

			return;
		}

		currentEditedId !== null
			? dispatch(
					editAddress({
						userId: user?.id,
						addressId: currentEditedId,
						formData,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllAddresses(user?.id));
						setCurrentEditedId(null);
						setFormData(initialAddressForm);
						toast({
							title: 'Address updated successfully',
						});
					}
			  })
			: dispatch(
					addNewAddress({
						...formData,
						userId: user?.id,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllAddresses(user?.id));
						setFormData(initialAddressForm);
						toast({
							title: 'Address added successfully',
						});
					}
			  });
	}

	function handleDeleteAddress(getCurrentAddress) {
		console.log(getCurrentAddress, 'getCurrentAddress');

		dispatch(
			deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
		).then((data) => {
			if (data?.payload.success) {
				dispatch(fetchAllAddresses(user?.id));
				toast({
					title: 'Address deleted successfully',
				});
			}
		});
	}

	function handleEditAddress(getCurrentAddress) {
		setCurrentEditedId(getCurrentAddress?._id);
		setFormData({
			...formData,
			address: getCurrentAddress?.address,
			city: getCurrentAddress?.city,
			phone: getCurrentAddress?.phone,
			pincode: getCurrentAddress?.pincode,
			notes: getCurrentAddress?.notes,
		});
	}

	function isFormValid() {
		return Object.keys(formData)
			.map(
				(key) =>
					typeof formData[key] === 'string' && formData[key].trim() !== ''
			)
			.every((item) => item);
	}

	useEffect(() => {
		dispatch(fetchAllAddresses(user?.id));
	}, [dispatch]);

	return (
		<Card>
			<div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
				{addressList && addressList.length > 0
					? addressList.map((singleAddressItem) => (
							<AddressCard
								handleDeleteAddress={handleDeleteAddress}
								addressInfo={singleAddressItem}
								handleEditAddress={handleEditAddress}
								setCurrentSelectedAddress={setCurrentSelectedAddress}
							/>
					  ))
					: null}
			</div>
			<CardHeader>
				<CardTitle>
					{currentEditedId !== null ? 'Edit Address' : 'Add New Address'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-3'>
				<CommonForm
					formControls={addressFormControls}
					formData={formData}
					setFormData={setFormData}
					buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
					isBtnDisabled={!isFormValid()}
					onSubmit={handleManageAddress}
				/>
			</CardContent>
		</Card>
	);
};

export default Address;