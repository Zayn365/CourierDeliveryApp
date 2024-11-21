import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home/HomeScreen';

const Stack = createNativeStackNavigator();
// import BackIcon from '../../assets/images/icons/Back.svg';
import {useNavigation} from '@react-navigation/native';

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
          //   headerLeft: ({canGoBack}) =>
          //     canGoBack ? (
          //       <TouchableOpacity onPress={() => navigation.goBack()}>
          //         <BackIcon width={34} height={34} />{' '}
          //       </TouchableOpacity>
          //     ) : null,
        }}>
        <Stack.Screen
          name="Home"
          options={{title: 'Sign In'}}
          component={Home}
        />
      </Stack.Navigator>
    </>
  );
};

export default Router;
