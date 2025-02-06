import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {HeaderStyle} from '@assets/css/main';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg'; // For custom SVGs
import Icons from '@utils/imagePaths/imagePaths';
import {useNavigation} from '@react-navigation/native';
import useChatStore from '@utils/store/chatStore';

type Props = {
  currentStep: number;
};

const Header: React.FC<Props> = ({currentStep}) => {
  const {notification} = useChatStore();
  const navigation: any = useNavigation();

  // Ref to track the previous notification length
  const previousNotificationLength = useRef(notification?.length || 0);

  // Determine if notifications have increased

  // Update the previous length whenever notifications change
  useEffect(() => {
    previousNotificationLength.current = notification?.length || 0;
  }, [notification]);

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
                stroke="#465061"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          {/* Logo */}
          <View style={{marginLeft: -20}}>
            <Icons.Logo width={100} height={100} />
          </View>
          {/* Notification Bell Icon */}
          <View>
            {/* {hasNewNotification ? (
              <Icons.NotificationActive
                width={40}
                height={40}
                onPress={() => {
                  navigation.navigate('Notification');
                  // Reset the previous length after viewing notifications
                  previousNotificationLength.current =
                    notification?.length || 0;
                }}
              />
            ) : (
              <Icons.Notification
                width={40}
                height={40}
                onPress={() => {
                  navigation.navigate('Notification');
                }}
              />
            )} */}
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default Header;
