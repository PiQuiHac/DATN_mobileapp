import { Text, View, StyleSheet, Image, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ThungPhi = (props) => {
  return (
    <View style={styles.box}>
      <View style={styles.frameIcon}>
        <Ionicons
          name="water"
          size={35}
          color="#3895D3"
          style={styles.iconWater}
        ></Ionicons>
      </View>
      <View style={styles.frameText}>
        <Text style={styles.v}>{props.thetich} ml</Text>
        <Text style={styles.name}>Thể tích nước còn lại trong thùng phuy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3895D3",
  },
  iconDrum: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  name: {
    color: "white",
  },
  v: {
    fontSize: 20,
    color: "white",
  },
  iconWater: {
    marginLeft: 3,
  },
  frameIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  frameText: {
    marginLeft: 20,
  },
});

export default ThungPhi;
