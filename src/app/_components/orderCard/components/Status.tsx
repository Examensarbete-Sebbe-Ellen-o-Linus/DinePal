import { Box } from '@mantine/core';
import { theme } from '~/app/theme/theme';
import classes from './Status.module.scss';

interface IStatus {
  status: 'received' | 'ongoing' | 'completed';
}

export default function Status({ status }: IStatus) {
  let color: string;

  switch (status) {
    case 'received':
      color = theme.colors?.red ? theme.colors.red[9] : '#C92A2A';
      break;
    case 'ongoing':
      color = theme.colors?.yellow ? theme.colors.yellow[9] : '#E67700';
      break;
    case 'completed':
      color = theme.colors?.teal ? theme.colors.teal[9] : '#087F5B';
      break;
    default:
      color = '#C92A2A';
  }

  return (
    <Box style={{ backgroundColor: color }} className={classes.container}></Box>
  );
}
