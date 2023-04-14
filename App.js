import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./navigation/MyDrawer";
import Login from "./screens/Login";
import Register from "./screens/Register"

export default function App() {
  return (
    <NavigationContainer>
      {/* <Login /> */}
      <Register />
      {/* <MyDrawer /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
