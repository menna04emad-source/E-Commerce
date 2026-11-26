import type { Metadata } from "next";
import { VerifyResetCodeForm } from "../../_components/PasswordRecovery/verify-reset-code-form";
import { PasswordRecoveryShell } from "../../_components/PasswordRecovery/password-recovery-shell";

export const metadata: Metadata = {
  title: "Verify Reset Code | FreshCart",
  description: "Verify the password reset code sent to your email.",
};

type VerifyPageProps = { searchParams: Promise<{ email?: string | string[] }> };

export default async function VerifyResetCodePage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] ?? "" : params.email ?? "";

  return (
    <PasswordRecoveryShell
      step={2}
      title="Check Your Email"
      description={email ? `Enter the 6-digit code sent to ${email}` : "Enter the 6-digit code sent to your email"}
    >
      <VerifyResetCodeForm email={email} />
    </PasswordRecoveryShell>
  );
}
