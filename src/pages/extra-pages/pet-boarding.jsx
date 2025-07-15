import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const PetBoarding = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    const submissionData = {
      owner: {
        name: formData.ownerName,
        email: formData.ownerEmail,
        phone: formData.ownerPhone,
      },
      pet: {
        name: formData.petName,
        age: formData.petAge,
        breed: formData.petBreed,
        allergies: formData.allergies || null,
        medications: formData.medications || null,
        feedingInstructions: formData.feedingSchedule || null,
        specialInstructions: formData.specialInstructions,
      },
      emergency_contact: formData.emergencyContactName && formData.emergencyContactPhone ? {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
      } : null,
      veterinarian: formData.veterinarianName && formData.veterinarianPhone ? {
        name: formData.veterinarianName,
        phone: formData.veterinarianPhone,
      } : null,
      boarding: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
      documents: {
        petImages: petImages.length > 0 ? petImages : null,
        vaccinationCard: petCard || null,
        medicalRecords: vaccinationRecords || null
      }
    };
    console.log('Form Data:', submissionData);
    // Add your form submission logic here
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Pet Boarding Request
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Please fill out the form below to request pet boarding services. All fields marked with * are required.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Owner Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Owner Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
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
              <TextField
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
              <Typography variant="h6" gutterBottom>
                Pet Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Pet Name"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Pet Age"
                name="petAge"
                value={formData.petAge}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Breed"
                name="petBreed"
                value={formData.petBreed}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
              <TextField
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
              <TextField
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
              <Typography variant="h6" gutterBottom>
                Emergency Contact (Optional)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact Phone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Veterinarian Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Veterinarian (Optional)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Veterinarian Name"
                name="veterinarianName"
                value={formData.veterinarianName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Veterinarian Phone"
                name="veterinarianPhone"
                value={formData.veterinarianPhone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Document Uploads */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Documents (Optional)
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
                  <Button variant="contained" component="span">
                    Upload Pet Images
                  </Button>
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
                  <Button variant="contained" component="span">
                    Upload Vaccination Card
                  </Button>
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
                  <Button variant="contained" component="span">
                    Upload Medical Records
                  </Button>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
              >
                Submit Boarding Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PetBoarding; 