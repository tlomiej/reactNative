import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";

import { Button, StyleSheet, Text, View } from "react-native";
import SearchElement from "./src/SearchElement";

interface NominationResult {
  display_name: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
  osm_id: string;
  address: any;
}

const Stack = createStackNavigator();

export default function App() {
  const [textInput, setTextInput] = useState<string>("");
  const [items, setItems] = useState<NominationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NominationResult>();

  const ref = React.useRef<any>(null);

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

  const HomeScreen = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen test</Text>
      </View>
    );
  };

  const Menu = () => {
    return (
      <View>
        <Button
          onPress={() => ref.current && ref.current.navigate("Home")}
          title="Go home"
        />
        <Button
          onPress={() => ref.current && ref.current.navigate("Search")}
          title="Search"
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref}>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Menu">{() => <Menu />}</Stack.Screen>
          <Stack.Screen name="Search">{() => <SearchElement />}</Stack.Screen>
          <Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Button
        onPress={() => ref.current && ref.current.navigate("Home")}
        title="Go home"
      />
      <Button
        onPress={() => ref.current && ref.current.navigate("Search")}
        title="Search"
      />
    </View>
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
