import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive dimensions
export const wp = (percentage) => {
  const value = (percentage * screenWidth) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const hp = (percentage) => {
  const value = (percentage * screenHeight) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Image aspect ratio calculation
export const calculateImageHeight = (imageWidth, imageHeight, maxWidth, maxHeight) => {
  if (!imageWidth || !imageHeight) return maxWidth;
  
  const aspectRatio = imageHeight / imageWidth;
  const calculatedHeight = maxWidth * aspectRatio;
  
  return Math.min(calculatedHeight, maxHeight);
};

// Debounce function for search
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Format large numbers
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Validate image URL
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
};
