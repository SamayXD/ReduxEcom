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

      <View style={{ flex: 1 }}>
        <Tabs 
          screenOptions={{
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#808080",
            tabBarActiveBackgroundColor: "#ffffff",
            tabBarInactiveBackgroundColor: "#ffffff",
            tabBarStyle: {
              marginHorizontal: wp('12.5%'), 
              marginBottom: hp('1.25%'), 
              backgroundColor: "#ffffff",
              borderWidth: 0,
              borderTopWidth: 0,
              borderRadius: wp('2.5%'), 
              shadowColor: "#000",
              shadowOffset: { width: 0, height: hp('0.25%') }, 
              shadowOpacity: 0.25,
              shadowRadius: wp('2.5%'), 
              elevation: 3,
              paddingHorizontal: wp('3.75%'), 
              paddingBottom: hp('0.25%'), 
              bottom: hp('1.25%'), 
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