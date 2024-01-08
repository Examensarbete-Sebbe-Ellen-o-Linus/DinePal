import { Title } from '@mantine/core';

import classes from './LongButton.module.scss';

interface ILongButton {
  text: string;
  color: 'black' | 'orange';
  type?: 'button' | 'submit';
}

export default function LongButton({
  text: text,
  color,
  type = 'button',
}: ILongButton) {
  // Assign a CSS class to 'buttonColor' based on the 'color' prop passed from the parent.
  // The 'color' prop should be either 'black' or 'orange'.
  const buttonColor = `${classes.container} ${classes[color]}`;

  return (
    <button className={buttonColor} type={type}>
      <Title order={6}>{text}</Title>
    </button>
  );
}
