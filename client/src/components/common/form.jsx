/** @format */

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using lucide-react for icons
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export const CommonForm = ({
	formControls,
	formData,
	setFormData,
	onSubmit,
	buttonText,
	isBtnDisabled,
}) => {
	// State for toggling password visibility
	const [showPassword, setShowPassword] = useState(false);

	// Renders form elements based on the component type
	function renderInputsByComponentType(controlItem) {
		let element = null;
		const value = formData[controlItem.name] || '';

		switch (controlItem.componentType) {
			case 'input':
				element = (
					<div className='relative'>
						<Input
							name={controlItem.name}
							placeholder={controlItem.placeholder}
							id={controlItem.name}
							type={
								controlItem.type === 'password' && showPassword
									? 'text'
									: controlItem.type
							} // Conditionally render password or text input
							value={value}
							onChange={(event) =>
								setFormData({
									...formData,
									[controlItem.name]: event.target.value,
								})
							}
						/>
						{/* Show/hide password icon */}
						{controlItem.type === 'password' && (
							<div
								className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <EyeOff /> : <Eye />}
							</div>
						)}
					</div>
				);
				break;

			case 'select':
				element = (
					<Select
						onValueChange={(selectedValue) =>
							setFormData({
								...formData,
								[controlItem.name]: selectedValue,
							})
						}
						value={value}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={controlItem.label} />
						</SelectTrigger>
						<SelectContent>
							{controlItem.options?.length > 0
								? controlItem.options.map((optionItem) => (
										<SelectItem
											key={optionItem.id}
											value={optionItem.id}>
											{optionItem.label}
										</SelectItem>
								  ))
								: null}
						</SelectContent>
					</Select>
				);
				break;

			case 'textarea':
				element = (
					<Textarea
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						id={controlItem.name}
						value={value}
						onChange={(event) =>
							setFormData({
								...formData,
								[controlItem.name]: event.target.value,
							})
						}
					/>
				);
				break;

			default:
				element = (
					<Input
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						id={controlItem.name}
						type={controlItem.type}
						value={value}
						onChange={(event) =>
							setFormData({
								...formData,
								[controlItem.name]: event.target.value,
							})
						}
					/>
				);
				break;
		}
		return element;
	}

	// Rendering the form structure
	return (
		<form onSubmit={onSubmit}>
			<div className='flex flex-col gap-3'>
				{formControls.map((controlItem) => (
					<div
						className='w-full grid gap-1.5'
						key={controlItem.name}>
						<Label
							className='mb-1'
							htmlFor={controlItem.name}>
							{controlItem.label}
						</Label>
						{renderInputsByComponentType(controlItem)}
					</div>
				))}
			</div>
			<Button
				disabled={isBtnDisabled}
				type='submit'
				className='w-full mt-2'>
				{buttonText || 'Submit'}
			</Button>
		</form>
	);
};

// PropTypes validation
CommonForm.propTypes = {
	formControls: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			placeholder: PropTypes.string,
			componentType: PropTypes.oneOf(['input', 'select', 'textarea'])
				.isRequired,
			type: PropTypes.string,
			options: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					label: PropTypes.string.isRequired,
				})
			),
		})
	).isRequired,
	formData: PropTypes.object.isRequired,
	setFormData: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	buttonText: PropTypes.string,
	isBtnDisabled: PropTypes.bool,
};

export default CommonForm;
