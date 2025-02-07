import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Image, Animated, Platform} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {ApiKey} from '@utils/Google_KEY';
import {mapStyle} from '@assets/css/mapStyle';
import useMapStore from '@utils/store/mapStore';
import usePlaceOrder from '@utils/store/placeOrderStore';
import Icons from '@utils/imagePaths/imagePaths';
import {GetRiderLocation} from '@utils/store/fireStore/firebaseStore';
import {height} from '@utils/helper/helperFunctions';
import {OrderStatusEnum} from '@utils/enums/enum';

type Prop = {
  currentStep: number;
  bottomSheetPosition: number;
};

const Map: React.FC<Prop> = ({currentStep}) => {
  const [key, setKey] = React.useState(0);
  const [riderPoint, setRiderData] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      setKey(prev => prev + 1);
    }
  }, [currentStep]);
  const [heading, setHeading] = useState(0);
  const {riderId, placeOrderData} = usePlaceOrder();

  const {
    fetchAddress,
    destination,
    setDistance,
    setDuration,
    destinationAddress,
    currentLocation,
    setCurrentLocation,
    setDestination,
  }: any = useMapStore();

  const mapRef = useRef<MapView | null>(null);

  const animatedRiderLocation = useRef(
    new AnimatedRegion({
      latitude: (riderPoint?.latitude && riderPoint?.latitude) || 0,
      longitude: (riderPoint?.longitude && riderPoint?.longitude) || 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  ).current;

  const animatedHeading = useRef(new Animated.Value(heading)).current;

  useEffect(() => {
    if (riderId) {
      GetRiderLocation(riderId, setRiderData, setHeading);
    }
  }, [riderId]);

  useEffect(() => {
    if (riderPoint?.latitude && riderPoint?.longitude) {
      animatedRiderLocation
        .timing({
          latitude: riderPoint?.latitude,
          longitude: riderPoint?.longitude,
          duration: 1000,
          useNativeDriver: false,
          toValue: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        })
        .start();
    }

    Animated.timing(animatedHeading, {
      toValue: heading,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [riderPoint, heading, animatedHeading, animatedRiderLocation]);

  const adjustMapToCoordinates = (coordinates: any) => {
    if (mapRef.current) {
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
    if (!riderPoint?.latitude && !riderPoint?.longitude) {
      if (currentLocation.latitude && currentLocation.longitude) {
        mapRef.current?.animateToRegion({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      if (destination.latitude && destination.longitude) {
        adjustMapToCoordinates([currentLocation, destination]);
      }
    }
  }, [
    currentLocation,
    destination,
    riderPoint?.latitude,
    riderPoint?.longitude,
  ]);

  return (
    <MapView
      ref={mapRef}
      style={[StyleSheet.absoluteFillObject, {height: height * 0.6}]}
      showsUserLocation
      key={
        Platform.OS === 'android'
          ? `${key}-${currentLocation.latitude}-${currentLocation.longitude}`
          : 'map'
      }
      loadingEnabled={currentStep !== 6}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: currentLocation?.latitude || 24.8607,
        longitude: currentLocation?.longitude || 67.0011,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      {placeOrderData?.orderStatus >= 3 && currentStep >= 6 && (
        <Marker.Animated
          coordinate={animatedRiderLocation}
          anchor={{x: 0.5, y: 0.5}}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animatedHeading.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <Image source={Icons.rider} style={{width: 40, height: 40}} />
          </Animated.View>
        </Marker.Animated>
      )}

      {currentStep !== 6 &&
        currentLocation.latitude &&
        currentLocation.longitude && (
          <Marker
            coordinate={currentLocation}
            draggable={currentStep <= 2}
            image={Icons.pickUp}
            onDragEnd={e => {
              const {latitude, longitude} = e.nativeEvent.coordinate;
              setCurrentLocation({latitude, longitude});
              fetchAddress(latitude, longitude, false);
            }}
          />
        )}
      {currentStep === 6 &&
        (placeOrderData?.orderStatus === OrderStatusEnum.OUT_FOR_PICKUP ||
          placeOrderData?.orderStatus <= OrderStatusEnum.IN_TRANSIT) && (
          <Marker
            coordinate={currentLocation}
            draggable={currentStep <= 2}
            image={Icons.pickUp}
            onDragEnd={e => {
              const {latitude, longitude} = e.nativeEvent.coordinate;
              setDestination({latitude, longitude});
              fetchAddress(latitude, longitude, true);
            }}
          />
        )}
      {currentStep !== 1 &&
        destination.latitude &&
        destination.longitude &&
        currentLocation.latitude &&
        currentLocation.longitude && (
          <>
            {currentStep > 2 && placeOrderData?.orderStatus <= 2 && (
              <Marker
                coordinate={destination}
                draggable={currentStep <= 3}
                image={Icons.destination}
                onDragEnd={e => {
                  const {latitude, longitude} = e.nativeEvent.coordinate;
                  setDestination({latitude, longitude});
                  fetchAddress(latitude, longitude, true);
                }}
              />
            )}
            {currentStep === 6 &&
              riderPoint?.latitude !== 0 &&
              riderPoint?.longitude !== 0 &&
              placeOrderData?.orderStatus !== OrderStatusEnum.OUT_FOR_PICKUP &&
              placeOrderData?.orderStatus ===
                OrderStatusEnum.OUT_FOR_DELIVERY && (
                <Marker
                  coordinate={destination}
                  draggable={currentStep <= 3}
                  image={Icons.destination}
                  onDragEnd={e => {
                    const {latitude, longitude} = e.nativeEvent.coordinate;
                    setDestination({latitude, longitude});
                    fetchAddress(latitude, longitude, true);
                  }}
                />
              )}
            {currentStep === 6 && placeOrderData?.orderStatus <= 2 ? (
              <MapViewDirections
                origin={currentLocation}
                destination={destination}
                apikey={ApiKey}
                strokeColor={
                  currentStep >= 2 || destinationAddress ? '#4CD964' : ''
                }
                strokeWidth={4}
                optimizeWaypoints
                mode="DRIVING"
                onReady={result => {
                  setDistance(result.distance);
                  setDuration(result.duration);
                  adjustMapToCoordinates(result.coordinates);
                }}
                onError={errorMessage => {
                  console.error('Error with MapViewDirections:', errorMessage);
                }}
              />
            ) : (
              <MapViewDirections
                origin={riderPoint}
                destination={
                  placeOrderData?.orderStatus ===
                    OrderStatusEnum.OUT_FOR_PICKUP ||
                  placeOrderData?.orderStatus <= OrderStatusEnum.IN_TRANSIT
                    ? currentLocation
                    : destination
                }
                apikey={ApiKey}
                strokeColor={currentStep > 2 ? '#4CD964' : ''}
                strokeWidth={4}
                optimizeWaypoints
                mode="DRIVING"
                onReady={result => {
                  setDistance(result.distance);
                  setDuration(result.duration);
                  // adjustMapToCoordinates(result.coordinates);
                }}
                onError={errorMessage => {
                  console.error('Error with MapViewDirections:', errorMessage);
                }}
              />
            )}
          </>
        )}
    </MapView>
  );
};

export default Map;
