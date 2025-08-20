import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    Image,
    Modal,
    Pressable,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ImagePreviewModal = ({ visible, image, onClose }) => {
  if (!image) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
      <View style={styles.overlay}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          {/* <Text style={styles.closeIcon}>X</Text> */}
          <Ionicons name="close" size={28} color="#fff" />
        </Pressable>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.largeImageURL || image.webformatURL }}
            style={styles.image}
            resizeMode="contain"
            loadingIndicatorSource={{ uri: image.previewURL }}
          />
          <View style={styles.actionRow}>
            <Pressable style={styles.actionButton} onPress={null}>
              <Ionicons name="download" size={28} color="#fff" />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={null}>
              <Ionicons name="heart" size={28} color="#fff" />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={null}>
              <Ionicons name="share" size={28} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22, 21, 21, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.95,
    height: height * 0.7,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // resizeMode: "contain",
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 24,
  },
  actionButton: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },
});

export default ImagePreviewModal;
