import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  SignIn: undefined;
  Verify: {userId: string; email: string};
  SignUp: undefined;
  Home: {stepToGo: string | number | any};
};

type VerifyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Verify'
>;
type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;
