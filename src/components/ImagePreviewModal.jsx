import { Dimensions, Image, Modal, Pressable, StatusBar, StyleSheet, Text } from 'react-native';

const {width, height} = Dimensions.get('window');
const ImagePreviewModal = ({visible, image, onClose}) => {
    if(!image) return null;

  return (
    <Modal visible={visible} transparent={true} animationType='fade' statusBarTranslucent={true} onRequestClose={onClose}>
        <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
        <Pressable style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
        </Pressable>
        <Image source={{uri: image.largeImageURL || image.webformatURL}} style={styles.image} resizeMode='contain' />
    </Modal>
  );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
})

export default ImagePreviewModal;