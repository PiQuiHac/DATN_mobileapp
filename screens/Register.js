import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import loginBackground from '../assets/background2.png';
import logoBK from '../assets/LogoBK.png'
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import auth from '../firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showpass, setShowpass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const navigation = useNavigation();
  

  // check name,user name
  //check email format
  //check password and confirm
  function handleInput(name, email, password, confirmPassword) {
    if (!name || !email || !password || !confirmPassword ) return Alert.alert("Please fill out ");
    if (name.length < 3) return Alert.alert("Short Name");
    else if (
      !email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    )
      return Alert.alert("Invalid email");
    else if (password.length < 6) return Alert.alert("Short password");
    else if (password != confirmPassword)
      return Alert.alert("Password not matched");
    return true;
  }

  const handleSignUp = () => {
    if (handleInput(name, email, password, confirmPassword))
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('New Account with:', user.email);
        })
        .catch(error => alert(error.code));
        
};

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.safe_area}>
        <ImageBackground source={loginBackground} style={styles.safe_area}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            enableOnAndroid={true}>
            <View style={styles.logo_container}>
              <Image source={logoBK} style={styles.image} />
              <Text style={styles.app_name}>Create Account</Text>
            </View>

            <View style={styles.input_background}>
              <View style={styles.input_container}>
                <TextInput
                  placeholder={"Name"}
                  value={name}
                  onChangeText={value => {
                    setName(value);
                  }}
                  style={styles.input_holder}
                  autoFocus={true}
                />
                <TextInput
                  placeholder={"Email"}
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                  }}
                  style={styles.input_holder}
                />
                <View style={styles.password_container}>
                  <TextInput
                    placeholder={"Password"}
                    value={password}
                    secureTextEntry={showpass}
                    onChangeText={value => {
                      setPassword(value);
                    }}
                    style={styles.input_holder}
                  />
                  <TouchableOpacity
                    style={styles.show_password}
                    onPress={() => setShowpass(!showpass)}>
                    <MaterialCommunityIcons
                      name={showpass ? 'eye' : 'eye-off'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.password_container}>
                  <TextInput
                    placeholder={"Confirm password"}
                    value={confirmPassword}
                    secureTextEntry={showConfirm}
                    onChangeText={value => {
                      setConfirmPassword(value);
                    }}
                    style={styles.input_holder}
                  />
                  <TouchableOpacity
                    style={styles.show_password}
                    onPress={() => setShowConfirm(!showConfirm)}>
                    <MaterialCommunityIcons
                      name={showConfirm ? 'eye' : 'eye-off'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.register_button}>
                <SubmitButton
                  title={"Register"}
                  action={handleSignUp}
                  style={{backgroundColor: '#989898'}}
                />
                <View style={styles.align}>
                  <Text style={[styles.login_now, {color: '#989898'}]}>
                    {"Have an account? "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    <Text style={styles.login_now}>
                      {"Login now"}
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
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {height: 125, aspectRatio: 1, marginBottom: 10},
  app_name: {fontSize: 24, fontWeight: '600', color: '#45502E'},
  input_background: {
    flex: 3,
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
    flex: 5,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  register: {
    left: '5%',
    alignItems: 'center',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '600',
    color: '#33CCFF',
  },
  input_holder: {
    width: '90%',
    height: 50,
    backgroundColor: '#F4F6F9',
    marginVertical: 10,
    borderRadius: 10,
    left: '5%',
    paddingHorizontal: 10,
  },
  register_button: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  login_now: {color: '#0000FF', fontSize: 14},
  align: {flexDirection: 'row', marginTop: 10},
  password_container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  show_password: {position: 'absolute', right: '10%'},
});
