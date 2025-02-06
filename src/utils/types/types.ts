// import {StackNavigationProp} from '@react-navigation/stack';
// import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  SignIn: undefined;
  Verify: {userId?: string; email: string; type: string};
  SignUp: undefined;
  Home: {stepToGo: string | number | any};
  ChangePassword: {email: string; otp: string};
};

// type VerifyScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Verify'
// >;
// type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;
export interface PackageData {
  user_id: number;
  parcelType: number;
  details: string;
  flyerRequired: boolean;
  weight: number;
  price: number;
  discount: number;
  amountReceived: number;
  calculationType: number;
  pickUpArea: string;
  pickUpAddress: string;
  pickUpCityId: number;
  pickUpLat: number;
  pickUpLong: number;
  consigneeName: string;
  consigneePhone: string;
  consigneeEmail: string;
  consigneeAddress: string;
  consigneeCityId: number;
  consigneeLat: number;
  consigneeLong: number;
  consigneeLandmark: string;
  paymentType: number;
  paymentFrom: number;
  estDistance: number;
  isInsured: boolean;
  orderStatus: number;
  photos: string[];
}
