"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaBuilding, FaCashRegister, FaCreditCard, FaHouse, FaLock, FaLocationDot, FaPhone, FaShieldHalved, FaTruckFast } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UserCart } from "../../_types/cart";
import { createCashOrder, createCheckoutSession } from "./checkout.actions";
import { checkoutAddressSchema, type CheckoutAddressValues } from "./checkout.logic";

type CheckoutFormProps = { cart: UserCart };
type PaymentMethod = "cash" | "online";
const inputClass = "h-12 w-full rounded-xl border-slate-200 bg-white pl-11 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:border-green-600 focus-visible:ring-green-100";

export function CheckoutForm({ cart }: CheckoutFormProps) {
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<CheckoutAddressValues>({
    resolver: zodResolver(checkoutAddressSchema),
    defaultValues: { details: "", phone: "", city: "", postalCode: "" },
  });

  async function onSubmit(address: CheckoutAddressValues) {
    const result = payment === "cash"
      ? await createCashOrder(cart._id, address)
      : await createCheckoutSession(cart._id, address);

    if (!result.success) {
      await Swal.fire({ icon: "error", title: "Could not place order", text: result.message, confirmButtonColor: "#16a34a" });
      return;
    }

    if (payment === "online" && result.redirectUrl) {
      await Swal.fire({ icon: "info", title: "Opening secure payment", text: "You will be redirected to complete payment.", confirmButtonColor: "#16a34a" });
      window.location.assign(result.redirectUrl);
      return;
    }

    await Swal.fire({ icon: "success", title: "Order placed!", text: result.message, confirmButtonColor: "#16a34a" });
    router.push("/orders");
    router.refresh();
  }

  const fields = [
    { name: "city" as const, label: "City", placeholder: "e.g. Cairo, Alexandria, Giza", icon: FaBuilding, autoComplete: "address-level2" },
    { name: "details" as const, label: "Street Address", placeholder: "Street, building, floor, apartment...", icon: FaLocationDot, autoComplete: "street-address" },
    { name: "phone" as const, label: "Phone Number", placeholder: "01xxxxxxxxx", icon: FaPhone, autoComplete: "tel" },
    { name: "postalCode" as const, label: "Postal Code (optional)", placeholder: "Postal code", icon: FaLocationDot, autoComplete: "postal-code" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)]">
      <div className="space-y-5">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-4 text-white">
            <h2 className="flex items-center gap-2 font-bold"><FaHouse /> Shipping Address</h2>
            <p className="mt-1 text-xs text-green-50">Where should we deliver your order?</p>
          </header>
          <div className="space-y-5 p-5">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-800">
              <b className="block">Delivery Information</b>
              <span className="mt-1 block text-xs text-green-700">Make sure your address and phone number are accurate for delivery.</span>
            </div>
            {fields.map(({ name, label, placeholder, icon: Icon, autoComplete }) => (
              <Controller key={name} name={name} control={control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">{label}{name !== "postalCode" && <span className="text-rose-500"> *</span>}</FieldLabel>
                  <div className="relative">
                    <Icon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    <Input {...field} id={field.name} autoComplete={autoComplete} type={name === "phone" ? "tel" : "text"} placeholder={placeholder} aria-invalid={fieldState.invalid} className={`${inputClass} ${name === "details" ? "h-16" : ""}`} />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-4 text-white">
            <h2 className="flex items-center gap-2 font-bold"><FaCreditCard /> Payment Method</h2>
            <p className="mt-1 text-xs text-green-50">Choose how you&apos;d like to pay</p>
          </header>
          <div className="space-y-3 p-5">
            <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${payment === "cash" ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"}`}>
              <input type="radio" name="payment" value="cash" checked={payment === "cash"} onChange={() => setPayment("cash")} className="sr-only" />
              <span className={`grid size-12 place-items-center rounded-xl ${payment === "cash" ? "bg-green-600 text-white" : "bg-slate-100 text-slate-500"}`}><FaCashRegister /></span>
              <span className="flex-1"><b className="block text-sm text-slate-800">Cash on Delivery</b><small className="text-xs text-slate-500">Pay when your order arrives at your doorstep</small></span>
              <span className={`grid size-6 place-items-center rounded-full border ${payment === "cash" ? "border-green-600 bg-green-600 text-white" : "border-slate-300"}`}>{payment === "cash" ? "✓" : ""}</span>
            </label>
            <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${payment === "online" ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"}`}>
              <input type="radio" name="payment" value="online" checked={payment === "online"} onChange={() => setPayment("online")} className="sr-only" />
              <span className={`grid size-12 place-items-center rounded-xl ${payment === "online" ? "bg-green-600 text-white" : "bg-slate-100 text-slate-500"}`}><FaCreditCard /></span>
              <span className="flex-1"><b className="block text-sm text-slate-800">Pay Online</b><small className="text-xs text-slate-500">Secure payment by card</small></span>
              <span className={`grid size-6 place-items-center rounded-full border ${payment === "online" ? "border-green-600 bg-green-600 text-white" : "border-slate-300"}`}>{payment === "online" ? "✓" : ""}</span>
            </label>
            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-xs text-green-800"><FaShieldHalved className="text-lg" /><span><b className="block">Secure &amp; Encrypted</b>Your payment information is protected.</span></div>
          </div>
        </section>
      </div>

      <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-28">
        <header className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-4 text-white">
          <h2 className="flex items-center gap-2 font-bold"><FaLock /> Order Summary</h2>
          <p className="mt-1 text-xs text-green-50">{cart.totalCartItems ?? cart.products.length} items</p>
        </header>
        <div className="p-4">
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {cart.products.map((item) => <div key={item.product._id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-white"><Image src={item.product.imageCover} alt={item.product.title} fill unoptimized sizes="56px" className="object-contain p-1" /></span>
              <span className="min-w-0 flex-1"><b className="line-clamp-2 text-xs text-slate-800">{item.product.title}</b><small className="text-slate-500">{item.count} × {(item.price ?? item.product.priceAfterDiscount ?? item.product.price).toLocaleString()} EGP</small></span>
              <b className="text-xs text-slate-900">{(item.count * (item.price ?? item.product.priceAfterDiscount ?? item.product.price)).toLocaleString()}</b>
            </div>)}
          </div>
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{cart.totalCartPrice.toLocaleString()} EGP</span></div>
            <div className="flex justify-between text-slate-600"><span><FaTruckFast className="mr-2 inline" />Shipping</span><span className="text-green-600">FREE</span></div>
            <div className="flex justify-between border-t border-slate-100 pt-3 font-bold text-slate-900"><span>Total</span><span className="text-green-600">{cart.totalCartPrice.toLocaleString()} EGP</span></div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700 font-semibold text-white shadow-md shadow-green-700/15 hover:from-green-700 hover:to-green-800">
            <FaLock /> {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
          <div className="mt-4 flex justify-center gap-4 text-[10px] text-slate-500"><span><FaShieldHalved className="mr-1 inline text-green-600" />Secure</span><span><FaTruckFast className="mr-1 inline text-blue-600" />Fast Delivery</span></div>
          <Link href="/cart" className="mt-5 flex items-center justify-center gap-2 text-sm text-green-700 hover:text-green-800"><FaArrowLeft /> Back to Cart</Link>
        </div>
      </aside>
    </form>
  );
}
