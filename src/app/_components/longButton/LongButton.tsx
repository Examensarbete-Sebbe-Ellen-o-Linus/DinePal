import { Title } from '@mantine/core';

import classes from './LongButton.module.css';

interface ILongButton {
  showAddIcon: boolean;
  text: string;
  color: 'black' | 'orange';
}

export default function LongButton({ text: buttonText, color }: ILongButton) {
  // Assign a CSS class to 'buttonColor' based on the 'color' prop passed from the parent.
  // The 'color' prop should be either 'black' or 'orange'.
  const buttonColor = `${classes.container} ${classes[color]}`;

  return (
    <button className={buttonColor}>
      <Title order={6}>{buttonText}</Title>
    </button>
  );
}
