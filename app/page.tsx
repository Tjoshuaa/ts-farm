"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  emoji: string;
  category: string;
  available: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Farm Big Eggs",
    price: 7500,
    unit: "per crate",
    description: "Fresh, quality farm eggs carefully selected for your family.",
    emoji: "🥚",
    category: "Eggs",
    available: true,
  },
  {
    id: 2,
    name: "Fresh Farm Medium Eggs",
    price: 7000,
    unit: "per crate",
    description: "Fresh medium-sized eggs straight from our farm.",
    emoji: "🥚",
    category: "Eggs",
    available: true,
  },
  {
    id: 3,
    name: "Big Broiler Chicken",
    price: 16000,
    unit: "per chicken",
    description: "Healthy, well-raised broiler chicken for your table.",
    emoji: "🐔",
    category: "Chicken",
    available: true,
  },
  {
    id: 4,
    name: "Medium Broiler Chicken",
    price: 15000,
    unit: "per chicken",
    description: "Quality farm-raised chicken, fresh and ready for you.",
    emoji: "🐔",
    category: "Chicken",
    available: true,
  },
  {
    id: 5,
    name: "Big Turkey",
    price: 50000,
    unit: "per turkey",
    description: "Premium farm-raised turkey, perfect for special occasions.",
    emoji: "🦃",
    category: "Turkey",
    available: true,
  },
  {
    id: 6,
    name: "Medium Turkey",
    price: 40000,
    unit: "per turkey",
    description: "Quality farm-raised turkey at a great value.",
    emoji: "🦃",
    category: "Turkey",
    available: true,
  },
  {
    id: 7,
    name: "Catfish",
    price: 0,
    unit: "coming soon",
    description: "Fresh farm-raised catfish coming soon.",
    emoji: "🐟",
    category: "Fish",
    available: false,
  },
];

const galleryImages = [
  {
    title: "Fresh From The Farm",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Quality Poultry",
    image:
      "https://images.unsplash.com/photo-1569288052389-dac9b01c9c95?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Farm Fresh Eggs",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Healthy Turkeys",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1000&q=85",
  },
];

