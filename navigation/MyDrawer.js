import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

import ControlDashboard from "../screens/ControlDashboard";
import ViewDashboard from "../screens/ViewDashboard";
import ChatBot from "../screens/ChatBot";

import { useNavigation } from "@react-navigation/core";
import { getAuth, signOut } from "@firebase/auth";

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out");
        navigation.replace("Login");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <ImageBackground
            source={require("../assets/background.png")}
            style={styles.background}
          >
            <Image
              source={require("../assets/avatar.png")}
              style={styles.avatar}
            ></Image>
            <Text style={styles.name}>piquihac</Text>
          </ImageBackground>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            handleSignOut();
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="exit-outline"
              size={22}
              style={{ marginRight: 5 }}
            ></Ionicons>
            <Text>Đăng Xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MyDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Điều Khiển Công Tắc"
        component={ControlDashboard}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="dashboard" size={22} color={color}></AntDesign>
          ),
        }}
      />
      <Drawer.Screen
        name="Theo Dõi Cây Trồng"
        component={ViewDashboard}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="barschart" size={22} color={color}></AntDesign>
          ),
        }}
      />
      <Drawer.Screen
        name="Tư Vấn Cây Trồng"
        component={ChatBot}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="message1" size={22} color={color}></AntDesign>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontStyle: "italic",
  },
  background: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 20,
  },
});

export default MyDrawer;
