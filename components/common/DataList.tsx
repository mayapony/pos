import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, List } from "react-native-paper";

const persons = [
  {
    id: "1",
    name: "Earnest Green",
  },
  {
    id: "2",
    name: "Winston Orn",
  },
  {
    id: "3",
    name: "Carlton Collins",
  },
  {
    id: "4",
    name: "Malcolm Labadie",
  },
  {
    id: "5",
    name: "Michelle Dare",
  },
  {
    id: "6",
    name: "Carlton Zieme",
  },
  {
    id: "7",
    name: "Jessie Dickinson",
  },
  {
    id: "8",
    name: "Julian Gulgowski",
  },
  {
    id: "9",
    name: "Ellen Veum",
  },
  {
    id: "10",
    name: "Lorena Rice",
  },

  {
    id: "11",
    name: "Carlton Zieme",
  },
  {
    id: "12",
    name: "Jessie Dickinson",
  },
  {
    id: "13",
    name: "Julian Gulgowski",
  },
  {
    id: "14",
    name: "Ellen Veum",
  },
  {
    id: "15",
    name: "Lorena Rice",
  },
];

const DataList = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>出售记录</List.Subheader>
          {persons.map((person) => {
            return (
              // <View key={person.id}>
              //   <Text style={styles.item}>{person.name}</Text>
              // </View>
              <View key={person.id}>
                <List.Item title={person.name} />
                <Divider />
              </View>
            );
          })}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});

export default DataList;
