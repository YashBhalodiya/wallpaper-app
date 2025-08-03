import { MasonryFlashList } from '@shopify/flash-list';
import React, { memo, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ImageCard from './ImageCard';

const ImageGrid = memo(({ 
  images, 
  loading, 
  loadingMore, 
  onLoadMore, 
  onRefresh, 
  refreshing,
  hasMore,
  onImagePress 
}) => {
  
  const renderItem = useCallback(({ item, index }) => (
    <ImageCard 
      item={item} 
      index={index} 
      onPress={onImagePress}
    />
  ), [onImagePress]);

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#22223b" />
        <Text style={styles.footerText}>Loading more images...</Text>
      </View>
    );
  }, [loadingMore]);

  const handleEndReached = useCallback(() => {
    if (!loadingMore && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [loadingMore, hasMore, onLoadMore]);

  const keyExtractor = useCallback((item, index) => 
    item.id?.toString() || `${item.webformatURL}-${index}`, 
    []
  );

  if (loading && images.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#22223b" />
        <Text style={styles.loadingText}>Loading images...</Text>
      </View>
    );
  }

  if (!loading && images.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No images found</Text>
        <Text style={styles.emptySubText}>Try a different search or category</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

ImageGrid.displayName = 'ImageGrid';

export default ImageGrid;
