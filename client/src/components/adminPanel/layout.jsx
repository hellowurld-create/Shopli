/** @format */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from './header';
import { AdminSideBar } from './sidebar';

export const AdminLayout = () => {
	const [openSidebar, setOpenSidebar] = useState(false);
	return (
		<div className='flex min-h-screen w-full'>
			{/* admin sidebar */}
			<AdminSideBar
				open={openSidebar}
				isOpen={setOpenSidebar}
			/>
			<div className='flex flex-1 flex-col'>
				{/* admin header */}
				<AdminHeader isOpen={setOpenSidebar} />
				<main className='bg-muted/40 flex-col flex-1 flex p-4 md:p-6'>
					<Outlet />
				</main>
			</div>
		</div>
	);
};
