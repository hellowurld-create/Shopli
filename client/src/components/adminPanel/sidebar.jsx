/** @format */

import { BadgeCheck, LayoutDashboard, Shield, ShoppingBag } from 'lucide-react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSideBarMenuItems = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icons: <LayoutDashboard />,
	},
	{
		id: 'products',
		label: 'Products',
		path: '/admin/products',
		icons: <ShoppingBag />,
	},
	{
		id: 'orders',
		label: 'Orders',
		path: '/admin/orders',
		icons: <BadgeCheck />,
	},
];

function MenuItems({ isOpen }) {
	const navigate = useNavigate();
	return (
		<nav className='mt-8 flex-col flex gap-8'>
			{adminSideBarMenuItems.map((menuItem) => (
				<div
					key={menuItem.id}
					onClick={() => {
						navigate(menuItem.path);
						isOpen ? isOpen(false) : null;
					}}
					className='flex text-sm items-center gap-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground px-3 py-2'>
					{menuItem.icons}
					<span>{menuItem.label}</span>
				</div>
			))}
		</nav>
	);
}

export const AdminSideBar = ({ open, isOpen }) => {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Sheet
				open={open}
				onOpenChange={isOpen}>
				<SheetContent
					side='left'
					className='w-64'>
					<div className='flex flex-col h-full'>
						<SheetHeader className='border-b'>
							<SheetTitle className='gap-2 flex  mt-4 mb-5'>
								<Shield size={30} />
								<h1 className='text-xl font-extrabold'>Admin Panel</h1>
							</SheetTitle>
						</SheetHeader>
						<MenuItems isOpen={isOpen} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className='hidden  flex-col w-64 border-r bg-background p-6 lg:flex'>
				<div
					onClick={() => navigate('/admin/dashboard')}
					className='flex items-center cursor-pointer gap-2'>
					<Shield size={30} />
					<h1 className='text-xl font-extrabold'>Admin Panel</h1>
				</div>
				<MenuItems />
			</aside>
		</Fragment>
	);
};
