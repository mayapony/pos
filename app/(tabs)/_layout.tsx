import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function tabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "首页",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="home" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "记录",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="bars" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="user" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
