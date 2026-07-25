import AuthCard from '@/features/auth/components/auth-card';
import ForgetPasswordForm from '@/features/auth/components/forget-password-form';

export default function ForgetPasswordRequestPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your user account's verified email address and we will send you a password reset link."
    >
      <ForgetPasswordForm />
    </AuthCard>
  );
}
