import axios from 'axios';
import { API_CONFIG, PAGINATION_CONFIG } from '../constants/config';

// Default pagination settings
const DEFAULT_PAGINATION = {
  page: PAGINATION_CONFIG.INITIAL_PAGE,
  per_page: PAGINATION_CONFIG.ITEMS_PER_PAGE,
};

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  params: {
    key: API_CONFIG.API_KEY,
    ...API_CONFIG.DEFAULT_PARAMS,
  },
});

// Format URL with parameters
const formatParams = (params = {}) => {
  const formattedParams = { ...DEFAULT_PAGINATION, ...params };
  
  // Encode search query if present
  if (formattedParams.q) {
    formattedParams.q = encodeURIComponent(formattedParams.q);
  }
  
  return formattedParams;
};

// Main API call function
export const fetchImages = async (params = {}) => {
  try {
    const formattedParams = formatParams(params);
    console.log('Fetching images with params:', formattedParams);
    
    const response = await apiClient.get('', { params: formattedParams });
    
    return {
      success: true,
      data: response.data,
      pagination: {
        currentPage: formattedParams.page,
        perPage: formattedParams.per_page,
        totalHits: response.data.totalHits,
        hasMore: (formattedParams.page * formattedParams.per_page) < response.data.totalHits,
      },
    };
  } catch (error) {
    console.error('API Error:', error.message);
    return {
      success: false,
      error: error.message,
      data: null,
      pagination: null,
    };
  }
};

export const searchImages = async (query, page = 1, perPage = 10) => {
  return fetchImages({
    q: query,
    page,
    per_page: perPage,
  });
};

export const getImagesByCategory = async (category, page = 1, perPage = 10) => {
  return fetchImages({
    category,
    page,
    per_page: perPage,
  });
};
