import { useFormContext } from 'react-hook-form';

interface FieldErrorProps {
	name?: string;
}

export default function FieldError({ name }: FieldErrorProps) {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) return null;

	const error = errors[name]?.message as string;

	if (!error) return null;

	return <div className="text-sm text-red-500 font-bold">{error}</div>;
}
