const isDevelopment = window.location.hostname === 'localhost' && window.location.port === '3001';

const API_CONFIG = {
  baseURL: isDevelopment ? 'http://localhost:5000/api' : 'https://havendog-service.onrender.com/api',
  endpoints: {
    auth: '/auth',
    adoptions: '/adoptions',
    upload: '/upload',
    pets: '/auth/pets',
    vets: '/vets',
    boarders: '/boarders',
    bookings: {
      vet: '/bookings/vet',
      boarding: '/bookings/boarding',
      cancel: (id) => `/bookings/${id}/cancel`
    },
    boardingBookings: '/boarding-bookings'
  }
};

// Add error handling for API calls
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error:', error.response.data);
    return error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error:', error.request);
    return { message: 'Network error. Please check your connection.' };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
    return { message: 'An unexpected error occurred.' };
  }
};

export { API_CONFIG, handleApiError };
