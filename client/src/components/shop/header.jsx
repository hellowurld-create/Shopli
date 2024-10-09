/** @format */

import { shoppingViewHeaderMenuItems } from '@/config';
import { HousePlug, Menu, ShoppingBag } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';

function MenuItems() {
	return (
		<nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
			{shoppingViewHeaderMenuItems.map((menuItem) => (
				<Link
					key={menuItem.id}
					to={menuItem.path}
					className='text-sm cursor-pointer font-medium'>
					{menuItem.label}
				</Link>
			))}
		</nav>
	);
}

function headerRightContent() {
	return (
		<div className='flex lg:flex-row flex-col gap-4 lg:items-center'>
			<Button
				variant='outline'
				size='icon'>
				<ShoppingBag className='h-6 w-6' />
				<span className='sr-only'>User cart</span>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild></DropdownMenuTrigger>
			</DropdownMenu>
		</div>
	);
}

export const ShopHeader = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background'>
			<div className='flex h-16 justify-between items-center px-4 md:px-6'>
				<Link
					className='flex items-center gap-2'
					to={'/shop/home'}>
					<HousePlug className='h-6 w-6' />
					<span className='font-bold'>Shopli</span>
				</Link>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='lg:hidden'>
							<Menu className='h-6 w-6' />
							<span className='sr-only'>Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent
						side='left'
						className='w-full max-w-xs'>
						<MenuItems />
					</SheetContent>
				</Sheet>
				<div className='hidden lg:block'>
					<MenuItems />
				</div>
				{isAuthenticated ? <div></div> : null}
			</div>
		</header>
	);
};
