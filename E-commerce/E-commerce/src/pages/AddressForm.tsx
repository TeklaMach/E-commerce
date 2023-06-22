import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address1: Yup.string().required('Address line 1 is required'),
  city: Yup.string().required('City is required'),
  zip: Yup.string().required('Zip / Postal code is required'),
  country: Yup.string().required('Country is required'),
});

export default function AddressForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      saveAddress: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Shipping address
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
          variant="standard"
          value={values.address1}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address1 && Boolean(errors.address1)}
          helperText={touched.address1 && errors.address1}
        />
      </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={values.city}
            onChange={handleChange}
            autoComplete="shipping address-level2"
            variant="standard"
            onBlur={handleBlur}
            error={touched.city && Boolean(errors.city)}
          helperText={touched.city && errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.zip}
            error={touched.zip && Boolean(errors.zip)}
          helperText={touched.zip && errors.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
            error={touched.country && Boolean(errors.country)}
          helperText={touched.country && errors.country}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}