import { View, Text, StyleSheet, Image } from "react-native";

const FramePlant = (props) => {
  return (
    // <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.frameIcon}>
        <Image
          source={require("../assets/plant.png")}
          style={styles.plant}
        ></Image>
      </View>
      <Text style={styles.name}>{props.name}</Text>
      {/* </View> */}
      {/* <View style={styles.footer}>
        <Text style={styles.status}>{props.status}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    backgroundColor: "#ACDF87",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    height: 65,
    width: "100%",
  },
  frameIcon: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "white",
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
  },
  plant: {
    width: 40,
    height: 40,
  },
});

export default FramePlant;
