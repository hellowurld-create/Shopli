/** @format */

import ProductFilter from '@/components/shop/filter';
import ProductDetailsDialog from '@/components/shop/productDetails';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sortOptions } from '@/config';
import {
	fetchAllFilteredProducts,
	fetchProductDetails,
} from '@/store/shop/products-slice';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ShopProductTile from './product-tile';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

function createSearchParamsHelper(filterParams) {
	const queryParams = [];

	for (const [key, value] of Object.entries(filterParams)) {
		if (Array.isArray(value) && value.length > 0) {
			const paramValue = value.join(',');

			queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
		}
	}

	console.log(queryParams, 'queryParams');

	return queryParams.join('&');
}

export const ShopListing = () => {
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState(null);

	const dispatch = useDispatch();
	const { productList, productDetails } = useSelector(
		(state) => state.ShopProducts
	);
	const { user } = useSelector((state) => state.auth);
	const [searchParams, setSearchParams] = useSearchParams();
	const [openDetailsDialog, setopenDetailsDialog] = useState(false);

	const { toast } = useToast();

	function handleSort(value) {
		console.log(value);
		setSort(value);
	}

	function handleFilter(getSectionId, getCurrentOption) {
		console.log(getSectionId, getCurrentOption);
		let copyFilters = { ...filters };
		const indexOfCurrentSection =
			Object.keys(copyFilters).indexOf(getSectionId);

		if (indexOfCurrentSection === -1) {
			copyFilters = {
				...copyFilters,
				[getSectionId]: [getCurrentOption],
			};
		} else {
			const indexOfCurrentOption =
				copyFilters[getSectionId].indexOf(getCurrentOption);

			if (indexOfCurrentOption === -1)
				copyFilters[getSectionId].push(getCurrentOption);
			else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
		}

		setFilters(copyFilters);
		sessionStorage.setItem('filters', JSON.stringify(copyFilters));
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

	//fetch list of products
	useEffect(() => {
		if (filters !== null && sort !== null)
			dispatch(
				fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
			);
	}, [dispatch, sort, filters]);

	useEffect(() => {
		setSort('price-lowtohigh');
		setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
	}, []);

	useEffect(() => {
		if (filters && Object.keys(filters).length > 0) {
			const createQueryString = createSearchParamsHelper(filters);
			setSearchParams(new URLSearchParams(createQueryString));
		}
	}, [filters]);

	useEffect(() => {
		if (productDetails !== null) setopenDetailsDialog(true);
	}, [productDetails]);

	// console.log(productDetails, 'productDetails');

	return (
		<div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
			<ProductFilter
				filters={filters}
				handleFilter={handleFilter}
			/>

			<div className='w-full rounded-lg shadow-sm bg-background'>
				<div className='p-4 border-b flex items-center justify-between'>
					<h2 className='text-lg font-bold'>All Products</h2>
					<div className='flex items-center gap-3'>
						<span className='text-muted-foreground'>
							{productList?.length} Products
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									size='sm'
									className='flex items-center gap-1'>
									<ArrowUpDownIcon className='h-4 w-4' />
									<span>Sort by</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='w-[200px]'
								align='end'>
								<DropdownMenuRadioGroup
									value={sort}
									onValueChange={handleSort}>
									{sortOptions.map((sortItem) => (
										<DropdownMenuRadioItem
											value={sortItem.id}
											key={sortItem.id}>
											{sortItem.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4'>
					{productList && productList.length > 0
						? productList.map((productItem) => (
								<ShopProductTile
									product={productItem}
									handleGetProductDetails={handleGetProductDetails}
									handleAddToCart={handleAddToCart}
								/>
						  ))
						: null}
				</div>
			</div>

			<ProductDetailsDialog
				open={openDetailsDialog}
				setOpen={setopenDetailsDialog}
				productDetails={productDetails}
			/>
		</div>
	);
};
