import { View, Text, StyleSheet } from "react-native";

const FrameECPH = (props) => {
  return (
    <View style={styles.container}>
      <View style={props.standfor == "EC" ? styles.frameEC : styles.framePH}>
        <View style={styles.frameName}>
          <Text style={styles.standfor}>{props.standfor}</Text>
          <View style={styles.name}>
            <Text>{props.fName}</Text>
            <Text>{props.lName}</Text>
          </View>
        </View>
        <Text style={styles.value}>
          {props.value}
          {props.unit}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "49%",
    height: 100,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  frameEC: {
    backgroundColor: "#BCCEF8",
    borderRadius: 15,
    width: "90%",
    height: "80%",
    alignItems: "center",
  },
  framePH: {
    backgroundColor: "#A1E3D8",
    borderRadius: 15,
    width: "90%",
    height: "80%",
    alignItems: "center",
  },
  frameName: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginTop: 5,
  },
  col: {
    borderLeftWidth: 1,
    height: 40,
  },
  standfor: {
    fontSize: 20,
    marginRight: 25,
  },
  value: {
    marginTop: 10,
  },
});
export default FrameECPH;
