"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MessageCircle,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  emoji: string;
  category: string;
  available: boolean;
  comingSoon?: boolean;
};

const defaultProducts: Product[] = [
  {
    id: "big-eggs",
    name: "Fresh Farm Big Eggs",
    price: 7500,
    unit: "per crate",
    description: "Fresh, quality farm eggs delivered straight from our farm.",
    emoji: "🥚",
    category: "Eggs",
    available: true,
  },
  {
    id: "medium-eggs",
    name: "Fresh Farm Medium Eggs",
    price: 7000,
    unit: "per crate",
    description: "Fresh medium-sized eggs, carefully selected for quality.",
    emoji: "🥚",
    category: "Eggs",
    available: true,
  },
  {
    id: "big-broiler",
    name: "Big Broiler Chicken",
    price: 16000,
    unit: "per chicken",
    description: "Fresh, healthy and properly raised broiler chicken.",
    emoji: "🐔",
    category: "Chicken",
    available: true,
  },
  {
    id: "medium-broiler",
    name: "Medium Broiler Chicken",
    price: 15000,
    unit: "per chicken",
    description: "Fresh farm-raised medium-sized broiler chicken.",
    emoji: "🐔",
    category: "Chicken",
    available: true,
  },
  {
    id: "big-turkey",
    name: "Big Turkey",
    price: 50000,
    unit: "per turkey",
    description: "Large, healthy farm-raised turkey for your family and events.",
    emoji: "🦃",
    category: "Turkey",
    available: true,
  },
  {
    id: "medium-turkey",
    name: "Medium Turkey",
    price: 40000,
    unit: "per turkey",
    description: "Quality medium-sized farm-raised turkey.",
    emoji: "🦃",
    category: "Turkey",
    available: true,
  },
  {
    id: "catfish",
    name: "Fresh Farm Catfish",
    price: 0,
    unit: "coming soon",
    description: "Fresh farm-raised catfish will be available soon.",
    emoji: "🐟",
    category: "Fish",
    available: false,
    comingSoon: true,
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
    title: "Life on the Farm",
  },
  {
    src: "https://images.unsplash.com/photo-1569288063643-5d29ad64dfb7?auto=format&fit=crop&w=1200&q=80",
    title: "Fresh Farm Eggs",
  },
  {
    src: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80",
    title: "Healthy Poultry",
  },
  {
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    title: "Farm Fresh",
  },
];

function formatPrice(price: number) {
  return `\u20A6${price.toLocaleString("en-NG")}`;
}

function getProductEmoji(category: string) {
  const value = category.toLowerCase();

  if (value.includes("egg")) return "🥚";
  if (value.includes("chicken") || value.includes("broiler")) return "🐔";
  if (value.includes("turkey")) return "🦃";
  if (value.includes("fish")) return "🐟";

  return "🌾";
}

