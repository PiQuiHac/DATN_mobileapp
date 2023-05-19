import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { View, FlatList, StyleSheet, TextInput, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      type: "bot",
      text: "Nếu bạn đang có thắc mắc về cây trồng, hãy đặt câu hỏi cho tôi!",
    },
  ]);
  const API_ENDPOINT =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const API_KEY = "";

  // const API_KEY = "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";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const request = {
    prompt: question,
    max_tokens: 1000,
    temperature: 0.5,
  };

  const handleSend = () => {
    setIsLoading(true);
    setData([...data, { type: "user", text: question }]);
    setQuestion("");
    axios
      .post(API_ENDPOINT, request, config)
      .then((response) => {
        const answer = response.data.choices[0].text.replace(/^\n\n/, "");
        setData([
          ...data,
          { type: "user", text: question },
          { type: "bot", text: answer },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={item.type === "user" ? styles.frameUser : styles.frameBot}>
        <View style={item.type === "user" ? styles.user : styles.bot}>
          <Text style={{ fontSize: 18 }}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const onContentSizeChange = () => {
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderMessage}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        style={styles.content}
        onContentSizeChange={onContentSizeChange}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={(question) => setQuestion(question)}
          placeholder={
            isLoading === true
              ? "Hệ thống đang trả lời, vui lòng đợi chút..."
              : "Aa"
          }
          editable={!isLoading}
        ></TextInput>
        {question === "" ? (
          <></>
        ) : (
          <Ionicons
            name="send"
            size={22}
            onPress={() => handleSend()}
          ></Ionicons>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    marginBottom: 50,
  },
  frameUser: {
    alignItems: "flex-end",
  },
  frameBot: {
    alignItems: "flex-start",
  },
  user: {
    backgroundColor: "rgba(0, 122, 255, 0.5)",
    borderRadius: 10,
    borderBottomRightRadius: 0,
    padding: 10,
    maxWidth: "70%",
    margin: 10,
  },
  bot: {
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    padding: 10,
    maxWidth: "70%",
    margin: 10,
  },
  inputContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "lightgray",
    padding: 10,
  },
});

export default ChatBot;
