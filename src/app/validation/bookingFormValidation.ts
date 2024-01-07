import * as Yup from 'yup';

export const bookingFormValidation = Yup.object({
  guests: Yup.number()
    .required('Var god välj antal gäster')
    .max(8, 'Var god kontakta oss vid sällskap större än 8 personer'),
  time: Yup.string().required('Var god välj tid'),
  date: Yup.date().required('Var god välj ett datum').nullable(),
  firstName: Yup.string().required('Var god uppge förnamn'),
  lastName: Yup.string().required('Var god uppge efternamn'),
  email: Yup.string()
    .email('Ogiltig mailadress')
    .required('Var god uppge mailadress'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Ett telefonnummer bör bestå av endast siffror')
    .required('Var god uppge telefonnummer'),
  commentary: Yup.string().max(200, 'Max 150 tecken'),
});
