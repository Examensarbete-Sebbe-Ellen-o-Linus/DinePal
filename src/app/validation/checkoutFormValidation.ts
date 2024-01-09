import * as Yup from 'yup';

export const checkoutFormValidation = Yup.object({
  firstName: Yup.string().required('Var god uppge förnamn'),
  lastName: Yup.string().required('Var god uppge efternamn'),
  email: Yup.string()
    .email('Ogiltig mailadress')
    .required('Var god uppge mailadress'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Ett telefonnummer bör bestå av endast siffror')
    .required('Var god uppge telefonnummer'),
  address: Yup.string().required('Var god uppge adress'),
  postcode: Yup.string()
    .matches(/^[0-9]+$/, 'Ett postnummer bör bestå av endast siffror')
    .required('Var god uppge postnummer'),
  city: Yup.string().required('Var god uppge ort'),
});
