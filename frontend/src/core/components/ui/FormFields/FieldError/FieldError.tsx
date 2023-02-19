interface FieldErrorProps {
	message?: string;
}

export default function FieldError({ message }: FieldErrorProps) {
	if (!message) return null;

	return <div className="text-sm text-red-500 font-bold">{message}</div>;
}
