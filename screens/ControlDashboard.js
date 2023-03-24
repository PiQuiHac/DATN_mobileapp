import { StyleSheet, Text, Switch, View } from "react-native";
import { useState } from "react";

const ControlDashboard = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dasboard</Text>
      <View style={styles.control}>
        <Text style={styles.textControl}>Relay 1</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#6aa84f" }}
          thumbColor={isEnabled ? "green" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    fontSize: 25,
  },
  control: {
    flexDirection: "row",
  },
  textControl: {
    verticalAlign: "middle",
    fontSize: 18,
  },
  switch: {},
});

export default ControlDashboard;
