import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "T's Farm | From Our Farm to Your Table",
  description:
    "Fresh farm eggs, broiler chickens and turkey delivered in Port Harcourt. Shop quality farm products from T's Farm.",
  keywords: [
    "T's Farm",
    "fresh eggs Port Harcourt",
    "broiler chicken Port Harcourt",
    "turkey Port Harcourt",
    "farm products Nigeria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
