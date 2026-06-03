export type AuthRole = 'CUSTOMER' | 'STAFF';

export type AuthAction = 'login' | 'signup';

export interface AuthFormValues {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  password: string;
  role: AuthRole;
}

export type LoginInput = Pick<
  AuthFormValues,
  'id' | 'email' | 'password' | 'role'
>;

export type SignupInput = AuthFormValues;

export interface StoredAuthUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: AuthRole;
}

export interface AuthResponseUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

