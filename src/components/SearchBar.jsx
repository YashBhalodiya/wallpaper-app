import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, { memo, useCallback, useState } from 'react';
import {
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const SearchBar = memo(({ onSearch, onClear, placeholder = "Search wallpapers..." }) => {
  const [searchText, setSearchText] = useState('');

  const handleChangeText = useCallback((text) => {
    setSearchText(text);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchText.trim()) {
      onSearch?.(searchText.trim());
      Keyboard.dismiss();
    }
  }, [searchText, onSearch]);

  const handleClear = useCallback(() => {
    setSearchText('');
    onClear?.();
    Keyboard.dismiss();
  }, [onClear]);

  const handleSubmitEditing = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TouchableOpacity 
          style={styles.searchIcon} 
          onPress={handleSearch}
          activeOpacity={0.7}
        >
          <FontAwesome6
            name="magnifying-glass"
            size={18}
            color="#666"
            iconStyle="solid"
          />
        </TouchableOpacity>
        
        <TextInput
          placeholder={placeholder}
          style={styles.inputField}
          value={searchText}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />
        
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.clearButton}
            activeOpacity={0.7}
          >
            <FontAwesome6
              name="xmark"
              iconStyle="solid"
              size={16}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
    padding: 4,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
