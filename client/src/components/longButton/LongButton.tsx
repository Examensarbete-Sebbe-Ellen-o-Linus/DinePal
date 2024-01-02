import { Box } from '@mantine/core';

import classes from './LongButton.module.css';

interface ILongButton {
  showAddButton: boolean;
  buttonText: string;
}

export default function LongButton({ showAddButton, buttonText }: ILongButton) {
  return (
    <Box className={classes.container}>
      {buttonText}
      {showAddButton && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
            fill="#F5F5F1"
          />
        </svg>
      )}
    </Box>
  );
}
