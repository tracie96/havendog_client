import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { Stack, InputLabel, OutlinedInput, Button, Modal, Box, Typography, IconButton, Paper, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const DonatePage = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [values, setValues] = useState({ email: '', amount: '', firstname: '', lastname: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6, 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #fef7f7 100%)',
            border: '2px solid #f5d1e0',
            boxShadow: '0 8px 32px rgba(168, 12, 92, 0.1)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(0deg, #a80c5c, #a80c5c)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}
            >
              🐾 Donate to Help Animals in Nigeria
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                lineHeight: 1.6,
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Your generous contribution to Haven Pet Home and Animal Care Foundation will go directly toward our mission of 
              <strong style={{ color: '#a80c5c' }}> rescuing stray pets all over Nigeria</strong>, providing them with medical care, food, and shelter. 
              Your support helps us <strong style={{ color: '#a80c5c' }}>feed and take care of our shelter dogs</strong>, giving them a second chance at life 
              while we work to find them loving forever homes.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                component="a"
                href="https://gofund.me/1275b0cb8"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '999px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  background: 'linear-gradient(0deg, #a80c5c 0%, #f5d1e0 99%)',
                  boxShadow: '0 4px 15px rgba(168, 12, 92, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(0deg, #8a0a4a 0%, #e8c1d0 99%)',
                    boxShadow: '0 6px 18px rgba(138, 10, 74, 0.35)'
                  }
                }}
              >
                Support Us On GoFundMe
              </Button>
            </Box>
          </Box>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <Stack spacing={1} flex={1}>
                <InputLabel 
                  htmlFor="first-name" 
                  sx={{ 
                    textAlign: 'left',
                    color: '#a80c5c',
                    fontWeight: 'bold'
                  }}
                >
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
                  sx={{
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a80c5c',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a80c5c',
                      borderWidth: 2,
                    },
                  }}
                />
              </Stack>
              <Stack spacing={1} flex={1}>
                <InputLabel 
                  htmlFor="last-name" 
                  sx={{ 
                    textAlign: 'left',
                    color: '#a80c5c',
                    fontWeight: 'bold'
                  }}
                >
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
                  sx={{
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a80c5c',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a80c5c',
                      borderWidth: 2,
                    },
                  }}
                />
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <InputLabel 
                htmlFor="email-login" 
                sx={{ 
                  textAlign: 'left',
                  color: '#a80c5c',
                  fontWeight: 'bold'
                }}
              >
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
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#a80c5c',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#a80c5c',
                    borderWidth: 2,
                  },
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel 
                htmlFor="amount" 
                sx={{ 
                  textAlign: 'left',
                  color: '#a80c5c',
                  fontWeight: 'bold'
                }}
              >
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
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#a80c5c',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#a80c5c',
                    borderWidth: 2,
                  },
                }}
              />
            </Stack>

            {isFormValid() ? (
              <PaystackButton
                className="paystack-button"
                {...paystackProps}
                style={{
                  padding: '15px 30px',
                  background: 'linear-gradient(0deg, #a80c5c 0%, #f5d1e0 99%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(168, 12, 92, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              />
            ) : (
              <Button 
                variant="contained" 
                disabled 
                fullWidth
                sx={{
                  padding: '15px 30px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#e0e0e0',
                  color: '#9e9e9e'
                }}
              >
                Please enter valid email and amount
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
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
            sx={{ 
              fontSize: 60,
              mb: 2,
              color: '#a80c5c'
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
            onClick={handleCloseModal}
            sx={{ 
              mt: 3,
              background: 'linear-gradient(0deg, #a80c5c 0%, #f5d1e0 99%)',
              '&:hover': {
                background: 'linear-gradient(0deg, #8a0a4a 0%, #e8c1d0 99%)',
              }
            }}
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
