import React, {useState} from 'react';
import {View, TouchableOpacity, Alert, ScrollView} from 'react-native';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';
import {signUpStyles} from '../../../assets/css/auth';
import Bubbles from '../.././../assets/images/bgImages/bubbles.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useAuthStore from '../../../utils/store/authStore';
import CustomText from '../../../components/Ui/CustomText';
import {RootStackParamList} from 'src/utils/types/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const {signup, isLoading} = useAuthStore();
  const navigation = useNavigation<NavigationProp>();

  const onSignInPressed = async () => {
    try {
      if (Password !== ConfirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      const data: any = await signup(Name, Email, Password, Phone);
      // console.log(data, 'Check data Returned');
      if (data?.check) {
        navigation.navigate('Verify', {userId: data.userId, email: Email});
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong during signup');
    }
  };

  return (
    <ScrollView
      style={signUpStyles.container}
      // style={signUpStyles.container}
    >
      <View style={signUpStyles.subStyleHead}>
        <CustomText style={signUpStyles.header}>Create Account</CustomText>
        <Bubbles />
      </View>
      <CustomText style={signUpStyles.subHeader}>
        Please enter your Information and create your account
      </CustomText>

      <CustomInput
        placeholder="Enter Your Full Name"
        value={Name}
        setValue={setName}
        isFocus={false}
        type="default"
      />
      <CustomInput
        placeholder="Enter your Phone Number"
        value={Phone}
        setValue={setPhone}
        isFocus={false}
        type="number-pad"
      />
      <CustomInput
        placeholder="Enter your Email"
        value={Email}
        setValue={setEmail}
        isFocus={false}
        type="email-address"
      />
      <CustomInput
        placeholder="Create Your Password"
        value={Password}
        setValue={setPassword}
        isFocus={false}
        secureTextEntry
      />
      <CustomInput
        placeholder="Confirm Your Password"
        value={ConfirmPassword}
        setValue={setConfirmPassword}
        isFocus={false}
        secureTextEntry
      />

      <CustomButton
        loader={isLoading}
        disabled={isLoading}
        text="Sign Up"
        onPress={onSignInPressed}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <CustomText style={signUpStyles.signUpText}>
          Have An Account?{' '}
          <CustomText style={signUpStyles.signUpLink}>Sign In</CustomText>
        </CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpScreen;