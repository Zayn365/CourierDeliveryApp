import {View} from 'react-native';
import React from 'react';
import {homeStyles} from '../../../assets/css/home';
import CustomText from '../../../components/Ui/CustomText';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';

type Props = {
  nextStep: () => void;
};

const ConsigneeDetails: React.FC<Props> = ({nextStep}) => {
  return (
    <>
      <View style={homeStyles.bottomSheetContent}>
        <CustomText style={homeStyles.heading}>Consignee Address</CustomText>
        <CustomInput value="" placeholder="Enter Full Name" />
        <CustomInput value="" placeholder="Enter Phone Number" />
        <CustomInput value="" placeholder="Enter Email Address" />
        <CustomButton text="Next" onPress={nextStep} />
      </View>
    </>
  );
};

export default ConsigneeDetails;
