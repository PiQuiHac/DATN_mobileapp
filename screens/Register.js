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
import loginBackground from '../assets/login_background.png';
import logoStar from '../assets/logo_star.png';
import SubmitButton from '../components/SubmitButton';
export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//   const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [showpass, setShowpass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);


  // check name,user name
  //check email format
  //check password and confirm
  function handleRegister(name, email, password, confirmPassword, username) {
    if (!name || !email || !password || !confirmPassword || !username)
      return Alert.alert("Empty");
    else if (name.length < 3) return Alert.alert("Short Name");
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
    else if (username.length < 4) return Alert.alert("Short username");
    else if (/\s/.test(username))
      return Alert.alert("Invalid Username");
    // else if (!acceptPolicy) Alert.alert("Please accept policy");
    else return true;
  }
  const onClickRegister = () => {
    //call handleRegister than mutation to gql to get data
    if (handleRegister(name, email, password, confirmPassword, username)) {
      SignUp({
        variables: {
          company: '',
          email: email,
          password: password,
          name: name,
          username: username,
        },
      })
        .then(data => {
          Alert.alert("Success. Let's login", '', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('LoginMain');
              },
            },
          ]);
          email = name = username = password = confirmPassword = '';
        })
        .catch(error => {
          Alert.alert(error.message), console.log(error);
        });
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
            enableOnAndroid={true}>
            <View style={styles.logo_container}>
              <Image source={logoStar} style={styles.image} />
              <Text style={styles.app_name}>Name</Text>
            </View>
            <View style={styles.input_background}>
              <View style={styles.input_container}>
                <Text style={styles.register}>{"Register"}</Text>
                <TextInput
                  placeholder={"Name"}
                  defaultValue=""
                  onChangeText={value => {
                    setName(value);
                  }}
                  style={styles.input_holder}
                  autoFocus={true}
                />
                <TextInput
                  placeholder={"Email"}
                  defaultValue=""
                  onChangeText={value => {
                    setEmail(value);
                  }}
                  style={styles.input_holder}
                />
                <TextInput
                  placeholder={"User name"}
                  defaultValue=""
                  onChangeText={value => {
                    setUsername(value);
                  }}
                  style={styles.input_holder}
                />
                <View style={styles.password_container}>
                  <TextInput
                    placeholder={"Password"}
                    defaultValue=""
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
                    defaultValue=""
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

              {/* <View style={styles.policy_container}>
                <View style={styles.accept}>
                  <CheckBox
                    value={acceptPolicy}
                    onValueChange={setAcceptPolicy}
                  />
                  <Text style={[styles.policy, {color: '#989898'}]}>
                    {"Agree"}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.policy}>{t('register.policy')}</Text>
                  </TouchableOpacity>
                </View>
                <View></View>
              </View> */}

              <View style={styles.register_button}>
                <SubmitButton
                  title={"Register"}
                  action={onClickRegister}
                />
                <View style={styles.align}>
                  <Text style={[styles.login_now, {color: '#989898'}]}>
                    {"Hava an account? "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('LoginMain');
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {height: 125, aspectRatio: 1, marginBottom: 10},
  app_name: {fontSize: 24, fontWeight: '600', color: '#45502E'},
  input_background: {
    flex: 7,
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
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  register: {
    left: '5%',
    alignItems: 'flex-start',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '600',
    color: '#45502E',
  },
  input_holder: {
    width: '90%',
    backgroundColor: '#F4F6F9',
    marginVertical: 5,
    borderRadius: 5,
    left: '5%',
    paddingHorizontal: 10,
  },
  policy_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginBottom: 5,
  },
  accept: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  policy: {color: '#90CB62', fontSize: 11},
  register_button: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  login_now: {color: '#90CB62', fontSize: 14},
  align: {flexDirection: 'row', marginTop: 10},
  password_container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  show_password: {position: 'absolute', right: '10%'},
});
