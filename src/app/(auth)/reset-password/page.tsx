import type { Metadata } from "next";
import { ResetPasswordForm } from "../../_components/PasswordRecovery/reset-password-form";
import { PasswordRecoveryShell } from "../../_components/PasswordRecovery/password-recovery-shell";

export const metadata: Metadata = {
  title: "Create New Password | FreshCart",
  description: "Choose a new secure password for your FreshCart account.",
};

type ResetPageProps = { searchParams: Promise<{ email?: string | string[] }> };

export default async function ResetPasswordPage({ searchParams }: ResetPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] ?? "" : params.email ?? "";

  return (
    <PasswordRecoveryShell
      step={3}
      title="Create New Password"
      description="Your new password must be different from previous passwords"
    >
      <ResetPasswordForm email={email} />
    </PasswordRecoveryShell>
  );
}
