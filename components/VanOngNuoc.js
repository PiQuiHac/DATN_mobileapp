import { View, Switch, Text, StyleSheet, Image } from "react-native";

const VanOngNuoc = (props) => {
  return (
    <View style={styles.box}>
      <View style={styles.frame}>
        <Image
          source={require("../assets/valve.png")}
          style={styles.iconPump}
        />
      </View>
      <View style={styles.frame}>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#B8F2FF" }}
          thumbColor={props.state ? "#58CCED" : "#f4f3f4"}
          onChange={props.onChange}
          value={props.state}
        />
      </View>
      <View style={styles.frame}>
        <Text style={styles.name}>{props.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "32%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  frame: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconPump: {
    width: 50,
    height: 50,
  },
  name: { fontSize: 12 },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default VanOngNuoc;
