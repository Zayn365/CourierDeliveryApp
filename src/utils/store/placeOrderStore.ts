import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {ApiKey} from '../../utils/Google_KEY';
import {Alert} from 'react-native';
import axios from 'axios';

const apiLink = `http://3.7.46.187:5002/user`;

const usePlaceOrder = create(
  persist(
    (set, get) => ({
      isLoading: false,
      price: {},
      error: null,
      placeOrderData: null,
      placeOrderApi: async (packageData: any, token: string) => {
        set({isLoading: true});
        try {
          // Convert packageData to FormData
          const formData = new FormData();
          for (const key in packageData) {
            if (Array.isArray(packageData[key])) {
              packageData[key].forEach((item: any) => {
                formData.append(key, item);
              });
            } else {
              formData.append(key, packageData[key]);
            }
          }
          console.log(formData, 'Check this');
          const response: any = await axios
            .post(`${apiLink}/order/place-delivery`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `${token}`,
              },
            })
            .then(response => {
              console.log(response.data);
              return response.data;
            })
            .catch(error => {
              console.log(error.response?.data);
              Alert.alert('Error', error.response?.data?.message);
              throw error;
            });
          set({placeOrderData: response.data, isLoading: false});
          set({isLoading: false});
        } catch (error: any) {
          set({error: error.message, isLoading: false});
          console.log(error.response?.data?.data[0]);
          const Error = error.response?.data?.data
            ? error.response?.data?.data[0]
              ? error.response.data.data[0]?.msg
              : error.response?.data?.data?.error
            : 'Something went wrong';
          Alert.alert('Error', Error);
          return false;
        }
      },
      getPricing: async (values: any, token: any) => {
        try {
          const response: any = await axios.post(
            `${apiLink}/order/get-pricing`,
            values,
            {
              headers: {
                authorization: `${token}`,
              },
            },
          );
          if (response.data.success) {
            set({price: response.data.data});
            return response.data.data;
          }
        } catch (error: any) {
          console.log(error.response?.data);
          Alert.alert('Error', error.response?.data?.message);
          throw error;
        }
      },
    }),
    {
      name: 'place-order-storage',
      partialize: (state: any) => ({
        price: state.price,
      }),
    },
  ),
);

export default usePlaceOrder;
