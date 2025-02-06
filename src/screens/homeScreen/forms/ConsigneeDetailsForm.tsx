import {Alert, View} from 'react-native';
import React from 'react';
import {homeStyles} from '@assets/css/home';
import CustomText from '@components/Ui/CustomText';
import CustomInput from '@components/Ui/CustomInput';
import CustomButton from '@components/Ui/CustomButton';
import usePlaceOrder from '@utils/store/placeOrderStore';

type Props = {
  nextStep: () => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
  packageData: any;
  ParcelWorth: string;
  token: string;
};

const ConsigneeDetails: React.FC<Props> = ({
  nextStep,
  setData,
  packageData,
  ParcelWorth,
  token,
}) => {
  const data: any = usePlaceOrder();
  const {getPricing, isLoading} = data;

  async function getPrice() {
    const values = {
      pickUpAddress: {
        latitude: `${packageData.pickUpLat}`,
        longitude: `${packageData.pickUpLong}`,
      },
      consigneeUpAddress: {
        latitude: `${packageData.consigneeLat}`,
        longitude: `${packageData.consigneeLong}`,
      },
      parcelType: packageData.parcelType,
      weight: Number(packageData.weight),
      parcelWorth: ParcelWorth ? Number(ParcelWorth.replace(/,/g, '')) : 0,
    };
    try {
      const val = await getPricing(values, token);
      return val;
    } catch (e: any) {
      Alert.alert('Error occurred while getting pricing');
    }
  }
  async function setConsigneeData() {
    if (
      packageData?.consigneePhone &&
      packageData?.consigneeName &&
      packageData?.consigneeEmail
    ) {
      const price = await getPrice();
      setData((prevData: any) => {
        return {
          ...prevData,
          price: price?.totalPrice,
        };
      });
      if (price) {
        nextStep();
      }
    } else {
      Alert.alert('Something is missing! Please Fill All The Feilds');
    }
  }
  const updatePackageData = (key: string, value: string | number | boolean) => {
    setData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const setConsigneePhone = (text: string | number) =>
    updatePackageData('consigneePhone', text);
  const setConsigneeFullName = (text: string | number) =>
    updatePackageData('consigneeName', text);
  const setConsigneeEmail = (text: string | number) =>
    updatePackageData('consigneeEmail', text);
  return (
    <>
      <View style={homeStyles.bottomSheetContent}>
        <CustomText style={homeStyles.heading}>
          Add Recipient’s Details
        </CustomText>
        <CustomInput
          value={packageData?.consigneeName}
          setValue={setConsigneeFullName}
          placeholder="Enter Full Name"
        />
        <CustomInput
          value={packageData?.consigneePhone}
          type="number-pad"
          setValue={setConsigneePhone}
          placeholder="Enter Phone Number"
        />
        <CustomInput
          value={packageData?.consigneeEmail}
          setValue={setConsigneeEmail}
          placeholder="Enter Email Address"
        />
        <CustomButton
          disabled={
            isLoading ||
            !(
              packageData?.consigneePhone &&
              packageData?.consigneeName &&
              packageData?.consigneeEmail
            )
          }
          loader={isLoading}
          text="Next"
          onPress={setConsigneeData}
        />
      </View>
    </>
  );
};

export default ConsigneeDetails;
