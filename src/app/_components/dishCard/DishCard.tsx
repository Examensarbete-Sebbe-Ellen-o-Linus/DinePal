import { Box, Text, Title } from '@mantine/core';

import avocadoToast from '../../../../public/images/avocado-toast.jpg';
import line from '../../../../public/images/line.png';
import AddButton from '../addButton/AddButton';
import classes from './DishCard.module.css';

interface IDishCard {
  showDescription: boolean;
}

export default function DishCard({ showDescription }: IDishCard) {
  return (
    <Box className={classes.card}>
      <img
        className={classes.image}
        src={avocadoToast.src}
        alt='A crunchy toast with avocado, cream-cheese and other vegetables.'
      />

      <Box className={classes.headingPrice}>
        <Title order={6}>Avoavo</Title>
        <Text>99 :-</Text>
      </Box>

      {showDescription && (
        <Text>
          Bellis populära avokadotoast, färskost, avocadoröra, chiliflakes,
          sesamfrön, blåbär, picklad lök och ärtskott
        </Text>
      )}

      <Box className={classes.iconContainer}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M15 11.063C12.53 13.65 10.059 20 10.059 20C10.059 20 6.529 11.063 3 9'
            stroke='black'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M20.4958 5.57692L20.9218 10.0009C21.1978 12.8709 19.0468 15.4259 16.1768 15.7029C13.3608 15.9729 10.8098 13.9149 10.5388 11.0989C10.4742 10.4293 10.5422 9.75351 10.7389 9.11017C10.9355 8.46682 11.257 7.86852 11.6849 7.34942C12.1128 6.83032 12.6387 6.40061 13.2327 6.08481C13.8267 5.76901 14.4771 5.57333 15.1468 5.50892L19.8628 5.05492C19.9386 5.04761 20.0152 5.05532 20.088 5.0776C20.1609 5.09988 20.2286 5.1363 20.2874 5.18477C20.3462 5.23325 20.3949 5.29283 20.4306 5.36012C20.4664 5.4274 20.4885 5.50108 20.4958 5.57692Z'
            stroke='black'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M8 2H16M9 2V3.343M15 2V4.789C15 5.57879 15.2338 6.3509 15.672 7.008L16.328 7.992C16.7663 8.64939 17.0002 9.42187 17 10.212V11.343M7.8 7.8L7.672 7.992C7.23366 8.64939 6.99982 9.42187 7 10.212V20C7 20.5304 7.21071 21.0391 7.58579 21.4142C7.96086 21.7893 8.46957 22 9 22H15C15.5304 22 16.0391 21.7893 16.4142 21.4142C16.7893 21.0391 17 20.5304 17 20V17'
            stroke='black'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M7 15C7.79175 14.6683 8.64158 14.4975 9.5 14.4975C10.3584 14.4975 11.2083 14.6683 12 15C13.0842 15.4543 14.2717 15.6047 15.435 15.435M2 2L22 22'
            stroke='black'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </Box>
      <img className={classes.line} src={line.src} alt='A gray line' />
      <AddButton showAddIcon={true} text={'Lägg till'} color={'black'} />
    </Box>
  );
}
