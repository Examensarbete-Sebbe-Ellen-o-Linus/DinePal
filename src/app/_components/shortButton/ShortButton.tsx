import { Title } from '@mantine/core';

import classes from './ShortButton.module.scss';

interface IShortButton {
  text: string;
  color: 'black' | 'orange';
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function ShortButton({
  text: text,
  color,
  type = 'button',
  onClick,
}: IShortButton) {
  // Assign a CSS class to 'buttonColor' based on the 'color' prop passed from the parent.
  // The 'color' prop should be either 'black' or 'orange'.
  const buttonColor = `${classes.container} ${classes[color]}`;
  return (
    <button className={buttonColor} type={type} onClick={onClick}>
      <Title order={6}>{text}</Title>
    </button>
  );
}
