import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {homeStyles} from '../../assets/css/home';
import FormRenderer from './formRenderer/FormRenderer';
import GoBackButton from './components/GoBackButton';
import LocationButton from './components/LocationButton';
import Map from './map/Map';
import Header from '../../components/Ui/Header';
import ProgressBar from './components/InProgressBar';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import usePlaceOrder from '../../utils/store/placeOrderStore';
import useAuthStore from '../../utils/store/authStore';
import {RootStackParamList} from '@utils/types/types';
import MapTrack from './map/MapTrack';

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

const App: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute<HomeRouteProp>();
  const param = route?.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetPosition, setBottomSheetPosition] = useState(0);
  const [reload, setReload] = useState(false);
  // const [currentStep, setCurrentStep] = useState(1);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const data = usePlaceOrder();
  const user = useAuthStore();
  const {token} = user;
  const {getUserOrders, currentStep, setCurrentStep, orders} = data;
  const getOrdersOfUser = async () => {
    const d = await getUserOrders(token);
    // console.log(d);
  };
  useEffect(() => {
    getOrdersOfUser();
  }, []);

  useEffect(() => {
    setCurrentStep(param ? param.stepToGo : 1);
  }, [param]);
  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 8));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));
  const currentIndex =
    currentStep === 2 || currentStep === 5 || currentStep === 6
      ? 3
      : currentStep === 4
      ? 2
      : 1;

  const snapPoints = useMemo(() => ['5', '47', '55', '80'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsSheetExpanded(index > 0);
    if (index === 4) {
      setBottomSheetPosition(3);
    } else {
      setBottomSheetPosition(index);
    }
  }, []);

  // console.log('🚀 ~ orders:', orders);
  // orders;
  return (
    <>
      <View style={{flex: 1}}>
        {/* Map View */}
        <GestureHandlerRootView style={homeStyles.overlay}>
          <Map currentStep={currentStep} />
          <Header currentStep={currentStep} />
          {currentStep === 1 && orders?.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate('OrderList')}>
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
              pointerEvents={isSheetExpanded ? 'auto' : 'none'}>
              <FormRenderer
                setCurrentStep={setCurrentStep}
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
