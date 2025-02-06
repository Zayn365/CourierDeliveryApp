import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import CustomInput from '@components/Ui/CustomInput';
import CustomButton from '@components/Ui/CustomButton';
import {signInStyles} from '@assets/css/auth';
import {useNavigation} from '@react-navigation/native';
import CustomText from '@components/Ui/CustomText';
import useAuthStore from '@utils/store/authStore';

const ForgetPassword = () => {
  const [email, setEmail] = useState(0);
  const navigation: any = useNavigation();
  const {forgetPassowrd, isLoading} = useAuthStore();
  const onSignInPressed = async () => {
    try {
      try {
        const data: any = await forgetPassowrd(email);
        if (data) {
          navigation.navigate('Verify', {email: email, type: 'passwordchange'});
        }
      } catch (error) {
        console.error('FogetPassword error:', error);
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={signInStyles.container}>
      <View style={signInStyles.subStyleHead}>
        <CustomText isBold style={signInStyles.header}>
          Forgot Password?
        </CustomText>
      </View>
      <CustomText style={signInStyles.subHeader}>
        Enter your registered phone number.
      </CustomText>

      <CustomInput
        placeholder="Enter your Phone Number"
        value={email}
        setValue={setEmail}
        isFocus={false}
        type="number-pad"
      />
      <CustomButton
        disabled={isLoading || !email}
        text="Verify"
        loader={isLoading}
        onPress={onSignInPressed}
      />
    </View>
  );
};

export default ForgetPassword;
