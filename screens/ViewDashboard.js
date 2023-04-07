import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyLineChart from "../components/MyLineChart";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ViewDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.frameChart}>
        <View style={styles.frameWhite}></View>
        <MyLineChart />
        <View style={styles.frameName}>
          <FontAwesome5
            name="temperature-low"
            size={20}
            color="#ffa726"
          ></FontAwesome5>
          <Text style={styles.name}>Nhiệt Độ: 28 ℃</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  frameChart: {
    alignItems: "center",
    position: "relative",
    height: 250,
    marginTop: 20,
    marginBottom: 20,
  },
  frameName: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginTop: 10,
  },
  frameWhite: {
    borderRadius: 15,
    backgroundColor: "white",
    width: "90%",
    height: 230,
    position: "absolute",
    zIndex: -1,
    top: 20,
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    marginLeft: 10,
    color: "#ffa726",
  },
});

export default ViewDashboard;
