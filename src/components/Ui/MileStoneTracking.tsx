import React from 'react';
import {View} from 'react-native';
import CustomText from './CustomText';
import {homeStyles} from '../../assets/css/home';
import Tick from '../../assets/images/icons/tickMilestone.svg';
import Blank from '../../assets/images/icons/blinkMilestone.svg';
import Line from '../../assets/images/icons/lineHorizontal.svg';

type Props = {};

function MileStoneTracking({}: Props) {
  const properties = [
    {
      title: 'Assigned',
      hasReached: true,
      willReach: false,
    },
    {
      title: 'Pick Up',
      hasReached: false,
      willReach: true,
    },
    {
      title: 'In Route',
      hasReached: false,
      willReach: false,
    },
    {
      title: 'Near You',
      hasReached: false,
      willReach: false,
    },
    {
      title: 'Delivered',
      hasReached: false,
      willReach: false,
    },
  ];
  return (
    <View>
      <View style={homeStyles.trackingContainer}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {properties.map((val, key) => (
            <>
              {val.hasReached === true ? (
                <>
                  <Tick key={val.title} />
                  <Line key={key} style={{}} />
                </>
              ) : val.willReach === true ? (
                <>
                  <Blank key={val.title} />
                  <Line key={key} style={{}} />
                </>
              ) : (
                <>
                  <Blank key={val.title} style={{opacity: 0.6}} />
                  {key < 4 ? <Line key={key} style={{}} /> : ''}
                </>
              )}
            </>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {properties.map((val, key) => (
            <CustomText
              key={val.title + key}
              style={
                val.hasReached === true
                  ? homeStyles.trackingStep
                  : homeStyles.trackingStepInactive
              }>
              {val.title}
            </CustomText>
          ))}
        </View>
      </View>
    </View>
  );
}

export default MileStoneTracking;
