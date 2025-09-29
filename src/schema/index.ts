import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});
export const signUpSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  first_name: yup
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  last_name: yup
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  phone_number: yup.string().required('Phone number is required'),
  // .matches(/^0[789][01]\d{8}$/, "Invalid phone number format"),
  password: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>-]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

export const firstTimerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  first_name: yup.string().trim().min(2).required('First name is required'),
  last_name: yup.string().trim().min(2).required('Last name is required'),
  phone_number: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  location: yup.string().required('Please select Yes or No'),
  interest: yup.string().required('Please select Yes, Maybe or No'),
  
  address_in_ibadan: yup
    .string()
    .trim()
    .when(['location', 'interest'], {
      is: (location:any, interest:any) => location === 'yes' && interest === 'yes',
      then: (schema) => schema.min(5).required('Address in Ibadan is required'),
      otherwise: (schema) => schema.nullable().optional()
    }),
  
  dob: yup
    .string()
    .when(['location', 'interest'], {
      is: (location:any, interest:any) => location === 'yes' && interest === 'yes',
      then: (schema) => schema.matches(
        /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])$/,
        "Date of Birth must be in dd/mm format"
      ).required("Date of Birth is required"),
      otherwise: (schema) => schema.nullable().optional()
    }),

  occupation: yup
    .string()
    .trim()
    .when(['location', 'interest'], {
      is: (location:any, interest
        :any
      ) => location === 'yes' && interest === 'yes',
      then: (schema) => schema.min(2).required('Occupation is required'),
      otherwise: (schema) => schema.nullable().optional()
    }),

  born_again: yup
    .string()
    .when(['location', 'interest'], {
      is: (location:any, interest:any) => location === 'yes' && interest === 'yes',
      then: (schema) => schema.required('Please select an option'),
      otherwise: (schema) => schema.nullable().optional()
    }),

  service_experience: yup
    .string()
    .trim()
    .required('Please share what you enjoyed about the service'),
  prayer_point: yup.string().trim().nullable(),
  whatsapp_interest: yup.string().required('Please select Yes or No'),
});
