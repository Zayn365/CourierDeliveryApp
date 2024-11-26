import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections, {
  MapViewDirectionsWaypoints,
} from 'react-native-maps-directions';
import {ApiKey} from '../../../utils/Google_KEY';
import {mapStyle} from '../../../assets/css/mapStyle';
import useMapStore from '../../../utils/store/mapStore';

type Prop = {
  currentStep: number;
};
const Map: React.FC<Prop> = ({currentStep}) => {
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

  const riderPoint: MapViewDirectionsWaypoints = {
    latitude: 24.9008,
    longitude: 67.1681,
  };

  const mapRef = useRef(null);

  const onMarkerDragEnd = (e: any, setLocation: any, destination: boolean) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setLocation({latitude, longitude});
    fetchAddress(latitude, longitude, destination);
  };

  const adjustMapToCoordinates = (coordinates: any) => {
    if (mapRef?.current) {
      // @ts-ignore
      mapRef?.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 160,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  };
  useEffect(() => {
    if (currentLocation && mapRef.current) {
      // @ts-ignore
      mapRef.current.animateCamera(
        {
          center: currentLocation,
          zoom: 15,
        },
        {duration: 1000},
      );
    }
  }, [currentLocation]);
  return (
    <MapView
      ref={mapRef}
      // ref={ref => (mapRef = ref)}
      style={StyleSheet.absoluteFillObject}
      showsUserLocation={true}
      customMapStyle={mapStyle}
      // initialRegion={{
      //   latitude: currentLocation ? currentLocation?.latitude : 24.8607,
      //   longitude: currentLocation ? currentLocation?.longitude : 67.0011,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // }}
    >
      {currentStep >= 6 ? <Marker coordinate={riderPoint}></Marker> : ''}
      {/* Current Location Marker */}
      {currentLocation?.latitude && currentLocation?.longitude && (
        <>
          <Marker
            coordinate={currentLocation}
            draggable
            onDragEnd={e => {
              console.log('Drag end:', e.nativeEvent.coordinate);
              onMarkerDragEnd(e, setCurrentLocation, false);
            }}></Marker>
        </>
      )}

      {destination.latitude &&
        destination.longitude &&
        currentLocation?.latitude &&
        currentLocation?.longitude && (
          <>
            {/* Destination Marker */}
            <Marker
              coordinate={destination}
              draggable
              onDragEnd={e => {
                console.log('Drag end:', e.nativeEvent.coordinate);
                onMarkerDragEnd(e, setDestination, true);
              }}></Marker>
            {/* MapViewDirections */}
            {/* {currentStep >= 1 && (
              <> */}
            <MapViewDirections
              origin={riderPoint}
              destination={destination}
              waypoints={[currentLocation]}
              apikey={ApiKey}
              strokeColor={currentStep >= 6 ? '#4CD964' : '#4CD96400'}
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
      {/* </>
        )} */}
    </MapView>
  );
};

export default Map;
