import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiCall } from "../api/index";
import { data } from "../constants/data";

export default function home() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);

  type CategoryItemProps = {
    title: string;
    selected: boolean;
    onPress: () => void;
  };

  const CategoryItem: React.FC<CategoryItemProps> = ({ title, selected, onPress }) => {
    return (
      <Pressable
        style={[styles.category, selected ? styles.categorySelected : null]}
        onPress={onPress}
      >
        <Text style={[styles.categoriesTitle, selected ? styles.categoriesTitleSelected : null]}>{title}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = async (params={page: 1}, append=true) => {
    let res = await apiCall(params);
    // console.log('got result', res.data);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits])
      }else{
        setImages([...res.data.hits])
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.titletxt}>Wallpapers</Text>

        <Pressable style={styles.menubtn}>
          <FontAwesome6 name="bars-staggered" size={22} iconStyle="solid" />
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.searchRow}>
          <FontAwesome6
            name="magnifying-glass"
            size={20}
            style={{ marginRight: 8 }}
            iconStyle="solid"
          />
          <TextInput
            placeholder="Search"
            style={styles.inputField}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText("")}
              style={styles.cancelBtn}
            >
              <FontAwesome6
                name="xmark"
                iconStyle="solid"
                size={20}
                style={styles.cancelBtn}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        alwaysBounceHorizontal
        contentContainerStyle={styles.categoriesContainer}
        showsHorizontalScrollIndicator={false}
        data={data.categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryItem
            title={item}
            selected={selectedCategory === item}
            onPress={() => setSelectedCategory(item)}
          />
        )}
      />

      {/* Images */}
      {/* <FlatList 
        data={images}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={1}
        contentContainerStyle={{padding: 8}}
        renderItem={({item}) => (
          <View>
            <Image source={{uri: item.webformatURL}}
              style={{width: '100%', aspectRatio: 1, borderRadius: 12}}
              resizeMode="cover"
            />
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  titletxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  menubtn: {
    padding: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 18,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
  cancelBtn: {
    marginLeft: 10,
    justifyContent: "center",
  },
  categoriesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  category: {
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 80,
    alignItems: 'center',
  },
  categorySelected: {
    backgroundColor: '#22223b',
  },
  categoriesTitle: {
    fontSize: 18,
    color: '#22223b',
    fontWeight: '600',
  },
  categoriesTitleSelected: {
    color: '#fff',
  }
});
