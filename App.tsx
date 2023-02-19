import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [textInput, setTextInput] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (input: string) => {
    const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input}&format=json&limit=3`;
    const data = await fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch(() => {
        return [];
      });
    return data;
  };

  useEffect(() => {
    //Alert.alert("Use " + textInput);
  }, [textInput]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          setItems([]);
          setLoading(true);
          const d = await getData(textInput);
          setItems(d);
          setLoading(false);
        }}
        title="Search"
        color="#841584"
        accessibilityLabel="Search button"
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
        ListHeaderComponent={() => {
          if (loading) {
            return <Text>Loading...</Text>;
          }
          return null;
        }}
      />
    </SafeAreaView>
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
