import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import React, { useCallback, useEffect } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../constants/data";
import CategoryList from "../src/components/CategoryList";
import ImageGrid from "../src/components/ImageGrid";
import ImagePreviewModal from "../src/components/ImagePreviewModal";
import SearchBar from "../src/components/SearchBar";
import { useImages } from "../src/hooks/useImages";

export default function index() {
  const {
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
  } = useImages();

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [currentSearch, setCurrentSearch] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Load initial images on mount
  useEffect(() => {
    loadImages();
  }, []);

  // Handle search
  const handleSearch = useCallback((query) => {
    setCurrentSearch(query);
    setSelectedCategory(null);
    searchForImages(query);
  }, [searchForImages]);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setCurrentSearch('');
    setSelectedCategory(null);
    resetImages();
  }, [resetImages]);

  // Handle category selection
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentSearch('');
    filterByCategory(category);
  }, [filterByCategory]);

  // Handle show all
  const handleShowAll = useCallback(() => {
    setSelectedCategory(null);
    setCurrentSearch('');
    resetImages();
  }, [resetImages]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    const params = {};
    if (currentSearch) {
      params.q = currentSearch;
    } else if (selectedCategory) {
      params.category = selectedCategory;
    }
    loadMoreImages(params);
  }, [loadMoreImages, currentSearch, selectedCategory]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    const params = {};
    if (currentSearch) {
      params.q = currentSearch;
    } else if (selectedCategory) {
      params.category = selectedCategory;
    }
    refreshImages(params);
  }, [refreshImages, currentSearch, selectedCategory]);

  // Handle image press (for future navigation)
  const handleImagePress = useCallback((item, index) => {
    // TODO: Navigate to image detail screen
    console.log('Image pressed:', item.id);
    setSelectedImage(item);
    setModalVisible(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.titletxt}>Wallpapers</Text>
        <Pressable style={styles.menubtn}>
          <FontAwesome6 name="bars-staggered" size={22} iconStyle="solid" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      {/* Categories */}
      <CategoryList
        categories={data.categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onShowAll={handleShowAll}
      />

      {/* Images Grid */}
      <ImageGrid
        images={images}
        loading={loading}
        loadingMore={loadingMore}
        refreshing={refreshing}
        hasMore={pagination.hasMore}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        onImagePress={handleImagePress}
      />

      <ImagePreviewModal
      visible={modalVisible}
      image={selectedImage}
      onClose={()=>{
        setModalVisible(false);
        setSelectedImage(null);
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titletxt: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  menubtn: {
    padding: 8,
    borderRadius: 8,
  },
});
