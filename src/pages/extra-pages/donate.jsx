import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { Stack, InputLabel, OutlinedInput, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '@mui/system';

const DonatePage = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [values, setValues] = useState({ email: '', amount: '', firstname: '', lastname: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(true);

  console.log('publicKey:', publicKey);

  const paystackProps = {
    email: values.email,
    amount: values.amount * 100,
    publicKey,
    text: 'Donate Now',
    onSuccess: (response) => {
      console.log('Payment successful:', response);
      setOpenModal(true);
      // Clear all form fields
      setValues({ email: '', amount: '', firstname: '', lastname: '' });
      setTouched({});
      setErrors({});
    },
    onClose: () => {
      console.log('Payment window closed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    // Basic validation
    if (name === 'email') {
      setErrors({ ...errors, email: !value.includes('@') ? 'Please enter a valid email' : '' });
    } else if (name === 'amount') {
      setErrors({ ...errors, amount: value <= 0 ? 'Amount must be greater than 0' : '' });
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isFormValid = () => {
    return values.email && values.amount > 0 && !errors.email && !errors.amount;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <HomeHeader />
      <div style={{ textAlign: 'center', padding: '50px', maxWidth: '700px', margin: 'auto' }}>
        <h2>Donate to help animals in Nigeria</h2>
        <p>
          You can be confident that your contribution to Haven Pet Home and Animal Care Foundation will go directly toward helping animals—by
          ending cruel experiments, supporting investigations to expose abuse on large-scale farms, preventing animals from being harmed.
        </p>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Stack spacing={1} flex={1}>
              <InputLabel htmlFor="first-name" style={{ textAlign: 'left' }}>
                First Name
              </InputLabel>
              <OutlinedInput
                id="first-name"
                type="text"
                value={values.firstname}
                name="firstname"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter first name"
                fullWidth
                error={Boolean(touched.firstname && errors.firstname)}
              />
            </Stack>
            <Stack spacing={1} flex={1}>
              <InputLabel htmlFor="last-name" style={{ textAlign: 'left' }}>
                Last Name
              </InputLabel>
              <OutlinedInput
                id="last-name"
                type="text"
                value={values.lastname}
                name="lastname"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter last name"
                fullWidth
                error={Boolean(touched.lastname && errors.lastname)}
              />
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login" style={{ textAlign: 'left' }}>
              Email Address
            </InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter email address"
              fullWidth
              error={Boolean(touched.email && errors.email)}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="amount" style={{ textAlign: 'left' }}>
              Donation Amount (NGN)
            </InputLabel>
            <OutlinedInput
              id="amount"
              type="number"
              value={values.amount}
              name="amount"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter donation amount"
              fullWidth
              error={Boolean(touched.amount && errors.amount)}
            />
          </Stack>

          {isFormValid() ? (
            <PaystackButton
              className="paystack-button"
              {...paystackProps}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            />
          ) : (
            <Button variant="contained" color="secondary" disabled fullWidth>
              Please enter valid email and amount
            </Button>
          )}
        </Stack>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="donation-success-modal"
        aria-describedby="donation-success-message"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <CheckCircleIcon 
            color="success" 
            sx={{ 
              fontSize: 60,
              mb: 2
            }} 
          />
          <Typography variant="h5" component="h2" gutterBottom>
            Thank You!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your generous donation has been received successfully.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your support helps us continue our mission of helping animals in need.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            sx={{ mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <HomeFooter />
    </>
  );
};

export default DonatePage;
