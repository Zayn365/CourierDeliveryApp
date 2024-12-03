import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const apiLink = `http://65.0.45.223:5002/user`;

interface User {
  id: number;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  active: boolean;
  avatar: string | null;
  cnic: string | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
  isOtpVerified: boolean;
  employeeId: string | null;
  gender: string | null;
  licenceNo: string | null;
  licenceExpiry: string | null;
  riderVerification: string | null;
  role: 'user' | 'admin' | 'rider';
  status: 'active' | 'inactive';
  otp: string | null;
  tFaEnabled: boolean | null;
  vehicleRegNo: string | null;
  vehicleType: string | null;
}

interface StoreState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  login: (
    phone: string,
    password: string,
  ) => Promise<false | void | {userId: any; check: boolean}>;
  verify: (userId: string, otp: string) => Promise<boolean>;
  resend: (email: string, type: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
    mobile: string | number,
  ) => Promise<false | {userId: any; check: boolean}>;
  fetchUserData: () => Promise<void>;
  initializeUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: user => set({user}),
      setToken: token => set({token}),
      setLoading: isLoading => set({isLoading}),
      setError: error => set({error}),

      login: async (phone, password) => {
        set({isLoading: true, error: null});
        try {
          const phoneString = phone.toString();
          const response: any = await axios.post(`${apiLink}/login`, {
            mobile: phoneString,
            password,
          });

          if (response?.data?.data) {
            const {user, token} = response.data.data;
            set({user, token});
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
          } else {
            throw new Error('Invalid response from server.');
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.data?.[0]?.msg ||
            'An unexpected error occurred. Please try again.';
          set({error: errorMessage});
          Alert.alert('Error', errorMessage);
          return false;
        } finally {
          set({isLoading: false});
        }
      },

      verify: async (userId, otp) => {
        set({isLoading: true, error: null});
        try {
          await axios.post(`${apiLink}/verify-otp`, {userId, otp});
          return true;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || 'Verification failed.';
          set({error: errorMessage});
          Alert.alert('Error', errorMessage);
          return false;
        } finally {
          set({isLoading: false});
        }
      },

      signup: async (name, email, password, mobile) => {
        set({isLoading: true, error: null});
        try {
          const response: any = await axios.post(`${apiLink}/signup`, {
            name,
            email,
            password,
            mobile,
          });

          const {userId} = response.data.data;
          return {userId, check: true};
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || 'Signup failed.';
          set({error: errorMessage});
          Alert.alert('Error', errorMessage);
          return false;
        } finally {
          set({isLoading: false});
        }
      },

      resend: async (email, type) => {
        try {
          await axios.post(`${apiLink}/resend-otp`, {email, type});
          Alert.alert('OTP sent successfully');
          return true;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || 'Failed to resend OTP.';
          set({error: errorMessage});
          Alert.alert('Error', errorMessage);
          return false;
        }
      },

      fetchUserData: async () => {
        const token = get().token;
        if (!token) return;

        set({isLoading: true});
        try {
          const response: any = await axios.get(apiLink, {
            headers: {Authorization: `Bearer ${token}`},
          });
          set({user: response.data});
        } catch (error: any) {
          set({error: error.message});
        } finally {
          set({isLoading: false});
        }
      },

      initializeUser: async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');

        if (token && user) {
          set({token, user: JSON.parse(user)});
        }
      },

      logout: async () => {
        await AsyncStorage.clear();
        set({user: null, token: null});
      },
    }),
    {
      name: 'user-storage',
      partialize: state => ({user: state.user}),
    },
  ),
);

export default useAuthStore;
