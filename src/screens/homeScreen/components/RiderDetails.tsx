import {StyleSheet, View} from 'react-native';
import CustomText from '@components/Ui/CustomText';
import React from 'react';
import Icons from '@utils/imagePaths/imagePaths';

const RiderDetails = () => {
  return (
    <View>
      <View style={styles.profile}>
        <Icons.AvatarRider />
        <CustomText>Rider</CustomText>
      </View>
      <View style={styles.numberPlate}>
        <CustomText>KQF-19919</CustomText>
      </View>
    </View>
  );
};

export default RiderDetails;

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberPlate: {
    borderWidth: 1,
    borderColor: '#DCE4F1',
    padding: 10,
    borderRadius: 10,
  },
});
