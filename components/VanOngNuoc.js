import { View, Switch, Text, StyleSheet } from "react-native";

const VanOngNuoc = (props) => {
  return (
    <View style={styles.control}>
      <Text style={styles.textControl}>{props.name}</Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#6aa84f" }}
        thumbColor={props.state ? "green" : "#f4f3f4"}
        onChange={props.onChange}
        value={props.state}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    fontSize: 25,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textControl: {
    verticalAlign: "middle",
    fontSize: 18,
  },
  switch: {},
});

export default VanOngNuoc;
