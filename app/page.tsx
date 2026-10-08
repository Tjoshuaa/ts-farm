"use client";

import Image from "next/image";
import Link from "next/link";
import {
ArrowRight,
ChevronDown,
Clock3,
Egg,
Facebook,
Instagram,
Leaf,
Menu,
MessageCircle,
Minus,
PackageCheck,
Phone,
Plus,
ShoppingCart,
Truck,
Utensils,
Waves,
X,
Youtube,
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
comingSoon?: boolean;
};

const products: Product[] = [
{
id: 1,
name: "Fresh Farm Big Eggs",
price: 7500,
unit: "per crate",
description: "Fresh, quality farm eggs carefully selected for your home.",
emoji: "🥚",
category: "Eggs",
},
{
id: 2,
name: "Fresh Farm Medium Eggs",
price: 7000,
unit: "per crate",
description: "Fresh medium-sized eggs straight from our farm.",
emoji: "🥚",
category: "Eggs",
},
{
id: 3,
name: "Big Broiler Chicken",
price: 16000,
unit: "per chicken",
description: "Quality farm-raised broiler chicken for your family meals.",
emoji: "🐔",
category: "Poultry",
},
{
id: 4,
name: "Medium Broiler Chicken",
price: 15000,
unit: "per chicken",
description: "Fresh farm-raised medium-sized broiler chicken.",
emoji: "🐔",
category: "Poultry",
},
{
id: 5,
name: "Big Turkey",
price: 50000,
unit: "per turkey",
description: "Premium farm-raised turkey, perfect for special occasions.",
emoji: "🦃",
category: "Poultry",
},
{
id: 6,
name: "Medium Turkey",
price: 40000,
unit: "per turkey",
description: "Quality medium-sized turkey raised with care.",
emoji: "🦃",
category: "Poultry",
},
{
id: 7,
name: "Catfish",
price: 0,
unit: "",
description: "Fresh farm catfish will soon be available.",
emoji: "🐟",
category: "Fish",
comingSoon: true,
},
];

function formatPrice(price: number) {
return `₦${price.toLocaleString("en-NG")}`;
}

export default function Home() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [cartCount, setCartCount] = useState(0);
const [addedProduct, setAddedProduct] = useState<string | null>(null);

function addToCart(product: Product) {
if (product.comingSoon) return;

```
setCartCount((current) => current + 1);
setAddedProduct(product.name);

window.setTimeout(() => {
  setAddedProduct(null);
}, 1800);
```

}

function closeMobileMenu() {
setMobileMenuOpen(false);
}

return ( <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
{/* Navigation */} <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8"> <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6"> <Link
         href="#home"
         className="group flex items-center gap-3"
         onClick={closeMobileMenu}
       > <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-[#d8aa3d]/40 bg-white"> <Image
             src="/logo.jpeg"
             alt="T's Farm logo"
             fill
             className="object-contain p-1"
             priority
           /> </div>

```
        <div className="hidden sm:block">
          <p className="text-sm font-bold tracking-[0.2em] text-[#f5d477]">
            T&apos;S FARM
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
            Fresh from our farm
          </p>
        </div>
      </Link>

      <div className="hidden items-center gap-7 md:flex">
        <a
          href="#home"
          className="text-sm text-white/80 transition-colors hover:text-[#f5d477]"
        >
          Home
        </a>
        <a
          href="#shop"
          className="text-sm text-white/80 transition-colors hover:text-[#f5d477]"
        >
          Shop
        </a>
        <a
          href="#gallery"
          className="text-sm text-white/80 transition-colors hover:text-[#f5d477]"
        >
          Farm Gallery
        </a>
        <a
          href="#about"
          className="text-sm text-white/80 transition-colors hover:text-[#f5d477]"
        >
          About
        </a>
        <a
          href="#contact"
          className="text-sm text-white/80 transition-colors hover:text-[#f5d477]"
        >
          Contact
        </a>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/cart"
```
