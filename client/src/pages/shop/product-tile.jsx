/** @format */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { brandOptionsMap, categoryOptionsMap } from '@/config';
import React from 'react';

const ShopProductTile = ({
	product,
	handleGetProductDetails,
	handleAddToCart,
}) => {
	return (
		<Card className='w-full max-w-sm mx-auto cursor-pointer'>
			<div
				className=''
				onClick={() => handleGetProductDetails(product?._id)}>
				<div className='relative'>
					<img
						src={product?.image}
						alt={product?.title}
						className='w-full h-[300px] object-cover rounded-t-lg'
					/>
					{product?.salePrice > 0 ? (
						<Badge
							className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>
							Sale
						</Badge>
					) : null}
				</div>
				<CardContent className='p-4'>
					<h3 className='text-xl mb-2 font-bold'>{product?.title}</h3>
					<div className='flex justify-between items-center mb-2'>
						<span className='text-muted-foreground text-sm'>
							{categoryOptionsMap[product?.category]}
						</span>
						<span className='text-muted-foreground text-sm'>
							{brandOptionsMap[product?.brand]}
						</span>
					</div>
					<div className='flex justify-between items-center mb-2'>
						<span
							className={`${
								product.salePrice > 0 ? 'line-through' : ''
							} text-primary text-lg font-semibold`}>
							${product?.price}
						</span>

						{product?.salePrice > 0 ? (
							<span className='text-primary text-lg font-semibold'>
								${product?.salePrice}
							</span>
						) : null}
					</div>
				</CardContent>
			</div>
			<CardFooter>
				<Button
					onClick={() => handleAddToCart(product?._id)}
					className='w-full'>
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ShopProductTile;
