import {Alert, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {homeStyles} from '@assets/css/home';
import {ScrollView} from 'react-native-gesture-handler';
import CustomText from '@components/Ui/CustomText';
import Icons from '@utils/imagePaths/imagePaths';
import CustomInput from '@components/Ui/CustomInput';
import CustomButton from '@components/Ui/CustomButton';
import useMapStore from '@utils/store/mapStore';
import usePlaceOrder from '@utils/store/placeOrderStore';
import {AddCommas} from '@utils/helper/helperFunctions';

type Props = {
  nextStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  COD: boolean;
  setData: React.Dispatch<React.SetStateAction<any>>;
  packageData: any;
  token: string;
  setParcelWorth: React.Dispatch<React.SetStateAction<any>>;
};
const OrderSummaryForm: React.FC<Props> = ({
  setCurrentStep,
  nextStep,
  COD,
  setData,
  setParcelWorth,
  packageData,
  token,
}) => {
  const placeOrder: any = usePlaceOrder();
  const map: any = useMapStore();
  const {distance} = map;
  const {placeOrderApi, isLoading, price} = placeOrder;
  const data: any = useMapStore();
  const {currentAddress, destinationAddress} = data;
  const resetPackageData = () => {
    setData({
      parcelType: 0,
      details: '',
      flyerRequired: false,
      weight: 0,
      price: 0,
      discount: 0,
      amountReceived: 0,
      calculationType: 0,
      pickUpArea: '',
      pickUpAddress: '',
      pickUpCityId: 0,
      pickUpLat: 0,
      pickUpLong: 0,
      consigneeName: '',
      consigneePhone: '',
      consigneeEmail: '',
      consigneeAddress: '',
      consigneeCityId: 0,
      consigneeLat: 0,
      consigneeLong: 0,
      consigneeLandmark: '',
      paymentType: 0,
      paymentFrom: 0,
      estDistance: 0,
      isInsured: false,
      orderStatus: 0,
      photos: [],
    });
  };
  async function SetPayMethod() {
    if (destinationAddress && currentAddress) {
      setData((prevData: any) => {
        return {
          ...prevData,
          paymentType: COD ? 1 : 2,
          estDistance: distance ? distance : 2,
        };
      });
      const d = await placeOrderApi(packageData, token);
      if (d) {
        setParcelWorth('');
        resetPackageData();
        nextStep();
      }
    } else {
      Alert.alert('Something is missing!');
    }
  }
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
          {/* Order Summary Section */}
          <View style={homeStyles.bottomSheetContentScroll}>
            <CustomText style={homeStyles.heading}>Order Summary</CustomText>

            {/* Pickup Info */}
            <View style={homeStyles.myLocation}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Icons.MyLocation />
                {/* <Icons.LineVertical />
                <Icons.LineVertical /> */}
              </View>
              <View style={{marginLeft: 10}}>
                <CustomText style={homeStyles.myLocationText}>
                  Pickup
                </CustomText>
                <CustomText style={homeStyles.mySubText}>
                  {currentAddress
                    ? currentAddress
                    : 'L7, Work Hall Motif, Block-21, F.B Area, Karachi'}
                </CustomText>
              </View>
            </View>

            {/* Delivery Info */}
            <View style={homeStyles.deliveryLocation}>
              <Icons.MapIcon />
              <View style={{marginLeft: 10}}>
                <CustomText style={homeStyles.myLocationText}>
                  Delivery
                </CustomText>
                <CustomText style={homeStyles.mySubText}>
                  {destinationAddress
                    ? destinationAddress
                    : 'C-90, Khayaban-e-sehar, Phase VI, DHA, Near Sultan Masjid, Karachi.'}
                </CustomText>
              </View>
            </View>

            {/* Price Breakdown */}
            <View style={homeStyles.priceArea}>
              <View style={homeStyles.priceAreaList}>
                <CustomText style={homeStyles.lightFont}>
                  Sub-total:{' '}
                </CustomText>
                <CustomText style={homeStyles.lightFont}>
                  Rs.{' '}
                  {price && price.orderPrice
                    ? AddCommas(price.orderPrice)
                    : AddCommas(price.totalPrice)}
                </CustomText>
              </View>
              <View style={homeStyles.priceAreaList}>
                <CustomText style={homeStyles.lightFont}>
                  Parcel Insurance:{' '}
                </CustomText>
                <CustomText style={homeStyles.lightFont}>
                  Rs.{' '}
                  {price.insurancePricing
                    ? AddCommas(price.insurancePricing)
                    : 0}
                </CustomText>
              </View>
              <View style={homeStyles.priceAreaList}>
                <View style={{flexDirection: 'row'}}>
                  <CustomText isBold style={{marginRight: 5}}>
                    Total
                  </CustomText>
                  <CustomText style={homeStyles.lightFont}>
                    (inclusive of taxes):
                  </CustomText>
                </View>
                <CustomText style={homeStyles.BoldFontLarge}>
                  Rs.{' '}
                  {price.totalPrice
                    ? AddCommas(price.totalPrice)
                    : AddCommas(price.orderPrice)}
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
                <TouchableOpacity onPress={() => setCurrentStep(66)}>
                  <View style={homeStyles.MethodsContainerInActive}>
                    <CustomText style={homeStyles.MethodFirstTextField}>
                      Cash on Pickup
                    </CustomText>
                  </View>
                </TouchableOpacity>
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
            <CustomButton
              disabled={isLoading}
              loader={isLoading}
              onPress={SetPayMethod}
              text="Pay Now"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default OrderSummaryForm;
