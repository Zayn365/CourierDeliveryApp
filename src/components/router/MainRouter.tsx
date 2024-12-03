import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/homeScreen/HomeScreen';
import Notification from '../../screens/notification/Notification';
import OrderList from '../../screens/orderList/OrderList';
import NavScreen from '../../screens/navScreen/NavScreen';
import Icons from '../../utils/imagePaths/imagePaths';
import Chat from '../../screens/chatScreen/Chat';

const Stack = createNativeStackNavigator();
// import BackIcon from '../../assets/images/icons/Back.svg';

const Router = ({}) => {
  const navigation = useNavigation();

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 1000,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: true,
          headerTintColor: '#465061',
          headerTitleStyle: {
            color: '#465061',
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Outfit-Regular',
          },
          headerLeft: ({canGoBack}) =>
            canGoBack ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons.BackIcon width={34} height={34} />
              </TouchableOpacity>
            ) : null,
        }}>
        <Stack.Screen
          name="Home"
          options={{title: 'Home', headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="OrderList"
          options={{title: 'Orders In Progress', headerShown: true}}
          component={OrderList}
        />
        <Stack.Screen
          name="Nav"
          options={{
            title: 'Nav',
            headerShown: false,
            animation: 'slide_from_left',
          }}
          component={NavScreen}
        />
        <Stack.Screen
          name="Notification"
          options={{
            title: 'Notification',
            headerShown: true,
          }}
          component={Notification}
        />
        <Stack.Screen
          name="Chat"
          options={{
            title: 'Customer Support',
            headerShown: true,
          }}
          component={Chat}
        />
      </Stack.Navigator>
    </>
  );
};

export default Router;
