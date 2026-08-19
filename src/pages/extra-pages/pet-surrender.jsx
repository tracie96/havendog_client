import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Snackbar,
  Alert,
  Avatar,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_CONFIG } from 'config/api';
import axios from 'axios';
import { Pets, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PinkGradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(0deg, #a80c5c 0%, #a80c5c 99%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden'
}));

const PlayfulPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(145deg, #ffffff 0%, #fef7f7 100%)',
  border: '2px solid #f5d1e0',
  boxShadow: '0 8px 32px rgba(168, 12, 92, 0.2)'
}));

const PlayfulButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(0deg, #a80c5c 0%, #a80c5c 99%)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(168, 12, 92, 0.4)',
  '&:hover': {
    background: 'linear-gradient(0deg, #8a0a4a 0%, #e8c1d0 99%)',
    transform: 'translateY(-2px)'
  }
}));

const PinkTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#a80c5c'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#a80c5c',
      borderWidth: 2
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#a80c5c'
  }
}));

const radioSx = {
  color: '#a80c5c',
  '&.Mui-checked': { color: '#a80c5c' }
};

const checkboxSx = {
  color: '#a80c5c',
  '&.Mui-checked': { color: '#a80c5c' }
};

const SURRENDER_REASONS = [
  { value: 'financial-difficulty', label: 'Financial difficulty' },
  { value: 'relocation', label: 'Relocation' },
  { value: 'lack-of-time', label: 'Lack of time' },
  { value: 'change-in-family-circumstances', label: 'Change in family circumstances' },
  { value: 'behavioural-difficulties', label: 'Behavioural difficulties' },
  { value: 'medical-condition', label: 'Medical condition' },
  { value: 'cannot-provide-adequate-care', label: 'Cannot provide adequate care' },
  { value: 'unwanted-litter', label: 'Unwanted litter' },
  { value: 'found-stray', label: 'Found/stray animal' },
  { value: 'other', label: 'Other' }
];

const emptyForm = {
  fullName: '',
  phone: '',
  whatsapp: '',
  email: '',
  residentialAddress: '',
  occupation: '',
  nextOfKin: '',
  nextOfKinPhone: '',
  nextOfKinRelationship: '',
  petName: '',
  species: '',
  speciesOther: '',
  breed: '',
  sex: '',
  age: '',
  dateOfBirth: '',
  colourMarkings: '',
  microchipNumber: '',
  currentLocation: '',
  reasons: [],
  otherReason: '',
  explanation: '',
  vaccinated: '',
  lastVaccinationDate: '',
  rabiesVaccinated: '',
  sterilized: '',
  hadLitter: '',
  knownConditions: '',
  currentMedications: '',
  knownAllergies: '',
  lastVetVisit: '',
  vetClinic: '',
  friendlyWithPeople: '',
  friendlyWithChildren: '',
  friendlyWithDogs: '',
  friendlyWithCats: '',
  hasBitten: '',
  biteExplanation: '',
  fearAnxietyAggression: '',
  houseTrained: '',
  currentFood: '',
  mealsPerDay: '',
  foodRestrictions: '',
  specialCare: '',
  legalOwnerConfirmed: false,
  voluntarySurrenderConfirmed: false,
  informationAccurate: false,
  termsUnderstood: false,
  ownershipTransferConfirmed: false,
  surrendererName: '',
  signature: '',
  declarationDate: new Date().toISOString().split('T')[0]
};

const SectionTitle = ({ children }) => (
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
      {children}
    </Typography>
  </Grid>
);

