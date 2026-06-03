import { AuthForm } from '@/components/auth/AuthForm';
import { AuthPageShell } from '@/components/auth/AuthPageShell';

export default function LoginPage() {
  return (
    <AuthPageShell
      title="Log in and keep the workflow on the same page"
      subtitle="Authenticate customers or staff through your GraphQL backend, store the response in Redux, and show immediate feedback with react-hot-toast."
      alternateHref="/signup"
      alternateLabel="Create an account"
      alternateText="New here?"
    >
      <AuthForm mode="login" />
    </AuthPageShell>
  );
}

