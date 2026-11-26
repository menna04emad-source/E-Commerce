import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "../../_components/PasswordRecovery/reset-password-form";
import { PasswordRecoveryShell } from "../../_components/PasswordRecovery/password-recovery-shell";

export const metadata: Metadata = {
  title: "Create New Password | FreshCart",
  description: "Choose a new secure password for your FreshCart account.",
};

type ResetPageProps = { searchParams: Promise<{ email?: string | string[] }> };

async function ResetPasswordContent({ searchParams }: ResetPageProps) {
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

export default function ResetPasswordPage({ searchParams }: ResetPageProps) {
  return (
    <Suspense
      fallback={
        <PasswordRecoveryShell
          step={3}
          title="Create New Password"
          description="Your new password must be different from previous passwords"
        >
          <div className="h-44 animate-pulse rounded-xl bg-slate-100" aria-label="Loading reset form" />
        </PasswordRecoveryShell>
      }
    >
      <ResetPasswordContent searchParams={searchParams} />
    </Suspense>
  );
}
