import { Title } from '@mantine/core';
import scss from './AddButton.module.scss';

interface IAddButton {
  showAddIcon: boolean;
  text: string;
  color: 'black' | 'orange';
  onClick: () => void;
}

export default function AddButton({
  showAddIcon,
  text,
  color,
  onClick,
}: IAddButton) {
  // Assign a CSS class to 'buttonColor' based on the 'color' prop passed from the parent.
  // The 'color' prop should be either 'black' or 'orange'.
  const buttonColor = `${scss.container} ${scss[color]}`;

  return (
    <button className={buttonColor} onClick={onClick}>
      <Title order={6}>{text}</Title>
      {showAddIcon && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z'
            fill='var(--svg-fill-color)'
          />
        </svg>
      )}
    </button>
  );
}
