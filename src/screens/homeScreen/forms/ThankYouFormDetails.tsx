import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {homeStyles} from '@assets/css/home';
import Icons from '@utils/imagePaths/imagePaths';
import CustomText from '@components/Ui/CustomText';
import MileStoneTracking from '@components/Ui/MileStoneTracking';
import CustomButton from '@components/Ui/CustomButton';
import useMapStore from '@utils/store/mapStore';
import usePlaceOrder from '@utils/store/placeOrderStore';
import useChatStore from '@utils/store/chatStore';
import {
  getPaymentTypeText,
  OrderIdSpliter,
  getParcelTypeText,
  onShare,
  AddCommas,
} from '@utils/helper/helperFunctions';
import useAuthStore from '@utils/store/authStore';
import {useNavigation} from '@react-navigation/native';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  COD: boolean;
};

// const etaPickup = '09:46 PM';
const etaDate = new Date().toDateString();

const ThankYouFormDetails: React.FC<Props> = ({setCurrentStep, COD}) => {
  const chat: any = useChatStore();
  const navigation: any = useNavigation();
  const [isShow, setIsShow] = useState<Boolean>(false);
  const data: any = useMapStore();
  const priceData: any = usePlaceOrder();
  const {user, token}: any = useAuthStore();
  const {price, placeOrderData, updateOrderById} = priceData;
  const [durartionTime, setDurationTime] = useState();
  const {createChatRoom} = chat;
  const getOrdersOfUser = async () => {
    await updateOrderById(token as string);
  };
  useEffect(() => {
    getOrdersOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    currentAddress,
    destinationAddress,
    getDistance,
    duration,
    setDestinationAddress,
  } = data;
  const parcelType = getParcelTypeText(Number(placeOrderData?.parcelType));
  const OrderNo = OrderIdSpliter(placeOrderData?.id);
  const paymentType = getPaymentTypeText(placeOrderData?.paymentType);
  const pickUp = placeOrderData
    ? `${placeOrderData?.pickUpAddress}`
    : currentAddress
    ? currentAddress
    : 'L7, Work Hall Motif, Block-21, F.B Area, Karachi';

  const drop = placeOrderData
    ? `${placeOrderData?.consigneeAddress}`
    : destinationAddress
    ? destinationAddress
    : 'L7, Work Hall Motif, Block-21, F.B Area, Karachi';
  const message = `
[${user?.name}] has sent you a parcel! Here are the details:

Order ID: ${OrderNo}
Courier Name: [RiderName]
Bike Registration Number: [RiderRegistrationNumber]
Estimated Delivery Time (ETA): [Time]

📍 Track your parcel in real-time: [TrackingLink]


Download TCS Now: [DownloadLink]
`;
  useEffect(() => {
    const durations = async () => {
      const d = await getDistance(
        placeOrderData.pickUpLong,
        placeOrderData.pickUpLat,
        placeOrderData.consigneeLong,
        placeOrderData.consigneeLat,
      );

      setDurationTime(d);
    };
    durations();
  }, [
    getDistance,
    placeOrderData.consigneeLat,
    placeOrderData.consigneeLong,
    placeOrderData.pickUpLat,
    placeOrderData.pickUpLong,
  ]);
  return (
    <View style={homeStyles.ViewScrollable}>
      <ScrollView
        contentOffset={{y: 0, x: 0}}
        contentContainerStyle={{
          paddingBottom: 80, // Ensure space for the glowing button
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
              <>
                <CustomText style={homeStyles.orderLabel}>
                  ETA for Pickup
                </CustomText>
                {placeOrderData?.orderStatus >= 2 && duration ? (
                  <>
                    {' '}
                    <CustomText style={homeStyles.etaText}>
                      {durartionTime ? durartionTime : 'Unknown'}
                    </CustomText>
                    <CustomText style={homeStyles.etaDate}>
                      {etaDate}
                    </CustomText>
                  </>
                ) : (
                  <CustomText style={homeStyles.etaText}>Unknown</CustomText>
                )}
              </>
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
                onPress={async () => {
                  await createChatRoom(
                    'Chat Intialized',
                    token,
                    placeOrderData?.id,
                  );
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
                    <Icons.Cube />
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
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
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
                        {pickUp}
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
                        {drop}
                      </CustomText>
                    </View>
                  </View>

                  <View style={homeStyles.priceArea}>
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Sub-total:{' '}
                      </CustomText>
                      <CustomText style={homeStyles.lightFont}>
                        Rs.{' '}
                        {price.orderPrice
                          ? AddCommas(price.orderPrice)
                          : AddCommas(placeOrderData?.isInsured)
                          ? AddCommas(Number(placeOrderData?.price) - 25)
                          : AddCommas(placeOrderData?.price)}
                      </CustomText>
                    </View>
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Parcel Insurance:{' '}
                      </CustomText>
                      <CustomText style={homeStyles.lightFont}>
                        Rs.{' '}
                        {price.insurancePricing
                          ? AddCommas(price.insurancePricing)
                          : AddCommas(placeOrderData?.isInsured)
                          ? 25
                          : 0}
                      </CustomText>
                    </View>
                    <View style={homeStyles.priceAreaListThankYouPage}>
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
                          : AddCommas(placeOrderData?.price)}
                      </CustomText>
                    </View>
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Payment Method:
                      </CustomText>
                      <CustomText style={homeStyles.lightFont}>
                        {COD ? 'Cash on pickup' : paymentType}
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
            {/* {canCancel ? (
              <TouchableOpacity style={homeStyles.cancelContainer}>
                <CustomText style={homeStyles.cancelButton}>Cancel</CustomText> */}
            {/* <CustomText style={homeStyles.cancelTimer}>
                  {timeRemaining > 0 ? formatTime(timeRemaining) : '00:00'}
                </CustomText> */}
            {/* </TouchableOpacity>
            ) : null} */}
            {/* Home Button */}
            <View style={{width: '100%'}}>
              <CustomButton
                onPress={() => {
                  setDestinationAddress('');
                  setCurrentStep(1);
                }}
                text="Home"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThankYouFormDetails;

// const styles = StyleSheet.create({});
