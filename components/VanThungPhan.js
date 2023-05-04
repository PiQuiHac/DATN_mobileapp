import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const VanThungPhan = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <MaterialCommunityIcons
          name="bucket"
          size={50}
          color={"#3895D3"}
        ></MaterialCommunityIcons>
        <View>
          <Text style={styles.infoName}>{props.name}</Text>
          <Text style={styles.infoV}> {props.thetich} ml</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder="(ml)"
        keyboardType="numeric"
      />
      <Text style={props.state === true ? styles.stateOpen : styles.stateClose}>
        {props.state === true ? "Mở" : "Đóng"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoName: {
    verticalAlign: "middle",
  },
  infoV: {
    verticalAlign: "middle",
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  textControl: {
    verticalAlign: "middle",
    fontSize: 18,
  },
  input: {
    height: 30,
    width: 100,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 3,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 35,
  },
  stateOpen: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#62CDFF",
    width: 60,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    textAlign: "center",
  },
  stateClose: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#ccc",
    width: 60,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    textAlign: "center",
  },
  frameButton: {
    width: 80,
  },
  button: {},
});

export default VanThungPhan;
