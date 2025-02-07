import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {homeStyles} from '@assets/css/home';
import FormRenderer from './formRenderer/FormRenderer';
import GoBackButton from './components/GoBackButton';
import LocationButton from './components/LocationButton';
import Map from './map/Map';
import Header from '@components/Ui/Header';
import ProgressBar from './components/InProgressBar';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import usePlaceOrder from '@utils/store/placeOrderStore';
import useAuthStore from '@utils/store/authStore';
import {RootStackParamList} from '@utils/types/types';
import TopMessage from './components/TopMessage';

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

const App: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute<HomeRouteProp>();
  const param = route?.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetPosition, setBottomSheetPosition] = useState(0);
  const data = usePlaceOrder();
  const user = useAuthStore();
  const {token} = user;
  const {currentStep, setCurrentStep, orders, getUserOrders} = data;
  useEffect(() => {
    const interval = setInterval(() => {
      getUserOrders(token as string);
    }, 1000); // Fetch orders every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [getUserOrders, token]);
  useEffect(() => {
    setCurrentStep(param ? param.stepToGo : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 8));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));
  const currentIndex =
    currentStep === 2 || currentStep === 5 || currentStep === 6
      ? 2
      : currentStep === 4 || currentStep === 3
      ? 1
      : 0;

  const snapPoints = useMemo(() => ['45', '55', '77'], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 3) {
      setBottomSheetPosition(2);
    } else if (index === 4) {
      setBottomSheetPosition(2);
    } else {
      setBottomSheetPosition(index);
    }
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        {/* Map View */}
        <GestureHandlerRootView style={homeStyles.overlay}>
          <View style={{flex: 1, zIndex: 0}}>
            {/* Map Component */}
            <Map
              currentStep={currentStep}
              bottomSheetPosition={bottomSheetPosition}
            />

            {/* Overlay */}
            {bottomSheetPosition === 2 && (
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  zIndex: 10,
                }}
              />
            )}
          </View>
          {bottomSheetPosition !== 2 && <Header currentStep={currentStep} />}

          {currentStep === 1 &&
            bottomSheetPosition !== 2 &&
            orders &&
            orders?.length > 0 && (
              <TouchableOpacity
                style={{position: 'absolute', zIndex: 5, width: '100%'}}
                onPress={() => navigation.navigate('OrderList')}>
                <ProgressBar />
              </TouchableOpacity>
            )}
          {/* GoBack Button */}

          <GoBackButton
            snapPoints={snapPoints}
            bottomSheetPosition={bottomSheetPosition}
            currentStep={currentStep}
            prevStep={prevStep}
          />

          {/* Location Button */}
          <LocationButton
            currentStep={currentStep}
            snapPoints={snapPoints}
            bottomSheetPosition={bottomSheetPosition}
          />
          {/* Message  */}
          {currentStep === 2 && (
            <TopMessage
              snapPoints={snapPoints}
              bottomSheetPosition={bottomSheetPosition}
              currentStep={currentStep}
              message="Keep package open; rider will inspect and pack on arrival."
            />
          )}
          {/* Bottom Sheet */}
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={currentIndex}
            enableDynamicSizing={true}
            onChange={handleSheetChanges}
            enablePanDownToClose={false}
            enableOverDrag={false}
            style={{
              backgroundColor: '#27272700',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
            handleIndicatorStyle={{
              backgroundColor: '#0000001a',
              width: 54,
              marginTop: 5,
            }}>
            <BottomSheetView
              style={homeStyles.contentContainer}
              pointerEvents="auto">
              <FormRenderer
                nextStep={nextStep}
                currentStep={currentStep}
                shouldGet={param && param.stepToGo ? true : false}
              />
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </>
  );
};

export default App;
