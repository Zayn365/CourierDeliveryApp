import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import AuthRouter from './src/components/router/AuthRouter';
import MainRouter from './src/components/router/MainRouter';
import useAuthStore from './src/utils/store/authStore';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useChatStore from './src/utils/store/chatStore';

export default function App() {
  const [splashOn, setSplashOn] = React.useState<Boolean>(false);
  const {user, initializeUser} = useAuthStore();
  const data: any = useChatStore();
  const {intializeChatID} = data;
  React.useEffect(() => {
    setTimeout(() => {
      setSplashOn(true);
    }, 3000);
    initializeUser();
    intializeChatID();
  }, []);

  console.log(user, 'check me');
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
