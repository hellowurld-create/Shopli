/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	fetchAllFilteredProducts,
	fetchProductDetails,
} from '@/store/shop/products-slice';
import {
	Airplay,
	BabyIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CloudLightning,
	Heater,
	Images,
	Shirt,
	ShirtIcon,
	ShoppingBasket,
	UmbrellaIcon,
	WashingMachine,
	WatchIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import ShopProductTile from './product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shop/productDetails';

const categoriesWithIcon = [
	{ id: 'men', label: 'Men', icon: ShirtIcon },
	{ id: 'women', label: 'Women', icon: CloudLightning },
	{ id: 'kids', label: 'Kids', icon: BabyIcon },
	{ id: 'accessories', label: 'Accessories', icon: WatchIcon },
	{ id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
];

const brandWithIcon = [
	{ id: 'nike', label: 'Nike', icon: Shirt },
	{ id: 'adidas', label: 'Adidas', icon: WashingMachine },
	{ id: 'puma', label: 'Puma', icon: ShoppingBasket },
	{ id: 'levi', label: "Levi's", icon: Airplay },
	{ id: 'zara', label: 'Zara', icon: Images },
	{ id: 'h&m', label: 'H&M', icon: Heater },
];

export const ShopHome = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [openDetailsDialog, setopenDetailsDialog] = useState(false);

	const dispatch = useDispatch();
	const { productList, productDetails } = useSelector(
		(state) => state.ShopProducts
	);
	const { user } = useSelector((state) => state.auth);
	const { toast } = useToast();
	const navigate = useNavigate();

	const slides = [bannerOne, bannerTwo, bannerThree];

	function handleNavigateToListingPage(getCurrentItem, section) {
		sessionStorage.removeItem('filters');
		const currentFilter = {
			[section]: [getCurrentItem.id],
		};

		sessionStorage.setItem('filters', JSON.stringify(currentFilter));
		navigate('/shop/listing');
	}

	function handleGetProductDetails(getCurrentProductId) {
		console.log(getCurrentProductId);
		dispatch(fetchProductDetails(getCurrentProductId));
	}

	function handleAddToCart(getCurrentProductId) {
		console.log(getCurrentProductId);

		dispatch(
			addToCart({
				userId: user?.id,
				productId: getCurrentProductId,
				quantity: 1,
			})
		).then((data) => {
			if (data?.payload.success) {
				dispatch(fetchCartItems(user?.id));
				toast({
					title: 'Added to Cart',
					description: 'Product added successfully',
				});
			}
		});
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		dispatch(
			fetchAllFilteredProducts({
				filterParams: {},
				sortParams: 'price-lowtohigh',
			})
		);
	}, [dispatch]);

	useEffect(() => {
		if (productDetails !== null) setopenDetailsDialog(true);
	}, [productDetails]);

	console.log(productList, 'productList');

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='relative w-full h-[600px] overflow-hidden'>
				{slides.map((slide, index) => (
					<img
						src={slide}
						key={index}
						className={`${
							index === currentSlide ? 'opacity-100' : 'opacity-0'
						} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
					/>
				))}
				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setCurrentSlide(
							(prevSlide) => (prevSlide - 1 + slides.length) % slides.length
						)
					}
					className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
					<ChevronLeftIcon className='w-4 h-4' />
				</Button>

				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
					}
					className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
					<ChevronRightIcon className='w-4 h-4' />
				</Button>
			</div>
			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-8'>
						Shop by category
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
						{categoriesWithIcon.map((categoryItem, i) => (
							<Card
								onClick={() =>
									handleNavigateToListingPage(categoryItem, 'category')
								}
								key={i}
								className='cursor-pointer hover:shadow-lg transition-shadow'>
								<CardContent className='flex items-center justify-center flex-col p-6'>
									<categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
									<span className='font-semibold'>{categoryItem.label}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-8'>
						Shop by brands
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
						{brandWithIcon.map((brandItem, i) => (
							<Card
								onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
								key={i}
								className='cursor-pointer hover:shadow-lg transition-shadow'>
								<CardContent className='flex items-center justify-center flex-col p-6'>
									<brandItem.icon className='w-12 h-12 mb-4 text-primary' />
									<span className='font-semibold'>{brandItem.label}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-8'>
						Featured Products
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{productList && productList.length > 0
							? productList.map((productItem, i) => (
									<ShopProductTile
										product={productItem}
										handleGetProductDetails={handleGetProductDetails}
										handleAddToCart={handleAddToCart}
									/>
							  ))
							: null}
					</div>
				</div>
			</section>
			<ProductDetailsDialog
				open={openDetailsDialog}
				setOpen={setopenDetailsDialog}
				productDetails={productDetails}
			/>
		</div>
	);
};
