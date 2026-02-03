import * as Yup from 'yup';

const basicSchema = Yup.object().shape({
  name: Yup.string().required(''),
  email: Yup.string().email('Invalid email format').required('required'),
  password: Yup.string().min(6, 'At least 6 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/\d/, 'At least one number')
    .required('required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export default basicSchema;

