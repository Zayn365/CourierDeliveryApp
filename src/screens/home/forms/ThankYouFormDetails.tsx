import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {homeStyles} from '../../../assets/css/home';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomText from '../../../components/Ui/CustomText';
import MileStoneTracking from '../../../components/Ui/MileStoneTracking';
import CustomButton from '../../../components/Ui/CustomButton';
import useMapStore from '../../../utils/store/mapStore';
import usePlaceOrder from '../../../utils/store/placeOrderStore';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const cancelTime = '05:27';
const etaPickup = '09:46 PM';
const etaDate = '12 Dec 2024';

const ThankYouFormDetails: React.FC<Props> = ({setCurrentStep}) => {
  const [isShow, setIsShow] = useState<Boolean>(false);
  const data: any = useMapStore();
  const priceData: any = usePlaceOrder();
  const {price, placeOrderData} = priceData;
  const {currentAddress, destinationAddress} = data;
  const [timeRemaining, setTimeRemaining] = useState(5 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [timeRemaining]);

  // Format time as MM:SS
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const parcelType = () => {
    if (placeOrderData?.parcelType == 1) {
      const weight = placeOrderData?.weight;
      return `Parcel, ${weight} KG/s`;
    } else {
      return 'Document';
    }
  };

  const paymntType = () => {
    if (placeOrderData?.paymentType == 1) {
      return `Cash`;
    } else if (placeOrderData?.paymentType == 2) {
      return 'Card';
    } else {
      return 'Wallet';
    }
  };

  const OrderIdSpliter = () => {
    const orderId = placeOrderData?.orderId;
    const splitId = orderId?.split('-')[0];
    return `TCSN${splitId}`;
  };

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
              <CustomText style={homeStyles.orderNumber}>
                {OrderIdSpliter()}
              </CustomText>
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
          <MileStoneTracking />
          {/* Assistance Section */}
          <View style={homeStyles.assistanceSection}>
            <CustomText style={homeStyles.assistanceLabel}>
              Do you need assistance?
            </CustomText>
            <View style={homeStyles.assistanceActions}>
              <TouchableOpacity>
                <Icons.Message />
                {/* <CustomText style={hometyles.callButton}>Call</CustomText> */}
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
                        {parcelType()}
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
                        {currentAddress
                          ? currentAddress
                          : 'L7, Work Hall Motif, Block-21, F.B Area, Karachi'}
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
                        {destinationAddress
                          ? destinationAddress
                          : 'C-90, Khayaban-e-sehar, Phase VI, DHA, Near Sultan Masjid, Karachi.'}
                      </CustomText>
                    </View>
                  </View>

                  <View style={homeStyles.priceArea}>
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Sub-total:{' '}
                      </CustomText>
                      <CustomText style={homeStyles.lightFont}>
                        Rs. {price.ordrPrice}
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
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Total (incl fees and tax){' '}
                      </CustomText>
                      <CustomText style={homeStyles.BoldFontLarge}>
                        Rs. {price.totalPrice}
                      </CustomText>
                    </View>
                    <View style={homeStyles.priceAreaListThankYouPage}>
                      <CustomText style={homeStyles.lightFont}>
                        Payment Method
                      </CustomText>
                      <CustomText style={homeStyles.lightFont}>
                        {paymntType()}
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
