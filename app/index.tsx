import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const navigateToHome = () =>{
    router.push('/home')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,1.9)", "white"]}
        style={styles.gradient}
        locations={[0, 0.5, 1]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.titletxt}>Wallpaper</Text>
          <Text style={styles.subtxt}>Pixels with purpose.</Text>
          <TouchableOpacity style={styles.startbtn} onPress={navigateToHome}>
            <Text style={styles.startbtntxt}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 500,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  titletxt: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    alignItems: "baseline",
  },
  subtxt: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 18,
  },
  startbtn:{
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  startbtntxt:{
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  }
});
