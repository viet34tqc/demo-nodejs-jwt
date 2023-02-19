export type AuthUser = {
	id: string;
	email: string;
	name: string;
	role: 'ADMIN' | 'USER';
};

export type UserResponse = {
	user: AuthUser;
};

export type RegisterCredentialsDTO = {
	email: string;
	password: string;
	name: string;
};

export type LoginCredentialsDTO = {
	email: string;
	password: string;
};
