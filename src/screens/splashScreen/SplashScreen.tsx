import React from 'react';
import {View, Text, Image, Dimensions, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '@assets/css/splashScreen';
import Logo from '@assets/images/logos/logo.svg';
import bgSplash from '@assets/images/bgImages/splashbg.jpg';
import CustomText from '@components/Ui/CustomText';

const {width} = Dimensions.get('window');

const TCSNowScreen = () => {
  return (
    <View style={styles.background}>
      <Image
        source={bgSplash}
        // resizeMode="contain"
        style={styles.imageTop}
      />
      <LinearGradient
        colors={['#FFFFFF', '#F8F6FF']}
        style={styles.curvedContainer}>
        <View style={styles.textContainer}>
          <Logo style={styles.image} />
          <View>
            <CustomText style={styles.title}>
              Fastest. Trusted. Secured
            </CustomText>
            <CustomText style={styles.subtitle}>
              On Demand - From a Market Leader{' '}
            </CustomText>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TCSNowScreen;
