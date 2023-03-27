import {
  StyleSheet,
  Text,
  Switch,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = new Paho.MQTT.Client(
  "broker1.hcmut.org",
  9001,
  `python-mqtt-${parseInt(Math.random() * 100)}`
);

const ControlDashboard = () => {
  const [van1, setVan1] = useState(false);
  const [inputVan1, setInputVan1] = useState("");
  const toggleSwitch = (topic) => {
    publish(!van1, topic);
    setVan1(!van1);
  };

  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {},
  });

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/bkiot/piquihac/van1");
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    const payload = JSON.parse(message.payloadString).value;
    if (message.destinationName === "/bkiot/piquihac/van1") {
      if (payload === 1) setVan1(true);
      else setVan1(false);
    }
  }

  function onFail() {
    console.log("Connect Failed");
  }

  const publish = (value, topic) => {
    if (value === true) value = 1;
    else value = 0;
    message = new Paho.MQTT.Message(JSON.stringify({ value: value }));
    message.destinationName = `/bkiot/piquihac/${topic}`;
    client.send(message);
  };

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  useEffect(() => {
    client.connect({
      onSuccess: onConnect,
      onFailure: onFail,
      useSSL: false,
      userName: "vatserver",
      password: "vatserver123",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dasboard</Text>
      <View style={styles.control}>
        <Text style={styles.textControl}>Van thùng phân 1</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#6aa84f" }}
          thumbColor={van1 ? "green" : "#f4f3f4"}
          onChange={() => {
            toggleSwitch("van1");
          }}
          value={van1}
        />
        <TextInput
          style={styles.input}
          onChangeText={setInputVan1}
          value={inputVan1}
          placeholder="second"
        />
        <Button
          style={styles.button}
          title="Setting"
          color="green"
          onPress={() => Alert.alert("Simple Button pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    fontSize: 25,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
  },
  textControl: {
    verticalAlign: "middle",
    fontSize: 18,
  },
  switch: {},
  input: {
    height: 30,
    width: 70,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    textAlign: "center",
    marginRight: 10,
  },
  button: {
    borderWidth: 10,
  },
});

export default ControlDashboard;
