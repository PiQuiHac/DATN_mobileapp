import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FrameSensor from "../components/FrameSensor";
import FrameNPK from "../components/FrameNPK";
import FrameECPH from "../components/FrameECPH";
import FramePlant from "../components/FramePlant";
import axios from "axios";

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
  const API_ENDPOINT =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const API_KEY = "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";

  //const API_KEY = "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";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

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

  const [text, onChangeText] = useState("");

  const [selectedMode, setSelectedMode] = useState("manual");

  const [time, setTime] = useState("");

  const [status, setStatus] = useState([]);

  const translate = (text, arr2) => {
    const sourceText = text;
    const sourceLang = "en";
    const targetLang = "vi";

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      sourceText
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const capitalizeFirstLetter = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        };
        const newArr = data[0][0][0].split(", ");
        const result = newArr.map((str) => {
          return capitalizeFirstLetter(str);
        });
        const hehe = result.map((name, index) => {
          return { name, percent: arr2[index] };
        });
        setStatus(hehe);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      //console.log(payload);

      const arr = Object.keys(payload);
      const arr2 = Object.values(payload);
      //console.log(arr.toString());
      //console.log(arr2);
      translate(arr.toString(), arr2);
    }
    if (message.destinationName === "/bkiot/piquihac/sensor2") {
      console.log(payload);
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

  const publish = (topic, mess) => {
    var message = new Paho.MQTT.Message(JSON.stringify(mess));
    message.destinationName = `/bkiot/piquihac/${topic}`;
    client.send(message);
  };

  const handleSubmit = () => {
    const prompt = `Các loại bệnh phổ biến trên lá cây ${text} , liệt kê 10 tên bằng tiếng anh, mỗi tên cách nhau một dấu phẩy, trả lời trên một dòng, không giải thích thêm`;
    const data = {
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
    };
    axios
      .post(API_ENDPOINT, data, config)
      .then((response) => {
        const str = response.data.choices[0].text;
        var result = str.replace(/[:\n.]/g, "");
        result = result.split(", ");
        console.log(result);
        const mess = { list: result };
        publish("plant1", mess);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAuto = () => {
    const mess = { mode: "auto", time: time };
    publish("sensor1", mess);
  };

  const handleManual = () => {
    const mess = { mode: "manual", update: 1 };
    publish("sensor1", mess);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title1}>Tình Trạng Cây</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Hãy nhập tên cây bạn cần theo dõi"
        />
        <View style={styles.frameButton}>
          <Button
            style={styles.button}
            title="Cài Đặt"
            onPress={() => handleSubmit()}
            color="#76BA1B"
          />
        </View>
      </View>
      <FramePlant name={`Cây ${text}`} />
      {status.length === 0 ? (
        <></>
      ) : (
        <View style={styles.container3}>
          <View style={styles.rowHeader}>
            <Text style={[styles.cell, styles.header]}>Tình Trạng Cây</Text>
            <Text style={[styles.cell, styles.header]}>Độ Chính Xác (%)</Text>
          </View>
          {status.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.percent}</Text>
            </View>
          ))}
        </View>
      )}
      <Text style={styles.title2}>Điều Kiện Đất</Text>
      <View>
        <View style={styles.framePicker}>
          <Picker
            selectedValue={selectedMode}
            onValueChange={(itemValue, itemIndex) => setSelectedMode(itemValue)}
            style={styles.select}
            color="#5c255c"
          >
            <Picker.Item label="Cập Nhật Thủ Công" value="manual" />
            <Picker.Item label="Tự Động Cập Nhật" value="auto" />
          </Picker>
        </View>
      </View>
      <View style={styles.frameMode}>
        {selectedMode === "auto" ? (
          <View style={styles.time}>
            <TextInput
              keyboardType="numeric"
              placeholder="Hãy nhập thời gian chu kỳ"
              onChangeText={setTime}
              value={time}
            />
          </View>
        ) : (
          <View style={styles.time}>
            <Text style={{ paddingTop: 5, color: "grey" }}>
              Nhấn nút để cập nhật dữ liệu mới
            </Text>
          </View>
        )}

        {selectedMode === "auto" ? (
          <View style={styles.frameButton}>
            <Button
              style={styles.button}
              title="Cài Đặt"
              onPress={() => handleAuto()}
              color="#76BA1B"
            />
          </View>
        ) : (
          <View style={styles.frameButton}>
            <Button
              style={styles.button}
              title="Cập Nhật"
              onPress={() => handleManual()}
              color="#76BA1B"
            />
          </View>
        )}
      </View>
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

  container2: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "70%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#ACDF87",
  },
  frameButton: {
    width: 90,
    marginLeft: 25,
  },
  framePicker: {
    marginTop: 10,
    backgroundColor: "#D9E7E2",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: "green",
    borderBottomWidth: 1,
    width: "100%",
  },
  select: {
    width: "100%",
  },
  frameMode: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  time: {
    width: "68%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: "#ACDF87",
  },

  container3: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#D9E7E2",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ViewDashboard;
