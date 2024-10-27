/** @format */

import { useToast } from '@/hooks/use-toast';
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cart-slice';
import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';

const CartItemContent = ({ cartItem }) => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { toast } = useToast();

	function handleCartItemDelete(getCartItem) {
		dispatch(
			deleteCartItem({ userId: user.id, productId: getCartItem.productId })
		).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: 'Cart item deleted successfully',
				});
			}
		});
	}

	function handleUpdateQuantity(getCartItem, typeOfAction) {
		dispatch(
			updateCartQuantity({
				userId: user?.id,
				productId: getCartItem?.productId,
				quantity:
					typeOfAction === 'plus'
						? getCartItem?.quantity + 1
						: getCartItem?.quantity - 1,
			})
		).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: 'Cart item updated successfully',
				});
			}
		});
	}
	return (
		<div className='flex items-center space-x-4'>
			<img
				src={cartItem?.image}
				alt={cartItem?.title}
				className='w-20 h-20 rounded-md object-cover'
			/>
			<div className='flex-1'>
				<h3 className='font-extrabold'>{cartItem?.title}</h3>
				<div className='flex mt-1 gap-1 items-center'>
					<Button
						variant='outline'
						size='icon'
						className='rounded-full h-7 w-7'
						disabled={cartItem?.quantity === 1}
						onClick={() => handleUpdateQuantity(cartItem, 'minus')}>
						<Minus className='w-4 h-4' />
						<span className='sr-only'>Decrease</span>
					</Button>
					<span className='font-semibold'>{cartItem?.quantity}</span>
					<Button
						variant='outline'
						size='icon'
						className='rounded-full h-7 w-7'
						onClick={() => handleUpdateQuantity(cartItem, 'plus')}>
						<Plus className='w-4 h-4' />
						<span className='sr-only'>Decrease</span>
					</Button>
				</div>
			</div>
			<div className='flex flex-col items-end'>
				<p className='font-semibold'>
					$
					{(
						(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem.price) *
						cartItem?.quantity
					).toFixed(2)}
				</p>
				<Trash
					className='cursor-pointer mt-1'
					size={18}
					onClick={() => handleCartItemDelete(cartItem)}
				/>
			</div>
		</div>
	);
};

export default CartItemContent;
