import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  Modal,
  View,
  Pressable,
} from "react-native";

interface NominationResult {
  display_name: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
  osm_id: string;

}

export default function App() {
  const [textInput, setTextInput] = useState<string>("");
  const [items, setItems] = useState<NominationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NominationResult>();

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
        renderItem={({ item, index }) => (
          <Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setModalVisible(true);
                setSelectedItem(items[index]);
              }}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Property</Text>

            <Text style={styles.modalText}>{selectedItem?.display_name}</Text>
            <Text style={styles.modalText}>{selectedItem?.class}</Text>
            <Text style={styles.modalText}>{selectedItem?.type}</Text>
            <Text style={styles.modalText}>{selectedItem?.osm_id}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    borderRadius: 20,
    padding: 35,
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
