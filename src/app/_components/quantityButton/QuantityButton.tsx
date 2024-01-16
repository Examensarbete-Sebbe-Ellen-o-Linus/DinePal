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
            width='11'
            height='11'
            viewBox='0 0 11 11'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5.17575 3.80123C5.35474 3.62224 5.64494 3.62224 5.82393 3.80123L8.57393 6.55123C8.75292 6.73023 8.75292 7.02043 8.57393 7.19942C8.39494 7.37841 8.10474 7.37841 7.92575 7.19942L5.49984 4.77351L3.07393 7.19942C2.89494 7.37841 2.60474 7.37841 2.42575 7.19942C2.24676 7.02043 2.24676 6.73023 2.42575 6.55123L5.17575 3.80123Z'
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
