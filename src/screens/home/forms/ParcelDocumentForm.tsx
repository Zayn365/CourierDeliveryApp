import {TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import {homeStyles} from '../../../assets/css/home';
import CustomText from '../../../components/Ui/CustomText';
import CustomSmallButton from '../../../components/Ui/CustomSmallButton';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';
import CustomImagePicker from '../../../components/Ui/CustomImagePicker';

type Props = {
  nextStep: () => void;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  isCheck: boolean;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
  isEnabled: boolean;
  toggleSwitch: () => void;
};
const ParcelDocumentForm: React.FC<Props> = ({
  selected,
  setSelected,
  isCheck,
  setIsCheck,
  isEnabled,
  toggleSwitch,
  nextStep,
}) => {
  return (
    <>
      <View style={homeStyles.ViewScrollable}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50, // Ensure space for the glowing button
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={homeStyles.bottomSheetContentScroll}>
            <CustomText style={homeStyles.heading}>Shipment Type</CustomText>
            <View style={homeStyles.switchBtn}>
              <CustomSmallButton
                label="Parcel"
                isActive={selected === 'Parcel'}
                onPress={() => setSelected('Parcel')}
              />
              <CustomSmallButton
                label="Document"
                isActive={selected === 'Document'}
                onPress={() => setSelected('Document')}
              />
            </View>
            <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
              <View style={homeStyles.addressContainer}>
                {isCheck ? <Icons.Tick /> : <Icons.UnTick />}
                {/* <Tick /> */}
                <CustomText style={homeStyles.addressText}>
                  Bring TCS{' '}
                  {selected === 'Parcel' ? 'Express Flyer' : 'Red Box'}
                </CustomText>
              </View>
            </TouchableOpacity>
            {selected === 'Parcel' && (
              <View style={homeStyles.KGSInput}>
                <CustomInput
                  placeholder="Enter Approx. Weight (Optional)"
                  value=""
                  type="number-pad"
                  style={{width: '100%'}}
                />
                <Icons.KGs style={homeStyles.KGSIcon} />
              </View>
            )}
            <View style={homeStyles.insuranceContainer}>
              <View style={homeStyles.insuranceDivider}>
                <Icons.ShieldTick />
                <CustomText style={homeStyles.insuranceText}>
                  {selected} Insurance
                </CustomText>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#4CD964'}}
                thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <CustomImagePicker addname={selected} />
            <CustomButton text="Next" onPress={nextStep} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ParcelDocumentForm;
