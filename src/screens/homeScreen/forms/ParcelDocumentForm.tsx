import {Alert, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import {homeStyles} from '@assets/css/home';
import CustomText from '@components/Ui/CustomText';
import CustomSmallButton from '@components/Ui/CustomSmallButton';
import Icons from '@utils/imagePaths/imagePaths';
import CustomInput from '@components/Ui/CustomInput';
import CustomButton from '@components/Ui/CustomButton';
import CustomImagePicker from '@components/Ui/CustomImagePicker';
import {handleChange} from '@utils/helper/helperFunctions';

type Props = {
  nextStep: () => void;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  isCheck: boolean;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
  isEnabled: boolean;
  toggleSwitch: (val?: boolean) => void;
  setData: Dispatch<SetStateAction<any>>;
  ParcelWorth: number;
  setParcelWorth: Dispatch<SetStateAction<number>>;
  isWeight: number;
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
  isWeight,
  ParcelWorth,
  setParcelWorth,
}) => {
  function setPackageDetails() {
    const isFlyerRequired = selected !== 'Parcel';
    const isInsured = isEnabled;

    if (!isFlyerRequired) {
      if (isEnabled && !ParcelWorth) {
        Alert.alert('Please Input Parcel Worth');
        return;
      }
      if (!isWeight || isWeight > 2) {
        Alert.alert('Please Input Approx Weight (Max 2KG)');
        return;
      }
    }

    setData((prev: any) => ({
      ...prev,
      flyerRequired: isFlyerRequired,
      weight: isWeight,
      isInsured: isInsured,
      parcelType: isFlyerRequired ? 2 : 1,
    }));

    nextStep();
  }

  const setSelectedFunction = (text: string) => {
    setSelected(text);
    setIsCheck(false);
    toggleSwitch(!isEnabled);
  };

  const handleWeightChange = (text: string) => {
    const weight = parseFloat(text);

    if (isNaN(weight)) {
      setData((prev: any) => ({...prev, weight: 0}));
    } else if (weight > 2) {
      Alert.alert('Weight cannot exceed 2 KGs');
      setData((prev: any) => ({...prev, weight: 0}));
    } else {
      setData((prev: any) => ({...prev, weight}));
    }
  };

  return (
    <>
      <View style={homeStyles.ViewScrollable}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
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
                onPress={() => setSelectedFunction('Parcel')}
              />
              <CustomSmallButton
                label="Document"
                isActive={selected === 'Document'}
                onPress={() => setSelectedFunction('Document')}
              />
            </View>

            <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
              <View style={homeStyles.addressExpressContainer}>
                {isCheck ? <Icons.Tick /> : <Icons.UnTick />}
                <CustomText isBold={isCheck} style={homeStyles.addressText}>
                  Bring TCS{' '}
                  {selected !== 'Parcel' ? 'Express Flyer' : 'Red Box'}
                </CustomText>
              </View>
            </TouchableOpacity>

            {selected === 'Parcel' && (
              <View style={homeStyles.KGSInput}>
                <CustomInput
                  placeholder="Enter Approx. Weight"
                  value={isWeight.toString()}
                  setValue={handleWeightChange}
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

            {isEnabled && selected === 'Parcel' && (
              <View style={homeStyles.RSInput}>
                <CustomText
                  isBold
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    left: 0,
                    color: '#465061',
                    fontSize: 14,
                    backgroundColor: '#DDE5F2',
                    paddingVertical: 15,
                    paddingHorizontal: 19,
                    borderTopLeftRadius: 17,
                    borderBottomLeftRadius: 17,
                  }}>
                  Rs.
                </CustomText>
                <CustomInput
                  placeholder="Enter estimated parcel worth"
                  value={ParcelWorth.toString()}
                  setValue={(text: string) =>
                    handleChange(text, setParcelWorth)
                  }
                  type="number-pad"
                  style={{width: '100%', paddingHorizontal: 65}}
                />
              </View>
            )}

            {selected === 'Parcel' && isEnabled && (
              <CustomImagePicker addname={selected} setData={setData} />
            )}

            <CustomButton
              disabled={
                selected === 'Parcel' ? !isWeight || isWeight > 2 : false
              }
              text="Next"
              onPress={setPackageDetails}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ParcelDocumentForm;
