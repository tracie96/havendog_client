import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  Card, 
  CardContent,
  Avatar,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Pets, 
  Home, 
  Favorite, 
  Security, 
  Schedule, 
  Star,
  ArrowForward,
  CheckCircle,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PinkGradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(0deg, #a80c5c 0%, #a80c5c 99%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 80,
    height: 80,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  }
}));

const PlayfulCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(145deg, #ffffff 0%, #fef7f7 100%)',
  border: '2px solid #f5d1e0',
  boxShadow: '0 8px 32px rgba(168, 12, 92, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(168, 12, 92, 0.3)',
  }
}));

const PlayfulButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(0deg, #a80c5c 0%, #a80c5c 39%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 6px 20px rgba(168, 12, 92, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(0deg, #8a0a4a 0%, #e8c1d0 99%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(168, 12, 92, 0.5)',
  }
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  background: 'linear-gradient(0deg, #a80c5c 0%, #f5d1e0 99%)',
  border: '3px solid #f5d1e0',
  marginBottom: theme.spacing(2),
}));

const PetBoardingLanding = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Home />,
      title: "Home Away From Home",
      description: "Your pet will enjoy a comfortable, safe environment with 24/7 care and attention."
    },
    {
      icon: <Security />,
      title: "Safe & Secure",
      description: "Secure facilities with monitored access and emergency protocols in place."
    },
    {
      icon: <Schedule />,
      title: "Flexible Scheduling",
      description: "Book short-term or long-term stays with flexible drop-off and pick-up times."
    },
    {
      icon: <Favorite />,
      title: "Loving Care",
      description: "Our experienced staff provides personalized attention and lots of love."
    }
  ];

  const benefits = [
    "24/7 Professional Care",
    "Daily Exercise & Playtime",
    "Medication Administration",
    "Regular Health Monitoring",
    "Photo Updates",
    "Emergency Vet Access"
  ];

  const handleBookNow = () => {
    navigate('/pet-boarding/form');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Navigation */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ 
            color: '#a80c5c',
            fontWeight: 'bold',
            mb: 2,
            '&:hover': {
              backgroundColor: 'rgba(168, 12, 92, 0.1)'
            }
          }}
        >
          Back to Website
        </Button>
      </Box>

      {/* Hero Section */}
      <PinkGradientBox>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              🐾 Pet Boarding
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                mb: 3,
                fontWeight: 300,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Where Your Furry Friends Feel at Home
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                mb: 4,
                lineHeight: 1.6
              }}
            >
              Give your pet the vacation they deserve! Our premium boarding services 
              provide a safe, comfortable, and fun environment for your beloved companion.
            </Typography>
            <PlayfulButton 
              variant="contained" 
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleBookNow}
              sx={{ 
                background: 'white',
                color: '#a80c5c',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Book Now
            </PlayfulButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  background: 'rgba(255,255,255,0.2)',
                  border: '4px solid rgba(255,255,255,0.3)',
                  margin: '0 auto',
                  fontSize: '4rem'
                }}
              >
                <Pets sx={{ fontSize: 'inherit' }} />
              </Avatar>
            </Box>
          </Grid>
        </Grid>
      </PinkGradientBox>

      {/* Features Section */}
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 6, 
          fontWeight: 'bold',
          background: 'linear-gradient(0deg, #a80c5c, #f5d1e0)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Why Choose Our Pet Boarding?
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <PlayfulCard>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#a80c5c' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </PlayfulCard>
          </Grid>
        ))}
      </Grid>

      {/* Benefits Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #fef7f7 0%, #ffeef0 100%)',
          border: '2px solid #f5d1e0'
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#a80c5c',
            mb: 4
          }}
        >
          What's Included in Your Pet's Stay
        </Typography>
        <Grid container spacing={2}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: '#a80c5c', mr: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {benefit}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Testimonial Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#a80c5c',
            mb: 4
          }}
        >
          Happy Pet Parents Say
        </Typography>
        <PlayfulCard sx={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} sx={{ color: '#ffd700', fontSize: '2rem' }} />
              ))}
            </Box>
            <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2, color: '#a80c5c' }}>
              "My dog Max absolutely loves staying here! The staff treats him like family 
              and I get daily photo updates. I never worry when I'm away."
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              - Sarah M., Happy Pet Parent
            </Typography>
          </CardContent>
        </PlayfulCard>
      </Box>

      {/* CTA Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#a80c5c',
            mb: 2
          }}
        >
          Ready to Book Your Pet's Stay?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
          Fill out our simple form and we'll take care of the rest!
        </Typography>
        <PlayfulButton 
          variant="contained" 
          size="large"
          endIcon={<ArrowForward />}
          onClick={handleBookNow}
        >
          Start Booking Process
        </PlayfulButton>
      </Box>
    </Container>
  );
};

export default PetBoardingLanding;
