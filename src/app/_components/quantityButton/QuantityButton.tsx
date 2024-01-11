'use Client';

import { Box } from '@mantine/core';
import scss from './quantityButton.module.scss';

interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
}

export default function QuantityButton({ quantity, setQuantity }: Props) {
  const changeQuantity = (operator: string) => {
    if (operator === '+') {
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box className={scss.quantity}>
      {quantity}
      <Box className={scss.controls}>
        <button onClick={() => changeQuantity('+')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='7'
            height='5'
            viewBox='0 0 7 5'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.17575 0.801235C3.35474 0.622245 3.64494 0.622245 3.82393 0.801235L6.57393 3.55123C6.75292 3.73023 6.75292 4.02043 6.57393 4.19942C6.39494 4.37841 6.10474 4.37841 5.92575 4.19942L3.49984 1.77351L1.07393 4.19942C0.894938 4.37841 0.604737 4.37841 0.425747 4.19942C0.246756 4.02043 0.246756 3.73023 0.425747 3.55123L3.17575 0.801235Z'
              fill='#F5F5F1'
            />
          </svg>
        </button>
        <button onClick={() => changeQuantity('-')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='11'
            viewBox='0 0 11 11'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.42575 3.80123C2.60474 3.62224 2.89494 3.62224 3.07393 3.80123L5.49984 6.22714L7.92575 3.80123C8.10474 3.62224 8.39494 3.62224 8.57393 3.80123C8.75292 3.98023 8.75292 4.27043 8.57393 4.44942L5.82393 7.19942C5.64494 7.37841 5.35474 7.37841 5.17575 7.19942L2.42575 4.44942C2.24676 4.27043 2.24676 3.98023 2.42575 3.80123Z'
              fill='#F5F5F1'
            />
          </svg>
        </button>
      </Box>
    </Box>
  );
}
