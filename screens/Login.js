import React, {useState, useContext} from 'react';
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
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitButton from '../components/SubmitButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import loginBackground from '../assets/login_background.png';
import logoStar from '../assets/logo_star.png';
import logoBK from '../assets/Logo BK_vien trang.png';
import { useNavigation } from '@react-navigation/native';
//this is for test user
export default function Login() {
  // sign in funtion in app
  // const {signIn} = useContext(Context);
  // after change into one state => data contain all
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpass, setShowpass] = useState('eye');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigation = useNavigation();
  /** This is for handle input when login
   * check length, empty email or password,
   */
  const handleLogin = (email, password) => {
    if (!email || !password) return Alert.alert("Empty");
    else if (
      !email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    )
      return Alert.alert("Invalid Email");
    else if (password.length < 6) return Alert.alert("Short Password");

    return true;
  };
  // const [handle] = useMutation(login);

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.safe_area}>
        <ImageBackground source={loginBackground} style={styles.safe_area}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            enableOnAndroid={true}
            automaticallyAdjustContentInsets={false}>
            <View style={styles.logo_container}>
              <Image source={logoStar} style={styles.image} />
              <Text style={styles.app_name}>name</Text>
            </View>
            <View style={styles.input_background}>
              <View style={styles.input_container}>
                <Text style={styles.login}>Login</Text>
                <TextInput
                  placeholder={"Email"}
                  onChangeText={value => setEmail(value)}
                  style={styles.input_holder}
                />
                <View style={styles.password_holder}>
                  <TextInput
                    placeholder={"Password"}
                    onChangeText={value => setPassword(value)}
                    style={[styles.input_holder]}
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity
                    style={styles.show_password}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry),
                        showpass == 'eye'
                          ? setShowpass('eye-off')
                          : setShowpass('eye');
                    }}>
                    <MaterialCommunityIcons name={showpass} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.forgot_container}>
                <View style={styles.forgot}>
                </View>
                <View>
                  <TouchableOpacity>
                    <Text>Forgot Password </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.login_button}>
                <SubmitButton
                  title={"Login"}
                  action={() => {
                    if (handleLogin(email, password)) {
                      // handle({variables: {email: email, password: password}})
                        // .then(data => signIn(email, data))
                        // .catch(err => console.error(err));
                        navigation.navigate('MyDrawer');
                    }
                  }}
                />
                <View style={styles.register}>
                  <Text style={[styles.regis_now, {color: '#989898'}]}>
                    {"Have no account? "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Register');
                    }}>
                    <Text style={styles.regis_now}>
                      {"Sign up here"}
                    </Text>
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
  safe_area: {flex: 1},
  logo_container: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {height: 125, aspectRatio: 1, marginBottom: 10},
  app_name: {fontSize: 24, fontWeight: '600', color: '#45502E'},
  input_background: {
    flex: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#f5f5f5',
    shadowOffset: [0, -10],
    shadowOpacity: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    paddingVertical: 5,
  },
  input_container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  login: {
    left: '5%',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '600',
    color: '#45502E',
  },
  forgot_container: {
    flex: 1.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginBottom: 5,
  },
  forgot: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  register: {flexDirection: 'row', marginTop: 10},
  regis_now: {color: '#90CB62', fontSize: 14},
  login_button: {
    alignItems: 'center',
    flex: 2.1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  input_holder: {
    width: '90%',
    backgroundColor: '#F4F6F9',
    marginVertical: 10,
    borderRadius: 5,
    left: '5%',
    paddingHorizontal: 10,
  },
  password_holder: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  show_password: {position: 'absolute', right: '10%'},
});
