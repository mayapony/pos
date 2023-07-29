import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Divider, List, MD3Colors, Searchbar, Text } from "react-native-paper";
import { findRecords } from "../../api/record";
import { RecordWithPhone } from "../../types/record.type";

const RecordScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [records, setRecords] = React.useState<RecordWithPhone[] | []>([]);

  console.log("🚀 ~ file: record.tsx:10 ~ RecordScreen ~ records:", records);

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    const result = await findRecords();
    setRecords(result.data ?? []);
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        gap: 10,
      }}
    >
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <List.Section style={{ flex: 1 }}>
        <List.Subheader>出售记录</List.Subheader>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          {records.map((record) => {
            return (
              <View key={record.recordId}>
                <List.Item
                  title={`${record.brand} ${record.model} ${record.color} ${record.ram}G ${record.rom}`}
                  description={`${new Date(record.time).toLocaleDateString()} ${
                    record.name
                  } ${record.phone}`}
                  right={() => {
                    return (
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          variant="bodyLarge"
                          style={{
                            color: MD3Colors.error30,
                          }}
                        >{`¥${record.money}`}</Text>
                        <Text variant="bodySmall">{`${record.salesclerk}`}</Text>
                      </View>
                    );
                  }}
                />
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </List.Section>
    </View>
  );
};

export default RecordScreen;
