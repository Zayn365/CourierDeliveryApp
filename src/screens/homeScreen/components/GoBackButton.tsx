import React from 'react';
import Animated from 'react-native-reanimated';
import {homeStyles} from '@assets/css/home';
import Icons from '@utils/imagePaths/imagePaths';
type Prop = {
  currentStep: number;
  prevStep: () => void;
  snapPoints: Array<any>;
  bottomSheetPosition: any;
};

const GoBackButton: React.FC<Prop> = ({
  currentStep,
  prevStep,
  snapPoints,
  bottomSheetPosition,
}) => {
  return (
    <>
      {currentStep > 1 && currentStep !== 6 && currentStep !== 66 ? (
        <>
          <Animated.View
            style={[
              homeStyles.goBackButton,
              // @ts-ignore
              {
                bottom: `${
                  currentStep === 2
                    ? Number(snapPoints[bottomSheetPosition]) + 3
                    : Number(snapPoints[bottomSheetPosition])
                }%`,
              },
            ]}>
            <Icons.GoBackIcon onPress={prevStep} />
          </Animated.View>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default GoBackButton;
