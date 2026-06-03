import type {
  AuthResponseUser,
  LoginInput,
  SignupInput,
} from '@/lib/store/authTypes';

import { requestGraphQL } from './graphql';

const AUTH_USER_SELECTION = `
  id
  full_name
  email
  phone
  password
`;

const LOGIN_QUERY = `
  query Login($input: LoginInput!) {
    login(input: $input) {
      ${AUTH_USER_SELECTION}
    }
  }
`;

const SIGNUP_MUTATION = `
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      ${AUTH_USER_SELECTION}
    }
  }
`;

export async function loginUser(input: LoginInput) {
  const data = await requestGraphQL<{ login: AuthResponseUser }, { input: LoginInput }>(
    LOGIN_QUERY,
    { input }
  );

  return data.login;
}

export async function signupUser(input: SignupInput) {
  const data = await requestGraphQL<
    { signup: AuthResponseUser },
    { input: SignupInput }
  >(SIGNUP_MUTATION, { input });

  return data.signup;
}

