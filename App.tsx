import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [items, setItems] = useState([]);

  const getData = async (input: string) => {
    const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input}&format=json&limit=30`;
    const data = await fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error);
    return data;
  };

  useEffect(() => {
    //Alert.alert("Use " + textInput);
  }, [textInput]);

  return (
    <ScrollView style={styles.container}>
      <Text>Some text</Text>
      <View>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
          style={{ width: 10, height: 20, justifyContent: "center" }}
        />
      </View>
      <TextInput
        returnKeyType="search"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center",
        }}
        defaultValue=""
        onChangeText={(newText) => setTextInput(newText)}
      />
      <Button
        onPress={async () => {
          const d = await getData(textInput);
          setItems(d);
        }}
        title="Search"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Text>
            <Text style={styles.item}>
              {`${item["display_name"]}`}
              {"\n"}
            </Text>
            <Text style={styles.item}>
              {`${item["lat"]} ${item["lon"]}`}
              {"\n"}
            </Text>
          </Text>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*  backgroundColor: "#fff", */
    /*   justifyContent: "center", */
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
