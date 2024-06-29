import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  createComponentForStaticNavigation,
  createStaticNavigation,
  StaticScreenProps,
  StaticParamList,
  useNavigation,
  NavigatorScreenParams,
  useRoute,
  DarkTheme,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof MyStack> {}
  }
}

function App() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="go to screen two"
        onPress={() => navigation.navigate("ScreenTwo")}
        // onPress={() => navigation.navigate("Settings")}
      />
      <Button
        title="go home"
        onPress={() =>
          navigation.navigate("ScreenOne", {
            screen: "Home",
            params: { userId: "hello" },
          })
        }
      />

      {/* Could not make this work :(
      <Button
        title="Preload Screen"
        onPress={() => navigation.preload("ScreenOne", { screen: "Settings" })}
      /> */}
    </View>
  );
}

const MyStack = createNativeStackNavigator({
  screens: {
    ScreenOne: {
      screen: MyTabs,
      if: () => true, // This tells React Navigation to show specific screens based on the signed in status. When the signed in status changes, React Navigation will automatically show the appropriate screen.
      options: {
        headerTitle: "I'm a static screen!",
        // headerShown: false,
      },
    },
    ScreenTwo: {
      screen: App,
    },
  },
});

// const MyStackComp = createComponentForStaticNavigation(MyStack, "Stack");
const RootNavigation = createStaticNavigation(MyStack);

const Tabs = createBottomTabNavigator();

type MyTabsParamList = {
  Home: { userId: string };
  Profile: undefined;
  Settings: undefined;
};
type MyTabsProps = StaticScreenProps<NavigatorScreenParams<MyTabsParamList>>;
function MyTabs(_: MyTabsProps) {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarPosition: Platform.select({ web: "left", ios: "top" }),
      }}
    >
      <Tabs.Screen
        name="Home"
        component={App}
        options={{ animation: "shift", headerShown: false }}
      />
      <Tabs.Screen
        name="Profile"
        component={App}
        options={{ animation: "shift" }}
      />
      <Tabs.Screen
        name="Settings"
        component={App}
        options={{ animation: "shift" }}
      />
    </Tabs.Navigator>
  );
}

export default function Navigation() {
  return (
    <RootNavigation />
    //   <NavigationContainer
    //     linking={{
    //       prefixes: ["mytest://"],
    //       enabled: true,
    //     }}
    //   >
    //  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
