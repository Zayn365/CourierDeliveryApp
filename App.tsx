import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import AuthRouter from './src/components/router/AuthRouter';
import MainRouter from './src/components/router/MainRouter';
import useAuthStore from './src/utils/store/authStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKV} from 'react-native-mmkv';

export default function App() {
  const [splashOn, setSplashOn] = React.useState<Boolean>(false);
  const {user, initializeUser} = useAuthStore();
  React.useEffect(() => {
    setTimeout(() => {
      setSplashOn(true);
    }, 3000);
    initializeUser();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!splashOn ? (
        <SplashScreen />
      ) : !user ? (
        <NavigationContainer>
          <AuthRouter />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <GestureHandlerRootView>
            <MainRouter />
          </GestureHandlerRootView>
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}
