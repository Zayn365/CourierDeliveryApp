import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';
import {signInStyles} from '../../../assets/css/auth';
import Bubbles from '../.././../assets/images/bgImages/bubbles.svg';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../components/Ui/CustomText';
import useAuthStore from '../../../utils/store/authStore';

const SignInScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {login, isLoading} = useAuthStore();
  console.log(isLoading, 'login');
  const onSignInPressed = async () => {
    try {
      if (!phone) {
        Alert.alert('Error', 'Please Enter a phone number');
        return;
      }
      if (!password) {
        Alert.alert('Error', 'Please Enter a passwords');
        return;
      }
      await login(phone, password);

      console.log('Sign In pressed');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong during signup');
    }
  };

  return (
    <View style={signInStyles.container}>
      <View style={signInStyles.subStyleHead}>
        <CustomText style={signInStyles.header}>Welcome</CustomText>
        <Bubbles />
      </View>
      <CustomText style={signInStyles.subHeader}>
        Please enter your phone number and password for login
      </CustomText>

      <CustomInput
        placeholder="Enter Your Phone Number"
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

      <TouchableOpacity>
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp' as never);
        }}>
        <CustomText style={signInStyles.signUpText}>
          Not Registered Yet?{' '}
          <CustomText disabled={isLoading} style={signInStyles.signUpLink}>
            Sign Up
          </CustomText>
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
