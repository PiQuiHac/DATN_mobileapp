import { View, Text, StyleSheet, Image } from "react-native";

const FramePlant = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.frameIcon}>
          <Image
            source={require("../assets/plant.png")}
            style={styles.plant}
          ></Image>
        </View>
        <Text style={styles.name}>{props.name}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.status}>{props.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 140,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#ACDF87",
    alignItems: "center",
    flexDirection: "row",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: 70,
    width: "100%",
  },
  frameIcon: {
    width: 60,
    height: 60,
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
  footer: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontSize: 18,
  },
});

export default FramePlant;
