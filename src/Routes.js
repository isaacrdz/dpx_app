import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Stacks
import HomeStackScreen from "./navigation/HomeStackScreen";
import LeadStackScreen from "./navigation/LeadStackScreen";
import AuthStackScreen from "./navigation/AuthStackScreen";
import ProfileStackScreen from "./navigation/ProfileStackScreen";

import useAuth from "./hooks/useAuth";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routes = () => {
  const { isAuthenticated, loadUser } = useAuth();

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
              } else if (route.name === "Leads") {
                iconName = focused ? "layers-sharp" : "layers-outline";
              } else if (route.name === "Profile") {
                iconName = focused
                  ? "person-circle-sharp"
                  : "person-circle-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#5764b8",
            inactiveTintColor: "gray",
          }}
        >
          <Tabs.Screen name="Home" component={HomeStackScreen} />
          <Tabs.Screen name="Leads" component={LeadStackScreen} />
          <Tabs.Screen name="Profile" component={ProfileStackScreen} />
        </Tabs.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStackScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;