import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icons from '../../../utils/imagePaths/imagePaths';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import {ApiKey} from '../../../utils/Google_KEY';
import {mapStyle} from '../../../assets/css/mapStyle';

type Prop = {
  currentStep: number;
};
const Map: React.FC<Prop> = ({currentStep}) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 24.8878,
    longitude: 67.188,
  });
  const [destination, setDestination] = useState({
    latitude: 24.9571,
    longitude: 67.0678,
  });
  const mapRef = useRef(null);

  // Fetch current location
  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      setCurrentLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      fetchAddress(location.latitude, location.longitude, 'Current Location');
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  // Fetch address from coordinates
  const fetchAddress = async (
    latitude: any,
    longitude: any,
    label = 'Location',
  ) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ApiKey}`,
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        console.log(`${label} Address:`, data.results[0].formatted_address);
      } else {
        console.error('No address found for coordinates');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Handle marker drag
  const onMarkerDragEnd = (e: any, setLocation: any, label: string) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setLocation({latitude, longitude});
    fetchAddress(latitude, longitude, label);
  };

  // Adjust map position and zoom
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

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      showsUserLocation={true}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      {/* Current Location Marker */}
      <Marker
        coordinate={currentLocation}
        draggable
        onDragEnd={e =>
          onMarkerDragEnd(e, setCurrentLocation, 'Current Location')
        }>
        {/* <Icons.Pin /> */}
      </Marker>

      {/* Destination Marker */}
      {currentStep >= 6 && (
        <>
          {/* <Marker
            coordinate={destination}
            draggable
            onDragEnd={e => onMarkerDragEnd(e, setDestination, 'Destination')}> */}
          {/* <Icons.Point /> */}
          {/* </Marker> */}

          {/* MapViewDirections */}
          {/* <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey={ApiKey}
            strokeColor="#4CD964" // Updated color to hot pink
            strokeWidth={4} // Thicker line for better visibility
            optimizeWaypoints={true}
            mode="DRIVING"
            onReady={result => {
              console.log('Route calculated:', result);
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} mins`);

              // Adjust map to fit the route
              adjustMapToCoordinates(result.coordinates);
            }}
            onError={errorMessage => {
              console.error('Error with MapViewDirections:', errorMessage);
            }}
          /> */}
        </>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