const RadioField = ({ label, name, value, onChange, options, required }) => (
  <FormControl required={required} fullWidth>
    <FormLabel sx={{ color: '#555', '&.Mui-focused': { color: '#a80c5c' } }}>{label}</FormLabel>
    <RadioGroup row name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio sx={radioSx} required={required} />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

const PetSurrender = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState({ open: false, severity: 'success', text: '' });

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setMessage({ ...message, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleReason = (reason) => {
    setFormData((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reason)
        ? prev.reasons.filter((item) => item !== reason)
        : [...prev.reasons, reason]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.legalOwnerConfirmed ||
      !formData.voluntarySurrenderConfirmed ||
      !formData.informationAccurate ||
      !formData.termsUnderstood ||
      !formData.ownershipTransferConfirmed
    ) {
      setMessage({
        open: true,
        severity: 'error',
        text: 'Please complete all items in the Surrender Declaration.'
      });
      return;
    }

    if (!formData.surrendererName.trim() || !formData.signature.trim() || !formData.declarationDate) {
      setMessage({
        open: true,
        severity: 'error',
        text: 'Please enter your name, signature, and date on the declaration.'
      });
      return;
    }

    try {
      setMessage({
        open: true,
        severity: 'info',
        text: 'Submitting your surrender form...'
      });

      const payload = {
        surrenderer: {
          fullName: formData.fullName,
          phone: formData.phone,
          whatsapp: formData.whatsapp || undefined,
          email: formData.email,
          residentialAddress: formData.residentialAddress,
          occupation: formData.occupation || undefined,
          nextOfKin: formData.nextOfKin || undefined,
          nextOfKinPhone: formData.nextOfKinPhone || undefined,
          nextOfKinRelationship: formData.nextOfKinRelationship || undefined
        },
        pet: {
          name: formData.petName,
          species: formData.species,
          speciesOther: formData.species === 'other' ? formData.speciesOther : undefined,
          breed: formData.breed || undefined,
          sex: formData.sex || undefined,
          age: formData.age || undefined,
          dateOfBirth: formData.dateOfBirth || undefined,
          colourMarkings: formData.colourMarkings || undefined,
          microchipNumber: formData.microchipNumber || undefined,
          currentLocation: formData.currentLocation || undefined
        },
        reason: {
          reasons: formData.reasons,
          otherReason: formData.reasons.includes('other') ? formData.otherReason : undefined,
          explanation: formData.explanation || undefined
        },
        medical: {
          vaccinated: formData.vaccinated || undefined,
          lastVaccinationDate: formData.lastVaccinationDate || undefined,
          rabiesVaccinated: formData.rabiesVaccinated || undefined,
          sterilized: formData.sterilized || undefined,
          hadLitter: formData.sex === 'female' ? formData.hadLitter || undefined : undefined,
          knownConditions: formData.knownConditions || undefined,
          currentMedications: formData.currentMedications || undefined,
          knownAllergies: formData.knownAllergies || undefined,
          lastVetVisit: formData.lastVetVisit || undefined,
          vetClinic: formData.vetClinic || undefined
        },
        behaviour: {
          friendlyWithPeople: formData.friendlyWithPeople || undefined,
          friendlyWithChildren: formData.friendlyWithChildren || undefined,
          friendlyWithDogs: formData.friendlyWithDogs || undefined,
          friendlyWithCats: formData.friendlyWithCats || undefined,
          hasBitten: formData.hasBitten || undefined,
          biteExplanation: formData.hasBitten === 'yes' ? formData.biteExplanation : undefined,
          fearAnxietyAggression: formData.fearAnxietyAggression || undefined,
          houseTrained: formData.houseTrained || undefined
        },
        care: {
          currentFood: formData.currentFood || undefined,
          mealsPerDay: formData.mealsPerDay || undefined,
          foodRestrictions: formData.foodRestrictions || undefined,
          specialCare: formData.specialCare || undefined
        },
        declaration: {
          legalOwnerConfirmed: true,
          voluntarySurrenderConfirmed: true,
          informationAccurate: true,
          termsUnderstood: true,
          ownershipTransferConfirmed: true,
          surrendererName: formData.surrendererName.trim(),
          signature: formData.signature.trim(),
          date: formData.declarationDate
        }
      };

      const response = await axios.post(`${API_CONFIG.baseURL}/surrenders`, payload);

      if (response.status === 200 || response.status === 201) {
        setFormData({ ...emptyForm, declarationDate: new Date().toISOString().split('T')[0] });
        setMessage({
          open: true,
          severity: 'success',
          text: 'Your pet surrender form has been submitted. Haven Pet Home will review it and contact you.'
        });
      }
    } catch (error) {
      console.error('Error submitting surrender form:', error);
      setMessage({
        open: true,
        severity: 'error',
        text:
          error.response?.data?.message ||
          'There was an error submitting the form. Please check your information and try again.'
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

      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            color: '#a80c5c',
            fontWeight: 'bold',
            mb: 2,
            '&:hover': { backgroundColor: 'rgba(168, 12, 92, 0.1)' }
          }}
        >
          Back to Website
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
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
            Pet Surrender / Relinquishment Form
          </Typography>
        </Box>
        <Typography variant="h6" align="center" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          For Dogs, Cats and All Other Companion Animals
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'rgba(255,255,255,0.9)', mt: 1 }}>
          Please complete this form honestly and provide as much information as possible. This information
          helps Haven Pet Home understand the animal&apos;s history, medical needs, temperament and care
          requirements.
        </Typography>
      </PinkGradientBox>

      <PlayfulPaper elevation={0} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <SectionTitle>A. Surrenderer&apos;s Information</SectionTitle>
            <Grid item xs={12} sm={6}>
              <PinkTextField required fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField required fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="WhatsApp Number" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField required fullWidth type="email" label="Email Address" name="email" value={formData.email} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField
                required
                fullWidth
                multiline
                rows={3}
                label="Residential Address"
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Next of Kin" name="nextOfKin" value={formData.nextOfKin} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Next of Kin Phone Number" name="nextOfKinPhone" value={formData.nextOfKinPhone} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Relationship to Next of Kin" name="nextOfKinRelationship" value={formData.nextOfKinRelationship} onChange={handleInputChange} />
            </Grid>

            <SectionTitle>B. Pet Information</SectionTitle>
            <Grid item xs={12} sm={6}>
              <PinkTextField required fullWidth label="Pet's Name" name="petName" value={formData.petName} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                required
                label="Species"
                name="species"
                value={formData.species}
                onChange={handleInputChange}
                options={[
                  { value: 'dog', label: 'Dog' },
                  { value: 'cat', label: 'Cat' },
                  { value: 'other', label: 'Other' }
                ]}
              />
            </Grid>
            {formData.species === 'other' && (
              <Grid item xs={12} sm={6}>
                <PinkTextField required fullWidth label="Other species" name="speciesOther" value={formData.speciesOther} onChange={handleInputChange} />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Breed" name="breed" value={formData.breed} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Age" name="age" value={formData.age} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                fullWidth
                type="date"
                label="Date of Birth (if known)"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Colour / Markings" name="colourMarkings" value={formData.colourMarkings} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Microchip Number (if applicable)" name="microchipNumber" value={formData.microchipNumber} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField fullWidth label="Current Location of Pet" name="currentLocation" value={formData.currentLocation} onChange={handleInputChange} />
            </Grid>

            <SectionTitle>C. Reason for Surrender</SectionTitle>
            <Grid item xs={12}>
              <FormLabel sx={{ color: '#555', display: 'block', mb: 1 }}>Why are you surrendering this pet?</FormLabel>
              <Grid container>
                {SURRENDER_REASONS.map((reason) => (
                  <Grid item xs={12} sm={6} key={reason.value}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.reasons.includes(reason.value)}
                          onChange={() => toggleReason(reason.value)}
                          sx={checkboxSx}
                        />
                      }
                      label={reason.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {formData.reasons.includes('other') && (
              <Grid item xs={12}>
                <PinkTextField fullWidth label="Other reason" name="otherReason" value={formData.otherReason} onChange={handleInputChange} />
              </Grid>
            )}
            <Grid item xs={12}>
              <PinkTextField
                fullWidth
                multiline
                rows={4}
                label="Please explain the circumstances leading to the surrender"
                name="explanation"
                value={formData.explanation}
                onChange={handleInputChange}
              />
            </Grid>

            <SectionTitle>D. Medical History</SectionTitle>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Is the pet vaccinated?"
                name="vaccinated"
                value={formData.vaccinated}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unknown', label: 'Unknown' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField
                fullWidth
                type="date"
                label="Last vaccination date"
                name="lastVaccinationDate"
                value={formData.lastVaccinationDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Vaccinated against rabies?"
                name="rabiesVaccinated"
                value={formData.rabiesVaccinated}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unknown', label: 'Unknown' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Is the pet sterilized?"
                name="sterilized"
                value={formData.sterilized}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
              />
            </Grid>
            {formData.sex === 'female' && (
              <Grid item xs={12}>
                <RadioField
                  label="If female, has she ever had puppies/kittens?"
                  name="hadLitter"
                  value={formData.hadLitter}
                  onChange={handleInputChange}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ]}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <PinkTextField fullWidth multiline rows={2} label="Known medical conditions" name="knownConditions" value={formData.knownConditions} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField fullWidth multiline rows={2} label="Current medications" name="currentMedications" value={formData.currentMedications} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField fullWidth multiline rows={2} label="Known allergies" name="knownAllergies" value={formData.knownAllergies} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Last veterinary visit" name="lastVetVisit" value={formData.lastVetVisit} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Veterinary clinic / doctor" name="vetClinic" value={formData.vetClinic} onChange={handleInputChange} />
            </Grid>

            <SectionTitle>E. Behavioural Information</SectionTitle>
            <Grid item xs={12}>
              <RadioField
                label="Is the pet friendly with people?"
                name="friendlyWithPeople"
                value={formData.friendlyWithPeople}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'sometimes', label: 'Sometimes' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Friendly with children?"
                name="friendlyWithChildren"
                value={formData.friendlyWithChildren}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unknown', label: 'Unknown' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Friendly with other dogs?"
                name="friendlyWithDogs"
                value={formData.friendlyWithDogs}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unknown', label: 'Unknown' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Friendly with cats?"
                name="friendlyWithCats"
                value={formData.friendlyWithCats}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unknown', label: 'Unknown' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioField
                label="Has the pet ever bitten a person or animal?"
                name="hasBitten"
                value={formData.hasBitten}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
              />
            </Grid>
            {formData.hasBitten === 'yes' && (
              <Grid item xs={12}>
                <PinkTextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  label="If yes, please explain"
                  name="biteExplanation"
                  value={formData.biteExplanation}
                  onChange={handleInputChange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <PinkTextField
                fullWidth
                multiline
                rows={3}
                label="Does the pet show signs of fear, anxiety or aggression?"
                name="fearAnxietyAggression"
                value={formData.fearAnxietyAggression}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioField
                label="Is the pet house-trained?"
                name="houseTrained"
                value={formData.houseTrained}
                onChange={handleInputChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unknown', label: 'Unknown' }
                ]}
              />
            </Grid>

            <SectionTitle>F. Care Information</SectionTitle>
            <Grid item xs={12}>
              <PinkTextField fullWidth multiline rows={2} label="What food does the pet currently eat?" name="currentFood" value={formData.currentFood} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="How many times does the pet eat per day?" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PinkTextField fullWidth label="Any food restrictions?" name="foodRestrictions" value={formData.foodRestrictions} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <PinkTextField
                fullWidth
                multiline
                rows={3}
                label="Does the pet have any special care requirements?"
                name="specialCare"
                value={formData.specialCare}
                onChange={handleInputChange}
              />
            </Grid>

            <SectionTitle>G. Surrender Declaration</SectionTitle>
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid #f5d1e0',
                  borderRadius: 2,
                  backgroundColor: '#fffafc',
                  lineHeight: 1.7
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    mb: 2,
                    borderLeft: '4px solid #a80c5c',
                    backgroundColor: '#fde8f0'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#a80c5c' }}>
                    Important: Surrender is final. Once accepted, the pet belongs to Haven Pet Home. You cannot take
                    the pet back, and you must not interfere with rehoming.
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  I confirm that I am the legal owner or authorized person responsible for the animal described above.
                </Typography>
                <Typography variant="body2" paragraph>
                  I voluntarily surrender/relinquish the animal to Haven Pet Home &amp; Animal Care Foundation for the
                  purpose of rescue, rehabilitation, care and/or rehoming. Once the surrender is accepted, ownership of
                  the animal transfers fully to Haven Pet Home. I will have no further claim to the animal and cannot
                  demand its return.
                </Typography>
                <Typography variant="body2" paragraph>
                  I confirm that the information provided in this form is true and complete to the best of my knowledge.
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  I understand that:
                </Typography>
                <Typography variant="body2" paragraph>
                  1. Haven Pet Home may assess the animal before accepting the surrender.
                </Typography>
                <Typography variant="body2" paragraph>
                  2. The Foundation may arrange veterinary examination, treatment, vaccination, sterilization and
                  rehabilitation where necessary.
                </Typography>
                <Typography variant="body2" paragraph>
                  3. The Foundation may rehome the animal to a suitable adopter. I will not interfere with, delay, or
                  attempt to influence that rehoming process.
                </Typography>
                <Typography variant="body2" paragraph>
                  4. I must disclose any known history of aggression, biting, illness or other behavioural concerns.
                </Typography>
                <Typography variant="body2" paragraph>
                  5. I must not intentionally withhold information that could place Haven staff, volunteers, adopters or
                  other animals at risk.
                </Typography>
                <Typography variant="body2" paragraph>
                  6. Once the surrender has been formally accepted, the animal belongs to Haven Pet Home and may be
                  placed into Haven&apos;s rescue and rehoming programme.
                </Typography>
                <Typography variant="body2" paragraph>
                  7. Surrender is final. I will not later request that the pet be returned to me, nor contact adopters
                  or otherwise interfere with the animal&apos;s care or new home.
                </Typography>
                <Typography variant="body2">
                  8. Haven Pet Home is not obliged to keep me informed of the animal&apos;s location or new owner after
                  acceptance of the surrender.
                </Typography>
              </Box>
              <FormControlLabel
                sx={{ alignItems: 'flex-start', display: 'flex', mb: 1 }}
                control={
                  <Checkbox
                    required
                    checked={formData.legalOwnerConfirmed}
                    onChange={(e) => setFormData((prev) => ({ ...prev, legalOwnerConfirmed: e.target.checked }))}
                    sx={{ ...checkboxSx, mt: -0.5 }}
                  />
                }
                label="I confirm that I am the legal owner or authorized person responsible for this animal."
              />
              <FormControlLabel
                sx={{ alignItems: 'flex-start', display: 'flex', mb: 1 }}
                control={
                  <Checkbox
                    required
                    checked={formData.voluntarySurrenderConfirmed}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, voluntarySurrenderConfirmed: e.target.checked }))
                    }
                    sx={{ ...checkboxSx, mt: -0.5 }}
                  />
                }
                label="I voluntarily surrender/relinquish this animal to Haven Pet Home & Animal Care Foundation."
              />
              <FormControlLabel
                sx={{ alignItems: 'flex-start', display: 'flex', mb: 1 }}
                control={
                  <Checkbox
                    required
                    checked={formData.informationAccurate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, informationAccurate: e.target.checked }))}
                    sx={{ ...checkboxSx, mt: -0.5 }}
                  />
                }
                label="I confirm that the information provided is true and complete to the best of my knowledge."
              />
              <FormControlLabel
                sx={{ alignItems: 'flex-start', display: 'flex', mb: 2 }}
                control={
                  <Checkbox
                    required
                    checked={formData.termsUnderstood}
                    onChange={(e) => setFormData((prev) => ({ ...prev, termsUnderstood: e.target.checked }))}
                    sx={{ ...checkboxSx, mt: -0.5 }}
                  />
                }
                label="I understand and agree to the surrender terms listed above."
              />
              <FormControlLabel
                sx={{ alignItems: 'flex-start', display: 'flex', mb: 2 }}
                control={
                  <Checkbox
                    required
                    checked={formData.ownershipTransferConfirmed}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, ownershipTransferConfirmed: e.target.checked }))
                    }
                    sx={{ ...checkboxSx, mt: -0.5 }}
                  />
                }
                label="I understand that this animal becomes the property of Haven Pet Home. I will not ask for it back or interfere with rehoming."
              />
              <FormHelperText sx={{ mb: 2 }}>
                You must complete the declaration and sign below before submitting.
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PinkTextField
                required
                fullWidth
                label="Surrenderer's Name"
                name="surrendererName"
                value={formData.surrendererName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PinkTextField
                required
                fullWidth
                label="Signature"
                name="signature"
                value={formData.signature}
                onChange={handleInputChange}
                helperText="Type your full name as your electronic signature"
                InputProps={{
                  sx: { fontFamily: '"Segoe Script", "Comic Sans MS", cursive', fontSize: '1.15rem' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PinkTextField
                required
                fullWidth
                type="date"
                label="Date"
                name="declarationDate"
                value={formData.declarationDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <PlayfulButton type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2, py: 2, fontSize: '1.2rem' }}>
                Submit Surrender Form
              </PlayfulButton>
            </Grid>
          </Grid>
        </form>
      </PlayfulPaper>
    </Container>
  );
};

export default PetSurrender;
