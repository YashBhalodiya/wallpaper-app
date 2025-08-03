import { useCallback, useState } from 'react';
import { fetchImages } from '../services/api';

export const useImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasMore: true,
    totalHits: 0,
  });

  // Load initial images
  const loadImages = useCallback(async (params = {}, replace = true) => {
    if (replace) {
      setLoading(true);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const result = await fetchImages({
        page: replace ? 1 : pagination.currentPage + 1,
        per_page: 10,
        ...params,
      });

      if (result.success) {
        const newImages = result.data.hits || [];
        
        setImages(prevImages => 
          replace ? newImages : [...prevImages, ...newImages]
        );
        
        setPagination({
          currentPage: result.pagination.currentPage,
          hasMore: result.pagination.hasMore,
          totalHits: result.pagination.totalHits,
        });
        
        setError(null);
      } else {
        setError(result.error || 'Failed to load images');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [pagination.currentPage]);

  // Load more images (pagination)
  const loadMoreImages = useCallback((params = {}) => {
    if (!loadingMore && pagination.hasMore) {
      loadImages(params, false);
    }
  }, [loadImages, loadingMore, pagination.hasMore]);

  // Refresh images
  const refreshImages = useCallback((params = {}) => {
    setRefreshing(true);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadImages(params, true);
  }, [loadImages]);

  // Search images
  const searchForImages = useCallback(async (query) => {
    setImages([]);
    setPagination({ currentPage: 1, hasMore: true, totalHits: 0 });
    await loadImages({ q: query }, true);
  }, [loadImages]);

  // Filter by category
  const filterByCategory = useCallback(async (category) => {
    setImages([]);
    setPagination({ currentPage: 1, hasMore: true, totalHits: 0 });
    await loadImages({ category }, true);
  }, [loadImages]);

  // Reset to default
  const resetImages = useCallback(() => {
    setImages([]);
    setPagination({ currentPage: 1, hasMore: true, totalHits: 0 });
    loadImages({}, true);
  }, [loadImages]);

  return {
    images,
    loading,
    refreshing,
    loadingMore,
    error,
    pagination,
    loadImages,
    loadMoreImages,
    refreshImages,
    searchForImages,
    filterByCategory,
    resetImages,
  };
};
