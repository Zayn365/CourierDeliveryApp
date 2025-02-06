import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import {View, TouchableOpacity, Alert} from 'react-native';
import CustomInput from '@components/Ui/CustomInput';
import CustomButton from '@components/Ui/CustomButton';
import {signInStyles} from '@assets/css/auth';
import {useNavigation} from '@react-navigation/native';
import CustomText from '@components/Ui/CustomText';
import useAuthStore from '@utils/store/authStore';
import Icons from '@utils/imagePaths/imagePaths';

const SignInScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation: any = useNavigation();
  const {
    login,
    fcmToken,
    setFcmToken,
    setDeviceId,
    isLoading,
    saveFcmAndDeviceId,
  } = useAuthStore();

  useEffect(() => {
    if (!fcmToken) {
      configureFCMToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcmToken]);

  const configureFCMToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const fcmtoken = await messaging().getToken();
        setFcmToken(fcmtoken);

        const deviceId = await DeviceInfo.getUniqueId();
        setDeviceId(deviceId);

        saveFcmAndDeviceId(fcmtoken, deviceId);
      }
    } catch (error) {
      console.error('Error configuring FCM:', error);
    }
  };

  const onSignInPressed = async () => {
    try {
      if (!phone) {
        Alert.alert('Error', 'Please enter a phone number');
        return;
      }
      if (!password) {
        Alert.alert('Error', 'Please enter a password');
        return;
      }
      await login(phone, password, fcmToken);
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Error', 'Something went wrong during sign-in');
    }
  };

  return (
    <View style={signInStyles.container}>
      <View style={signInStyles.heightOfScreen}>
        <View style={signInStyles.subStyleHead}>
          <CustomText isBold style={signInStyles.header}>
            Welcome to
          </CustomText>
          <Icons.Logo width={100} height={100} />
        </View>
        <CustomText style={signInStyles.subHeader}>
          We're here to deliver smiles, one parcel at a time. Let’s get started.
        </CustomText>

        <CustomInput
          placeholder="Enter your phone number"
          value={phone}
          setValue={setPhone}
          isFocus={false}
          type="number-pad"
        />
        <CustomInput
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          isFocus={false}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <CustomText style={signInStyles.forgotPassword}>
            Forgot Password?
          </CustomText>
        </TouchableOpacity>

        <CustomButton
          disabled={isLoading}
          text="Sign In"
          loader={isLoading}
          onPress={onSignInPressed}
        />

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <CustomText style={signInStyles.signUpText}>
            Not Registered Yet?{' '}
            <CustomText disabled={isLoading} style={signInStyles.signUpLink}>
              Sign Up
            </CustomText>
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
