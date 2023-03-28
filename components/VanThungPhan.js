import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const VanThungPhan = (props) => {
  return (
    <View>
      <View style={styles.control}>
        <Text style={styles.textControl}>{props.name}</Text>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder="giây (s)"
          keyboardType="numeric"
        />
        <Text
          style={props.state === true ? styles.stateOpen : styles.stateClose}
        >
          {props.state === true ? "Mở" : "Đóng"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 70,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    textAlign: "center",
    marginLeft: 10,
  },
  stateOpen: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
    backgroundColor: "green",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
  },
  stateClose: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
    backgroundColor: "red",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
  },
  frameButton: {
    width: 80,
  },
  button: {},
});

export default VanThungPhan;
