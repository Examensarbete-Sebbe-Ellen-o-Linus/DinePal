/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import { getCartFromLS, type CartItem } from 'signals/cartSignals';

interface CartContextType {
  cartState: CartItem[];
  setCartState: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

// Create context with an empty array and a dummy function as default
const CartContext = createContext<CartContextType>({
  cartState: [],
  setCartState: () => {},
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, setCartState] = useState<CartItem[]>(getCartFromLS());

  return (
    <CartContext.Provider value={{ cartState, setCartState }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the context
export const useCart = () => useContext(CartContext);
