import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as NavigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import HomeScreen from "./home";
import RecordScreen from "./record";
import SettingScreen from "./setting";

const Tab = createBottomTabNavigator();

export default function tabs() {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      await NavigationBar.setBackgroundColorAsync(
        theme.colors.elevation.level2 ?? "blue"
      );
    })();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          shifting={true}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              router.push(`/${route.name}`);
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }
            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label = options.title;
            return label ?? "";
          }}
        />
      )}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
          title: "首页",
        }}
      />
      <Tab.Screen
        name="record"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon name="clipboard-list-outline" size={size} color={color} />
            );
          },
          title: "记录",
        }}
      />
      <Tab.Screen
        name="setting"
        component={SettingScreen}
        options={{
          title: "设置",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
