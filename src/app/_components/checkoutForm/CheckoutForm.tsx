'use client';
import { Box, TextInput, Textarea } from '@mantine/core';
import type { Order } from '@prisma/client';
import { useCart } from 'context/cartContext';
import { useFormik } from 'formik';
import { customAlphabet } from 'nanoid';
import { useState } from 'react';
import { io } from 'socket.io-client';
import { checkoutFormValidation } from '~/app/_validation/checkoutFormValidation';
import { api } from '~/trpc/react';
import LongButton from '../longButton/LongButton';
import classes from './CheckoutForm.module.scss';
import CheckoutModal from './components/CheckoutModal';

export interface FormikValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;

  // Leave this for future development
  // address: string;
  // postcode: string;
  // city: string;
  // paymentMethod: string;
}

const socket = io('https://socket-server-dinepal-237ee597ef2d.herokuapp.com');
export default function CheckoutForm() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { cartState, cartPrice, setCartState } = useCart();
  const [order, setOrder] = useState<Order>();

  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwqxzy1234567890', 4);

  const createOrder = api.order.createOrder.useMutation({
    onSuccess: async data => {
      setOrder(data); // När ordern har lyckats fås detta svar.
      console.log('Order created! Order data:', data);
      setModalOpen(false);
      formik.resetForm();
      socket.emit('orderCreated', 'order created');
      setCartState([]);
    },
    onError: error => {
      console.log('Error creating order:', error);
    },
  });

  const adaptedCart = cartState.map(item => ({
    ...item.dish,
    quantity: item.quantity,
    image: {
      url: item.dish.image?.url || 'default-image-url',
    },
    tags: {
      tag: item.dish.tags || [],
    },
  }));

  const handleCreateOrder = () => {
    const createdOrderNumber = nanoid().toString();
    console.log('order nummer:', createdOrderNumber);
    createOrder.mutate({
      cart: adaptedCart,
      customer: formik.values,
      orderStatus: 'received',
      totalPrice: cartPrice,
      orderNumber: createdOrderNumber,
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      comment: '',

      // Leave this for future development
      // address: '',
      // postcode: '',
      // city: '',
      // paymentMethod: 'Klarna',
    },
    validationSchema: checkoutFormValidation,
    onSubmit: values => {
      console.log(values);
      console.log('Form submitted with values:', values);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  function resetForm() {
    formik.resetForm();
  }

  async function handleSubmitForm() {
    await formik.setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,

      // Leave this for future development
      // address: true,
      // postcode: true,
      // city: true,
      // paymentMethod: true,
    });

    void formik.validateForm().then(errors => {
      if (Object.keys(errors).length === 0) {
        setModalOpen(true);
      }
    });
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.formContainer}>
        <form>
          <TextInput
            withAsterisk={true}
            label='Förnamn'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />

          <TextInput
            withAsterisk={true}
            label='Efternamn'
            name='lastName'
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.lastName && formik.errors.lastName}
          />

          <TextInput
            withAsterisk={true}
            label='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <TextInput
            withAsterisk={true}
            min={0}
            label='Telefon'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />

          <Textarea
            label='Kommentar'
            name='comment'
            description='Max 150 tecken'
            value={formik.values.comment}
            onChange={formik.handleChange}
            placeholder='Skriv kommentar...'
            maxLength={150}
          />

          {/* Leave this for future development */}
          {/* <TextInput
            withAsterisk={true}
            label='Adress'
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && formik.errors.address}
          />

          <TextInput
            withAsterisk={true}
            label='Postnummer'
            name='postcode'
            value={formik.values.postcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.postcode && formik.errors.postcode}
          />

          <TextInput
            withAsterisk={true}
            label='Ort'
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && formik.errors.city}
          /> */}

          <Box className={classes.paymentMethodContainer}>
            {/* <Box>
              <Radio
                name='paymentMethod'
                value='Klarna'
                checked={formik.values.paymentMethod === 'Klarna'}
                onChange={formik.handleChange}
                color={theme.colors?.black?.[3]}
              />
              <Text>Betala med Klarna</Text>
            </Box>

            <Box>
              <Radio
                name='paymentMethod'
                value='Kort'
                checked={formik.values.paymentMethod === 'Kort'}
                onChange={formik.handleChange}
                color={theme.colors?.black?.[3]}
              />
              <Text>Betala med kort</Text>
            </Box> */}

            <LongButton
              text={'Lägg order'}
              color={'black'}
              onClick={() => handleSubmitForm()}
            />
          </Box>
        </form>
      </Box>
      <CheckoutModal
        formikValues={formik.values}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleCreateOrder()}
        onReset={resetForm}
        cartItems={cartState}
        cartPrice={cartPrice}
        order={order}
      />
    </Box>
  );
}
