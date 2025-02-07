import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Alert} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

const apiLink = API_URL;

type Order = {
  id: string;
  updatedAt: string;
  [key: string]: any;
};

type PlaceOrderState = {
  isLoading: boolean;
  price: Record<string, any>;
  error: string | null;
  placeOrderData: Order | null;
  riderId: string;
  setRiderId: (riderId: string) => void;
  canCancel: boolean;
  setCanCancel: (canCancel: boolean) => void;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  setPlaceOrderData: (placeOrderData: Order | null) => void;
  orders: Order[] | null;
  placeOrderApi: (
    packageData: Record<string, any>,
    token: string,
  ) => Promise<boolean>;
  getPricing: (
    values: Record<string, any>,
    token: string,
  ) => Promise<Record<string, any> | undefined>;
  getUserOrders: (token: string) => Promise<Record<string, any> | undefined>;
  updateOrderById: (token: string) => void;
};

const usePlaceOrder = create<PlaceOrderState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      price: {},
      error: null,
      placeOrderData: null,
      riderId: '',
      setRiderId: (riderId: string) => set({riderId}),
      canCancel: true,
      setCanCancel: (canCancel: boolean) => set({canCancel}),
      currentStep: 1,
      setCurrentStep: (currentStep: number) => set({currentStep}),
      setPlaceOrderData: (placeOrderData: Order | null) => {
        set({placeOrderData});
      },
      orders: null,
      placeOrderApi: async (packageData, token) => {
        set({isLoading: true});
        try {
          const formData = new FormData();
          for (const key in packageData) {
            if (Array.isArray(packageData[key])) {
              packageData[key].forEach(item => {
                formData.append(key, item);
              });
            } else {
              formData.append(key, packageData[key]);
            }
          }
          const response: any = await axios.post(
            `${apiLink}/order/place-delivery`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `${token}`,
              },
            },
          );
          set({placeOrderData: response.data.data, isLoading: false});
          return true;
        } catch (error: any) {
          console.log(
            'TCL ~ file: placeOrderStore.ts:82 ~ placeOrderApi: ~ error:',
            error?.response?.data,
          );
          set({error: error.message, isLoading: false});
          const Error = error.response?.data?.data
            ? error.response?.data?.data[0]?.msg ||
              error.response.data.data?.error
            : 'Something went wrong';
          Alert.alert('Error', Error);
          return false;
        }
      },
      getPricing: async (values, token) => {
        set({isLoading: true});
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
            set({isLoading: false});
            return response.data.data;
          }
        } catch (error: any) {
          set({isLoading: false});
          Alert.alert('Error', error.response?.data?.message);
        }
      },
      getUserOrders: async token => {
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
            set({orders: response.data.data?.orders});
            return response.data.data;
          }
        } catch (error: any) {
          // Alert.alert(
          //   'Error :',
          //   error.response?.data?.message || error.message,
          // );
          throw error;
        }
      },
      updateOrderById: async (token: string) => {
        const {getUserOrders, placeOrderData, setPlaceOrderData} = get();
        const order = await getUserOrders(token);
        try {
          if (order) {
            const updatedOrder: any = order?.orders.find(
              (orders: any) => orders.id === placeOrderData?.id,
            );
            if (updatedOrder) {
              setPlaceOrderData(updatedOrder);
            } else {
              set({currentStep: 1});
              // Alert.alert('Error', 'Order not found in the latest data.');
            }
          }
        } catch (error) {
          console.log('TCL ~ updateOrderById: ~ error:', error);
        }
      },
    }),
    {
      name: 'place-order-storage',
      partialize: state => ({
        price: state.price,
      }),
    },
  ),
);

export default usePlaceOrder;
