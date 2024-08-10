import { Tabs } from 'expo-router';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, backgroundColor: "gray" }}>

      {/* Tabs component positioned below the tab selection menu */}
      <View style={{ flex: 1 }}>
        <Tabs 
          screenOptions={{
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#808080",
            tabBarActiveBackgroundColor: "#ffffff",
            tabBarInactiveBackgroundColor: "#ffffff",
            tabBarStyle: {
              marginHorizontal: wp('12.5%'), // 2.5% of the screen width
              marginBottom: hp('1.25%'), // 1.25% of the screen height
              backgroundColor: "#ffffff",
              borderWidth: 0,
              borderTopWidth: 0,
              borderRadius: wp('2.5%'), // 2.5% of the screen width
              shadowColor: "#000",
              shadowOffset: { width: 0, height: hp('0.25%') }, // 0.25% of the screen height
              shadowOpacity: 0.25,
              shadowRadius: wp('2.5%'), // 2.5% of the screen width
              elevation: 3,
              paddingHorizontal: wp('3.75%'), // 3.75% of the screen width
              paddingBottom: hp('0.25%'), // 0.25% of the screen height
              bottom: hp('1.25%'), // 1.25% of the screen height
              position: 'absolute',
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'bag' : 'bag-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: 'Cart',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}