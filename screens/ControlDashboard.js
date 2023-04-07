import { StyleSheet, ScrollView, View, Button } from "react-native";
import { useEffect, useState } from "react";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VanOngNuoc from "../components/VanOngNuoc";
import VanThungPhan from "../components/VanThungPhan";
import MayBom from "../components/MayBom";
import ThungPhi from "../components/ThungPhi";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const client = new Paho.MQTT.Client(
  "broker1.hcmut.org",
  9001,
  `python-mqtt-${parseInt(Math.random() * 100)}`
);

const ControlDashboard = () => {
  const [vanOngNuoc1, setVanOngNuoc1] = useState(false);
  const [vanOngNuoc2, setVanOngNuoc2] = useState(false);
  const [vanOngNuoc3, setVanOngNuoc3] = useState(false);
  const [vanThungPhan1, setVanThungPhan1] = useState(false);
  const [vanThungPhan2, setVanThungPhan2] = useState(false);
  const [vanThungPhan3, setVanThungPhan3] = useState(false);
  const [inputVanThungPhan1, setInputVanThungPhan1] = useState(0);
  const [inputVanThungPhan2, setInputVanThungPhan2] = useState(0);
  const [inputVanThungPhan3, setInputVanThungPhan3] = useState(0);

  const [vanMayBom1, setVanMayBom1] = useState(false);

  const toggleSwitch = (type) => {
    if (type === "vanOngNuoc1") {
      publishOngNuoc(!vanOngNuoc1, vanOngNuoc2, vanOngNuoc3);
      setVanOngNuoc1(!vanOngNuoc1);
    } else if (type === "vanOngNuoc2") {
      publishOngNuoc(vanOngNuoc1, !vanOngNuoc2, vanOngNuoc3);
      setVanOngNuoc2(!vanOngNuoc2);
    } else if (type === "vanOngNuoc3") {
      publishOngNuoc(vanOngNuoc1, vanOngNuoc2, !vanOngNuoc3);
      setVanOngNuoc3(!vanOngNuoc3);
    } else {
      message = new Paho.MQTT.Message(
        JSON.stringify({ value: vanMayBom1 === true ? 0 : 1 })
      );
      message.destinationName = `/bkiot/piquihac/test`;
      client.send(message);
      setVanMayBom1(!vanMayBom1);
    }
  };

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/bkiot/piquihac/vanOngNuocSub");
    client.subscribe("/bkiot/piquihac/vanThungPhanSub");
    client.subscribe("/bkiot/piquihac/test");
  }

  function onFail() {
    console.log("Connect Failed");
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    const payload = JSON.parse(message.payloadString).value;
    if (message.destinationName === "/bkiot/piquihac/vanOngNuocSub") {
      if (payload.vanOngNuoc1 === 1) setVanOngNuoc1(true);
      else if (payload.vanOngNuoc1 === 0) setVanOngNuoc1(false);
      if (payload.vanOngNuoc2 === 1) setVanOngNuoc2(true);
      else if (payload.vanOngNuoc2 === 0) setVanOngNuoc2(false);
      if (payload.vanOngNuoc3 === 1) setVanOngNuoc3(true);
      else if (payload.vanOngNuoc3 === 0) setVanOngNuoc3(false);
    } else if (message.destinationName === "/bkiot/piquihac/vanThungPhanSub") {
      if (payload.stateRelay1 === 1) setVanThungPhan1(true);
      else if (payload.stateRelay1 === 0) setVanThungPhan1(false);
      if (payload.stateRelay2 === 1) setVanThungPhan2(true);
      else if (payload.stateRelay2 === 0) setVanThungPhan2(false);
      if (payload.stateRelay3 === 1) setVanThungPhan3(true);
      else if (payload.stateRelay3 === 0) setVanThungPhan3(false);
    } else {
      if (payload === 1) setVanMayBom1(true);
      else setVanMayBom1(false);
    }
  }

  const publishOngNuoc = (vanOngNuoc1, vanOngNuoc2, vanOngNuoc3) => {
    const mess = {
      value: {
        vanOngNuoc1: vanOngNuoc1 === true ? 1 : 0,
        vanOngNuoc2: vanOngNuoc2 === true ? 1 : 0,
        vanOngNuoc3: vanOngNuoc3 === true ? 1 : 0,
      },
    };
    message = new Paho.MQTT.Message(JSON.stringify(mess));
    message.destinationName = `/bkiot/piquihac/vanOngNuocPub`;
    client.send(message);
  };

  const publishInputThungPhan = () => {
    const mess = {
      value: {
        stateRelay1: 0,
        timeRelay1: Number(inputVanThungPhan1),
        stateRelay2: 0,
        timeRelay2: Number(inputVanThungPhan2),
        stateRelay3: 0,
        timeRelay3: Number(inputVanThungPhan3),
      },
    };
    message = new Paho.MQTT.Message(JSON.stringify(mess));
    message.destinationName = `/bkiot/piquihac/vanThungPhan`;
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
    <ScrollView style={styles.container}>
      <ThungPhi />
      <View style={styles.frameMayBom}>
        <MayBom
          state={vanMayBom1}
          onChange={() => {
            toggleSwitch("vanMayBom1");
          }}
        />
        <MayBom />
      </View>

      <View style={styles.frameMayBom}>
        <VanOngNuoc
          state={vanOngNuoc1}
          name={"Van Ống Nước 1"}
          onChange={() => {
            toggleSwitch("vanOngNuoc1");
          }}
        />
        <VanOngNuoc
          state={vanOngNuoc2}
          name={"Van Ống Nước 2"}
          onChange={() => {
            toggleSwitch("vanOngNuoc2");
          }}
        />
        <VanOngNuoc
          state={vanOngNuoc3}
          name={"Van Ống Nước 3"}
          onChange={() => {
            toggleSwitch("vanOngNuoc3");
          }}
        />
      </View>

      <View style={styles.frameOngNuoc}>
        <VanThungPhan
          name={"Van Thùng Phân 1"}
          state={vanThungPhan1}
          onChangeText={setInputVanThungPhan1}
          value={inputVanThungPhan1}
        />
        <VanThungPhan
          name={"Van Thùng Phân 2"}
          state={vanThungPhan1}
          onChangeText={setInputVanThungPhan1}
          value={inputVanThungPhan1}
        />
        <VanThungPhan
          name={"Van Thùng Phân 2"}
          state={vanThungPhan1}
          onChangeText={setInputVanThungPhan1}
          value={inputVanThungPhan1}
        />
        <View style={styles.frameButton}>
          <View style={{ marginRight: 20 }}>
            <Button
              style={styles.button}
              title="Hủy Bỏ"
              color="#ccc"
              // onPress={publishInputThungPhan}
            />
          </View>
          <Button
            style={styles.buttonCaiDat}
            title="Cài Đặt"
            color="#1261A0"
            // onPress={publishInputThungPhan}
          />
        </View>
      </View>

      {/* <VanThungPhan
        name={"Van Thùng Phân 1"}
        state={vanThungPhan1}
        onChangeText={setInputVanThungPhan1}
        value={inputVanThungPhan1}
      />
      <VanThungPhan
        name={"Van Thùng Phân 2"}
        state={vanThungPhan2}
        onChangeText={setInputVanThungPhan2}
        value={inputVanThungPhan2}
      />
      <VanThungPhan
        name={"Van Thùng Phân 3"}
        state={vanThungPhan3}
        onChangeText={setInputVanThungPhan3}
        value={inputVanThungPhan3}
      />
      <View style={styles.frameButton}>
        <Button
          style={styles.button}
          title="Cài Đặt"
          color="green"
          onPress={publishInputThungPhan}
        />
      </View>
      <View style={styles.frameVanOngNuoc}>
        <VanOngNuoc
          state={vanOngNuoc1}
          name={"Van Ống Nước 1"}
          onChange={() => {
            toggleSwitch("vanOngNuoc1");
          }}
        />
        <VanOngNuoc
          state={vanOngNuoc2}
          name={"Van Ống Nước 2"}
          onChange={() => {
            toggleSwitch("vanOngNuoc2");
          }}
        />
        <VanOngNuoc
          state={vanOngNuoc3}
          name={"Van Ống Nước 3"}
          onChange={() => {
            toggleSwitch("vanOngNuoc3");
          }}
        />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    fontSize: 25,
  },
  frameVanOngNuoc: {
    marginTop: 10,
  },
  frameButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  frameMayBom: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  frameOngNuoc: {
    marginTop: 20,
    width: "100%",
    height: 280,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  buttonCaiDat: {
    marginRight: 50,
  },
});

export default ControlDashboard;
