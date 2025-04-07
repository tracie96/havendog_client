const isDevelopment = window.location.hostname === 'localhost' && window.location.port === '3001';

const API_CONFIG = {
  baseURL: isDevelopment ? 'http://localhost:5000/api' : 'https://havendog-service.onrender.com/api',
  timeout: 30000, // 30 seconds timeout for slow connections
  retryAttempts: 3,
  retryDelay: 1000, // 1 second between retries
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
    
    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 401:
        // Unauthorized - token might be expired
        return { message: 'Session expired. Please login again.', code: 'AUTH_REQUIRED' };
      case 403:
        // Forbidden
        return { message: 'You don\'t have permission to access this resource.', code: 'FORBIDDEN' };
      case 429:
        // Too Many Requests
        return { message: 'Too many requests. Please try again later.', code: 'RATE_LIMITED' };
      case 503:
        // Service Unavailable
        return { message: 'Service temporarily unavailable. Please try again later.', code: 'SERVICE_UNAVAILABLE' };
      default:
        // Other errors
        return error.response.data;
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error:', error.request);
    return { 
      message: 'Network error. Please check your connection.', 
      code: 'NETWORK_ERROR',
      isConnectionIssue: true
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
    return { message: 'An unexpected error occurred.', code: 'UNKNOWN_ERROR' };
  }
};

const createApiHelper = (axios) => {
  // Create method to retry failed requests
  const retryRequest = async (config, retryCount = 0) => {
    try {
      return await axios(config);
    } catch (error) {
      if (
        retryCount < API_CONFIG.retryAttempts && 
        (!error.response || error.response.status >= 500 || error.response.status === 429)
      ) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * (retryCount + 1)));
        return retryRequest(config, retryCount + 1);
      }
      throw error;
    }
  };

  return {
    retryRequest
  };
};

export { API_CONFIG, handleApiError, createApiHelper };
