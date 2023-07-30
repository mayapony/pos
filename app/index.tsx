import { Redirect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <Redirect href="/home" />
    </GestureHandlerRootView>
  );
}
