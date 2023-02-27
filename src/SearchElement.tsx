import React, { MutableRefObject, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

interface NominationResult {
  display_name: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
  osm_id: string;
  address: any;
}

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

const SearchElement = (navigation: any) => {
  const [textInput, setTextInput] = useState<string>("");
  const [items, setItems] = useState<NominationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        renderItem={({ item, index }) => (
          <Text>
            <Button
              onPress={() => navigation.navigate("Details")}
              title="Details"
            />
            <Text style={styles.item}>
              {`${item.display_name}`}
              {"\n"}
            </Text>
            <Text style={styles.item}>
              {`${item.lat} ${item.lon}`}
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
};

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

  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SearchElement;
