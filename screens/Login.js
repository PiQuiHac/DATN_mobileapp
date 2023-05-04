import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SubmitButton from "../components/SubmitButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import loginBackground from "../assets/background2.png";
import logoBK from "../assets/LogoBK.png";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";

//this is for test user
export default function Login() {
  // sign in funtion in app
  // const {signIn} = useContext(Context);
  // after change into one state => data contain all
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState("eye");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigation = useNavigation();

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user)=> {
  //         if (user) {
  //             navigator.navigate("MyDrawer");
  //         }
  //     })
  // }, [])

  /** This is for handle input when login
   * check length, empty email or password,
   */
  const handleInput = (email, password) => {
    if (!email || !password) return Alert.alert("Empty");
    else if (
      !email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return Alert.alert("Invalid Email, please enter correct syntax email");
    else if (password.length < 6) return Alert.alert("Short Password");

    return true;
  };

  const handleLogin = () => {
    if (handleInput(email, password)) {
      signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.safe_area}>
        <ImageBackground source={loginBackground} style={styles.safe_area}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            enableOnAndroid={true}
            automaticallyAdjustContentInsets={false}
          >
            <View style={styles.logo_container}>
              <Image source={logoBK} style={styles.image} />
              <Text style={styles.app_name}>Đăng Nhập</Text>
            </View>
            <View style={styles.input_background}>
              <View style={styles.input_container}>
                <TextInput
                  placeholder={"Email"}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  style={styles.input_holder}
                />
                <View style={styles.password_holder}>
                  <TextInput
                    placeholder={"Mật Khẩu"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    style={[styles.input_holder]}
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity
                    style={styles.show_password}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry),
                        showpass == "eye"
                          ? setShowpass("eye-off")
                          : setShowpass("eye");
                    }}
                  >
                    <MaterialCommunityIcons name={showpass} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.forgot_container}>
                <View style={styles.forgot}></View>
                <View>
                  <TouchableOpacity>
                    <Text>Quên Mật Khẩu ?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.login_button}>
                <SubmitButton
                  title={"Đăng Nhập"}
                  action={() => {
                    if (handleInput(email, password)) {
                      navigation.navigate("MyDrawer");
                    }
                  }}
                />
                <View style={styles.register}>
                  <Text style={[styles.regis_now, { color: "#989898" }]}>
                    {"Bạn chưa có tài khoản? "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                  >
                    <Text style={styles.regis_now}>{"Đăng ký ngay"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe_area: { flex: 1 },
  logo_container: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: { height: 125, aspectRatio: 1, marginBottom: 10 },
  app_name: { fontSize: 24, fontWeight: "600", color: "#45502E" },
  input_background: {
    flex: 3,
    backgroundColor: "#ffffff",
    shadowColor: "#f5f5f5",
    shadowOffset: [0, -10],
    shadowOpacity: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    paddingVertical: 5,
  },
  input_container: {
    flex: 4,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  login: {
    left: "5%",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "600",
    color: "#45502E",
  },
  forgot_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: 5,
  },
  forgot: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  register: { flexDirection: "row", marginTop: 10 },
  regis_now: { color: "#0000FF", fontSize: 14 },
  login_button: {
    alignItems: "center",
    flex: 2.1,
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  input_holder: {
    width: "90%",
    height: 50,
    backgroundColor: "#F4F6F9",
    marginVertical: 10,
    borderRadius: 10,
    left: "5%",
    paddingHorizontal: 10,
  },
  password_holder: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  show_password: { position: "absolute", right: "10%" },
});
