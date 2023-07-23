import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={homeStyles.container}>
      <Text>home</Text>

      <TouchableOpacity style={homeStyles.floatingButtonStyle}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButtonStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: "blue",
  },
});

export default HomeScreen;
