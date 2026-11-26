import { TailSpin } from "react-loader-spinner";

export function SuspenseFallback({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex min-h-64 w-full max-w-7xl flex-col items-center justify-center px-4 py-12"
    >
      <TailSpin
        height={48}
        width={48}
        color="#16a34a"
        ariaLabel="Loading FreshCart content"
      />
      <p className="mt-4 text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}
