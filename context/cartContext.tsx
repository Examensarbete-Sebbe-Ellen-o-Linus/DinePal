/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { type IDish } from '~/app/interfaces';
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
  handleAddToCart: (dish: IDish, quantityToAdd?: number) => void;
  updateItemQuantity: (dish: IDish, quantityToAdd: number) => void;
}

// Create context with an empty array and a dummy function as default
const CartContext = createContext<CartContextType>({
  cartState: [],
  setCartState: () => {},
  cartLenght: 0,
  setCartLenght: () => {},
  cartPrice: 0,
  setCartPrice: () => {},
  handleAddToCart: () => {},
  updateItemQuantity: () => {},
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
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  const handleAddToCart = (newDish: IDish, quantityToAdd = 1) => {
    const ItemInCart = cartState.find(
      item => item.dish.title === newDish.title
    );
    if (!ItemInCart) {
      const updatedCart = [
        ...cartState,
        { dish: newDish, quantity: quantityToAdd },
      ];
      setCartState(updatedCart);
    } else {
      const updatedCart = cartState.reduce((newCart, item) => {
        if (item.dish.title === newDish.title) {
          newCart.push({ ...item, quantity: item.quantity + quantityToAdd });
        } else {
          newCart.push(item);
        }
        return newCart;
      }, [] as CartItem[]);
      setCartState(updatedCart);
    }
  };

  const updateItemQuantity = (dish: IDish, newQuantity: number) => {
    setCartState(currentCartState => {
      const updatedCart = currentCartState.map(item => {
        if (item.dish === dish) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        setCartState,
        cartLenght,
        setCartLenght,
        cartPrice,
        setCartPrice,
        handleAddToCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the context
export const useCart = () => useContext(CartContext);
