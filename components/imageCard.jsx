import { Image, StyleSheet, View } from "react-native";

export default function ImageCard({item, index}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.webformatURL }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
  },
  image: {
    height: 300,
    width: "100%",
    aspectRatio: 1,
  },
});
