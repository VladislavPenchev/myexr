import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import MyPlanScreen from "./screens/MyPlanScreen";
import ProgramsScreen from "./screens/ProgramsScreen";
import GlutesExercisesScreen from "./screens/GlutesExercisesScreen";
import ExerciseDetailScreen from "./screens/ExerciseDetailScreen";
import ToolboxScreen from "./screens/ToolboxScreen";
import YouScreen from "./screens/YouScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import JournalScreen from "./screens/JournalScreen";
import AuthScreen from "./screens/AuthScreen";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
      }}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
      <Text style={{ color: "white", marginLeft: 4, fontSize: 16 }}>Back</Text>
    </TouchableOpacity>
  );
};

function ProgramsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="ProgramsList"
        component={ProgramsScreen}
        options={{
          headerTitle: "Programs",
        }}
      />
      <Stack.Screen
        name="GlutesExercises"
        component={GlutesExercisesScreen}
        options={{
          headerTitle: "Glutes Exercises",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{
          headerTitle: "",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack.Navigator>
  );
}

function YouStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen
        name="YouMain"
        component={YouScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  // For now, skip auth screen - always show main app
  // If you want to show auth screen, set showAuth to true initially

  if (showAuth) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AuthScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "black",
              borderTopWidth: 1,
              borderTopColor: "#333",
            },
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "#fff",
          }}
        >
          <Tab.Screen
            name="My Plan"
            component={MyPlanScreen}
            options={{
              title: "My Plan",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Programs"
            component={ProgramsStack}
            options={{
              title: "Programs",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="book-outline" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Journal"
            component={JournalScreen}
            options={{
              title: "Journal",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="document-text-outline"
                  size={size}
                  color={color}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Toolbox"
            component={ToolboxScreen}
            options={{
              title: "Toolbox",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="construct-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="You"
            component={YouStack}
            options={{
              title: "You",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
