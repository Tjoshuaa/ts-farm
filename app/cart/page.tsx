"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Wheat,
} from "lucide-react";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG")}`;
}

export default function CartPage() {
  const {
    items,
    subtotal,
    cartCount,
    hydrated,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d8aa3d]" />
            <p className="text-sm text-white/50">
              Loading your cart...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <header className="border-b border-white/10 bg-black">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-bold text-white/70 transition hover:text-[#f5d477]"
            >
              <ArrowLeft size={18} />
              Back to Shop
            </Link>

            <Link
              href="/"
              className="text-lg font-black tracking-wider"
            >
              T&apos;S <span className="text-[#d8aa3d]">FARM</span>
            </Link>

            <div className="w-24" />
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-20">
          <div className="w-full max-w-xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#d8aa3d]/30 bg-[#d8aa3d]/10">
              <ShoppingBag
                size={38}
                className="text-[#d8aa3d]"
              />
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-[#d8aa3d]">
              Your Cart
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Your cart is empty.
            </h1>

            <p className="mx-auto mt-5 max-w-md leading-7 text-white/50">
              You haven&apos;t added any farm-fresh products yet.
              Browse our selection and choose something fresh for
              your table.
            </p>

            <Link
              href="/#shop"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8aa3d] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#f5d477]"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-bold text-white/70 transition hover:text-[#f5d477]"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="text-lg font-black tracking-wider"
          >
            T&apos;S <span className="text-[#d8aa3d]">FARM</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <ShoppingBag size={16} className="text-[#d8aa3d]" />
            <span className="text-xs font-bold">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="bg-[#faf8f1] py-14 text-black sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#648c2f]">
              Shopping Cart
            </p>

            <h1 className="mt-2 text-4xl font-black sm:text-5xl">
              Fresh Choices.
            </h1>

            <p className="mt-3 text-sm text-black/50">
              Review your farm-fresh products before checkout.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* ITEMS */}
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* PRODUCT ICON */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f3eee0] to-[#e8dfc9] text-5xl">
                      {item.emoji}
                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-black">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-black/45">
                            {formatPrice(item.price)} {item.unit}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/35 transition hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        {/* QUANTITY */}
                        <div className="flex items-center rounded-full border border-black/10 bg-[#faf8f1]">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-black/5"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-10 text-center text-sm font-black">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-black/5"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* ITEM TOTAL */}
                        <p className="text-xl font-black text-[#173b12]">
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-bold text-black/45 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={15} />
                Clear Cart
              </button>
            </div>

            {/* SUMMARY */}
            <aside className="h-fit rounded-[2rem] bg-black p-7 text-white shadow-2xl lg:sticky lg:top-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d8aa3d]/10 text-[#d8aa3d]">
                  <Wheat size={19} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Order Summary
                  </p>
                  <p className="mt-1 font-black">
                    T&apos;s Farm
                  </p>
                </div>
              </div>

              <div className="my-7 border-t border-white/10" />

              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/50">
                    Items
                  </span>
                  <span className="font-bold">
                    {cartCount}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/50">
                    Subtotal
                  </span>
                  <span className="font-bold">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/50">
                    Delivery
                  </span>
                  <span className="font-bold text-[#f5d477]">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="my-7 border-t border-white/10" />

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    Subtotal
                  </p>
                  <p className="mt-1 text-3xl font-black text-[#f5d477]">
                    {formatPrice(subtotal)}
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#d8aa3d] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#f5d477]"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-[#74b83c]" />
                Secure checkout coming next
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-8 text-center text-xs text-white/35 lg:px-8">
          © {new Date().getFullYear()} T&apos;s Farm. Fresh From Our Farm.
        </div>
      </footer>
    </main>
  );
}
