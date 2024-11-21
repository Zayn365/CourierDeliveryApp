import {View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {homeStyles} from '../../../assets/css/home';
import Icons from '../../../utils/imagePaths/imagePaths';

type Prop = {
  snapPoints: Array<any>;
  bottomSheetPosition: any;
};

const LocationButton: React.FC<Prop> = ({snapPoints, bottomSheetPosition}) => {
  return (
    <>
      <Animated.View
        style={[
          homeStyles.LocationButton,
          // @ts-ignore
          {bottom: `${snapPoints[bottomSheetPosition]}%`},
        ]}>
        {/* <TouchableOpacity> */}
        <Icons.LocationIcon />
        {/* </TouchableOpacity> */}
      </Animated.View>
    </>
  );
};

export default LocationButton;
