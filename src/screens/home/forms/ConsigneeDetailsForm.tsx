import {Alert, View} from 'react-native';
import React, {useState} from 'react';
import {homeStyles} from '../../../assets/css/home';
import CustomText from '../../../components/Ui/CustomText';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';
import usePlaceOrder from '../../../utils/store/placeOrderStore';

type Props = {
  nextStep: () => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
  packageData: any;
  ParcelWorth: number;
  token: string;
};

const ConsigneeDetails: React.FC<Props> = ({
  nextStep,
  setData,
  packageData,
  ParcelWorth,
  token,
}) => {
  const [consigneePhone, setConsigneePhone] = useState('');
  const [consigneeFullName, setConsigneeFullName] = useState('');
  const [consigneeEmail, setConsigneeEmail] = useState('');
  const data: any = usePlaceOrder();
  const {getPricing, price, isLoading} = data;

  async function getPrice() {
    console.log(packageData.pickUpLat, 'DATAS');
    const values = {
      pickUpAddress: {
        latitude: `${packageData.pickUpLat}`,
        longitude: `${packageData.pickUpLong}`,
      },
      consigneeUpAddress: {
        latitude: `${packageData.consigneeLat}`,
        longitude: `${packageData.consigneeLong}`,
      },
      parcelType: packageData.paymentType,
      weight: Number(packageData.weight),
      parcelWorth: Number(ParcelWorth),
    };
    try {
      const val = getPricing(values, token);
      return val;
    } catch (e: any) {
      console.error('Error occurred while getting pricing', e);
      Alert.alert('Error occurred while getting pricing');
    }
  }
  async function setConsigneeData() {
    if (consigneePhone && consigneeFullName && consigneeEmail) {
      const price = await getPrice();
      setData((prevData: any) => {
        return {
          ...prevData,
          price: price.totalPrice,
          consigneeName: consigneeFullName,
          consigneePhone: consigneePhone,
          consigneeEmail: consigneeEmail,
        };
      });
      console.log(packageData);
      nextStep();
    } else {
      Alert.alert('Something is missing! Please Fill All The Feilds');
    }
  }

  return (
    <>
      <View style={homeStyles.bottomSheetContent}>
        <CustomText style={homeStyles.heading}>Consignee Address</CustomText>
        <CustomInput
          value={consigneeFullName}
          setValue={setConsigneeFullName}
          placeholder="Enter Full Name"
        />
        <CustomInput
          value={consigneePhone}
          setValue={setConsigneePhone}
          placeholder="Enter Phone Number"
        />
        <CustomInput
          value={consigneeEmail}
          setValue={setConsigneeEmail}
          placeholder="Enter Email Address"
        />
        <CustomButton
          disabled={isLoading}
          loader={isLoading}
          text="Next"
          onPress={setConsigneeData}
        />
      </View>
    </>
  );
};

export default ConsigneeDetails;
