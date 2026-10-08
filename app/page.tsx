"use client";

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  Twitter,
  X,
  Zap,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url?: string | null;
  available: boolean;
  coming_soon?: boolean;
  unit: string;
  emoji: string;
};

const defaultProducts: Product[] = [
  {
    id: "big-eggs",
    name: "Fresh Farm Big Eggs",
    description:
      "Fresh, nutritious farm eggs carefully selected for quality and freshness.",
    category: "Eggs",
    price: 7500,
    image_url: null,
    available: true,
    coming_soon: false,
    unit: "crate",
    emoji: "🥚",
  },
  {
    id: "medium-eggs",
    name: "Fresh Farm Medium Eggs",
    description:
      "Quality medium-sized farm eggs, fresh and perfect for everyday meals.",
    category: "Eggs",
    price: 7000,
    image_url: null,
    available: true,
    coming_soon: false,
    unit: "crate",
    emoji: "🥚",
  },
  {
    id: "big-broiler",
    name: "Big Broiler Chicken",
    description:
      "Fresh, healthy and carefully raised broiler chicken from our farm.",
    category: "Chicken",
    price: 16000,
    image_url: null,
    available: true,
    coming_soon: false,
    unit: "chicken",
    emoji: "🐔",
  },
  {
    id: "medium-broiler",
    name: "Medium Broiler Chicken",
    description:
      "Fresh farm-raised medium broiler chicken, ready for your kitchen.",
    category: "Chicken",
    price: 15000,
    image_url: null,
    available: true,
    coming_soon: false,
    unit: "chicken",
    emoji: "🐔",
  },
  {
    id: "big-turkey",
    name: "Big Turkey",
    description:
      "Premium farm-raised turkey, fresh and carefully selected.",
    category: "Turkey",
    price: 50000,
    image_url: null,
    available: true,
    coming_soon: false,
    unit: "turkey",
    emoji: "🦃",
  },
  {
    id: "medium-turkey",
    name: "Medium Turkey",
    description:
      "Fresh, quality medium-sized turkey from T's Farm.",
    category: "Turkey",
    price: 40000,
    image_url: null,
    available: true,
    coming_soon: false,
    unit: "turkey",
    emoji: "🦃",
  },
  {
    id: "catfish",
    name: "Fresh Farm Catfish",
    description:
      "Fresh farm-raised catfish coming soon from T's Farm.",
    category: "Fish",
    price: 0,
    image_url: null,
    available: false,
    coming_soon: true,
    unit: "fish",
    emoji: "🐟",
  },
];

const galleryImages = [
  {
    src: "/farm-gallery-1.jpg",
    title: "Fresh From Our Farm",
  },
  {
    src: "/farm-gallery-2.jpg",
    title: "Quality Farm Produce",
  },
  {
    src: "/farm-gallery-3.jpg",
    title: "Raised With Care",
  },
];

function formatPrice(price: number) {
  return `\u20A6${price.toLocaleString("en-NG")}`;
}

function getProductEmoji(name: string, category: string) {
  const value = `${name} ${category}`.toLowerCase();

  if (value.includes("egg")) return "🥚";
  if (value.includes("chicken") || value.includes("broiler")) return "🐔";
  if (value.includes("turkey")) return "🦃";
  if (value.includes("catfish") || value.includes("fish")) return "🐟";

  return "🌾";
}

function getProductUnit(name: string, category: string) {
  const value = `${name} ${category}`.toLowerCase();

  if (value.includes("egg")) return "crate";
  if (value.includes("chicken") || value.includes("broiler")) {
    return "chicken";
  }
  if (value.includes("turkey")) return "turkey";
  if (value.includes("catfish") || value.includes("fish")) return "fish";

  return "item";
}

