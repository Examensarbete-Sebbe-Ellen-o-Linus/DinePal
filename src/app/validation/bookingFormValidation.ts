import * as Yup from 'yup';

export const bookingFormValidation = Yup.object({
  firstName: Yup.string().required('Var god uppge förnamn'),
  lastName: Yup.string().required('Var god uppge efternamn'),
  email: Yup.string().email('Ogiltig mailadress').required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Ett telefonnummer bör bestå av endast siffror')
    .required('Required'),
  commentary: Yup.string().max(200, 'Max 150 tecken'),
});
