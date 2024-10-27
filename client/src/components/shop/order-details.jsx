/** @format */

import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { DialogContent } from '../ui/dialog';

const ShoppingOrderDetailsView = () => {
	return (
		<DialogContent className='sm:max-w-[600px]'>
			<div className='grid gap-6'>
				<div className='grid gap-2'>
					<div className='flex mt-6 items-center justify-between'>
						<p className='font-medium'>Order Id</p>
						<Label>123456</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Order Date</p>
						<Label>13/08/2024</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Order Price</p>
						<Label>$300</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Order Status</p>
						<Label>In Process</Label>
					</div>
				</div>
				<Separator />
				<div className='gap-4 grid'>
					<div className='grid gap-2'>
						<div className='font-medium'>Order Details</div>
						<ul className='grid gap-3'>
							<li className='flex items-center justify-between'>
								<span>Product One</span>
								<span>$100</span>
							</li>
						</ul>
					</div>
				</div>
				<div className='gap-4 grid'>
					<div className='grid gap-2'>
						<div className='font-medium'>Shipping Info</div>
						<div className='grid gap-5 text-muted-foreground'>
							<span>John Doe</span>
							<span>Address</span>
							<span>City</span>
							<span>Phone</span>
							<span>Pincode</span>
							<span>notes</span>
						</div>
					</div>
				</div>
			</div>
		</DialogContent>
	);
};

export default ShoppingOrderDetailsView;