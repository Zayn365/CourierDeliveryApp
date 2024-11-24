import {create} from 'zustand';
import {ApiKey} from '../../utils/Google_KEY';
import {Alert} from 'react-native';
import axios from 'axios';

const useMapStore = create((set, get) => ({
  places: null,
  destination: {},

  fetchLonLat: async (placeid: any) => {
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
    set({destination: data});
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
