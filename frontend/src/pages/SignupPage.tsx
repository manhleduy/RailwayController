import { AuthForm } from '@/components/auth/AuthForm';
import { AuthPageShell } from '@/components/auth/AuthPageShell';

export default function SignupPage() {
  return (
    <AuthPageShell
      title="Build an access account for the railway control center"
      subtitle="Use a dedicated sign up screen for customers or staff, then keep the returned data in Redux so the next frontend step can consume it."
      alternateHref="/login"
      alternateLabel="Back to login"
      alternateText="Already registered?"
    >
      <AuthForm mode="signup" />
    </AuthPageShell>
  );
}

