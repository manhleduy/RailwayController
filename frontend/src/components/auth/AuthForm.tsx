import { type FormEvent, useMemo, useState } from 'react';
import { z } from 'zod';
import { LoaderCircle, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { authFailure, authStart, authSuccess } from '@/lib/store/authSlice';
import { loginUser, signupUser } from '@/lib/api/auth';
import {
  type AuthAction,
  type AuthFormValues,
  type AuthRole,
  type LoginInput,
  type SignupInput,
  type StoredAuthUser,
} from '@/lib/store/authTypes';
import { useAppDispatch, useAppSelector } from '@/lib/store/reduxHooks';

import { AuthStatusCard } from './AuthStatusCard';

interface AuthFormProps {
  mode: AuthAction;
}

const authSchema = z.object({
  id: z.string().trim().min(1, 'User ID is required.'),
  full_name: z.string().trim().min(2, 'Full name is required.'),
  email: z.string().trim().email('Use a valid email address.'),
  phone: z.string().trim().min(6, 'Phone number is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  role: z.enum(['CUSTOMER', 'STAFF']),
});

const loginSchema = authSchema.omit({ full_name: true, phone: true });

const initialValues: AuthFormValues = {
  id: '',
  full_name: '',
  email: '',
  phone: '',
  password: '',
  role: 'CUSTOMER',
};

function mapZodErrors(
  error: z.ZodError<AuthFormValues>
): Partial<Record<keyof AuthFormValues, string>> {
  const flattened = error.flatten().fieldErrors;

  return {
    id: flattened.id?.[0],
    full_name: flattened.full_name?.[0],
    email: flattened.email?.[0],
    phone: flattened.phone?.[0],
    password: flattened.password?.[0],
    role: flattened.role?.[0],
  };
}

function toStoredUser(
  response: { id: string; full_name: string; email: string; phone: string },
  role: AuthRole
): StoredAuthUser {
  return {
    id: response.id,
    full_name: response.full_name,
    email: response.email,
    phone: response.phone,
    role,
  };
}

export function AuthForm({ mode }: AuthFormProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [values, setValues] = useState<AuthFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof AuthFormValues, string>>
  >({});

  const isSignup = mode === 'signup';
  const submitLabel = isSignup ? 'Create account' : 'Log in';
  const SubmitIcon = isSignup ? UserPlus : LogIn;

  const fieldGroups = useMemo(
    () => [
      {
        key: 'id',
        label: 'User ID',
        placeholder: 'RC-1024',
        helper: 'The current backend login resolver expects ID and email together.',
        autoComplete: 'username',
        type: 'text',
      },
      ...(isSignup
        ? [
            {
              key: 'full_name',
              label: 'Full name',
              placeholder: 'Nguyen Van A',
              helper: 'This value is saved directly into the auth response.',
              autoComplete: 'name',
              type: 'text',
            },
            {
              key: 'phone',
              label: 'Phone number',
              placeholder: '+84 912 345 678',
              helper: 'Used by the backend signup input.',
              autoComplete: 'tel',
              type: 'tel',
            },
          ]
        : []),
      {
        key: 'email',
        label: 'Email',
        placeholder: 'you@example.com',
        helper: 'Matches the GraphQL auth input.',
        autoComplete: 'email',
        type: 'email',
      },
      {
        key: 'password',
        label: 'Password',
        placeholder: '********',
        helper:
          'The backend currently returns it in the response, but the Redux slice stores only the safe fields.',
        autoComplete: isSignup ? 'new-password' : 'current-password',
        type: 'password',
      },
    ],
    [isSignup]
  );

  const handleValueChange = (field: keyof AuthFormValues, value: string) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isSignup) {
        const parsed = authSchema.safeParse(values);

        if (!parsed.success) {
          setFieldErrors(mapZodErrors(parsed.error));
          return;
        }

        setFieldErrors({});
        dispatch(authStart());

        const signupInput: SignupInput = parsed.data;
        const response = await signupUser(signupInput);

        dispatch(
          authSuccess({
            user: toStoredUser(response, signupInput.role),
            lastAction: 'signup',
          })
        );

        toast.success(`Account created for ${response.full_name}.`);
      } else {
        const parsed = loginSchema.safeParse(values);

        if (!parsed.success) {
          setFieldErrors(mapZodErrors(parsed.error as z.ZodError<AuthFormValues>));
          return;
        }

        setFieldErrors({});
        dispatch(authStart());

        const loginInput: LoginInput = {
          id: parsed.data.id,
          email: parsed.data.email,
          password: parsed.data.password,
          role: parsed.data.role,
        };

        const response = await loginUser(loginInput);

        dispatch(
          authSuccess({
            user: toStoredUser(response, parsed.data.role),
            lastAction: 'login',
          })
        );

        toast.success(`Welcome back, ${response.full_name}.`);
      }

      // Keep the page in place and remove the sensitive value once the request succeeds.
      setValues((current) => ({
        ...current,
        password: '',
      }));
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : 'Authentication request failed.';

      dispatch(authFailure(message));
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl text-slate-950">
              {isSignup ? 'Create your access account' : 'Welcome back'}
            </CardTitle>
            <CardDescription className="mt-2 max-w-lg text-slate-600">
              {isSignup
                ? 'Create a backend-ready account and store the response in Redux without leaving the page.'
                : 'Sign in with the same GraphQL input shape your backend resolver expects.'}
            </CardDescription>
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
            {isSignup ? 'Sign up' : 'Login'}
          </span>
        </div>
      </CardHeader>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {fieldGroups.map((field) => {
            const name = field.key as keyof AuthFormValues;

            return (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  value={values[name]}
                  onChange={(event) =>
                    handleValueChange(name, event.target.value)
                  }
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  aria-invalid={Boolean(fieldErrors[name])}
                />
                <p className="text-xs leading-5 text-slate-500">{field.helper}</p>
                {fieldErrors[name] ? (
                  <p className="text-xs font-medium text-red-600">
                    {fieldErrors[name]}
                  </p>
                ) : null}
              </div>
            );
          })}

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              name="role"
              value={values.role}
              onChange={(event) =>
                handleValueChange('role', event.target.value as AuthRole)
              }
            >
              <option value="CUSTOMER">Customer</option>
              <option value="STAFF">Staff</option>
            </Select>
            <p className="text-xs leading-5 text-slate-500">
              Choose which backend branch should handle the request.
            </p>
            {fieldErrors.role ? (
              <p className="text-xs font-medium text-red-600">{fieldErrors.role}</p>
            ) : null}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-11 w-full rounded-xl"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              <SubmitIcon className="size-4" />
              {submitLabel}
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-5 text-slate-500">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-slate-900 underline">
                Log in instead
              </Link>
            </>
          ) : (
            <>
              Need an account?{' '}
              <Link to="/signup" className="font-medium text-slate-900 underline">
                Sign up here
              </Link>
            </>
          )}
        </p>
      </form>

      <AuthStatusCard />
    </div>
  );
}

