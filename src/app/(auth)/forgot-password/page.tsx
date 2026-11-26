import type { Metadata } from "next";
import { ForgotPasswordForm } from "../../_components/PasswordRecovery/forgot-password-form";
import { PasswordRecoveryShell } from "../../_components/PasswordRecovery/password-recovery-shell";

export const metadata: Metadata = {
  title: "Forgot Password | FreshCart",
  description: "Request a secure password reset code for your FreshCart account.",
};

export default function ForgotPasswordPage() {
  return (
    <PasswordRecoveryShell step={1} title="Forgot Password?" description="No worries, we’ll send you a reset code">
      <ForgotPasswordForm />
    </PasswordRecoveryShell>
  );
}
