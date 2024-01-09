/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem } from './initializers';
import {
  getCartFromLS,
  getCartLenghtFromLS,
  getCartPriceFromLS,
} from './initializers';

interface CartContextType {
  cartState: CartItem[];
  setCartState: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartLenght: number;
  setCartLenght: React.Dispatch<React.SetStateAction<number>>;
  cartPrice: number;
  setCartPrice: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with an empty array and a dummy function as default
const CartContext = createContext<CartContextType>({
  cartState: [],
  setCartState: () => {},
  cartLenght: 0,
  setCartLenght: () => {},
  cartPrice: 0,
  setCartPrice: () => {},
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, setCartState] = useState<CartItem[]>(getCartFromLS());
  const [cartLenght, setCartLenght] = useState<number>(getCartLenghtFromLS());
  const [cartPrice, setCartPrice] = useState<number>(getCartPriceFromLS());

  useEffect(() => {
    let total = 0;
    let totalPrice = 0;
    const value = cartState;
    if (!cartState) return;
    value.forEach((item: CartItem) => {
      total += item.quantity;
      totalPrice += item.dish.price * item.quantity;
    });
    setCartLenght(total);
    setCartPrice(totalPrice);
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        setCartState,
        cartLenght,
        setCartLenght,
        cartPrice,
        setCartPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the context
export const useCart = () => useContext(CartContext);
