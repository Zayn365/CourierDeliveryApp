import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {homeStyles} from '../../assets/css/home';
import FormRenderer from './formRenderer/FormRenderer';
import GoBackButton from './components/GoBackButton';
import LocationButton from './components/LocationButton';
import Map from './map/Map';

const App: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetPosition, setBottomSheetPosition] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  // Function to go to the next step
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const currentIndex =
    currentStep === 2 || currentStep === 5 || currentStep === 6
      ? 3
      : currentStep === 4
      ? 2
      : 1;

  const snapPoints = useMemo(() => ['5', '47', '55', '80'], []);

  console.log(bottomSheetPosition, snapPoints);
  // Handle bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    setIsSheetExpanded(index > 0);
    if (index === 4) {
      setBottomSheetPosition(3);
    } else {
      setBottomSheetPosition(index);
    }
  }, []);
  return (
    <View style={{flex: 1}}>
      {/* Map View */}
      <GestureHandlerRootView style={homeStyles.overlay}>
        <Map currentStep={currentStep} />
        {/* GoBack Button */}
        <GoBackButton
          snapPoints={snapPoints}
          bottomSheetPosition={bottomSheetPosition}
          currentStep={currentStep}
          prevStep={prevStep}
        />
        {/* Location Button */}
        <LocationButton
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
            />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
