"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  emoji: string;
  quantity: number;
};

type CartProduct = Omit<CartItem, "quantity">;

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (product: CartProduct) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ts-farm-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /*
   * Load the customer's saved cart from their browser.
   */
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsed = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          const validItems: CartItem[] = parsed.filter(
            (item): item is CartItem =>
              item &&
              typeof item.id === "string" &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              typeof item.unit === "string" &&
              typeof item.emoji === "string" &&
              typeof item.quantity === "number" &&
              item.quantity > 0
          );

          setItems(validItems);
        }
      }
    } catch (error) {
      console.error("Could not load saved cart:", error);
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  /*
   * Save the cart whenever it changes.
   */
  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [items, hydrated]);

  /*
   * Add a product to the cart.
   *
   * If the product already exists, increase its quantity.
   */
  function addItem(product: CartProduct) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  /*
   * Increase quantity by one.
   */
  function increaseQuantity(id: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  /*
   * Decrease quantity by one.
   *
   * If quantity reaches zero, remove the product.
   */
  function decreaseQuantity(id: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  /*
   * Remove an item completely.
   */
  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  /*
   * Empty the entire cart.
   */
  function clearCart() {
    setItems([]);
  }

  /*
   * Total number of individual units in the cart.
   */
  const cartCount = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  /*
   * Total price before delivery.
   */
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        hydrated,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
