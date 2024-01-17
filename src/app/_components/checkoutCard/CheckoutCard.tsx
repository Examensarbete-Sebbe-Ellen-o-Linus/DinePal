'use client';
import { Box, Divider, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import { type CartItem } from 'context/initializers';
import { useEffect, useState } from 'react';
import { formatPrice } from '~/app/formatPrice';
import { type IImage } from '~/app/interfaces';
import { fetchSettingsData } from '~/server/sanity/sanity.utils';
import Quantity from '../quantityButton/QuantityButton';
import { RemoveFromCartButton } from '../removeFromCart/removeFromCart';
import classes from './CheckoutCard.module.scss';

interface ICheckoutCard {
  item: CartItem;
}

export default function CheckoutCard({ item }: ICheckoutCard) {
  const { updateItemQuantity } = useCart();
  const [logo, setLogo] = useState<IImage | null>(null);

  function calculateTotalPrice(quantity: number, price: number): string {
    const totalPrice = quantity * price;
    return formatPrice(totalPrice);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = fetchSettingsData();
        const { header } = await settingsData;
        setLogo(header.logotype);
      } catch (err) {
        console.error;
      }
    };
    void fetchData();
  }, []);

  return (
    <Box className={classes.container}>
      {item.dish.image.url ? (
        <img
          className={classes.imgContainer}
          src={item.dish.image.url}
          alt={item.dish.image.alt}
        />
      ) : (
        <img src={logo?.url} alt={logo?.alt} className={classes.error} />
      )}
      <Box className={classes.contentContainer}>
        <Box className={classes.titlePrice}>
          <Text w={'100%'}>{item.dish.title}</Text>
          <Text style={{ whiteSpace: 'nowrap' }}>
            {calculateTotalPrice(item.quantity, item.dish.price)} :-
          </Text>
        </Box>
        <Divider mt={0} mb={0} w={'100%'} my='md' />
        <Box className={classes.selectRemove}>
          <Quantity
            quantity={item.quantity}
            setQuantity={newQuantity =>
              updateItemQuantity(item.dish, newQuantity)
            }
          />
          <RemoveFromCartButton dish={item.dish} />
        </Box>
      </Box>
    </Box>
  );
}
