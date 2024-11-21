import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {homeStyles} from '../../../assets/css/home';
import {ScrollView} from 'react-native-gesture-handler';
import CustomText from '../../../components/Ui/CustomText';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';

type Props = {
  nextStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  COD: boolean;
};
const OrderSummaryForm: React.FC<Props> = ({setCurrentStep, nextStep, COD}) => {
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
          {/* Order Summary Section */}
          <View style={homeStyles.bottomSheetContentScroll}>
            <CustomText style={homeStyles.heading}>Order Summary</CustomText>

            {/* Pickup Info */}
            <View style={homeStyles.myLocation}>
              <Icons.MyLocation style={{marginTop: -15}} />
              <View style={{marginLeft: 10}}>
                <CustomText style={homeStyles.myLocationText}>
                  Pickup
                </CustomText>
                <CustomText style={homeStyles.mySubText}>
                  L7, Work Hall Motif, Block-21, F.B Area, Karachi
                </CustomText>
              </View>
            </View>

            {/* Delivery Info */}
            <View style={homeStyles.myLocation}>
              <Icons.MapIcon style={{marginTop: -15}} />
              <View style={{marginLeft: 10}}>
                <CustomText style={homeStyles.myLocationText}>
                  Delivery
                </CustomText>
                <CustomText style={homeStyles.mySubText}>
                  C-90, Khayaban-e-sehar, Phase VI, DHA, Near Sultan Masjid,
                  Karachi.
                </CustomText>
              </View>
            </View>

            {/* Price Breakdown */}
            <View style={homeStyles.priceArea}>
              <View style={homeStyles.priceAreaList}>
                <CustomText style={homeStyles.lightFont}>
                  Sub-total:{' '}
                </CustomText>
                <CustomText style={homeStyles.lightFont}>Rs. 500</CustomText>
              </View>
              <View style={homeStyles.priceAreaList}>
                <CustomText style={homeStyles.lightFont}>
                  Parcel Insurance:{' '}
                </CustomText>
                <CustomText style={homeStyles.lightFont}>Rs. 50</CustomText>
              </View>
              <View style={homeStyles.priceAreaList}>
                <CustomText style={homeStyles.lightFont}>
                  Total (incl fees and tax){' '}
                </CustomText>
                <CustomText style={homeStyles.BoldFontLarge}>
                  Rs. 550
                </CustomText>
              </View>
            </View>
            {/* Payment Method Section */}
            <View style={homeStyles.PayMethodHeading}>
              <CustomText style={homeStyles.PaymenHeading}>
                Payment Method
              </CustomText>
              <TouchableOpacity onPress={() => setCurrentStep(66)}>
                <CustomText style={homeStyles.PaymentViewAll}>
                  View All
                </CustomText>
              </TouchableOpacity>
            </View>
            {/* Card Payment Form */}
            {COD ? (
              <View style={{paddingHorizontal: 7}}>
                <View style={homeStyles.MethodsContainerInActive}>
                  <CustomText style={homeStyles.MethodFirstTextField}>
                    Cash on Pickup
                  </CustomText>
                </View>
              </View>
            ) : (
              <View style={homeStyles.PayWithCard}>
                <CustomText style={homeStyles.PayWithCardText}>
                  Pay with Card
                </CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomInput
                    style={homeStyles.PayWithCardInput}
                    value=""
                    placeholder="Enter Card Number"
                  />
                  <Icons.Card style={{position: 'absolute', right: 12}} />
                </View>
                <View style={homeStyles.PayWithCardInputSmallContainer}>
                  <CustomInput
                    style={homeStyles.PayWithCardInputSmallInput}
                    value=""
                    placeholder="Expiry Date"
                  />
                  <CustomInput
                    style={homeStyles.PayWithCardInputSmallInput}
                    value=""
                    placeholder="CVV"
                  />
                </View>
                <CustomInput
                  style={homeStyles.PayWithCardInput}
                  value=""
                  placeholder="Name on Card"
                />
              </View>
            )}

            {/* Pay Now Button */}
            <CustomButton onPress={nextStep} text="Pay Now" />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default OrderSummaryForm;
