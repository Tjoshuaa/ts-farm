"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Egg,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  Truck,
  Utensils,
  Wheat,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    name: "Fresh Farm Big Eggs",
    price: "₦7,500",
    unit: "per crate",
    icon: "🥚",
    description: "Fresh, quality farm eggs for your home and business."
  },
  {
    name: "Fresh Farm Medium Eggs",
    price: "₦7,000",
    unit: "per crate",
    icon: "🥚",
    description: "Fresh medium-sized eggs carefully produced on our farm."
  },
  {
    name: "Big Broiler Chicken",
    price: "₦16,000",
    unit: "per chicken",
    icon: "🍗",
    description: "Quality, well-raised broiler chicken from our farm."
  },
  {
    name: "Medium Broiler Chicken",
    price: "₦15,000",
    unit: "per chicken",
    icon: "🍗",
    description: "Fresh medium-sized broiler chicken ready for your table."
  },
  {
    name: "Big Turkey",
    price: "₦50,000",
    unit: "per turkey",
    icon: "🦃",
    description: "Premium farm-raised turkey for your family and events."
  },
  {
    name: "Medium Turkey",
    price: "₦40,000",
    unit: "per turkey",
    icon: "🦃",
    description: "Quality medium-sized turkey, raised with care."
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappNumber = "2349169534809";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505]">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6">
          <nav className="glass flex h-20 items-center justify-between rounded-2xl px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d8aa3d]/60">
                <Image
                  src="/logo.jpeg"
                  alt="T's Farm"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="text-lg font-bold tracking-wide">
                  T&apos;S <span className="text-[#d8aa3d]">FARM</span>
                </div>
                <div className="hidden text-[9px] tracking-[0.25em] text-white/50 sm:block">
                  FROM OUR FARM TO YOUR TABLE
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="text-sm text-white transition hover:text-[#d8aa3d]"
              >
                Home
              </Link>

              <Link
                href="#shop"
                className="text-sm text-white/70 transition hover:text-[#d8aa3d]"
              >
                Shop
              </Link>

              <Link
                href="/gallery"
                className="text-sm text-white/70 transition hover:text-[#d8aa3d]"
              >
                Farm Gallery
              </Link>

              <Link
                href="#about"
                className="text-sm text-white/70 transition hover:text-[#d8aa3d]"
              >
                About
              </Link>

              <Link
                href="#contact"
                className="text-sm text-white/70 transition hover:text-[#d8aa3d]"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="relative rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-[#d8aa3d]/50 hover:bg-[#d8aa3d]/10"
              >
                <ShoppingCart size={19} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d8aa3d] text-[10px] font-bold text-black">
                  0
                </span>
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-xl border border-white/10 bg-white/5 p-3 md:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass mt-2 rounded-2xl p-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {[
                  ["Home", "/"],
                  ["Shop", "#shop"],
                  ["Farm Gallery", "/gallery"],
                  ["About", "#about"],
                  ["Contact", "#contact"]
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-white/80 hover:bg-white/5 hover:text-[#d8aa3d]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(95,159,32,0.18),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(216,170,61,0.12),transparent_30%)]" />

        <div className="absolute right-[-120px] top-[20%] h-[420px] w-[420px] rounded-full bg-[#5f9f20]/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8aa3d]/30 bg-[#d8aa3d]/5 px-4 py-2 text-xs tracking-[0.18em] text-[#f5d477]">
              <Sparkles size={14} />
              FARM FRESH • PORT HARCOURT
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Fresh From
              <br />
              <span className="gold-text">Our Farm.</span>
              <br />
              To Your Table.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              Premium farm-fresh eggs, broiler chickens and turkey,
              carefully raised and delivered to customers in Port Harcourt.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#shop"
                className="group flex items-center justify-center gap-3 rounded-xl bg-[#d8aa3d] px-7 py-4 font-bold text-black transition hover:bg-[#f5d477]"
              >
                Shop Fresh Products
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20T%27s%20Farm%2C%20I%20would%20like%20to%20make%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white transition hover:border-[#5f9f20] hover:bg-[#5f9f20]/10"
              >
                <MessageCircle size={19} />
                Chat With Us
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-[#d8aa3d]" />
                Home Delivery
              </div>

              <div className="flex items-center gap-2">
                <Wheat size={17} className="text-[#5f9f20]" />
                Farm Fresh
              </div>
            </div>
          </motion.div>

          {/* HERO LOGO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute inset-0 rounded-full bg-[#d8aa3d]/10 blur-[70px]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#d8aa3d]/20 bg-black/60 p-4 shadow-2xl shadow-[#d8aa3d]/5">
              <Image
                src="/logo.jpeg"
                alt="T's Farm logo"
                width={900}
                height={900}
                priority
                className="h-auto w-full rounded-[1.5rem]"
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Proudly serving
                    </div>
                    <div className="mt-1 flex items-center gap-2 font-semibold">
                      <MapPin size={15} className="text-[#d8aa3d]" />
                      Port Harcourt
                    </div>
                  </div>

                  <div className="text-3xl">🐣</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ChevronDown className="text-white/30" />
        </motion.div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            ["🥚", "Fresh Eggs", "Farm produced"],
            ["🐔", "Quality Poultry", "Raised with care"],
            ["🚚", "Home Delivery", "Port Harcourt"],
            ["💬", "Easy Support", "WhatsApp available"]
          ].map(([icon, title, text]) => (
            <div key={title} className="px-5 py-7 text-center">
              <div className="text-2xl">{icon}</div>
              <div className="mt-2 text-sm font-bold">{title}</div>
              <div className="mt-1 text-xs text-white/40">{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="bg-[#faf8f1] py-24 text-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 text-xs font-bold tracking-[0.25em] text-[#5f9f20]">
                FROM OUR FARM
              </div>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Shop Fresh Products
              </h2>

              <p className="mt-4 max-w-xl text-black/55">
                Choose your farm-fresh favourites and have them delivered
                to your doorstep.
              </p>
            </div>

            <Link
              href="/cart"
              className="flex items-center gap-2 self-start rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-[#173b12] md:self-auto"
            >
              <ShoppingCart size={17} />
              View Cart
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5f0df] to-[#e8ead9] text-8xl transition duration-500 group-hover:scale-[1.02]">
                  {product.icon}
                </div>

                <div className="mt-6">
                  <div className="text-xl font-black">{product.name}</div>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-black/50">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-2xl font-black text-[#173b12]">
                        {product.price}
                      </div>
                      <div className="text-xs text-black/40">
                        {product.unit}
                      </div>
                    </div>

                    <button className="rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition hover:bg-[#5f9f20]">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CATFISH */}
          <div className="mt-5 overflow-hidden rounded-3xl border border-[#173b12]/10 bg-[#173b12] p-7 text-white sm:p-9">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-2 text-xs font-bold tracking-[0.2em] text-[#d8aa3d]">
                  COMING SOON
                </div>

                <h3 className="text-3xl font-black">Fresh Farm Catfish</h3>

                <p className="mt-2 text-sm text-white/55">
                  Our catfish line is coming soon. Stay connected with
                  T&apos;s Farm for updates.
                </p>
              </div>

              <div className="text-6xl">🐟</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden py-24">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#5f9f20]/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-3 text-xs font-bold tracking-[0.25em] text-[#d8aa3d]">
              WHY T&apos;S FARM
            </div>

            <h2 className="text-4xl font-black sm:text-5xl">
              Good food starts
              <br />
              <span className="gold-text">at the farm.</span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-white/55">
              T&apos;s Farm is committed to providing quality farm products
              while making it simple for families, businesses and event
              customers to order fresh produce from the comfort of home.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["01", "Quality", "Carefully raised farm products"],
                ["02", "Freshness", "Fresh products for your table"],
                ["03", "Convenience", "Easy online ordering"],
                ["04", "Service", "Direct customer support"]
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="text-xs font-bold text-[#d8aa3d]">
                    {number}
                  </div>
                  <div className="mt-3 font-bold">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-white/40">
                    {description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d8aa3d]/20 bg-gradient-to-br from-[#173b12] to-black p-8">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8">
              <div className="text-7xl">🌾</div>

              <h3 className="mt-7 text-3xl font-black">
                From our farm
                <br />
                to your table.
              </h3>

              <p className="mt-4 leading-7 text-white/50">
                Fresh products. Simple ordering. Reliable service.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-[#f5d477]">
                <Utensils size={18} />
                Made for your table
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#faf8f1] py-20 text-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2rem] bg-[#173b12] p-8 text-white sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="text-xs font-bold tracking-[0.25em] text-[#d8aa3d]">
                  NEED HELP?
                </div>

                <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                  Talk to
                  <br />
                  T&apos;s Farm.
                </h2>

                <p className="mt-5 max-w-lg leading-7 text-white/55">
                  Have a question about our products, delivery or an order?
                  Our WhatsApp customer service is ready to help.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20T%27s%20Farm%2C%20I%20need%20help.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-xl bg-[#d8aa3d] px-6 py-4 font-bold text-black transition hover:bg-[#f5d477]"
                >
                  <MessageCircle size={19} />
                  WhatsApp: 09169534809
                </a>

                <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-4 text-sm text-white/60">
                  <MapPin size={17} className="text-[#d8aa3d]" />
                  Port Harcourt, Rivers State
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d8aa3d]/50">
              <Image
                src="/logo.jpeg"
                alt="T's Farm"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="font-bold">
                T&apos;S <span className="text-[#d8aa3d]">FARM</span>
              </div>
              <div className="text-[9px] tracking-[0.2em] text-white/30">
                FROM OUR FARM TO YOUR TABLE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.tiktok.com/@tsfarm26"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 p-3 text-white/50 transition hover:border-[#d8aa3d]/40 hover:text-[#d8aa3d]"
              aria-label="T's Farm TikTok"
            >
              TikTok
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 p-3 text-white/50 transition hover:border-[#5f9f20]/50 hover:text-[#5f9f20]"
              aria-label="T's Farm WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>

          <div className="text-sm text-white/30">
            © {new Date().getFullYear()} T&apos;s Farm. All rights reserved.
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=Hello%20T%27s%20Farm%2C%20I%20would%20like%20to%20make%20an%20enquiry.`}
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/30 transition hover:scale-110"
        aria-label="Chat with T's Farm on WhatsApp"
      >
        <MessageCircle size={27} />
      </motion.a>
    </main>
  );
}
