import { Text, View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FrameSensor = (props) => {
  var currentTemp, label, dataset;
  var value = [];
  props.data.map((element) => value.push(parseInt(element)));
  dataset = [{ data: value }];
  currentTemp = value[props.data.length - 1];
  label = props.label;

  const colorFrom = props.colorFrom;
  const colorTo = props.colorTo;
  return (
    <View style={styles.frameChart}>
      <View style={styles.frameWhite}></View>
      <LineChart
        data={{
          labels: label,
          datasets: dataset,
        }}
        width={0.8 * Dimensions.get("window").width}
        height={200}
        yAxisSuffix=" ℃"
        chartConfig={{
          backgroundGradientFrom: colorFrom,
          backgroundGradientTo: colorTo,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
          },
        }}
        bezier
        style={{
          borderRadius: 5,
          borderTopLeftRadius: 0,
        }}
      />
      <View style={styles.frameName}>
        {props.name == "Nhiệt Độ: " ? (
          <FontAwesome5 name="temperature-low" size={20}></FontAwesome5>
        ) : props.name == "Độ Ẩm: " ? (
          <MaterialCommunityIcons
            name="water-percent"
            size={25}
          ></MaterialCommunityIcons>
        ) : (
          <></>
        )}
        <Text style={styles.name}>
          {props.name}
          {currentTemp}
          {props.unit}
        </Text>
      </View>
    </View>
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
    width: "100%",
    marginTop: 10,
  },
  frameWhite: {
    borderRadius: 15,
    backgroundColor: "white",
    width: "100%",
    height: 230,
    position: "absolute",
    zIndex: -1,
    top: 20,
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    marginLeft: 10,
  },
});

export default FrameSensor;
