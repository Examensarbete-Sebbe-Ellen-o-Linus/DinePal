import { Box, Modal, Text } from '@mantine/core';
import { useState } from 'react';

import { type CartItem } from 'context/initializers';
import { formatPrice } from '~/app/formatPrice';
import LongButton from '../../longButton/LongButton';
import { type FormikValues } from '../CheckoutForm';
import classes from './CheckoutModal.module.scss';

interface ICheckoutModal {
  formikValues: FormikValues;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReset: () => void;
  cartItems: CartItem[];
  cartPrice: number;
}

export default function CheckoutModal({
  formikValues,
  isOpen,
  onClose,
  onConfirm,
  onReset,
  cartItems,
  cartPrice,
}: ICheckoutModal) {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  function handleConfirm() {
    console.log('Booking data:', formikValues);
    onConfirm();
    onReset();
    onClose();
    setConfirmationModalOpen(true);
  }

  function closeConfirmationModal() {
    setConfirmationModalOpen(false);
    onClose();
  }

  function CheckoutInfo() {
    return (
      <Box>
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
          <strong>Rätter:</strong>
          {cartItems.map((item, index) => (
            <span key={index}>
              <br />x{item.quantity} {item.dish.title}
              {index < cartItems.length - 1 ? ', ' : ''}
            </span>
          ))}
        </Text>
        <Text>
          <strong>Totalpris:</strong> {formatPrice(cartPrice)} :-
        </Text>
        <br />
        <Text>
          <strong>Kommentar:</strong> {formikValues.commentary}
        </Text>

        {/*Leave this for future development */}
        {/* <Text>
          <strong>Adress:</strong> {formikValues.address}
        </Text>
        <Text>
          <strong>Postnummer:</strong> {formikValues.postcode}
        </Text>
        <Text>
          <strong>Ort:</strong> {formikValues.city}
        </Text>
        <Text>
          <strong>Betalsätt:</strong> {formikValues.paymentMethod}
        </Text> */}
      </Box>
    );
  }

  return (
    <Box>
      <Modal
        size='sm'
        opened={isOpen}
        onClose={onClose}
        title={<Text>Bekräfta din beställning</Text>}
        centered
      >
        <Box className={classes.containerConfirmModal}>
          <CheckoutInfo />
          <Box onClick={handleConfirm}>
            <LongButton text={'Bekräfta'} color={'black'} />
          </Box>
        </Box>
      </Modal>

      <Modal
        size='sm'
        opened={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        title={<Text>Tack för din beställning!</Text>}
        centered
      >
        <Box className={classes.containerCheckoutDoneModal}>
          <Text>
            Beställning är mottagen och du får snart ta emot ytterligare
            information om när din måltid är redo för upphämtning.
          </Text>

          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='81'
              height='80'
              viewBox='0 0 81 80'
              fill='none'
            >
              <g clipPath='url(#clip0_449_5706)'>
                <path
                  d='M40.5 80C29.8913 80 19.7172 75.7857 12.2157 68.2843C4.71427 60.7828 0.5 50.6087 0.5 40C0.5 29.3913 4.71427 19.2172 12.2157 11.7157C19.7172 4.21427 29.8913 0 40.5 0C51.1087 0 61.2828 4.21427 68.7843 11.7157C76.2857 19.2172 80.5 29.3913 80.5 40C80.5 50.6087 76.2857 60.7828 68.7843 68.2843C61.2828 75.7857 51.1087 80 40.5 80ZM32.5 60L68.5 26L62.5 20L32.5 48L18.5 34L12.5 40L32.5 60Z'
                  fill='#221F1F'
                />
              </g>
              <defs>
                <clipPath id='clip0_449_5706'>
                  <rect
                    width='80'
                    height='80'
                    fill='white'
                    transform='translate(0.5)'
                  />
                </clipPath>
              </defs>
            </svg>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
