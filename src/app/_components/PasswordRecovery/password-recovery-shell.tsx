import type { ReactNode } from "react";
import Link from "next/link";
import { FaCheck, FaEnvelope, FaKey, FaLock, FaShieldHalved } from "react-icons/fa6";

type PasswordRecoveryShellProps = {
  step: 1 | 2 | 3;
  title: string;
  description: string;
  children: ReactNode;
};

const steps = [FaEnvelope, FaKey, FaLock];

export function PasswordRecoveryShell({ step, title, description, children }: PasswordRecoveryShellProps) {
  return (
    <main className="flex flex-1 items-center bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <section className="mx-auto w-full max-w-xl text-center lg:mx-0">
          <div className="relative grid h-56 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-slate-100 shadow-lg sm:h-72 lg:h-96">
            <span className="absolute -top-4 left-8 size-24 rounded-full bg-green-100/70" />
            <span className="absolute top-10 right-12 size-16 rounded-full bg-emerald-100/80" />
            <span className="absolute right-8 bottom-8 size-32 rounded-full bg-green-100/50" />
            <div className="relative flex items-center gap-3 sm:gap-5">
              <span className="grid size-12 -rotate-12 place-items-center rounded-xl bg-white text-lg text-green-600 shadow-lg sm:size-14">
                <FaEnvelope />
              </span>
              <span className="grid size-24 place-items-center rounded-3xl bg-white text-4xl text-green-600 shadow-xl sm:size-28">
                <span className="grid size-16 place-items-center rounded-2xl bg-green-100 sm:size-20">
                  <FaLock />
                </span>
              </span>
              <span className="grid size-12 rotate-12 place-items-center rounded-xl bg-white text-lg text-green-600 shadow-lg sm:size-14">
                <FaShieldHalved />
              </span>
            </div>
            <div className="absolute bottom-10 flex gap-2">
              <span className="size-3 rounded-full bg-green-400" />
              <span className="size-3 rounded-full bg-green-500" />
              <span className="size-3 rounded-full bg-green-600" />
            </div>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-800 sm:text-3xl">Reset Your Password</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
            <span className="flex items-center gap-2"><FaEnvelope className="text-green-600" />Email Verification</span>
            <span className="flex items-center gap-2"><FaShieldHalved className="text-green-600" />Secure Reset</span>
            <span className="flex items-center gap-2"><FaLock className="text-green-600" />Encrypted</span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">
          <header className="text-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight">
              <span className="text-green-600">Fresh</span><span className="text-slate-800">Cart</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-slate-800">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          </header>

          <ol aria-label="Password reset progress" className="mx-auto my-7 flex max-w-xs items-center justify-center">
            {steps.map((StepIcon, index) => {
              const stepNumber = index + 1;
              const completed = stepNumber < step;
              const active = stepNumber === step;
              return (
                <li key={stepNumber} className="flex flex-1 items-center last:flex-none">
                  <span
                    aria-current={active ? "step" : undefined}
                    className={`grid size-10 shrink-0 place-items-center rounded-full ${completed || active ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400"} ${active ? "ring-4 ring-green-100" : ""}`}
                  >
                    {completed ? <FaCheck /> : <StepIcon className="text-sm" />}
                  </span>
                  {stepNumber < steps.length && (
                    <span className={`mx-2 h-0.5 flex-1 ${stepNumber < step ? "bg-green-600" : "bg-slate-200"}`} />
                  )}
                </li>
              );
            })}
          </ol>

          {children}
        </section>
      </div>
    </main>
  );
}
