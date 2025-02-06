import {create} from 'zustand';
import {ApiKey} from '@utils/Google_KEY';
import {Alert} from 'react-native';
import axios from 'axios';
import {GOOGLE_API} from '@env';
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

const useMapStore = create(set => ({
  places: null,
  currentAddress: '',
  currentLocation: {latitude: 24.8607, longitude: 67.0011},
  destination: {latitude: 24.8607, longitude: 67.0011},
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
        `${GOOGLE_API}/geocode/json?latlng=${latitude},${longitude}&key=${ApiKey}`,
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
      .get(`${GOOGLE_API}/place/details/json?placeid=${placeid}&key=${ApiKey}`)
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
  fetchPlaces: async (input: string) => {
    try {
      const res: any = await axios.get(
        `${GOOGLE_API}/place/autocomplete/json?input=${input}&key=${ApiKey}&components=country:pk&location=24.8607,67.0011&radius=20000`,
      );

      // Filter results to include only those in Karachi
      const filteredPlaces = res.data?.predictions?.filter((place: any) =>
        place.description.includes('Karachi'),
      );

      if (!filteredPlaces || filteredPlaces.length === 0) {
        console.log('No places found in Karachi for input:', input);
      }

      return filteredPlaces;
    } catch (err: any) {
      console.error(
        'Error fetching places:',
        err.response?.data || err.message,
      );
      Alert.alert('Error fetching places. Please try again later.');
    }
  },

  getDistance: async (
    pickUpLat: string | number,
    pickUpLong: string | number,
    consigneeLat: string | number,
    consigneeLong: string | number,
  ) => {
    const origin = `${pickUpLat},${pickUpLong}`;
    const destination = `${consigneeLat},${consigneeLong}`;
    const url = `${GOOGLE_API}/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${ApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const duration = data.rows[0].elements[0].duration.value; // Duration in seconds
        const durationInMinutes = Math.ceil(duration / 60); // Convert to minutes

        // Get the current local time and add the duration in minutes
        const now = new Date();
        now.setMinutes(now.getMinutes() + durationInMinutes);

        // Format the time in HH:MM AM/PM format
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        const formattedTime = `${String(hours).padStart(
          2,
          '0',
        )}:${minutes} ${ampm}`;
        set({duration: null});
        set({duration: formattedTime});
        return formattedTime;
      } else {
        console.error('Error:', data.error_message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  },
}));
export default useMapStore;
