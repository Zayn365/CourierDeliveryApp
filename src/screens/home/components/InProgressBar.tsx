import CustomText from '../../../components/Ui/CustomText';
import Icons from '../../../utils/imagePaths/imagePaths';
import React from 'react';
import {View} from 'react-native';

type Props = {};

const ProgressBar: React.FC<Props> = ({}) => {
  return (
    <View
      style={{justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>
      <View
        style={{
          marginTop: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#ED1C24',
          borderRadius: 50,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 40,
          width: '90%',
        }}>
        <CustomText
          style={{
            color: '#fff',
            fontSize: 12,
            fontFamily: 'Outfit-Bold',
            letterSpacing: 2,
          }}>
          IN-PROGRESS
        </CustomText>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            style={{
              backgroundColor: '#FFD900',
              color: '#ED1C24',
              fontSize: 12,
              fontFamily: 'Outfit-Bold',
              paddingVertical: 4,
              paddingHorizontal: 10,
              marginHorizontal: 30,
              borderRadius: 50,
            }}>
            2
          </CustomText>
          <Icons.GoForwardIcon />
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
