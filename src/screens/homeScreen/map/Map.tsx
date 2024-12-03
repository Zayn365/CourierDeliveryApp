import React, {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections, {
  MapViewDirectionsWaypoints,
} from 'react-native-maps-directions';
import {ApiKey} from '../../../utils/Google_KEY';
import {mapStyle} from '../../../assets/css/mapStyle';
import useMapStore from '../../../utils/store/mapStore';
import usePlaceOrder from '../../../utils/store/placeOrderStore';
import Icons from '../../../utils/imagePaths/imagePaths';
import {GetRiderLocaton} from '../../../utils/store/fireStore/firebaseStore';

type Prop = {
  currentStep: number;
};
const Map: React.FC<Prop> = ({currentStep}) => {
  const [riderPoint, setRiderData] = useState<any>({
    latitude: 24.9008,
    longitude: 67.1681,
  });
  const {riderId} = usePlaceOrder();
  useEffect(() => {
    if (!riderId) return;
    GetRiderLocaton(riderId, setRiderData);
  }, [riderId]);

  // console.log(riderPoint, "Let's see");
  const data: any = useMapStore();
  const {
    fetchAddress,
    destination,
    setDestination,
    setDistance,
    setDuration,
    currentLocation,
    setCurrentLocation,
  } = data;

  const mapRef = useRef<MapView | null>(null);

  const onMarkerDragEnd = (
    e: any,
    setLocation: any,
    isDestination: boolean,
  ) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setLocation({latitude, longitude});
    fetchAddress(latitude, longitude, isDestination);
  };

  const adjustMapToCoordinates = (coordinates: any) => {
    if (mapRef?.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 190,
          right: 150,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: currentLocation,
          zoom: 15,
        },
        {duration: 1000},
      );
    }
    adjustMapToCoordinates(currentLocation);
    adjustMapToCoordinates(destination);
  }, [currentLocation]);
  console.log(
    `${currentLocation.latitude}-${currentLocation.longitude}`,
    'Cheeck it',
  );
  return (
    <MapView
      ref={mapRef}
      // key={`${currentLocation.latitude}-${currentLocation.longitude}-location`}
      style={StyleSheet.absoluteFillObject}
      showsUserLocation={true}
      loadingEnabled={true}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: currentLocation?.latitude || 24.8607, // Default latitude
        longitude: currentLocation?.longitude || 67.0011, // Default longitude
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      {currentStep >= 6 && (
        <Marker image={Icons.rider} coordinate={riderPoint} />
      )}

      {currentLocation?.latitude && currentLocation?.longitude && (
        <Marker
          coordinate={currentLocation}
          draggable
          image={Icons.pickUp}
          onDragEnd={e => {
            onMarkerDragEnd(e, setCurrentLocation, false);
          }}
        />
      )}

      {destination.latitude &&
        destination.longitude &&
        currentLocation?.latitude &&
        currentLocation?.longitude && (
          <>
            {currentStep >= 3 && (
              <Marker
                coordinate={destination}
                draggable
                image={Icons.destination}
                onDragEnd={e => {
                  onMarkerDragEnd(e, setDestination, true);
                }}>
                {/* <View style={{width: 40, marginTop: 5, height: 40}}>
                  <Image
                    source={Icons.destination}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View> */}
              </Marker>
            )}
            <MapViewDirections
              origin={riderPoint}
              destination={destination}
              waypoints={[currentLocation]}
              apikey={ApiKey}
              strokeColor={
                currentStep >= 6 && currentStep !== 66 ? '#4CD964' : '#4CD96400'
              }
              strokeWidth={4}
              optimizeWaypoints={true}
              mode="DRIVING"
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} mins`);
                setDistance(result.distance);
                setDuration(result.duration);

                adjustMapToCoordinates(result.coordinates);
              }}
              onError={errorMessage => {
                console.error('Error with MapViewDirections:', errorMessage);
              }}
            />
          </>
        )}
    </MapView>
  );
};

export default Map;
