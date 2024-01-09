'use client';
import { Box, Radio, Text, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import { useState } from 'react';

import { theme } from '~/app/theme/theme';
import { bookingFormValidation } from '~/app/validation/bookingFormValidation';
import LongButton from '../longButton/LongButton';
import classes from './CheckoutForm.module.scss';

export default function CheckoutForm() {
  const [selectedRadio, setSelectedRadio] = useState('klarna');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postcode: '',
      city: '',
    },
    validationSchema: bookingFormValidation,
    onSubmit: values => {
      console.log(values);
      console.log('Form submitted with values:', values);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });
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
            label='Telefon'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />

          <TextInput
            withAsterisk={true}
            label='Adress'
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />

          <TextInput
            withAsterisk={true}
            label='Postnummer'
            name='postcode'
            value={formik.values.postcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />

          <TextInput
            withAsterisk={true}
            label='Ort'
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />
          <Box className={classes.paymentContainer}>
            <Box>
              <Radio
                checked={selectedRadio === 'klarna'}
                onChange={() => setSelectedRadio('klarna')}
                color={theme.colors?.black?.[3]}
              />
              <Text>Betala med Klarna</Text>
            </Box>

            <Box>
              <Radio
                checked={selectedRadio === 'creditcard'}
                onChange={() => setSelectedRadio('creditcard')}
                color={theme.colors?.black?.[3]}
              />
              <Text>Betala med kort</Text>
            </Box>

            <LongButton text={'Betala'} color={'black'} />
          </Box>
        </form>
      </Box>
    </Box>
  );
}
