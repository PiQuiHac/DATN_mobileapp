import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FrameSensor from "../components/FrameSensor";
import FrameNPK from "../components/FrameNPK";
import FrameECPH from "../components/FrameECPH";
import FramePlant from "../components/FramePlant";

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

let arrTemp = [];
let arrHumi = [];
let arrLabel = [];

const ViewDashboard = () => {
  const [arrayValue, setArrayValue] = useState({
    temp: [0],
    humi: [0],
    label: ["0"],
  });

  const [NPKECPH, setNPKECPH] = useState({
    nito: "0",
    photpho: "0",
    kali: "0",
    ec: "0",
    pH: "0",
  });

  const [plant, setPlant] = useState({
    name: "Cây Dưa Leo",
    status: "Bệnh Sương Mai",
  });

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/bkiot/piquihac/sensor2");
    client.subscribe("/bkiot/piquihac/plant2");
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

    if (message.destinationName === "/bkiot/piquihac/plant2") {
      console.log(payload);
      setPlant({ name: payload.name, status: payload.status });
    }
    if (message.destinationName === "/bkiot/piquihac/sensor2") {
      if (
        payload.temp != undefined &&
        payload.humi != undefined &&
        message.retained == false
      ) {
        arrTemp.push(payload.temp);
        arrHumi.push(payload.humi);

        var time = new Date();
        var label = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        arrLabel.push(label);

        if (arrTemp.length > 4) {
          arrTemp.shift();
        }
        if (arrHumi.length > 4) {
          arrHumi.shift();
        }
        if (arrLabel.length > 4) {
          arrLabel.shift();
        }

        setArrayValue({ temp: arrTemp, humi: arrHumi, label: arrLabel });

        const tempData = ["arr_temp", arrTemp.toString()];
        const humiData = ["arr_humi", arrHumi.toString()];
        const labelData = ["arr_label", arrLabel.toString()];

        storeData(tempData, humiData, labelData);
      }
      setNPKECPH({
        nito: payload.nito,
        photpho: payload.photpho,
        kali: payload.kali,
        ec: payload.ec,
        pH: payload.pH,
      });
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
    getData();
  }, []);

  const storeData = async (temp, humi, label) => {
    try {
      await AsyncStorage.multiSet([temp, humi, label]);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.multiGet([
        "arr_temp",
        "arr_humi",
        "arr_label",
      ]);
      if (value[0][1] !== null) {
        arrTemp = value[0][1].split(",");
      }

      if (value[1][1] !== null) {
        arrHumi = value[1][1].split(",");
      }

      if (value[2][1] !== null) {
        arrLabel = value[2][1].split(",");
      }
      setArrayValue({ temp: arrTemp, humi: arrHumi, label: arrLabel });
    } catch (e) {}
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title1}>Tình Trạng Cây</Text>
      <FramePlant name={plant.name} status={plant.status} />
      <Text style={styles.title2}>Điều Kiện Đất</Text>
      <FrameSensor
        data={arrayValue.temp}
        label={arrayValue.label}
        colorFrom={"#74c69d"}
        colorTo={"#74c69d"}
        name={"Nhiệt Độ: "}
        unit={" °C"}
      />
      <FrameSensor
        data={arrayValue.humi}
        label={arrayValue.label}
        colorFrom={"#58CCED"}
        colorTo={"#58CCED"}
        name={"Độ Ẩm: "}
        unit={" %"}
      />
      <View style={styles.frame}>
        <FrameNPK name={"Nitrogen"} value={NPKECPH.nito} />
        <FrameNPK name={"Photphorus"} value={NPKECPH.photpho} />
        <FrameNPK name={"Kali"} value={NPKECPH.kali} />
      </View>
      <View style={styles.frame}>
        <FrameECPH
          standfor={"EC"}
          value={NPKECPH.ec}
          fName={"Electrical"}
          lName={"Conductivity"}
          unit={" us/cm"}
        />
        <FrameECPH
          standfor={"pH"}
          value={NPKECPH.pH}
          fName={"Potential "}
          lName={"Hydrogen"}
          unit={" pH"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
  },
  frame: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title2: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 20,
  },
  title1: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ViewDashboard;
