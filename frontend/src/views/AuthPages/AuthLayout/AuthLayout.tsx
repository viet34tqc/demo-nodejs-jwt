const AuthLayout = ({ title, children }: any) => {
	return (
		<div className="grid place-items-center h-[100vh] bg-gray-50 py-12 sm:px-6 lg:px-8">
			<div className="w-[450px] max-w-full px-4">
				<h1 className="mt-3 text-center text-3xl font-extrabold text-gray-900 mb-8">
					{title}
				</h1>
				<div className="bg-white rounded-sm p-8 shadow">{children}</div>
			</div>
		</div>
	);
};

export default AuthLayout;
