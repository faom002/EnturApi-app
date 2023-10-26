import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SchoolRoute from './components/SchoolRoute';
import HomeRoute from './components/HomeRoute';
import { View, Image, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="SchoolTime"
          component={SchoolRoute}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={focused ? require('../bussApp/assets/Icons/school.png') : require('../bussApp/assets/Icons/school.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </View>
            ),
            tabBarLabel: () => <Text>school time</Text>,
          }}
        />
        <Tab.Screen
          name="HomeTime"
          component={HomeRoute}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={focused ? require('../bussApp/assets/Icons/Home.png') : require('../bussApp/assets/Icons/Home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </View>
            ),
            tabBarLabel: () => <Text>Home Time</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
