import {View} from 'react-native';
import React from 'react';
import {homeStyles} from '../../../assets/css/home';
import CustomText from '../../../components/Ui/CustomText';
import CustomDropdown from '../../../components/Ui/CustomDropDown';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomButton from '../../../components/Ui/CustomButton';

type Props = {
  nextStep: () => void;
  dropdown: string;
  setDropdown: React.Dispatch<React.SetStateAction<string>>;
};

const ConsigneeAddressForm: React.FC<Props> = ({
  nextStep,
  dropdown,
  setDropdown,
}) => {
  return (
    <>
      <View style={homeStyles.bottomSheetContent}>
        <CustomText style={homeStyles.heading}>Consignee Address</CustomText>
        <CustomDropdown
          data={[
            {label: 'Karachi', value: 'Karachi'},
            {label: 'Lahore', value: 'Lahore'},
          ]}
          value={dropdown}
          // @ts-ignore
          onSelect={setDropdown}
        />
        <View style={homeStyles.addressContainer}>
          <Icons.MapIcon />
          <CustomText style={homeStyles.addressText}>
            C-90 Khayaban-e-sehar, Phase VI, DHA, near Sultan Masjid.{' '}
          </CustomText>
        </View>
        <CustomButton text="Next" onPress={nextStep} />
      </View>
    </>
  );
};

export default ConsigneeAddressForm;
