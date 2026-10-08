"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Wallet,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useCart } from "../context/CartContext";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

function formatPrice(price: number) {
  return `\u20A6${price.toLocaleString("en-NG")}`;
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
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

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText("9169534809");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!customerPhone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!customerEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!deliveryAddress.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      /*
       * CREATE ORDER
       *
       * Payment remains pending because payment will be made manually
       * through Opay.
       */
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim(),
          delivery_address: deliveryAddress.trim(),
          total_amount: subtotal,
          payment_status: "pending",
          order_status: "pending",
          payment_reference: null,
        })
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error(
          orderError.message || "Unable to create your order."
        );
      }

      /*
       * SAVE ORDER ITEMS
       *
       * IMPORTANT:
       * We intentionally do NOT send product_id here because the
       * current order_items.product_id column is UUID while the
       * products currently use numeric IDs such as 1, 2, 3, 4.
       */
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Order items error:", itemsError);

        /*
         * If order items fail, remove the order that was just created
         * so we don't leave an incomplete order behind.
         */
        await supabase.from("orders").delete().eq("id", order.id);

        throw new Error(
          itemsError.message || "Unable to save your order items."
        );
      }

      /*
       * Clear cart after both database operations succeed.
       */
      clearCart();

      /*
       * Save the order information for the payment screen.
       */
      setOrderId(order.id);
      setOrderTotal(subtotal);
    } catch (err) {
      console.error("Checkout error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while placing your order.");
      }
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = orderId
    ? `Hello T's Farm,

I have placed an order and made the manual Opay payment.

Order ID: ${orderId}
Customer Name: ${customerName}
Phone: ${customerPhone}
Total Amount: ${formatPrice(orderTotal)}

Payment Account:
Bank: Opay
Account Number: 9169534809
Account Name: Thompson Ayibapreye Joshua

I am sending my payment confirmation for verification.

Thank you.`
    : "";

  const whatsappLink = `https://wa.me/2349169534809?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  /*
   * LOADING STATE
   */
  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07130d] text-white">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      </main>
    );
  }

  /*
   * PAYMENT INSTRUCTIONS / SUCCESS SCREEN
   */
  if (orderId) {
    return (
      <main className="min-h-screen bg-[#07130d] text-white">
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to T&apos;s Farm
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
            {/* Header */}
            <div className="border-b border-white/10 px-6 py-10 text-center sm:px-10">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-11 w-11 text-emerald-400" />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Order Received
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Complete Your Payment
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Your order has been received. Please transfer the exact
                amount below to our Opay account.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-gray-300">
                Order ID:
                <span className="font-semibold text-white">
                  {orderId}
                </span>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-10">
              {/* Amount */}
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 text-center">
                <p className="text-sm text-gray-400">Amount to Pay</p>

                <p className="mt-2 text-4xl font-black text-amber-400">
                  {formatPrice(orderTotal)}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Delivery charges, where applicable, may be confirmed
                  separately.
                </p>
              </div>

              {/* Opay details */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Wallet className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <h2 className="font-bold text-white">
                      Manual Opay Payment
                    </h2>

                    <p className="text-sm text-gray-400">
                      Transfer the amount to this account
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Bank
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      Opay
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Account Name
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      Thompson Ayibapreye Joshua
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Account Number
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <span className="text-2xl font-black tracking-widest text-amber-400">
                        9169534809
                      </span>

                      <button
                        type="button"
                        onClick={copyAccountNumber}
                        className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />

                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-lg font-bold">
                  What to do next
                </h2>

                <ol className="space-y-4 text-sm text-gray-300">
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-black">
                      1
                    </span>

                    <span>
                      Transfer{" "}
                      <strong className="text-white">
                        {formatPrice(orderTotal)}
                      </strong>{" "}
                      to the Opay account above.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-black">
                      2
                    </span>

                    <span>
                      Keep your Opay transfer receipt or transaction
                      confirmation.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-black">
                      3
                    </span>

                    <span>
                      Click the WhatsApp button below and send your
                      payment confirmation to T&apos;s Farm.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-black">
                      4
                    </span>

                    <span>
                      T&apos;s Farm will verify your payment and begin
                      processing your order.
                    </span>
                  </li>
                </ol>
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                <MessageCircle className="h-5 w-5" />
                I&apos;ve Made Payment — Send Confirmation
              </a>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-400 transition hover:text-white"
                >
                  Return to T&apos;s Farm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * EMPTY CART
   */
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#07130d] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-10">
          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/10">
              <ShoppingBag className="h-9 w-9 text-amber-400" />
            </div>

            <h1 className="text-3xl font-bold">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-gray-400">
              Add some fresh products from T&apos;s Farm before
              proceeding to checkout.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-black transition hover:bg-amber-300"
            >
              <ShoppingBag className="h-5 w-5" />
              Shop Now
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * CHECKOUT FORM
   */
  return (
    <main className="min-h-screen bg-[#07130d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/cart"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            T&apos;s Farm
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-400">
            Enter your details and place your order.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Customer details */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="mb-7">
                <h2 className="text-xl font-bold">
                  Customer Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Tell us where to deliver your order.
                </p>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-amber-400/60"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) =>
                      setCustomerPhone(e.target.value)
                    }
                    placeholder="e.g. 08012345678"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-amber-400/60"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) =>
                      setCustomerEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Delivery Address
                  </label>

                  <textarea
                    value={deliveryAddress}
                    onChange={(e) =>
                      setDeliveryAddress(e.target.value)
                    }
                    placeholder="Enter your full delivery address"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-amber-400/60"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Delivery Notes{" "}
                    <span className="text-gray-600">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    value={deliveryNotes}
                    onChange={(e) =>
                      setDeliveryNotes(e.target.value)
                    }
                    placeholder="Any special delivery instructions?"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-amber-400/60"
                  />
                </div>
              </div>
            </section>

            {/* Order summary */}
            <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  Your Order
                </h2>

                <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
                  {items.length} item
                  {items.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-white/10 pb-5"
                  >
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {formatPrice(item.price)} each
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/10"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <span className="min-w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/10"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className="font-bold text-amber-400">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Delivery</span>
                  <span>To be confirmed</span>
                </div>

                <div className="my-4 h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-black text-amber-400">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 font-bold text-black shadow-lg shadow-amber-400/10 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5" />
                    Place Order &amp; Pay via Opay
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-600">
                Your order will be saved first. You will then
                receive the Opay payment instructions.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
