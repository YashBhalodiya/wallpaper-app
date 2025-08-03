import React, { memo, useCallback } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const CategoryItem = memo(({ title, selected, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(title);
  }, [title, onPress]);

  return (
    <Pressable
      style={[styles.category, selected && styles.categorySelected]}
      onPress={handlePress}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
    >
      <Text
        style={[
          styles.categoryText,
          selected && styles.categoryTextSelected,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
});

const CategoryList = memo(({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  onShowAll
}) => {
  const renderItem = useCallback(({ item }) => (
    <CategoryItem
      title={item}
      selected={selectedCategory === item}
      onPress={onCategorySelect}
    />
  ), [selectedCategory, onCategorySelect]);

  const keyExtractor = useCallback((item) => item, []);

  const handleShowAll = useCallback(() => {
    onShowAll?.();
  }, [onShowAll]);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <Pressable
            style={[
              styles.category,
              styles.showAllCategory,
              !selectedCategory && styles.categorySelected,
            ]}
            onPress={handleShowAll}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
          >
            <Text
              style={[
                styles.categoryText,
                !selectedCategory && styles.categoryTextSelected,
              ]}
            >
              All
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  category: {
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showAllCategory: {
    marginLeft: 8,
  },
  categorySelected: {
    backgroundColor: '#22223b',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textTransform: 'capitalize',
  },
  categoryTextSelected: {
    color: '#fff',
  },
});

CategoryItem.displayName = 'CategoryItem';
CategoryList.displayName = 'CategoryList';

export default CategoryList;
