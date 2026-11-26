import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { AccountSettingsForm } from "../../_components/PasswordRecovery/account-settings-form";

export const metadata: Metadata = {
  title: "Account Settings | FreshCart",
  description: "Update your FreshCart profile and password.",
};

export default function AccountSettingsPage() {
  return (
    <main className="flex-1 bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800">
          <FaArrowLeft /> Back to FreshCart
        </Link>
        <header className="mb-7 mt-5">
          <p className="text-sm font-semibold text-green-600">FreshCart Account</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-800">Account Settings</h1>
          <p className="mt-2 text-slate-600">Manage your profile information and password.</p>
        </header>
        <AccountSettingsForm />
      </div>
    </main>
  );
}
