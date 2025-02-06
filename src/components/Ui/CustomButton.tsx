import React from 'react';
import {Text, Pressable, ActivityIndicator} from 'react-native';
import {customButtons} from '@assets/css/main';

type ButtonType = {
  text: string;
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  loader?: boolean;
};

import LinearGradient from 'react-native-linear-gradient';

const CustomButton: React.FC<ButtonType> = ({
  text,
  onPress,
  disabled,
  loader,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={customButtons.buttonContainer}>
      <LinearGradient
        colors={
          disabled
            ? ['gray', 'gray']
            : ['rgba(160,27,33,1)', 'rgba(237,28,36,1)', 'rgba(160,27,33,1)']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={customButtons.button}>
        {loader ? (
          <ActivityIndicator size={26} color="rgba(160,27,33,1)" />
        ) : (
          <Text style={customButtons.text}>{text}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default CustomButton;
