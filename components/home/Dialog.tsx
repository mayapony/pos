import React from "react";
import { StyleSheet } from "react-native";
import { FAB, Modal } from "react-native-paper";
import { Phone } from "../../types/phone.type";
import { findScannedNotSoldPhones } from "../../utils/home";
import { CodeScanner } from "./CodeScanner";
import { PurchaseDialog } from "./PurchaseDialog";
import SellDialog from "./SellDialog";

const Dialog = ({
  scannedIMEI,
  setScannedIMEI,
  phones,
  fetchPhones,
}: {
  scannedIMEI: string;
  setScannedIMEI: React.Dispatch<React.SetStateAction<string>>;
  phones: Phone[];
  fetchPhones: () => void;
}) => {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const scannedPhone = findScannedNotSoldPhones(phones, scannedIMEI);

  function hideDialog() {
    setDialogVisible(false);
    setScannedIMEI("");
  }

  function DialogContent() {
    if (!scannedIMEI) {
      return (
        <Modal
          visible={dialogVisible}
          onDismiss={hideDialog}
          contentContainerStyle={styles.modalContainer}
        >
          <CodeScanner setScannedIMEI={setScannedIMEI} />
        </Modal>
      );
    } else if (scannedPhone) {
      return (
        <SellDialog
          visible={dialogVisible}
          hideDialog={hideDialog}
          phone={scannedPhone}
          fetchPhones={fetchPhones}
        />
      );
    } else {
      return (
        <PurchaseDialog
          scannedData={scannedIMEI}
          visible={dialogVisible}
          hideDialog={hideDialog}
          fetchPhones={fetchPhones}
          setScannedData={setScannedIMEI}
        />
      );
    }
  }

  return (
    <>
      <DialogContent />
      <FAB
        icon="plus"
        style={styles.FAB}
        onPress={() => {
          setDialogVisible(true);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  FAB: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
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

export default Dialog;
