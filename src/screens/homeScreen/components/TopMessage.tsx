import React from 'react';
import Animated from 'react-native-reanimated';
import {homeStyles} from '@assets/css/home';
import {View} from 'react-native';
import CustomText from '@components/Ui/CustomText';
import Icons from '@utils/imagePaths/imagePaths';
type Prop = {
  snapPoints: Array<any>;
  bottomSheetPosition: any;
  currentStep: number;
  message: string;
};

const TopMessage: React.FC<Prop> = ({
  snapPoints,
  bottomSheetPosition,
  message,
}) => {
  console.log(snapPoints[bottomSheetPosition], 'THIS IS');

  return (
    <>
      (
      <Animated.View
        style={[
          homeStyles.TopMessage,
          // @ts-ignore
          {
            bottom: `${snapPoints[bottomSheetPosition]}%`,
            height: 20,
          },
        ]}>
        {/* <TouchableOpacity> */}
        <View style={homeStyles.TopMessageTextBg}>
          <View style={homeStyles.TopMessageInner}>
            <Icons.Notice width={20} height={20} />
            <CustomText style={homeStyles.TopMessageText} isBold>
              {message}
            </CustomText>
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </Animated.View>
      )
    </>
  );
};

export default TopMessage;
