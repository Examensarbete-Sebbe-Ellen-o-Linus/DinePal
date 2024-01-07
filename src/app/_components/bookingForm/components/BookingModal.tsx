import { Box, Modal, Text, Title } from '@mantine/core';

import LongButton from '../../longButton/LongButton';
import { type FormikValues } from '../BookingForm';
import classes from './BookingModal.module.scss';

interface IBookingModal {
  formikValues: FormikValues;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  formikValues,
  isOpen,
  onClose,
}: IBookingModal) {
  function BookingInfo() {
    return (
      <Box>
        <Text>
          <strong>Antal gäster:</strong> {formikValues.guests}
        </Text>
        <Text>
          <strong>Datum:</strong>{' '}
          {formikValues.date
            ? formikValues.date.toLocaleDateString()
            : 'Not selected'}
        </Text>
        <Text>
          <strong>Tid:</strong> {formikValues.time}
        </Text>
        <Text>
          <strong>Förnamn:</strong> {formikValues.firstName}
        </Text>
        <Text>
          <strong>Efternamn:</strong> {formikValues.lastName}
        </Text>
        <Text>
          <strong>Email:</strong> {formikValues.email}
        </Text>
        <Text>
          <strong>Telefon:</strong> {formikValues.phone}
        </Text>
        <Text>
          <strong>Kommentar:</strong> {formikValues.commentary}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Modal
        size='sm'
        opened={isOpen}
        onClose={onClose}
        title={<Title order={6}>Bekräfta din bokning</Title>}
        centered
      >
        <Box className={classes.container}>
          <BookingInfo />
          <LongButton text={'Bekräfta'} color={'black'} />
        </Box>
      </Modal>
    </Box>
  );
}
