"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG")}`;
}

export default function CheckoutPage() {
  const { items, subtotal, cartCount, hydrated } = useCart();

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d8aa3d]" />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 py-20 text-white">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-black">
            Your cart is empty.
          </h1>

          <p className="mt-4 text-white/50">
            Add some fresh products before continuing to checkout.
          </p>

          <Link
            href="/#shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d8aa3d] px-7 py-4 text-sm font-black text-black"
          >
            Shop Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f1] text-black">
      <header className="border-b border-black/10 bg-black text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-[#f5d477]"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>

          <div className="text-lg font-black tracking-wider">
            T&apos;S <span className="text-[#d8aa3d]">FARM</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/50">
            <LockKeyhole size={15} />
            Secure Checkout
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#648c2f]">
            Checkout
          </p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Complete Your Order.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/50">
            Your cart is ready. Customer information, delivery
            details and Paystack payment will be connected in the
            next checkout stage.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black">
              Customer & Delivery Information
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#faf8f1] px-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="080..."
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#faf8f1] px-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="WhatsApp number"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#faf8f1] px-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#faf8f1] px-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Delivery Address
                </label>
                <textarea
                  rows={3}
                  placeholder="House number, street and full delivery address"
                  className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-[#faf8f1] p-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Area / Neighborhood
                </label>
                <input
                  type="text"
                  placeholder="e.g. GRA, Rumuola..."
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-[#faf8f1] px-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  City
                </label>
                <input
                  type="text"
                  value="Port Harcourt"
                  readOnly
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-black/5 px-4 text-black/60 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Delivery Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Optional instructions for the delivery team"
                  className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-[#faf8f1] p-4 outline-none focus:border-[#d8aa3d]"
                />
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[#d8aa3d]/30 bg-[#d8aa3d]/5 p-5">
              <p className="text-sm font-black">
                Payment
              </p>

              <p className="mt-2 text-sm leading-6 text-black/50">
                Paystack secure payment will be connected here after
                the Supabase order system is completed.
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] bg-black p-7 text-white lg:sticky lg:top-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Your Order
            </p>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl">
                      {item.emoji}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {item.name}
                      </p>

                      <p className="text-xs text-white/40">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-bold">
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-7 border-t border-white/10" />

            <div className="flex justify-between text-sm">
              <span className="text-white/50">
                Items
              </span>
              <span>{cartCount}</span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-white/50">
                Subtotal
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="my-7 border-t border-white/10" />

            <div className="flex items-end justify-between">
              <span className="text-sm text-white/50">
                Total
              </span>

              <span className="text-3xl font-black text-[#f5d477]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              type="button"
              disabled
              className="mt-7 flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-wider text-white/30"
            >
              Continue to Payment
              <ArrowRight size={18} />
            </button>

            <p className="mt-4 text-center text-[11px] leading-5 text-white/30">
              Payment will be enabled after Paystack and order
              verification are connected.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
