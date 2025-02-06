import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {homeStyles} from '@assets/css/home';
import CustomText from '@components/Ui/CustomText';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  COD: boolean;
  setCOD: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentMethodSelection: React.FC<Props> = ({
  setCurrentStep,
  setCOD,
  COD,
}) => {
  return (
    <>
      <View style={homeStyles.bottomSheetContent}>
        <CustomText style={homeStyles.heading}>Payment Methods</CustomText>
        <View style={homeStyles.MethodsContainerInActive}>
          <CustomText style={homeStyles.MethodFirstTextField}>
            My Wallet
          </CustomText>
          <CustomText style={homeStyles.MethodSecondTextField}>
            Rs. 1,209
          </CustomText>
        </View>
        <TouchableOpacity
          onPress={() => {
            setCOD(false);
            setCurrentStep(5);
          }}>
          <View
            style={
              !COD
                ? homeStyles.MethodsContainerActive
                : homeStyles.MethodsContainerInActive
            }>
            <CustomText style={homeStyles.MethodFirstTextField}>
              Debit or Credit Card
            </CustomText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCOD(true);
            setCurrentStep(5);
          }}>
          <View
            style={
              COD
                ? homeStyles.MethodsContainerActive
                : homeStyles.MethodsContainerInActive
            }>
            <CustomText style={homeStyles.MethodFirstTextField}>
              Cash on Pickup
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentMethodSelection;

const styles = StyleSheet.create({});
