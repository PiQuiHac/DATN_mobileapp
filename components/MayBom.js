import { Text, View, StyleSheet, Image, Switch } from "react-native";

const MayBom = (props) => {
  return (
    <View style={styles.box}>
      <View style={styles.frame}>
        <Image source={require("../assets/pump.png")} style={styles.iconPump} />
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#B8F2FF" }}
          thumbColor={props.state ? "#58CCED" : "#f4f3f4"}
          onChange={props.onChange}
          value={props.state}
        />
      </View>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    width: "48%",
    height: 120,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  frame: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconPump: {
    width: 50,
    height: 50,
  },
  name: {
    marginTop: 20,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default MayBom;
