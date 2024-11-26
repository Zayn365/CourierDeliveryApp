import {Alert, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
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
  setData: React.Dispatch<React.SetStateAction<any>>;
  ParcelWorth: number;
  setParcelWorth: React.Dispatch<React.SetStateAction<number>>;
};
const ParcelDocumentForm: React.FC<Props> = ({
  selected,
  setSelected,
  isCheck,
  setIsCheck,
  isEnabled,
  toggleSwitch,
  nextStep,
  setData,
  ParcelWorth,
  setParcelWorth,
}) => {
  const [isWeight, setIsWeight] = useState(0);
  function setPackageDetails() {
    {
      const isFlyerRequired = selected !== 'Parcel' ? true : false;
      const isInsured = isEnabled;

      if (!isFlyerRequired) {
        if (isEnabled && !ParcelWorth) {
          Alert.alert('Please Input Parcel Worth');
          return;
        }
        if (!isWeight) {
          Alert.alert('Please Input Approx Weight');
          return;
        } else {
          setData((prev: any) => {
            return {
              ...prev,
              flyerRequired: isFlyerRequired,
              weight: isWeight,
              isInsured: isInsured,
              parcelType: isFlyerRequired ? 2 : 1,
            };
          });
          nextStep();
        }
      } else {
        setData((prev: any) => {
          return {
            ...prev,
            flyerRequired: isFlyerRequired,
            weight: isWeight,
            isInsured: isInsured,
            parcelType: isFlyerRequired ? 2 : 1,
          };
        });
        nextStep();
      }
    }
  }

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
                  {selected !== 'Parcel' ? 'Express Flyer' : 'Red Box'}
                </CustomText>
              </View>
            </TouchableOpacity>
            {selected === 'Parcel' && (
              <>
                <View style={homeStyles.KGSInput}>
                  <CustomInput
                    placeholder="Enter Approx. Weight (Optional)"
                    value={isWeight}
                    setValue={setIsWeight}
                    type="number-pad"
                    style={{width: '100%'}}
                  />
                  <Icons.KGs style={homeStyles.KGSIcon} />
                </View>
                {isEnabled ? (
                  <View style={homeStyles.KGSInput}>
                    <CustomInput
                      placeholder="Est Parcel Worth"
                      value={ParcelWorth}
                      setValue={setParcelWorth}
                      type="number-pad"
                      style={{width: '100%'}}
                    />
                  </View>
                ) : (
                  ''
                )}
              </>
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

            <CustomImagePicker addname={selected} setData={setData} />
            <CustomButton text="Next" onPress={setPackageDetails} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ParcelDocumentForm;
