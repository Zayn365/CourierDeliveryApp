import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {homeStyles} from '../../../assets/css/home';
import CustomText from '../../../components/Ui/CustomText';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';

type Props = {
  nextStep: () => void;
};

const PickUpAdressForm: React.FC<Props> = ({nextStep}) => {
  return (
    <>
      <View style={homeStyles.bottomSheetContent}>
        <CustomText style={homeStyles.heading}>Pick Up Address</CustomText>
        <View style={homeStyles.addressContainer}>
          <Icons.MapIcon />
          <CustomText style={homeStyles.addressText}>
            L7, Zafa Street, Block 21, F.B. Area, Karachi.
          </CustomText>
        </View>
        <CustomInput
          value=""
          style={{width: '100%'}}
          placeholder="Enter nearest landmark"
        />
        <CustomButton onPress={nextStep} text="Request a Pick Up" />
      </View>
    </>
  );
};

export default PickUpAdressForm;
