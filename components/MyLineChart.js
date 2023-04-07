import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const MyLineChart = () => {
  return (
    <View>
      <LineChart
        data={{
          labels: ["10:00", "10:05", "10:10", "10:15"],
          datasets: [
            {
              data: [32, 28, 30, 28],
            },
          ],
        }}
        width={0.8 * Dimensions.get("window").width}
        height={200}
        yAxisSuffix=" ℃"
        chartConfig={{
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
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
    </View>
  );
};

export default MyLineChart;
