'use client';

import { Box, Container, Divider, Text, Title } from '@mantine/core';
import { useCart } from 'context/cartContext';
import { useEffect, useState } from 'react';
import AddButton from '~/app/_components/addButton/AddButton';
import Placeholder from '~/app/_components/placeholder/Placeholder';
import Tags from '~/app/_components/tags/Tags';
import { type IDish } from '~/app/interfaces';
import { fetchSingleDish } from '~/server/sanity/sanity.utils';
import QuantityButton from '../../_components/quantityButton/QuantityButton';
import scss from './page.module.scss';

interface Props {
  params: {
    product: string;
  };
}

export default function Product({ params }: Props) {
  const slug = params.product;
  const { handleAddToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [dish, setDish] = useState<IDish | null>(null);
  const [error, setError] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadDish = async () => {
      try {
        const fetchedDish = await fetchSingleDish(slug);
        setDish(fetchedDish);
      } catch (err) {
        setError(error);
      }
    };

    void loadDish();
  }, [error, slug]);

  if (dish) {
    const addToCart = (quantity: number) => {
      handleAddToCart(dish, quantity);
      setQuantity(1);
    };

    return (
      <Container size={1120} className={scss.container}>
        <Box className={scss.card}>
          {dish.image.url ? (
            <img
              src={dish.image.url}
              alt={dish.image.alt}
              className={scss.image}
            />
          ) : (
            <Placeholder />
          )}
          <Box className={scss.text}>
            <Box>
              <Box className={scss.top}>
                <Title order={2}>{dish.title}</Title>
                <Title order={3}>{dish.price} :-</Title>
              </Box>
              <Box className={scss.middle}>
                <Text>{dish.description}</Text>
                <Box className={scss.iconContainer}>
                  <Tags dish={dish} />
                </Box>
              </Box>
              <Divider />
            </Box>
            <Box className={scss.bottom}>
              <QuantityButton quantity={quantity} setQuantity={setQuantity} />
              <AddButton
                showAddIcon={true}
                text={'Lägg till'}
                color={'black'}
                onClick={() => addToCart(quantity)}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
}
