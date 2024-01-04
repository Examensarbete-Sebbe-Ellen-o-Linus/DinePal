import { Box, Container, Image, Text, Title } from '@mantine/core';
import type { INews } from '~/app/interfaces';
import scss from './News.module.scss';

export default async function News({ news }: { news: INews }) {
  return (
    <Container className={scss.container}>
      <Box>
        <Title order={3}>{news.title}</Title>
        <Text>{news.description}</Text>
      </Box>
      <Image src={news.image.url} alt={news.image.alt}></Image>
    </Container>
  );
}