function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG")}`;
}

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);

  function addToCart(product: Product) {
    if (!product.available) return;

    setCartCount((current) => current + 1);
    setAddedProduct(product.name);
    setShowCartMessage(true);

    setTimeout(() => {
      setAddedProduct(null);
      setShowCartMessage(false);
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="T's Farm"
              width={58}
              height={58}
              className="h-12 w-12 rounded-full object-contain"
              priority
            />

            <div className="hidden sm:block">
              <p className="text-lg font-black tracking-wide">T&apos;S FARM</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8aa3d]">
                Fresh From Our Farm
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#home"
              className="text-sm font-medium text-white/80 transition hover:text-[#f5d477]"
            >
              Home
            </a>

            <a
              href="#shop"
              className="text-sm font-medium text-white/80 transition hover:text-[#f5d477]"
            >
              Shop
            </a>

            <a
              href="#gallery"
              className="text-sm font-medium text-white/80 transition hover:text-[#f5d477]"
            >
              Farm Gallery
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-white/80 transition hover:text-[#f5d477]"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-white/80 transition hover:text-[#f5d477]"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#d8aa3d]/40 bg-white/5 transition hover:bg-[#d8aa3d]/10"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={19} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d8aa3d] px-1 text-[10px] font-black text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenu((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              aria-label="Open menu"
            >
              {mobileMenu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/10 bg-black px-5 py-6 lg:hidden">
            <nav className="flex flex-col gap-5">
              <a
                href="#home"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                Home
              </a>

              <a
                href="#shop"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                Shop
              </a>

              <a
                href="#gallery"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                Farm Gallery
              </a>

              <a
                href="#about"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                About
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2200&q=90"
            alt="Beautiful farm"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d8aa3d]/30 bg-black/30 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#74b83c]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5d477]">
                Farm Fresh • Port Harcourt
              </span>
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Fresh From
              <br />
              <span className="gold-text">Our Farm.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Premium farm-fresh eggs, chicken and turkey, carefully raised
              and delivered straight to your table in Port Harcourt.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#shop"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8aa3d] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#f5d477]"
              >
                Shop Fresh Products
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="https://wa.me/2349169534809"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold backdrop-blur-md transition hover:border-[#d8aa3d]/60 hover:bg-white/10"
              >
                <MessageCircle size={18} />
                Chat With Us
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-black text-[#f5d477]">100%</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  Farm Fresh
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-[#f5d477]">6+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  Farm Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-[#f5d477]">PH</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/40">
            Explore
          </span>
          <ChevronDown size={16} className="animate-bounce text-[#d8aa3d]" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/10 bg-[#10100d]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          <div className="flex items-center gap-4 px-5 py-7 sm:justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8aa3d]/10 text-[#d8aa3d]">
              <Check size={22} />
            </div>

            <div>
              <p className="font-bold">Quality Assured</p>
              <p className="text-xs text-white/50">
                Carefully selected products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-7 sm:justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8aa3d]/10 text-[#d8aa3d]">
              <Truck size={22} />
            </div>

            <div>
              <p className="font-bold">Farm Delivery</p>
              <p className="text-xs text-white/50">
                Delivered around Port Harcourt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-7 sm:justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8aa3d]/10 text-[#d8aa3d]">
              <Star size={22} />
            </div>

            <div>
              <p className="font-bold">Fresh Every Time</p>
              <p className="text-xs text-white/50">
                From our farm to your table
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="bg-[#faf8f1] py-24 text-black">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#648c2f]">
                Our Products
              </p>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Freshness You
                <br />
                Can Taste.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-black/55">
              Shop our selection of quality farm products. Everything is
              carefully raised and handled with your family in mind.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className={`group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  !product.available ? "opacity-80" : ""
                }`}
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3eee0] to-[#e8dfc9]">
                  <div className="text-[100px] transition duration-500 group-hover:scale-110">
                    {product.emoji}
                  </div>

                  <div className="absolute left-5 top-5 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                    {product.category}
                  </div>

                  {!product.available && (
                    <div className="absolute right-5 top-5 rounded-full bg-[#173b12] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black">{product.name}</h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-black/55">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      {product.available ? (
                        <>
                          <p className="text-2xl font-black text-[#173b12]">
                            {formatPrice(product.price)}
                          </p>
                          <p className="text-xs text-black/45">
                            {product.unit}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-bold text-[#648c2f]">
                          Coming Soon
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.available}
                      className={`flex h-12 items-center justify-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-wider transition ${
                        product.available
                          ? "bg-black text-white hover:bg-[#173b12]"
                          : "cursor-not-allowed bg-black/10 text-black/30"
                      }`}
                    >
                      <ShoppingCart size={16} />

                      {addedProduct === product.name ? (
                        "Added"
                      ) : product.available ? (
                        "Add"
                      ) : (
                        "Soon"
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#080808] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#d8aa3d]">
                Farm Gallery
              </p>

              <h2 className="text-4xl font-black sm:text-5xl">
                Life At T&apos;s Farm.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/50">
              Take a look at the farm, our animals and the care that goes into
              producing the food you enjoy.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((item) => (
              <div
                key={item.title}
                className="group relative h-[360px] overflow-hidden rounded-[2rem] border border-white/10"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-lg font-black">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-[#d8aa3d]/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-[#f5d477] transition hover:bg-[#d8aa3d]/10"
            >
              View Full Gallery
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-[#173b12] py-24">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#74b83c]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#f5d477]">
              About T&apos;s Farm
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Good Food Starts
              <br />
              With Good Farming.
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-white/70">
              At T&apos;s Farm, we believe that quality food begins with the
              way it is raised. We focus on producing fresh eggs and healthy
              poultry products while maintaining the care and standards our
              customers deserve.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-3xl font-black text-[#f5d477]">01</p>
                <p className="mt-2 text-sm font-bold">Quality First</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-3xl font-black text-[#f5d477]">02</p>
                <p className="mt-2 text-sm font-bold">Customer Focus</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-3xl font-black text-[#f5d477]">03</p>
                <p className="mt-2 text-sm font-bold">Farm Fresh</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-3xl font-black text-[#f5d477]">04</p>
                <p className="mt-2 text-sm font-bold">Reliable Delivery</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[3rem] border border-[#d8aa3d]/20" />

            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20">
              <div className="animate-[float_5s_ease-in-out_infinite] text-[150px] sm:text-[190px]">
                🐔
              </div>

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.25em] text-[#f5d477]">
                  T&apos;s Farm
                </p>
                <p className="mt-2 text-lg font-black">
                  From our farm to your table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#faf8f1] py-24 text-black">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-[2.5rem] bg-black p-8 text-white sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#d8aa3d]">
                  Need Help?
                </p>

                <h2 className="text-4xl font-black sm:text-5xl">
                  Let&apos;s Talk
                  <br />
                  Farm Fresh.
                </h2>

                <p className="mt-6 max-w-lg leading-7 text-white/55">
                  Have a question about our products, delivery or an order?
                  Our team is available on WhatsApp to help you.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="https://wa.me/2349169534809"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#d8aa3d]/40 hover:bg-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                      <MessageCircle size={22} />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40">
                        WhatsApp
                      </p>
                      <p className="mt-1 font-bold">09169534809</p>
                    </div>
                  </div>

                  <ArrowRight size={19} className="text-[#d8aa3d]" />
                </a>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    Location
                  </p>

                  <p className="mt-2 font-bold">
                    Port Harcourt, Rivers State, Nigeria
                  </p>
                </div>

                <a
                  href="https://www.tiktok.com/@tsfarm26"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold transition hover:border-[#d8aa3d]/40 hover:bg-white/10"
                >
                  Follow us on TikTok: @tsfarm26
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="T's Farm"
              width={45}
              height={45}
              className="h-10 w-10 rounded-full object-contain"
            />

            <div>
              <p className="font-black">T&apos;S FARM</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Fresh From Our Farm
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-white/40 sm:text-right">
            <p>© {new Date().getFullYear()} T&apos;s Farm. All rights reserved.</p>
            <p className="mt-1">Port Harcourt, Rivers State, Nigeria</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2349169534809"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with T's Farm on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <MessageCircle size={25} />
      </a>

      {/* CART NOTIFICATION */}
      {showCartMessage && (
        <div className="fixed bottom-24 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-[#d8aa3d]/30 bg-[#111]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div>
            <p className="text-sm font-black text-[#f5d477]">
              Added to your cart
            </p>
            <p className="mt-1 text-xs text-white/50">{addedProduct}</p>
          </div>

          <Link
            href="/cart"
            className="rounded-full bg-[#d8aa3d] px-5 py-2.5 text-xs font-black text-black transition hover:bg-[#f5d477]"
          >
            View Cart
          </Link>
        </div>
      )}
    </main>
  );
}
