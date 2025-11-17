import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import Dashboard from '@/components/Dashboard';
import Suivis from '@/components/Suivies';
import Objectifs from '@/components/Objectifs';
import Routines from '@/components/Routines';
import Exercices from '@/components/Exercices';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#E53935',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Suivies"
        component={Suivis}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="check-circle" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Objectifs"
        component={Objectifs}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="target" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Exercices"
        component={Exercices}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="activity" color={color} size={size} />,
        }}
      /> 
      <Tab.Screen
        name="Client"
        component={Exercices}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="users" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#282c34',
    height: 60,
    paddingBottom: 6,
  },
});
