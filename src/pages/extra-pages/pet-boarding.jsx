import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Box, Snackbar, Alert, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_CONFIG } from 'config/api';
import axios from 'axios';
import { Pets, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

const PinkGradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(0deg, #a80c5c 0%, #a80c5c 99%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -30,
    right: -30,
    width: 60,
    height: 60,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  }
}));

const PlayfulPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(145deg, #ffffff 0%, #fef7f7 100%)',
  border: '2px solid #f5d1e0',
  boxShadow: '0 8px 32px rgba(168, 12, 92, 0.2)',
}));

const PlayfulButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(0deg, #a80c5c 0%, #a80c5c 99%)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(168, 12, 92, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(0deg, #8a0a4a 0%, #e8c1d0 99%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(168, 12, 92, 0.5)',
  }
}));

const PinkTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#a80c5c',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#a80c5c',
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#a80c5c',
  },
}));

const PetBoarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    petName: '',
    petAge: '',
    petBreed: '',
    allergies: '', // Optional
    medications: '', // Optional
    feedingSchedule: '', // Optional
    specialInstructions: '',
    emergencyContactName: '', // Optional
    emergencyContactPhone: '', // Optional
    startDate: '',
    endDate: '',
    veterinarianName: '', // Optional
    veterinarianPhone: '', // Optional
  });

  const [petImages, setPetImages] = useState([]); // Optional pet images
  const [petCard, setPetCard] = useState(null); // Optional vaccination card
  const [vaccinationRecords, setVaccinationRecords] = useState(null); // Optional medical records
  const [message, setMessage] = useState({ open: false, severity: 'success', text: '' });

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setMessage({ ...message, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePetImagesUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setPetImages(prevImages => [...prevImages, ...files]);
    }
  };

  const handlePetCardUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPetCard(e.target.files[0]);
    }
  };

  const handleVaccinationRecordsUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setVaccinationRecords(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Show loading message
      setMessage({
        open: true,
        severity: 'info',
        text: 'Submitting your boarding request. This may take a moment...'
      });

      // Upload files to Cloudinary
      const uploadToCloudinary = async (file) => {
        if (!file) return null;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'havendogs');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/tracysoft/image/upload',
          formData
        );
        return response.data.secure_url;
      };

      const uploadMultipleFiles = async (files) => {
        if (!files || files.length === 0) return null;
        const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
        return Promise.all(uploadPromises);
      };

      const [petImageUrls, vaccinationCardUrl, medicalRecordsUrl] = await Promise.all([
        uploadMultipleFiles(petImages),
        uploadToCloudinary(petCard),
        uploadToCloudinary(vaccinationRecords)
      ]);

      const submissionData = {
        owner: {
          name: formData.ownerName,
          email: formData.ownerEmail,
          phone: formData.ownerPhone,
        },
        pet: {
          name: formData.petName,
          age: Number(formData.petAge),
          breed: formData.petBreed,
          allergies: formData.allergies || undefined,
          medications: formData.medications || undefined,
          feedingInstructions: formData.feedingSchedule || undefined,
          specialInstructions: formData.specialInstructions || undefined
        },
        emergency_contact: formData.emergencyContactName && formData.emergencyContactPhone ? {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
        } : undefined,
        veterinarian: formData.veterinarianName && formData.veterinarianPhone ? {
          name: formData.veterinarianName,
          phone: formData.veterinarianPhone,
        } : undefined,
        boarding: {
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        documents: {
          petImages: petImageUrls,
          vaccinationCard: vaccinationCardUrl,
          medicalRecords: medicalRecordsUrl
        }
      };

      const response = await axios.post(`${API_CONFIG.baseURL}/boarding`, submissionData);
      
      if (response.status === 200 || response.status === 201) {
        setFormData({
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          petName: '',
          petAge: '',
          petBreed: '',
          allergies: '',
          medications: '',
          feedingSchedule: '',
          specialInstructions: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
          startDate: '',
          endDate: '',
          veterinarianName: '',
          veterinarianPhone: '',
        });
        setPetImages([]);
        setPetCard(null);
        setVaccinationRecords(null);
        
        setMessage({
          open: true,
          severity: 'success',
          text: 'Your boarding request has been submitted successfully! We will review your request and contact you shortly.'
        });
      }
    } catch (error) {
      console.error('Error submitting boarding request:', error);
      setMessage({
        open: true,
        severity: 'error',
        text: error.response?.data?.message || 
              'There was an error submitting your boarding request. Please check your information and try again. If the problem persists, please contact support.'
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Snackbar 
        open={message.open} 
        autoHideDuration={6000} 
        onClose={handleCloseMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseMessage} severity={message.severity} sx={{ width: '100%' }}>
          {message.text}
        </Alert>
      </Snackbar>

      {/* Navigation */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/pet-boarding')}
          sx={{ 
            color: '#a80c5c',
            fontWeight: 'bold',
            mb: 2,
            '&:hover': {
              backgroundColor: 'rgba(168, 12, 92, 0.1)'
            }
          }}
        >
          Back to Pet Boarding
        </Button>
      </Box>

      <PinkGradientBox>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              background: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.3)',
              mr: 2
            }}
          >
            <Pets sx={{ fontSize: '2rem', color: 'white' }} />
          </Avatar>
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Pet Boarding Request
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Please fill out the form below to request pet boarding services. All fields marked with * are required.
        </Typography>
      </PinkGradientBox>

      <PlayfulPaper elevation={0} sx={{ p: 4 }}>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Owner Information */}
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#a80c5c',
                  borderBottom: '2px solid #f5d1e0',
                  pb: 1
                }}
              >
                👤 Owner Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Email"
                name="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Phone Number"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Pet Information */}
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#a80c5c',
                  borderBottom: '2px solid #f5d1e0',
                  pb: 1,
                  mt: 3
                }}
              >
                🐾 Pet Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Pet Name"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Pet Age"
                name="petAge"
                value={formData.petAge}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Breed"
                name="petBreed"
                value={formData.petBreed}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField
                fullWidth
                label="Allergies (Optional)"
                name="allergies"
                multiline
                rows={2}
                value={formData.allergies}
                onChange={handleInputChange}
                helperText="List any known allergies if applicable"
              />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField
                fullWidth
                label="Current Medications (Optional)"
                name="medications"
                multiline
                rows={2}
                value={formData.medications}
                onChange={handleInputChange}
                helperText="List any current medications if applicable"
              />
            </Grid>

            <Grid item xs={12}>
              <PinkTextField
                fullWidth
                label="Feeding Instructions (Optional)"
                name="feedingSchedule"
                multiline
                rows={2}
                value={formData.feedingSchedule}
                onChange={handleInputChange}
                helperText="Provide detailed feeding instructions if you have specific preferences"
              />
            </Grid>

            {/* Emergency Contact */}
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#a80c5c',
                  borderBottom: '2px solid #f5d1e0',
                  pb: 1,
                  mt: 3
                }}
              >
                🚨 Emergency Contact (Optional)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                fullWidth
                label="Emergency Contact Name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                fullWidth
                label="Emergency Contact Phone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Veterinarian Information */}
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#a80c5c',
                  borderBottom: '2px solid #f5d1e0',
                  pb: 1,
                  mt: 3
                }}
              >
                🩺 Personal Veterinarian (Optional)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                fullWidth
                label="Veterinarian Name"
                name="veterinarianName"
                value={formData.veterinarianName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                fullWidth
                label="Veterinarian Phone"
                name="veterinarianPhone"
                value={formData.veterinarianPhone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Boarding Dates */}
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#a80c5c',
                  borderBottom: '2px solid #f5d1e0',
                  pb: 1,
                  mt: 3
                }}
              >
                📅 Boarding Dates
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                required
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: formData.startDate || new Date().toISOString().split('T')[0] }}
              />
            </Grid>

            {/* Document Uploads */}
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#a80c5c',
                  borderBottom: '2px solid #f5d1e0',
                  pb: 1,
                  mt: 3
                }}
              >
                📄 Documents (Optional)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Pet Images
              </Typography>
              <Box sx={{ mb: 2 }}>
                <label htmlFor="pet-images">
                  <Input
                    type="file"
                    id="pet-images"
                    multiple
                    accept="image/*"
                    onChange={handlePetImagesUpload}
                    style={{ display: 'none' }}
                  />
                  <PlayfulButton variant="contained" component="span">
                    📸 Upload Pet Images
                  </PlayfulButton>
                </label>
                {petImages.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {petImages.length} image(s) selected
                  </Typography>
                )}
              </Box>
              <Typography variant="caption" display="block" gutterBottom>
                You can upload multiple images of your pet (optional)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Pet Vaccination Card
              </Typography>
              <Box sx={{ mb: 2 }}>
                <label htmlFor="vaccination-card">
                  <Input
                    type="file"
                    id="vaccination-card"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handlePetCardUpload}
                    style={{ display: 'none' }}
                  />
                  <PlayfulButton variant="contained" component="span">
                    💉 Upload Vaccination Card
                  </PlayfulButton>
                </label>
                {petCard && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {petCard.name}
                  </Typography>
                )}
              </Box>
              <Typography variant="caption" display="block" gutterBottom>
                Upload your pet's vaccination records if available
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Medical Records
              </Typography>
              <Box sx={{ mb: 2 }}>
                <label htmlFor="medical-records">
                  <Input
                    type="file"
                    id="medical-records"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleVaccinationRecordsUpload}
                    style={{ display: 'none' }}
                  />
                  <PlayfulButton variant="contained" component="span">
                    🏥 Upload Medical Records
                  </PlayfulButton>
                </label>
                {vaccinationRecords && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {vaccinationRecords.name}
                  </Typography>
                )}
              </Box>
              <Typography variant="caption" display="block" gutterBottom>
                Upload any additional medical records if available
              </Typography>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <PlayfulButton
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 4, py: 2, fontSize: '1.2rem' }}
              >
                🚀 Submit Boarding Request
              </PlayfulButton>
            </Grid>
          </Grid>
        </form>
      </PlayfulPaper>
    </Container>
  );
};

export default PetBoarding; 