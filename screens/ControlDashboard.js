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

  const [vanMayBomIn, setVanMayBomIn] = useState(false);
  const [vanMayBomOut, setVanMayBomOut] = useState(false);

  const publish = (topic, mess) => {
    message = new Paho.MQTT.Message(JSON.stringify(mess));
    message.destinationName = `/bkiot/piquihac/${topic}`;
    client.send(message);
  };

  const handleSwitch = (type) => {
    let setted = 0;
    if (type === "vanOngNuoc1") {
      setVanOngNuoc1(!vanOngNuoc1);
      setted = 1;
    } else if (type === "vanOngNuoc2") {
      setVanOngNuoc2(!vanOngNuoc2);
      setted = 2;
    } else if (type === "vanOngNuoc3") {
      setVanOngNuoc3(!vanOngNuoc3);
      setted = 3;
    } else if (type === "vanMayBomIn") {
      setVanMayBomIn(!vanMayBomIn);
      setted = 4;
    } else {
      setVanMayBomOut(!vanMayBomOut);
      setted = 5;
    }
    const mess = {
      valve4: setted === 1 ? (!vanOngNuoc1 ? 1 : 0) : vanOngNuoc1 ? 1 : 0,
      valve5: setted === 2 ? (!vanOngNuoc2 ? 1 : 0) : vanOngNuoc2 ? 1 : 0,
      valve6: setted === 3 ? (!vanOngNuoc3 ? 1 : 0) : vanOngNuoc3 ? 1 : 0,
      pumpIn: setted === 4 ? (!vanMayBomIn ? 1 : 0) : vanMayBomIn ? 1 : 0,
      pumpOut: setted === 5 ? (!vanMayBomOut ? 1 : 0) : vanMayBomOut ? 1 : 0,
    };
    publish("waterValve1", mess);
  };

  const setTP = () => {
    const mess = {
      valve1: 0,
      v1: Number(inputVanThungPhan1),
      valve2: 0,
      v2: Number(inputVanThungPhan2),
      valve3: 0,
      v3: Number(inputVanThungPhan3),
    };
    publish("ferValve1", mess);
  };

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/bkiot/piquihac/waterValve2");
    client.subscribe("/bkiot/piquihac/ferValve2");
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
    const payload = JSON.parse(message.payloadString);
    console.log("payload: ", payload);

    if (message.destinationName === "/bkiot/piquihac/waterValve2") {
      payload.valve4 === 1 ? setVanOngNuoc1(true) : setVanOngNuoc1(false);
      payload.valve5 === 1 ? setVanOngNuoc2(true) : setVanOngNuoc2(false);
      payload.valve6 === 1 ? setVanOngNuoc3(true) : setVanOngNuoc3(false);
      payload.pumpIn === 1 ? setVanMayBomIn(true) : setVanMayBomIn(false);
      payload.pumpOut === 1 ? setVanMayBomOut(true) : setVanMayBomOut(false);
    } else if (message.destinationName === "/bkiot/piquihac/ferValve2") {
      payload.valve1 === 1 ? setVanThungPhan1(true) : setVanThungPhan1(false);
      payload.valve2 === 1 ? setVanThungPhan2(true) : setVanThungPhan2(false);
      payload.valve3 === 1 ? setVanThungPhan3(true) : setVanThungPhan3(false);
    }
  }

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
          state={vanMayBomIn}
          name={"Máy Bơm Nước Vào"}
          onChange={() => {
            handleSwitch("vanMayBomIn");
          }}
        />
        <MayBom
          state={vanMayBomOut}
          name={"Máy Bơm Nước Ra"}
          onChange={() => {
            handleSwitch("vanMayBomOut");
          }}
        />
      </View>

      <View style={styles.frameMayBom}>
        <VanOngNuoc
          state={vanOngNuoc1}
          name={"Van Ống Nước 1"}
          onChange={() => {
            handleSwitch("vanOngNuoc1");
          }}
        />
        <VanOngNuoc
          state={vanOngNuoc2}
          name={"Van Ống Nước 2"}
          onChange={() => {
            handleSwitch("vanOngNuoc2");
          }}
        />
        <VanOngNuoc
          state={vanOngNuoc3}
          name={"Van Ống Nước 3"}
          onChange={() => {
            handleSwitch("vanOngNuoc3");
          }}
        />
      </View>

      <View style={styles.frameOngNuoc}>
        <VanThungPhan
          name={"Thùng Phân 1"}
          state={vanThungPhan1}
          onChangeText={setInputVanThungPhan1}
          value={inputVanThungPhan1}
        />
        <VanThungPhan
          name={"Thùng Phân 2"}
          state={vanThungPhan2}
          onChangeText={setInputVanThungPhan2}
          value={inputVanThungPhan2}
        />
        <VanThungPhan
          name={"Thùng Phân 3"}
          state={vanThungPhan3}
          onChangeText={setInputVanThungPhan3}
          value={inputVanThungPhan3}
        />
        <View style={styles.frameButton}>
          <View style={{ marginRight: 20 }}>
            <Button
              style={styles.button}
              title="Hủy Bỏ"
              color="#ccc"
              ///onPress={handleTP}
            />
          </View>
          <Button
            style={styles.buttonCaiDat}
            title="Cài Đặt"
            color="#1261A0"
            onPress={setTP}
          />
        </View>
      </View>
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
