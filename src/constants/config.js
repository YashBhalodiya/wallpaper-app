export const API_CONFIG = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: process.env.EXPO_PUBLIC_PIXABAY_API_KEY,
  TIMEOUT: 10000,
  DEFAULT_PARAMS: {
    safesearch: 'true',
    editors_choice: 'true',
    image_type: 'photo',
    orientation: 'all',
    min_width: 640,
    min_height: 640,
  },
};


export const PAGINATION_CONFIG = {
  INITIAL_PAGE: 1,
  ITEMS_PER_PAGE: 10,
  LOAD_MORE_THRESHOLD: 0.5,
};

export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#22223b',
    BACKGROUND: '#f8f9fa',
    WHITE: '#fff',
    GRAY_LIGHT: '#f5f5f5',
    GRAY_MEDIUM: '#666',
    GRAY_DARK: '#333',
    BORDER: '#f0f0f0',
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 12,
    LG: 16,
    XL: 20,
    XXL: 24,
  },
  BORDER_RADIUS: {
    SM: 8,
    MD: 12,
    LG: 16,
    XL: 20,
  },
  FONT_SIZES: {
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 24,
    XXL: 28,
  },
};