export default function Home() {
  const [products, setProducts] =
    useState<Product[]>(defaultProducts);

  const { cartCount, addItem } = useCart();

  const [addedProduct, setAddedProduct] = useState("");
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Supabase products error:", error);
          return;
        }

        if (data && data.length > 0) {
          const mappedProducts: Product[] = data.map(
            (product: any) => ({
              id: String(product.id),
              name: product.name,
              description:
                product.description ||
                "Fresh quality farm product from T's Farm.",
              category: product.category || "Farm Produce",
              price: Number(product.price || 0),
              image_url: product.image_url || null,
              available:
                product.available !== false,
              coming_soon:
                product.coming_soon === true,
              unit: getProductUnit(
                product.name,
                product.category
              ),
              emoji: getProductEmoji(
                product.name,
                product.category
              ),
            })
          );

          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Could not load products:", error);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  function addToCart(product: Product) {
    if (!product.available || product.coming_soon) {
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      emoji: product.emoji,
    });

    setAddedProduct(product.name);
    setShowCartMessage(true);

    setTimeout(() => {
      setShowCartMessage(false);
    }, 2500);
  }

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <main className="min-h-screen bg-[#07140d] text-white">
      {/* TOP BAR */}
      <div className="border-b border-white/10 bg-[#050d08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-white/70 sm:px-6 lg:px-8">
          <p>Fresh farm produce delivered in Port Harcourt</p>

          <a
            href="tel:09169534809"
            className="hidden items-center gap-2 transition hover:text-[#d6b45a] sm:flex"
          >
            <Phone size={13} />
            09169534809
          </a>
        </div>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07140d]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d6b45a]/40">
              <Image
                src="/logo.jpeg"
                alt="T's Farm"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-lg font-bold tracking-wide text-[#d6b45a]">
                T&apos;S FARM
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                Fresh • Natural • Quality
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#home"
              className="text-sm text-white/80 transition hover:text-[#d6b45a]"
            >
              Home
            </a>

            <a
              href="#shop"
              className="text-sm text-white/80 transition hover:text-[#d6b45a]"
            >
              Shop
            </a>

            <a
              href="#about"
              className="text-sm text-white/80 transition hover:text-[#d6b45a]"
            >
              About
            </a>

            <a
              href="#gallery"
              className="text-sm text-white/80 transition hover:text-[#d6b45a]"
            >
              Farm Gallery
            </a>

            <a
              href="#contact"
              className="text-sm text-white/80 transition hover:text-[#d6b45a]"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#d6b45a]/40 hover:bg-[#d6b45a]/10"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d6b45a] px-1 text-[10px] font-bold text-[#07140d]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              aria-label="Open menu"
            >
              {mobileMenu ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/10 bg-[#07140d] px-4 py-5 lg:hidden">
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
                href="#about"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                About
              </a>

              <a
                href="#gallery"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                Farm Gallery
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenu(false)}
                className="text-sm text-white/80"
              >
                Contact
              </a>

              <Link
                href="/cart"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 text-sm text-[#d6b45a]"
              >
                <ShoppingCart size={17} />
                Cart
                {cartCount > 0 && (
                  <span>
                    ({cartCount})
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* CART SUCCESS MESSAGE */}
      {showCartMessage && (
        <div className="fixed right-4 top-24 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-[#d6b45a]/30 bg-[#102318]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d6b45a] text-[#07140d]">
              <ShoppingCart size={18} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold">
                Added to cart
              </p>

              <p className="mt-1 text-xs text-white/60">
                {addedProduct}
              </p>

              <Link
                href="/cart"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#d6b45a]"
              >
                View Cart
                <ArrowRight size={13} />
              </Link>
            </div>

            <button
              onClick={() => setShowCartMessage(false)}
              className="text-white/40 transition hover:text-white"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,180,90,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(36,100,59,0.25),transparent_40%)]" />

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6b45a]/20 bg-[#d6b45a]/5 px-4 py-2 text-xs font-medium text-[#d6b45a]">
              <Zap size={13} />
              FARM FRESH. ALWAYS QUALITY.
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Fresh from our
              <span className="block text-[#d6b45a]">
                farm to your table.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              Premium farm-fresh eggs, chicken and turkey,
              carefully raised and delivered with the quality
              your family deserves.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d6b45a] px-7 py-4 text-sm font-bold text-[#07140d] transition hover:-translate-y-0.5 hover:bg-[#e5c874]"
              >
                Shop Fresh Produce
                <ArrowRight size={17} />
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition hover:border-[#d6b45a]/50 hover:bg-white/5"
              >
                Discover T&apos;s Farm
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7">
              <div>
                <p className="text-xl font-bold text-[#d6b45a]">
                  100%
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Farm Fresh
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#d6b45a]">
                  Quality
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Guaranteed
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#d6b45a]">
                  Local
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Port Harcourt
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-10 rounded-full bg-[#d6b45a]/5 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#d6b45a]/20 bg-[#102318] p-3 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#234b2e] via-[#102318] to-[#07140d]">
                <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-20">
                  🌾
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#07140d] via-[#07140d]/80 to-transparent p-7 pt-32">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d6b45a]">
                    T&apos;S FARM
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    Naturally raised.
                    <br />
                    Carefully delivered.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-white/10 bg-[#0b1c12]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 px-0 py-7 sm:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d6b45a]/10 text-[#d6b45a]">
              <Truck size={22} />
            </div>

            <div>
              <p className="font-semibold">
                Fresh Delivery
              </p>
              <p className="mt-1 text-xs text-white/45">
                Fresh farm produce delivered with care
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-0 py-7 sm:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d6b45a]/10 text-[#d6b45a]">
              <Star size={22} />
            </div>

            <div>
              <p className="font-semibold">
                Premium Quality
              </p>
              <p className="mt-1 text-xs text-white/45">
                Carefully selected farm products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-0 py-7 sm:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d6b45a]/10 text-[#d6b45a]">
              <Zap size={22} />
            </div>

            <div>
              <p className="font-semibold">
                Easy Ordering
              </p>
              <p className="mt-1 text-xs text-white/45">
                Simple, fast and convenient shopping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section
        id="shop"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b45a]">
              OUR PRODUCTS
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Fresh from T&apos;s Farm
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/50">
              Choose from our selection of quality farm-fresh
              products, raised and prepared with care.
            </p>
          </div>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#d6b45a]"
          >
            View Cart
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* CATEGORIES */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                activeCategory === category
                  ? "border-[#d6b45a] bg-[#d6b45a] text-[#07140d]"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-[#d6b45a]/40 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {loadingProducts ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b1c12] transition duration-300 hover:-translate-y-1 hover:border-[#d6b45a]/30 hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#193b24] to-[#07140d]">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-8xl transition duration-500 group-hover:scale-110">
                        {product.emoji}
                      </span>
                    </div>
                  )}

                  {product.coming_soon && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#d6b45a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#07140d]">
                      Coming Soon
                    </div>
                  )}

                  {!product.coming_soon && (
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#07140d]/70 px-3 py-1.5 text-[10px] font-semibold text-white/80 backdrop-blur-md">
                      {product.category}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-white/45">
                        {product.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      {product.coming_soon ? (
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#d6b45a]">
                          Soon
                        </p>
                      ) : (
                        <>
                          <p className="text-lg font-bold text-[#d6b45a]">
                            {formatPrice(product.price)}
                          </p>

                          <p className="text-[10px] text-white/35">
                            / {product.unit}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={
                      !product.available ||
                      product.coming_soon
                    }
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                      product.available &&
                      !product.coming_soon
                        ? "bg-[#d6b45a] text-[#07140d] hover:bg-[#e5c874]"
                        : "cursor-not-allowed bg-white/5 text-white/30"
                    }`}
                  >
                    {product.coming_soon ? (
                      "Coming Soon"
                    ) : (
                      <>
                        <ShoppingCart size={17} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-y border-white/10 bg-[#0b1c12]"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b45a]">
              ABOUT T&apos;S FARM
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Good food starts with good farming.
            </h2>

            <p className="mt-6 text-sm leading-7 text-white/55">
              At T&apos;s Farm, we believe that quality food
              begins with responsible farming. We carefully
              raise our birds and produce our farm products
              with attention to freshness, quality and
              consistency.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/55">
              From our farm in Port Harcourt, we make it
              easier for families and customers to get fresh,
              quality farm produce without the stress.
            </p>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6b45a]/40 px-6 py-3 text-sm font-semibold text-[#d6b45a] transition hover:bg-[#d6b45a] hover:text-[#07140d]"
              >
                Contact Our Farm
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#07140d] p-7">
              <p className="text-4xl">🥚</p>
              <h3 className="mt-5 font-bold">
                Fresh Eggs
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/40">
                Carefully selected fresh eggs for your home
                and business.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#07140d] p-7">
              <p className="text-4xl">🐔</p>
              <h3 className="mt-5 font-bold">
                Quality Chicken
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/40">
                Healthy farm-raised broiler chicken.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#07140d] p-7">
              <p className="text-4xl">🦃</p>
              <h3 className="mt-5 font-bold">
                Farm Turkeys
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/40">
                Quality turkeys raised with care.
              </p>
            </div>

            <div className="rounded-3xl border border-[#d6b45a]/20 bg-[#d6b45a]/5 p-7">
              <p className="text-4xl">🌱</p>
              <h3 className="mt-5 font-bold text-[#d6b45a]">
                Farm Fresh
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/50">
                Fresh products supplied directly from our
                farm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b45a]">
              FARM GALLERY
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Life at T&apos;s Farm
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/45">
            A glimpse into the people, animals and work
            behind the fresh products we bring to you.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1c12]"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24">
                <p className="text-sm font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-y border-white/10 bg-[#0b1c12]"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#d6b45a]/20 bg-[#07140d] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b45a]">
                GET IN TOUCH
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Need fresh farm produce?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/50">
                Contact T&apos;s Farm for orders, enquiries and
                fresh farm produce in Port Harcourt.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <a
                href="https://wa.me/2349169534809"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d6b45a] px-7 py-4 text-sm font-bold text-[#07140d] transition hover:bg-[#e5c874]"
              >
                WhatsApp Us
                <ArrowRight size={16} />
              </a>

              <a
                href="tel:09169534809"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold transition hover:border-[#d6b45a]/50"
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050d08]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#d6b45a]/40">
                  <Image
                    src="/logo.jpeg"
                    alt="T's Farm"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold text-[#d6b45a]">
                    T&apos;S FARM
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Fresh • Natural • Quality
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/40">
                Bringing quality farm-fresh produce from our
                farm to homes and customers in Port Harcourt.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Quick Links
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/45">
                <a
                  href="#home"
                  className="transition hover:text-[#d6b45a]"
                >
                  Home
                </a>

                <a
                  href="#shop"
                  className="transition hover:text-[#d6b45a]"
                >
                  Shop
                </a>

                <a
                  href="#about"
                  className="transition hover:text-[#d6b45a]"
                >
                  About
                </a>

                <a
                  href="#gallery"
                  className="transition hover:text-[#d6b45a]"
                >
                  Gallery
                </a>

                <Link
                  href="/cart"
                  className="transition hover:text-[#d6b45a]"
                >
                  Cart
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Contact
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/45">
                <p>Port Harcourt, Rivers State, Nigeria</p>

                <a
                  href="tel:09169534809"
                  className="block transition hover:text-[#d6b45a]"
                >
                  09169534809
                </a>

                <a
                  href="https://wa.me/2349169534809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:text-[#d6b45a]"
                >
                  WhatsApp
                </a>

                <a
                  href="https://www.tiktok.com/@tsfarm26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:text-[#d6b45a]"
                >
                  TikTok @tsfarm26
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} T&apos;s Farm. All
              rights reserved.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.tiktok.com/@tsfarm26"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-[#d6b45a]/40 hover:text-[#d6b45a]"
              >
                <span className="text-xs font-bold">TT</span>
              </a>

              <a
                href="https://wa.me/2349169534809"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-[#d6b45a]/40 hover:text-[#d6b45a]"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2349169534809"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact T's Farm on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <span className="text-lg font-bold">WA</span>
      </a>
    </main>
  );
}
