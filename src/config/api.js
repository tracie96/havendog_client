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

export default API_CONFIG;
