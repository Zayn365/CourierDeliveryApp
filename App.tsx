import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import AuthRouter from './src/navigation/AuthRouter';
import MainRouter from './src/navigation/MainRouter';
import useAuthStore from './src/utils/store/authStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import useChatStore from './src/utils/store/chatStore';

export default function App() {
  const [splashOn, setSplashOn] = React.useState<Boolean>(false);
  const {user, initializeUser} = useAuthStore();
  const [notificationTemp, setTempNotification] = React.useState<any[]>([]);
  const {setNotification} = useChatStore();
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      setSplashOn(true);
    }, 3000);
    initializeUser();
    requestUserPermission();

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    async function getter() {
      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
        if (remoteMessage) {
          setTempNotification((prevNotifications: any) => [
            ...prevNotifications,
            remoteMessage.notification,
          ]);
          setNotification(notificationTemp);
        }
      });
      // Handle messages when the app is in the background or terminated
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('FCM Message received in background:', remoteMessage);
      });

      return unsubscribe();
    }
    getter();
  });
  // const sendTokenToServer = async (fcmToken:string, deviceId:any) => {
  //   try {
  //     const response = await axios.post(
  //       'https://your-api-endpoint.com/register-device',
  //       {
  //         fcmToken,
  //         deviceId,
  //       },
  //     );

  //     if (response.status === 200) {
  //       console.log(
  //         'FCM Token and Device ID sent successfully:',
  //         response.data,
  //       );
  //     } else {
  //       console.error(
  //         'Failed to send FCM Token and Device ID:',
  //         response.status,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error sending data to the server:', error.message);
  //   }
  // };

  return (
    <SafeAreaView style={style.safeArea}>
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

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
