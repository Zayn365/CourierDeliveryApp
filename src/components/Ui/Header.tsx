import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {HeaderStyle} from '../../assets/css/main';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg'; // For custom SVGs
import Icons from '../../utils/imagePaths/imagePaths';
import {useNavigation} from '@react-navigation/native';
type Props = {
  currentStep: number;
};

const Header: React.FC<Props> = ({currentStep}) => {
  // console.log(currentStep);
  const navigation: any = useNavigation();
  return (
    <>
      {currentStep === 1 && (
        <LinearGradient
          colors={['#ffffff', '#ffffff20']}
          style={HeaderStyle.container}>
          {/* Menu Icon */}
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              navigation.navigate('Nav');
            }}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          {/* Logo */}
          <View style={{marginLeft: 10}}>
            <Icons.Logo width={100} height={100} />
          </View>
          {/* Notification Bell Icon */}
          <View>
            <Icons.Notification
              width={40}
              height={40}
              onPress={() => {
                navigation.navigate('Notification');
              }}
            />
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default Header;
