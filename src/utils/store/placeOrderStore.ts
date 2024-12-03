import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {ApiKey} from '../../utils/Google_KEY';
import {Alert} from 'react-native';
import axios from 'axios';

const apiLink = `http://65.0.45.223:5002/user`;

const usePlaceOrder = create(
  persist(
    (set, get) => ({
      isLoading: false,
      price: {},
      error: null,
      placeOrderData: null,
      riderId: '',
      setRiderId: (riderId: any) => set({riderId}),
      currentStep: 1,
      setCurrentStep: (currentStep: any) => set({currentStep}),
      setPlaceOrderData: (placeOrderData: any) => {
        set({placeOrderData});
      },
      orders: null,
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
              // console.log(response.data);
              return response.data;
            })
            .catch(error => {
              console.log(error.response?.data);
              Alert.alert('Error', error.response?.data?.message);
              throw error;
            });
          set({placeOrderData: response.data, isLoading: false});
          set({isLoading: false});
          return true;
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
      getUserOrders: async (token: string) => {
        try {
          const response: any = await axios.get(
            `${apiLink}/order/get-users-order`,
            {
              headers: {
                authorization: `${token}`,
              },
            },
          );
          if (response.data.success) {
            // console.log(response.data.data);
            set({orders: response.data.data?.orders});
            return response.data.data;
          }
        } catch (error: any) {
          console.log(error.response?.data);
          Alert.alert(
            'Error :',
            error.response?.data?.message
              ? error.response?.data?.message
              : error.message,
          );
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
