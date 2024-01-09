import CheckoutForm from '../_components/checkoutForm/CheckoutForm';

import { Box } from '@mantine/core';
import mockUp from '../../../public/images/blueberry-pancakes.jpg';

export default function Checkout() {
  return (
    <>
      <h1>Checkout</h1>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          style={{
            width: '50%',
          }}
        >
          <CheckoutForm />
        </Box>
        <Box style={{ width: '50%' }}>
          <img src={mockUp.src} alt='Mockup' />
        </Box>
      </Box>
    </>
  );
}
