```tsx
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
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  emoji: string;
  category: string;
  available: boolean;
};

const defaultProducts: Product[] = [
  {
    id: "default-1",
    name: "Fresh Farm Big Eggs",
    price: 7500,
    unit: "per crate",
    description:
      "Fresh, quality farm eggs carefully selected for your family.",
    emoji: "🥚",
    category: "Eggs",
    available: true,
  },
  {
    id: "default-2",
    name: "Fresh Farm Medium Eggs",
    price: 7000,
    unit: "per crate",
    description: "Fresh medium-sized eggs straight from our farm.",
    emoji: "🥚",
    category: "Eggs",
    available: true,
  },
  {
    id: "default-3",
    name: "Big Broiler Chicken",
    price: 16000,
    unit: "per chicken",
    description: "Healthy, well-raised broiler chicken for your table.",
    emoji: "🐔",
    category: "Chicken",
    available: true,
  },
  {
    id: "default-4",
    name: "Medium Broiler Chicken",
    price: 15000,
    unit: "per chicken",
    description: "Quality farm-raised chicken, fresh and ready for you.",
    emoji: "🐔",
    category: "Chicken",
    available: true,
  },
  {
    id: "default-5",
    name: "Big Turkey",
    price: 50000,
    unit: "per turkey",
    description:
      "Premium farm-raised turkey, perfect for special occasions.",
    emoji: "🦃",
    category: "Turkey",
    available: true,
  },
  {
    id: "default-6",
    name: "Medium Turkey",
    price: 40000,
    unit: "per turkey",
    description: "Quality farm-raised turkey at a great value.",
    emoji: "🦃",
    category: "Turkey",
    available: true,
  },
  {
    id: "default-7",
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

function getProductEmoji(category: string) {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("egg")) {
    return "🥚";
  }

  if (
    normalizedCategory.includes("chicken") ||
    normalizedCategory.includes("broiler")
  ) {
    return "🐔";
  }

  if (normalizedCategory.includes("turkey")) {
    return "🦃";
  }

  if (
    normalizedCategory.includes("fish") ||
    normalizedCategory.includes("catfish")
  ) {
    return "🐟";
  }

  return "🌾";
}

function getProductUnit(category: string, comingSoon: boolean) {
  if (comingSoon) {
    return "coming soon";
  }

  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("egg")) {
    return "per crate";
  }

  if (
```
