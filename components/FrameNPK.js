import { Text, View, StyleSheet } from "react-native";

const FrameNPK = (props) => {
  return (
    <View
      style={
        props.name == "Nitrogen"
          ? styles.frameCircleN
          : props.name == "Photphorus"
          ? styles.frameCircleP
          : styles.frameCircleK
      }
    >
      <View style={styles.container}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.value}>{props.value} mg/kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 55,
    alignItems: "center",
  },
  name: {
    marginTop: 20,
  },
  value: {
    marginTop: 10,
  },
  frameCircleN: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 6,
    borderColor: "white",
    backgroundColor: "#A8FAF5",
    justifyContent: "center",
    alignItems: "center",
  },

  frameCircleP: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 6,
    borderColor: "white",
    backgroundColor: "#A5D2F5",
    justifyContent: "center",
    alignItems: "center",
  },

  frameCircleK: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 6,
    borderColor: "white",
    backgroundColor: "#A2AAF6",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FrameNPK;
