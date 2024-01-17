import { Box, Divider, Text, Title } from '@mantine/core';
import { useCart } from 'context/cartContext';
import { type CartItem } from 'context/initializers';
import { useEffect, useState } from 'react';
import { IImage } from '~/app/interfaces';
import { fetchSettingsData } from '~/server/sanity/sanity.utils';
import Quantity from '../quantityButton/QuantityButton';
import { RemoveFromCartButton } from '../removeFromCart/removeFromCart';
import classes from './CartCard.module.scss';

interface ICartCard {
  item: CartItem;
}

export default function CartCard({ item }: ICartCard) {
  const { updateItemQuantity } = useCart();
  const [logo, setLogo] = useState<IImage | null>(null);

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
        <img src={item.dish.image.url} alt={item.dish.image.alt} />
      ) : (
        <img src={logo?.url} alt={logo?.alt} className={classes.error} />
      )}
      <Title order={6}>{item.dish.title}</Title>
      <Text>{item.dish.price} :-</Text>
      <Divider mt={0} mb={0} w={'100%'} my='md' />
      <Box className={classes.selectRemove}>
        <Quantity
          quantity={item.quantity}
          setQuantity={newQuantity =>
            updateItemQuantity(item.dish, newQuantity)
          }
        />
        <Box>
          <RemoveFromCartButton dish={item.dish} />
        </Box>
      </Box>
    </Box>
  );
}
