import { StyleSheet, Text, Switch, View } from "react-native";
import { useEffect, useState } from "react";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ControlDashboard = (c) => {
  const [van1, setVan1] = useState(null);
  const toggleSwitch = () => {
    publish(!van1);
    setVan1((van1) => !van1);
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

  const publish = (value) => {
    if (value === true) value = 1;
    else value = 0;
    message = new Paho.MQTT.Message(JSON.stringify({ value: value }));
    message.destinationName = "/bkiot/piquihac/van1";
    client.send(message);
  };

  const client = new Paho.MQTT.Client(
    "broker1.hcmut.org",
    9001,
    `python-mqtt-${parseInt(Math.random() * 100)}`
  );

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    onSuccess: onConnect,
    onFailure: onFail,
    useSSL: false,
    userName: "vatserver",
    password: "vatserver123",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dasboard</Text>
      <View style={styles.control}>
        <Text style={styles.textControl}>Relay 1</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#6aa84f" }}
          thumbColor={van1 ? "green" : "#f4f3f4"}
          onChange={toggleSwitch}
          value={van1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    fontSize: 25,
  },
  control: {
    flexDirection: "row",
  },
  textControl: {
    verticalAlign: "middle",
    fontSize: 18,
  },
  switch: {},
});

export default ControlDashboard;
