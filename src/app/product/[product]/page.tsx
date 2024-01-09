/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Box,
  Container,
  Divider,
  NumberInput,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import AddButton from '~/app/_components/addButton/AddButton';
import { IconKey, tagDetails } from '~/app/_components/dishCard/DishCard';
import { fetchSingleDish } from '~/server/sanity/sanity.utils';
import scss from './page.module.scss';

interface Props {
  params: {
    product: string;
  };
}

export default async function Product({ params }: Props) {
  const slug = params.product;
  const dish = await fetchSingleDish(slug);

  return (
    <Container className={scss.container}>
      <Box className={scss.card}>
        <img src={dish.image.url} alt={dish.image.alt} />
        <Box className={scss.text}>
          <Box>
            <Box className={scss.top}>
              <Title order={2}>{dish.title}</Title>
              <Title order={3}>{dish.price} :-</Title>
            </Box>
            <Box className={scss.middle}>
              <Text>{dish.description}</Text>
              <Box className={scss.iconContainer}>
                {dish.tags.map((tagValue, i) => {
                  const tagInfo = tagDetails[tagValue as IconKey];
                  if (!tagInfo) return null;
                  const { title, Icon } = tagInfo;
                  return (
                    <Tooltip label={title} key={i}>
                      <Box>
                        <Icon />
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            </Box>
            <Divider />
          </Box>
          <Box className={scss.bottom}>
            <NumberInput
              className={scss.input}
              defaultValue={1}
              min={1}
              max={100}
              size={'xs'}
              allowDecimal={false}
            />
            <AddButton showAddIcon={true} text={'Lägg till'} color={'black'} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
