import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {homeStyles} from '../../../assets/css/home';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomText from '../../../components/Ui/CustomText';
import MileStoneTracking from '../../../components/Ui/MileStoneTracking';
import CustomButton from '../../../components/Ui/CustomButton';
import useMapStore from '../../../utils/store/mapStore';
import usePlaceOrder from '../../../utils/store/placeOrderStore';
import useChatStore from '../../../utils/store/chatStore';
import {
  getPaymentTypeText,
  OrderIdSpliter,
  getParcelTypeText,
  onShare,
} from '../../../utils/helper/helperFunctions';
import useAuthStore from '../../../utils/store/authStore';
import {useNavigation} from '@react-navigation/native';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const etaPickup = '09:46 PM';
const etaDate = '12 Dec 2024';

const ThankYouFormDetails: React.FC<Props> = ({setCurrentStep}) => {
  const chat: any = useChatStore();
  const navigation: any = useNavigation();
  const [isShow, setIsShow] = useState<Boolean>(false);
  const data: any = useMapStore();
  const priceData: any = usePlaceOrder();
  const {user, token}: any = useAuthStore();
  const {price, placeOrderData} = priceData;
  const {createChatRoom, currentChatId} = chat;

  const {currentAddress, destinationAddress} = data;
  const [timeRemaining, setTimeRemaining] = useState(5 * 60); // 5 minutes in seconds
  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const parcelType = getParcelTypeText(Number(placeOrderData?.parcelType));
  const OrderNo = OrderIdSpliter(placeOrderData?.orderId);
  const paymentType = getPaymentTypeText(placeOrderData?.paymentType);
  const pickUp = currentAddress
    ? currentAddress
    : placeOrderData
    ? `${placeOrderData?.pickUpAddress},${placeOrderData?.pickUpArea},Karachi`
    : 'L7, Work Hall Motif, Block-21, F.B Area, Karachi';
  const drop = destinationAddress
    ? destinationAddress
    : placeOrderData
    ? `${placeOrderData?.consigneeAddress},${placeOrderData?.consigneeLandmark},Karachi`
    : 'L7, Work Hall Motif, Block-21, F.B Area, Karachi';
  const message = `Hello,

I (${user?.name}) have sent you a parcel through TCS Now! 

Order Number: ${OrderNo}  
Parcel Type: ${parcelType}  
Payment Method: ${paymentType}  

If you have any questions, please contact the TCS Helpline at +92 21 111 123 456.

Thank you!`;
  return (
    <View style={homeStyles.ViewScrollable}>
      <ScrollView
        contentOffset={{y: 0, x: 0}}
        contentContainerStyle={{
          paddingBottom: 50, // Ensure space for the glowing button
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={homeStyles.bottomSheetContentScroll}>
          <View style={homeStyles.UpperIconView}>
            <Icons.ThankYouIcon />
            <CustomText style={homeStyles.UpperHeading}>Thank You</CustomText>
          </View>
          <View style={homeStyles.orderDetails}>
            <View
              style={{
                borderWidth: 1,
                width: '50%',
                borderLeftWidth: 0,
                padding: 15,
                borderColor: '#DCE4F1',
              }}>
              <CustomText style={homeStyles.orderLabel}>Order#</CustomText>
              <CustomText style={homeStyles.orderNumber}>{OrderNo}</CustomText>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: '50%',
                borderRightWidth: 0,
                padding: 15,
                borderColor: '#DCE4F1',
              }}>
              <CustomText style={homeStyles.orderLabel}>
                ETA for Pickup
              </CustomText>
              <CustomText style={homeStyles.etaText}>{etaPickup} </CustomText>
              <CustomText style={homeStyles.etaDate}>{etaDate}</CustomText>
            </View>
          </View>

          {/* Milestone Tracking */}
          <MileStoneTracking
            status={
              placeOrderData?.orderStatus ? placeOrderData?.orderStatus : 1
            }
            colorless={false}
          />
          {/* Assistance Section */}
          <View style={homeStyles.assistanceSection}>
            {/* <CustomText style={homeStyles.assistanceLabel}>
              Do you need assistance?
            </CustomText> */}
            <View style={homeStyles.assistanceActions}>
              <TouchableOpacity
                onPress={() => {
                  if (!currentChatId) {
                    createChatRoom('Chat Intialized', token);
                  }
                  navigation.navigate('Chat');
                }}>
                <Icons.Message />
                {/* <CustomText style={hometyles.callButton}>Call</CustomText> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderColor: '#DCE4F1',
                borderLeftWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
              }}>
              <TouchableOpacity onPress={() => onShare(message)}>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 60,
                  }}>
                  <Icons.Whatsapp />
                </View>
                <CustomText isBold={false} style={homeStyles.callButton}>
                  Share on Whatsapp
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Order Details Button */}

          <View style={homeStyles.MethodMain}>
            <View style={homeStyles.cashOnDelivery}>
              <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                <CustomText style={homeStyles.MethodFirstTextField}>
                  Order Details
                </CustomText>
              </TouchableOpacity>
              {isShow === true ? (
                <TouchableOpacity onPress={() => setIsShow(false)}>
                  <Icons.Up />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsShow(true)}>
                  <Icons.Down />
                </TouchableOpacity>
              )}
            </View>
            <View>
              {isShow ? (
                <>
                  {/* Parcel Type */}
                  <View style={homeStyles.myCube}>
                    <Icons.Cube style={{marginTop: -15}} />
                    <View style={{marginLeft: 10}}>
                      <CustomText style={homeStyles.myLocationText}>
                        Parcel Type
                      </CustomText>
                      <CustomText style={homeStyles.mySubText}>
                        {parcelType}
                        {Number(placeOrderData.parcelType) === 1 &&
                          ` (${placeOrderData?.weight} KG/s)`}
                      </CustomText>
                    </View>
                  </View>
                  {/* PickUp Info */}
                  <View style={homeStyles.myLocation}>
                    <Icons.MyLocation style={{marginTop: -15}} />
                    <View style={{marginLeft: 10}}>
                      <CustomText style={homeStyles.myLocationText}>
                        Pickup
                      </CustomText>
                      <CustomText style={homeStyles.mySubText}>
                        {pickUp}
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
                        {drop}
                      </CustomText>
                    </View>
                  </View>

                  <View style={homeStyles.priceArea}>
                    {price ? (
                      <>
                        <View style={homeStyles.priceAreaListThankYouPage}>
                          <CustomText style={homeStyles.lightFont}>
                            Sub-total:{' '}
                          </CustomText>
                          <CustomText style={homeStyles.lightFont}>
                            Rs. {price.orderPrice}
                          </CustomText>
                        </View>
                        <View style={homeStyles.priceAreaListThankYouPage}>
                          <CustomText style={homeStyles.lightFont}>
                            Parcel Insurance:{' '}
                          </CustomText>
                          <CustomText style={homeStyles.lightFont}>
                            Rs. {price.insurancePricing}
                          </CustomText>
                        </View>
                      </>
                    ) : null}
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Total (incl fees and tax){' '}
                      </CustomText>
                      <CustomText style={homeStyles.BoldFontLarge}>
                        Rs.{' '}
                        {price.totalPrice
                          ? price.totalPrice
                          : placeOrderData?.price}
                      </CustomText>
                    </View>
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Payment Method
                      </CustomText>
                      <CustomText style={homeStyles.lightFont}>
                        {paymentType}
                      </CustomText>
                    </View>
                  </View>
                </>
              ) : (
                ''
              )}
            </View>
          </View>

          {/* Cancel Button */}
          <View style={homeStyles.HomeBtnContainer}>
            <TouchableOpacity style={homeStyles.cancelContainer}>
              <CustomText style={homeStyles.cancelButton}>Cancel</CustomText>
              <CustomText style={homeStyles.cancelTimer}>
                {timeRemaining > 0 ? formatTime(timeRemaining) : '00:00'}
              </CustomText>
            </TouchableOpacity>
            {/* Home Button */}
            <View style={{width: '45%'}}>
              <CustomButton onPress={() => setCurrentStep(1)} text="Home" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThankYouFormDetails;

const styles = StyleSheet.create({});
