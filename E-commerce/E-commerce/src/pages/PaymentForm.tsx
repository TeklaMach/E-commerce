import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Typography, TextField, Grid, 
FormControlLabel,Checkbox} from '@mui/material';

const PaymentForm: React.FC = () => {
  const initialValues = {
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
  };

  const validationSchema = Yup.object({
    cardName: Yup.string().required('Name on card is required'),
    cardNumber: Yup.string().required('Card number is required'),
    expDate: Yup.string().required('Expiry date is required'),
    cvv: Yup.string().required('CVV is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={formik.values.cardName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cardName && Boolean(formik.errors.cardName)}
            helperText={formik.touched.cardName && formik.errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={formik.values.expDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expDate && Boolean(formik.errors.expDate)}
            helperText={formik.touched.expDate && formik.errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value={formik.values.saveCard} onChange={formik.handleChange} />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
