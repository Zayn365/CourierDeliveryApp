import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {homeStyles} from '../../../assets/css/home';
import {mapStyle} from '../../../assets/css/mapStyle';
import Icons from '../../../utils/imagePaths/imagePaths';
import MapViewDirections from 'react-native-maps-directions';
import {ApiKey} from '../../../utils/Google_KEY';

const origin = {
  latitude: 24.8878,
  longitude: 67.188,
};
const destination = {
  latitude: 24.9571,
  longitude: 67.0678,
};

type Prop = {
  currentStep: number;
};
const Map: React.FC<Prop> = ({currentStep}) => {
  //   const [currentLocation, setCurrentLocation] = useState<any>(origin);

  // console.log(currentLocation);
  //   const _getLocation = () => {
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 60000,
  //     })
  //       .then(location => {
  //         setCurrentLocation({
  //           longitude: location.longitude,
  //           latitude: location.latitude,
  //         });
  //         // console.log(location);
  //       })
  //       .catch(error => {
  //         const {code, message} = error;
  //         console.warn(code, message);
  //       });
  //   };

  // useEffect(() => {
  //   _getLocation();
  // }, []);

  return (
    <>
      <MapView
        style={homeStyles.map}
        showsUserLocation={true}
        // showsMyLocationButton={true}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}>
          <Icons.Pin />
        </Marker>
        {currentStep === 6 && (
          <>
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}>
              <Icons.Point />
            </Marker>
            <MapViewDirections
              origin={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              apikey={ApiKey}
              strokeColor="lightgreen"
              strokeWidth={3}
              optimizeWaypoints={true}
              mode="DRIVING"
            />
          </>
        )}
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
