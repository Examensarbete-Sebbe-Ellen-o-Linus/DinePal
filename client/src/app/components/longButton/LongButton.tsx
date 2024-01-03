import { Title } from "@mantine/core";
import classes from "./LongButton.module.css";

interface ILongButton {
  showAddIcon: boolean;
  text: string;
  color: "black" | "orange";
}

export default function LongButton({
  showAddIcon: showAddButton,
  text: buttonText,
  color,
}: ILongButton) {
  // Assign a CSS class to 'buttonColor' based on the 'color' prop passed from the parent.
  // The 'color' prop should be either 'black' or 'orange'.
  const buttonColor = `${classes.container} ${classes[color]}`;

  return (
    <button className={buttonColor}>
      <Title order={6}>{buttonText}</Title>
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
            fill="var(--svg-fill-color)"
          />
        </svg>
      )}
    </button>
  );
}
