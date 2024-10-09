/** @format */

import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

const ImageUpload = ({
	imageFile,
	setImageFile,
	imageLoadingState,
	uploadedImageUrl,
	setUploadedImageUrl,
	setImageLoadingState,
	isEditMode,
}) => {
	const inputRef = useRef(null);

	console.log(isEditMode, 'isEditMode');

	function handleImageChange(event) {
		console.log(event.target.files);
		const selectedFile = event.target.files?.[0];
		if (selectedFile) setImageFile(selectedFile);
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDropOver(event) {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) setImageFile(droppedFile);
	}

	function handleRemoveImage() {
		setImageFile(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}

	async function uploadImageToCloudinary() {
		setImageLoadingState(true);
		const data = new FormData();
		data.append('my_file', imageFile);
		const response = await axios.post(
			'http://localhost:3000/api/admin/products/upload-image',
			data
		);
		console.log('response', response);
		if (response.data?.success) {
			setUploadedImageUrl(response.data.result.url);
			setImageLoadingState(false);
		}
	}

	useEffect(() => {
		if (imageFile !== null) uploadImageToCloudinary();
	}, [imageFile]);

	return (
		<div className='w-full max-w-md my-4 mx-auto'>
			<Label className='text-sm font-semibold mb-2 block'>Upload Image</Label>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDropOver}
				className={`${
					isEditMode ? 'opacity-60 ' : ''
				}border-2  p-4 rounded-lg`}>
				<Input
					id='image-upload'
					type='file'
					ref={inputRef}
					onChange={handleImageChange}
					className='hidden'
					disabled={isEditMode}
				/>
				{!imageFile ? (
					<Label
						className={`${
							isEditMode ? 'cursor-not-allowed ' : ''
						}flex flex-col items-center justify-center h-40 cursor-pointer`}
						htmlFor='image-upload'>
						<UploadCloudIcon className='w-10 mb-2 text-muted-foreground h-10' />
						<span>Drag & drop or click to upload image</span>
					</Label>
				) : imageLoadingState ? (
					<Skeleton className='h-10 bg-gray-200' />
				) : (
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<FileIcon className='w-8 text-primary h-8 mr-2' />
						</div>
						<p className='text-sm font-medium'>{imageFile.name}</p>
						<Button
							variant='ghost'
							size='icon'
							onClick={handleRemoveImage}
							className='text-muted-foreground hover:text-foreground'>
							<XIcon className='w-4 h-4' />
							<span className='sr-only'>Remove File</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
