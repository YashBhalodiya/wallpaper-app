import { MasonryFlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";
import ImageCard from './imageCard';

export default function ImageGrid({ images }) {
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={2}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => <ImageCard item={item} index={index} />}
        estimatedItemSize={300}
      />

      {/* <FlashList
      data={images}
      masonry
      numColumns={2}
      renderItem={({ item }) => <ImageCard item={item} />}
    /> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // minHeight: 5,
        width: '100%'
    },  
    listContainerStyle:{
        paddingHorizontal: 10
    }
});
