import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Divider,
  FAB,
  List,
  MD3Theme,
  Modal,
  Portal,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { CodeScanner } from "../../components/home/CodeScanner";
import { FormDialog } from "../../components/home/FormDialog";
import { MockPhones } from "../../mock/phones";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = React.useState(true);
  const theme = useTheme();
  const styles = homeStyles(theme);

  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(true);

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleScan = () => {
    setScanned(false);
    showModal();
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
      <View style={styles.listContainer}>
        {MockPhones.map((phone) => {
          return (
            <View key={phone.id}>
              <List.Item
                title={`${phone.brand} ${phone.model}`}
                description={`${phone.color} ${phone.ram} + ${phone.rom} ${phone.imei}`}
                right={() => {
                  return (
                    <Text variant="bodyLarge" style={styles.priceText}>
                      ¥{phone.outPrice}
                    </Text>
                  );
                }}
              />
              <Divider />
            </View>
          );
        })}
      </View>
      <Portal>
        {!!scanned ? (
          <FormDialog
            scannedData={scannedData}
            visible={visible}
            hideDialog={hideModal}
          />
        ) : (
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <CodeScanner
              scanned={scanned}
              setScanned={setScanned}
              setScannedData={setScannedData}
            />
          </Modal>
        )}
      </Portal>
      <FAB icon="plus" style={styles.addFAB} onPress={handleScan} />
    </View>
  );
};

const homeStyles = function (theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      gap: 10,
    },
    addFAB: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
    listContainer: {
      flexGrow: 1,
      borderRadius: 10,
    },
    priceText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.colors.error,
    },
    modalContainer: {
      width: "90%",
      height: "60%",
      alignSelf: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
export default HomeScreen;
