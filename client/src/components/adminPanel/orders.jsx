/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Dialog } from '../ui/dialog';
import AdminOrderDetailsView from './order-details';

export const AdminOrders = () => {
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order History</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Order Date</TableHead>
							<TableHead>Order Status</TableHead>
							<TableHead>Order Price</TableHead>
							<TableHead>
								<span className='sr-only'>Details</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>123456</TableCell>
							<TableCell>27/06/2024</TableCell>
							<TableCell>In Process</TableCell>
							<TableCell>$100</TableCell>
							<TableCell>
								<Dialog
									open={openDetailsDialog}
									onOpenChange={setOpenDetailsDialog}>
									<Button onClick={() => setOpenDetailsDialog(true)}>
										View Details
									</Button>
									<AdminOrderDetailsView />
								</Dialog>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
