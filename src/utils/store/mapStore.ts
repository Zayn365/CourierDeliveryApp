import {create} from 'zustand';
import {ApiKey} from '../../utils/Google_KEY';
import {Alert} from 'react-native';
import axios from 'axios';

// interface Location {
//   latitude: number;
//   longitude: number;
// }

// interface PlacePrediction {
//   description: string;
//   place_id: string;
//   [key: string]: any;
// }

// interface MapStore {
//   places: PlacePrediction[] | null;
//   currentAddress: string;
//   currentLocation: Location | null;
//   destination: Location | null;
//   destinationAddress: string;
//   distance: number | null;
//   duration: number | null;
//   setDistance: (distance: number) => void;
//   setDuration: (duration: number) => void;
//   setDestination: (destination: Location) => void;
//   setCurrentLocation: (currentLocation: Location) => void;
//   fetchAddress: (
//     latitude: number,
//     longitude: number,
//     destination: boolean,
//   ) => Promise<void>;
//   fetchLonLat: (placeid: string) => Promise<void>;
//   fetchPlaces: (input: string) => Promise<PlacePrediction[] | undefined>;
// }

const useMapStore = create((set, get) => ({
  places: null,
  currentAddress: '',
  currentLocation: {latitude: 24.8607, longitude: 67.0011},
  destination: {},
  destinationAddress: '',
  distance: null,
  duration: null,
  setDistance: (distance: number | string) => set({distance}),
  setDuration: (duration: number | string) => set({duration}),
  setDestination: (destination: any) => set({destination}),
  setCurrentLocation: (currentLocation: any) => set({currentLocation}),
  setCurrentAddress: (currentAddress: any) => set({currentAddress}),
  setDestinationAddress: (destinationAddress: any) => set({destinationAddress}),

  fetchAddress: async (latitude: any, longitude: any, destination: boolean) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ApiKey}`,
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        if (!destination) {
          set({currentAddress: data.results[0].formatted_address});
        } else {
          set({destinationAddress: data.results[0].formatted_address});
        }
      } else {
        console.error('No address found for coordinates');
      }
    } catch (error: any) {
      console.error('Error fetching address:', error?.response);
    }
  },
  fetchLonLat: async (placeid: any, destination: boolean) => {
    const data: any = await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${ApiKey}`,
      )
      .then((response: any) => {
        return response?.data?.result?.geometry.location;
      })
      .catch(err => {
        console.log(err.response.data, 'I ERROR ran');
        Alert.alert(err.response.data.message);
      });
    // console.log(data);
    destination
      ? set({
          destination: {
            latitude: data?.lat,
            longitude: data?.lng,
          },
        })
      : set({
          currentLocation: {
            latitude: data?.lat,
            longitude: data?.lng,
          },
        });
  },
  fetchPlaces: async (input: any) => {
    console.log(input);
    try {
      const res = axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${ApiKey}&components=country:pk`,
        )
        .then((resposne: any) => {
          // console.log(resposne.data.predictions);
          return resposne.data?.predictions;
        })
        .catch(err => {
          console.log(err.response.data, 'I ERROR ran');
          Alert.alert(err.response.data.message);
        });

      return res;
    } catch (err: any) {
      console.log(err);
      Alert.alert(err.message);
    }
  },
}));
export default useMapStore;
