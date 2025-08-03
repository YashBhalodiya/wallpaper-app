import React, { memo } from 'react';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2; // 2 columns with 16px padding on each side

const ImageCard = memo(({ item, index, onPress }) => {
  const imageHeight = item.webformatHeight 
    ? (cardWidth * item.webformatHeight) / item.webformatWidth 
    : cardWidth;

  const handlePress = () => {
    onPress?.(item, index);
  };

  return (
    <Pressable 
      style={[styles.card, { width: cardWidth }]} 
      onPress={handlePress}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
    >
      <Image
        source={{ uri: item.webformatURL }}
        style={[styles.image, { height: Math.min(imageHeight, cardWidth * 1.5) }]}
        resizeMode="cover"
        loadingIndicatorSource={{ uri: item.previewURL }}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
});

ImageCard.displayName = 'ImageCard';

export default ImageCard;
