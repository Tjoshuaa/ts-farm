"use client";

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  Mail,
  MessageCircle,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useCart } from "../context/CartContext";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

function formatPrice(price: number) {
  return `\u20A6${price.toLocaleString("en-NG")}`;
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    hydrated,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successOrderId, setSuccessOrderId] =
    useState<string | null>(null);

  /*
   * The checkout page is not ready until the browser
   * has loaded the customer's saved cart.
   */
  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07140d] text-white">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-[#d6b45a]"
            size={32}
          />

          <p className="mt-4 text-sm text-white/50">
            Loading your cart...
          </p>
        </div>
      </main>
    );
  }

  /*
   * Empty-cart protection.
   */
  if (items.length === 0 && !successOrderId) {
    return (
      <main className="min-h-screen bg-[#07140d] text-white">
        <header className="border-b border-white/10 bg-[#07140d]/95">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-lg font-bold tracking-wide text-[#d6b45a]"
            >
              T&apos;S FARM
            </Link>

            <Link
              href="/cart"
              className="text-sm text-white/60 transition hover:text-[#d6b45a]"
            >
              Back to Cart
            </Link>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-20">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b1c12] p-8 text-center shadow-2xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#d6b45a]/10 text-[#d6b45a]">
              <ShoppingBag size={34} />
            </div>

            <h1 className="mt-7 text-3xl font-bold">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/50">
              Add some fresh farm produce to your cart
              before proceeding to checkout.
            </p>

            <Link
              href="/#shop"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#d6b45a] px-7 py-4 text-sm font-bold text-[#07140d] transition hover:bg-[#e5c874]"
            >
              Continue Shopping
              <ChevronRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Successful order screen.
   */
  if (successOrderId) {
    const whatsappMessage = encodeURIComponent(
      `Hello T's Farm, I have just placed an order.\n\nOrder ID: ${successOrderId}\n\nPlease confirm my order.`
    );

    return (
      <main className="min-h-screen bg-[#07140d] text-white">
        <header className="border-b border-white/10 bg-[#07140d]/95">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-lg font-bold tracking-wide text-[#d6b45a]"
            >
              T&apos;S FARM
            </Link>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-20">
          <div className="w-full max-w-2xl rounded-3xl border border-[#d6b45a]/20 bg-[#0b1c12] p-8 text-center shadow-2xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b45a]">
              ORDER RECEIVED
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/50">
              Your order has been successfully submitted to
              T&apos;s Farm. We will contact you using the phone
              number provided to confirm your order and
              delivery details.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#07140d] p-5">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Order ID
              </p>

              <p className="mt-2 break-all font-mono text-sm text-[#d6b45a]">
                {successOrderId}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/2349169534809?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:brightness-110"
              >
                <MessageCircle size={18} />
                Confirm on WhatsApp
              </a>

              <Link
                href="/#shop"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold transition hover:border-[#d6b45a]/50 hover:bg-white/5"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage(
        "Your cart is empty. Please add a product before placing an order."
      );
      return;
    }

    const trimmedName = customerName.trim();
    const trimmedPhone = customerPhone.trim();
    const trimmedEmail = customerEmail.trim();
    const trimmedAddress = deliveryAddress.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!trimmedPhone) {
      setErrorMessage("Please enter your phone number.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!trimmedAddress) {
      setErrorMessage(
        "Please enter your delivery address."
      );
      return;
    }

    if (subtotal <= 0) {
      setErrorMessage(
        "Your cart total must be greater than zero."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Create the main order.
       */
      const { data: order, error: orderError } =
        await supabase
          .from("orders")
          .insert({
            customer_name: trimmedName,
            customer_phone: trimmedPhone,
            customer_email: trimmedEmail,
            delivery_address: trimmedAddress,
            total_amount: subtotal,
            payment_status: "pending",
            order_status: "pending",
            payment_reference: null,
          })
          .select("id")
          .single();

      if (orderError) {
        console.error(
          "Order creation error:",
          orderError
        );

        throw new Error(
          orderError.message ||
            "We could not create your order."
        );
      }

      if (!order?.id) {
        throw new Error(
          "The order was created but no order ID was returned."
        );
      }

      /*
       * Create the order items.
       */
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } =
        await supabase
          .from("order_items")
          .insert(orderItems);

      if (itemsError) {
        console.error(
          "Order items creation error:",
          itemsError
        );

        /*
         * The main order already exists, so tell the customer
         * exactly what happened rather than pretending the order
         * was successful.
         */
        throw new Error(
          itemsError.message ||
            "The order was created but the order items could not be saved."
        );
      }

      /*
       * The complete order is now safely stored.
       *
       * Clear the customer's local cart only after BOTH
       * database operations succeeded.
       */
      clearCart();

      setSuccessOrderId(String(order.id));
    } catch (error) {
      console.error(
        "Checkout submission failed:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while placing your order.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07140d] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#07140d]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b45a]/30 bg-[#d6b45a]/10 text-[#d6b45a]">
              <ShoppingBag size={18} />
            </div>

            <div>
              <p className="font-bold tracking-wide text-[#d6b45a]">
                T&apos;S FARM
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                Checkout
              </p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-[#d6b45a]"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </div>
      </header>

      {/* PAGE */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* PAGE TITLE */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b45a]">
            T&apos;S FARM
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm text-white/50">
            Enter your details below to place your farm
            produce order.
          </p>
        </div>

        {/* ERROR */}
        {errorMessage && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm font-medium text-red-300">
              {errorMessage}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_420px]"
        >
          {/* CUSTOMER DETAILS */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0b1c12] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6b45a]/10 text-[#d6b45a]">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Customer Details
                  </h2>

                  <p className="mt-1 text-xs text-white/40">
                    Tell us how we can reach you.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {/* NAME */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="customerName"
                    className="mb-2 block text-xs font-semibold text-white/70"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <input
                      id="customerName"
                      type="text"
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(
                          event.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-white/10 bg-[#07140d] py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6b45a]/60"
                      required
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="customerPhone"
                    className="mb-2 block text-xs font-semibold text-white/70"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <input
                      id="customerPhone"
                      type="tel"
                      value={customerPhone}
                      onChange={(event) =>
                        setCustomerPhone(
                          event.target.value
                        )
                      }
                      placeholder="08012345678"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-white/10 bg-[#07140d] py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6b45a]/60"
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="customerEmail"
                    className="mb-2 block text-xs font-semibold text-white/70"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <input
                      id="customerEmail"
                      type="email"
                      value={customerEmail}
                      onChange={(event) =>
                        setCustomerEmail(
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-[#07140d] py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6b45a]/60"
                      required
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="deliveryAddress"
                    className="mb-2 block text-xs font-semibold text-white/70"
                  >
                    Delivery Address
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-5 text-white/30"
                    />

                    <textarea
                      id="deliveryAddress"
                      value={deliveryAddress}
                      onChange={(event) =>
                        setDeliveryAddress(
                          event.target.value
                        )
                      }
                      placeholder="Enter your complete delivery address"
                      autoComplete="street-address"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#07140d] py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6b45a]/60"
                      required
                    />
                  </div>
                </div>

                {/* NOTES */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="deliveryNotes"
                    className="mb-2 block text-xs font-semibold text-white/70"
                  >
                    Delivery Notes
                    <span className="ml-2 font-normal text-white/30">
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="deliveryNotes"
                    value={deliveryNotes}
                    onChange={(event) =>
                      setDeliveryNotes(
                        event.target.value
                      )
                    }
                    placeholder="Any directions or additional information for your delivery?"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#07140d] p-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6b45a]/60"
                  />
                </div>
              </div>
            </div>

            {/* DELIVERY NOTICE */}
            <div className="rounded-2xl border border-[#d6b45a]/20 bg-[#d6b45a]/5 p-5">
              <div className="flex gap-3">
                <TruckIcon />

                <div>
                  <p className="text-sm font-semibold text-[#d6b45a]">
                    Delivery Information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Our team will contact you after your order
                    is received to confirm delivery details
                    and any applicable delivery charges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1c12]">
              <div className="border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      Your Order
                    </h2>

                    <p className="mt-1 text-xs text-white/40">
                      {cartCount}{" "}
                      {cartCount === 1
                        ? "item"
                        : "items"}{" "}
                      in cart
                    </p>
                  </div>

                  <ShoppingBag
                    size={20}
                    className="text-[#d6b45a]"
                  />
                </div>
              </div>

              <div className="max-h-[520px] overflow-y-auto p-5">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-[#07140d] p-4"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#193b24] text-2xl">
                          {item.emoji}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold leading-5">
                                {item.name}
                              </h3>

                              <p className="mt-1 text-[10px] text-white/35">
                                {formatPrice(item.price)} /{" "}
                                {item.unit}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(item.id)
                              }
                              className="text-white/25 transition hover:text-red-400"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.03]">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-white/50 transition hover:text-[#d6b45a]"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>

                              <span className="w-8 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-white/50 transition hover:text-[#d6b45a]"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-[#d6b45a]">
                              {formatPrice(
                                item.price *
                                  item.quantity
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOTAL */}
              <div className="border-t border-white/10 p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/45">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/45">
                      Delivery
                    </span>

                    <span className="text-xs text-white/35">
                      To be confirmed
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-end justify-between">
                      <span className="font-semibold">
                        Order Total
                      </span>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#d6b45a]">
                          {formatPrice(subtotal)}
                        </p>

                        <p className="mt-1 text-[10px] text-white/30">
                          Delivery charges may apply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d6b45a] px-5 py-4 text-sm font-bold text-[#07140d] transition hover:bg-[#e5c874] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[10px] leading-4 text-white/30">
                  By placing your order, you confirm that
                  the customer and delivery information
                  provided is correct.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050d08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} T&apos;s Farm. All
            rights reserved.
          </p>

          <a
            href="tel:09169534809"
            className="transition hover:text-[#d6b45a]"
          >
            09169534809
          </a>
        </div>
      </footer>
    </main>
  );
}

function TruckIcon() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d6b45a]/10 text-[#d6b45a]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    </div>
  );
}