function getProductUnit(category: string, comingSoon?: boolean) {
  if (comingSoon) return "coming soon";

  const value = category.toLowerCase();

  if (value.includes("egg")) return "per crate";
  if (value.includes("chicken") || value.includes("broiler")) {
    return "per chicken";
  }
  if (value.includes("turkey")) return "per turkey";
  if (value.includes("fish")) return "per fish";

  return "per item";
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [cartCount, setCartCount] = useState(0);
  const [addedProduct, setAddedProduct] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error loading products:", error);
          setLoadingProducts(false);
          return;
        }

        if (data && data.length > 0) {
          const formattedProducts: Product[] = data.map((product) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            unit: getProductUnit(
              product.category,
              product.coming_soon
            ),
            description:
              product.description ||
              "Fresh quality farm produce from T's Farm.",
            emoji: getProductEmoji(product.category),
            category: product.category,
            available: product.available,
            comingSoon: product.coming_soon,
          }));

          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Supabase connection error:", error);
      }

      setLoadingProducts(false);
    }

    loadProducts();
  }, []);

  function addToCart(product: Product) {
    if (!product.available || product.comingSoon) return;

    setCartCount((current) => current + 1);
    setAddedProduct(product.name);
    setShowCartMessage(true);

    setTimeout(() => {
      setShowCartMessage(false);
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-[#07130d] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07130d]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d4af37]/50">
              <Image
                src="/logo.jpeg"
                alt="T's Farm Logo"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="text-xl font-bold tracking-wide text-[#d4af37]">
                T&apos;S FARM
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                Fresh From Our Farm
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#home"
              className="text-sm text-white/80 transition hover:text-[#d4af37]"
            >
              Home
            </Link>
            <Link
              href="#shop"
              className="text-sm text-white/80 transition hover:text-[#d4af37]"
            >
              Shop
            </Link>
            <Link
              href="#gallery"
              className="text-sm text-white/80 transition hover:text-[#d4af37]"
            >
              Gallery
            </Link>
            <Link
              href="#about"
              className="text-sm text-white/80 transition hover:text-[#d4af37]"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm text-white/80 transition hover:text-[#d4af37]"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/10 bg-[#07130d] px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-5">
              <Link href="#home" onClick={() => setMobileMenu(false)}>
                Home
              </Link>
              <Link href="#shop" onClick={() => setMobileMenu(false)}>
                Shop
              </Link>
              <Link href="#gallery" onClick={() => setMobileMenu(false)}>
                Gallery
              </Link>
              <Link href="#about" onClick={() => setMobileMenu(false)}>
                About
              </Link>
              <Link href="#contact" onClick={() => setMobileMenu(false)}>
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2200&q=85"
            alt="Beautiful farm landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130d] via-[#07130d]/75 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
              Fresh From Our Farm
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Good Food
              <span className="block text-[#d4af37]">Starts Here.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              Premium farm-fresh eggs, chicken and turkey carefully raised
              with quality, freshness and your family in mind.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#shop"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d4af37] px-7 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-[#e4c55b]"
              >
                Shop Fresh Produce
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/2349169534809"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Explore
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-white/10 bg-[#0b1c13]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-5 py-7 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          <div className="flex items-center justify-center gap-4 py-4 sm:py-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/10">
              <Truck className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <p className="font-semibold">Fresh Delivery</p>
              <p className="text-sm text-white/50">Fresh from our farm</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-4 sm:py-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/10">
              <Check className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <p className="font-semibold">Quality Assured</p>
              <p className="text-sm text-white/50">Carefully raised</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-4 sm:py-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/10">
              <Star className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <p className="font-semibold">Farm Fresh</p>
              <p className="text-sm text-white/50">Premium produce</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Our Products
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Fresh From T&apos;s Farm
            </h2>

            <p className="mt-4 max-w-2xl text-white/50">
              Choose from our selection of fresh farm produce.
            </p>
          </div>

          {loadingProducts ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[380px] animate-pulse rounded-3xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/30"
                >
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0e2a1b] to-[#07130d]">
                    <span className="relative text-8xl transition duration-500 group-hover:scale-110">
                      {product.emoji}
                    </span>

                    {product.comingSoon && (
                      <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#d4af37] backdrop-blur">
                        Coming Soon
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="mb-1 text-xs uppercase tracking-wider text-[#d4af37]">
                      {product.category}
                    </p>

                    <h3 className="text-xl font-bold">{product.name}</h3>

                    <p className="mt-3 min-h-[48px] text-sm leading-6 text-white/50">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        {product.comingSoon ? (
                          <p className="text-lg font-semibold text-[#d4af37]">
                            Coming Soon
                          </p>
                        ) : (
                          <>
                            <p className="text-2xl font-bold">
                              {formatPrice(product.price)}
                            </p>
                            <p className="text-xs text-white/40">
                              {product.unit}
                            </p>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.available || product.comingSoon}
                        className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                          product.available && !product.comingSoon
                            ? "bg-[#d4af37] text-black hover:bg-[#e4c55b]"
                            : "cursor-not-allowed bg-white/10 text-white/30"
                        }`}
                      >
                        {product.comingSoon ? "Coming Soon" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="border-y border-white/10 bg-[#0b1c13] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Farm Gallery
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              Life at T&apos;s Farm
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/50">
              A glimpse into our farm, our animals and the work behind every
              fresh product.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={`${image.title}-${index}`}
                className={`group relative overflow-hidden rounded-3xl ${
                  index === 0
                    ? "sm:row-span-2 sm:min-h-[500px]"
                    : "min-h-[240px]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-lg font-semibold">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              About T&apos;s Farm
            </p>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Raising Quality.
              <span className="block text-[#d4af37]">
                Delivering Freshness.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-white/60">
              At T&apos;s Farm, we believe great food begins with great care.
              Our farm is committed to producing fresh, quality poultry and
              farm products for families, businesses and events.
            </p>

            <p className="mt-5 leading-7 text-white/50">
              From our farm in Port Harcourt, Rivers State, we carefully raise
              our animals and select our produce so that you can enjoy fresh
              and reliable food.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1400&q=85"
                alt="T's Farm"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-5 pb-24 pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#12321f] to-[#07130d]">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Need Fresh Produce?
              </p>

              <h2 className="text-4xl font-bold sm:text-5xl">
                Let&apos;s get your order started.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-white/60">
                Order directly from T&apos;s Farm through WhatsApp or browse
                our fresh farm products online.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a
                href="https://wa.me/2349169534809"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d4af37] px-7 py-4 font-semibold text-black transition hover:bg-[#e4c55b]"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>

              <Link
                href="#shop"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-semibold transition hover:bg-white/10"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20 px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full">
                <Image
                  src="/logo.jpeg"
                  alt="T's Farm Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-bold text-[#d4af37]">T&apos;S FARM</p>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                  Fresh From Our Farm
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm text-white/50">
              <Link href="#home">Home</Link>
              <Link href="#shop">Shop</Link>
              <Link href="#gallery">Gallery</Link>
              <Link href="#about">About</Link>
              <Link href="#contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>

            <div className="space-y-3 text-sm text-white/50">
              <p>Port Harcourt, Rivers State, Nigeria</p>

              <a
                href="https://wa.me/2349169534809"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#d4af37]"
              >
                WhatsApp: 09169534809
              </a>

              <a
                href="https://www.tiktok.com/@tsfarm26"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#d4af37]"
              >
                TikTok: @tsfarm26
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} T&apos;s Farm. All rights reserved.
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/2349169534809"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110"
        aria-label="Contact T's Farm on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* CART MESSAGE */}
      {showCartMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-[#d4af37]/30 bg-[#102619]/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
          <div>
            <p className="text-sm font-semibold">Added to cart</p>
            <p className="mt-1 text-xs text-white/50">{addedProduct}</p>
          </div>

          <Link
            href="/cart"
            className="shrink-0 rounded-full bg-[#d4af37] px-4 py-2 text-xs font-bold text-black"
          >
            View Cart
          </Link>
        </div>
      )}
    </main>
  );
}
