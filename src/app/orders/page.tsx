import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getUserOrders } from "../_components/Orders/orders.api";
import { OrdersPage as OrdersView } from "../_components/Orders/orders-page";

export const metadata: Metadata = { title: "My Orders | FreshCart", description: "Track your FreshCart orders." };

async function OrdersContent() {
  const orders = await getUserOrders();
  return <OrdersView orders={orders} />;
}

export default function OrdersPage() {
  return <Suspense fallback={<div className="grid min-h-[55vh] place-items-center text-sm text-slate-500">Loading your orders…</div>}><OrdersContent /></Suspense>;
}
