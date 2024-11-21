import {create} from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const apiLink = `http://3.7.46.187:5002/user`;

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
  user: User | Promise<any> | null;
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
  ) =>
    | Promise<void>
    | Promise<false | {userId: any; check: boolean} | undefined>;
  verify: (
    userId: string,
    otp: string,
  ) => Promise<void> | Promise<boolean | undefined>;
  resend: (
    email: string,
    type: string,
  ) => Promise<void> | Promise<boolean | undefined>;
  signup: (
    name: string,
    email: string,
    password: string,
    mobile: string | number,
  ) =>
    | Promise<void>
    | Promise<false | {userId: any; check: boolean} | undefined>;
  fetchUserData: () => Promise<void>;
  initializeUser: () => Promise<void>;
  logout: () => Promise<void>;
}

// @ts-ignore

const useAuthStore = create<StoreState>((set, get) => ({
  user: null,
  token: '',
  isLoading: false,
  error: null,

  setUser: user => set({user}),
  setToken: token => set({token}),
  setLoading: isLoading => set({isLoading}),
  setError: error => set({error}),

  login: async (phone, password) => {
    set({isLoading: true, error: null});
    const phoneString = phone.toString();
    console.log(phoneString, password, 'Check me ');
    try {
      const response = await axios
        .post(`${apiLink}/login`, {
          mobile: phoneString,
          password: password,
        })
        .then(response => {
          return response.data;

          // console.log(response, 'I ran');
          // Alert.alert('OTP verified successfully');
        })
        .catch(err => {
          console.log(err.response.data, 'I ERROR ran');
          Alert.alert(err.response.data.message);
          return;
        });
      const {user, token} = response.data.data;
      console.log(user, token, 'LOOK');
      set({user, token});
      // Alert.alert('User Login Successfully');

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error: any) {
      set({error: error.message, isLoading: false});
      console.log(error.response.data.data[0]);
      const Error = error.response.data.data
        ? error.response.data.data[0]
          ? error.response.data.data[0]?.msg
          : error.response.data.data.error
        : 'Something went wrong';
      Alert.alert('Error', Error);
      return false;
    } finally {
      set({isLoading: false});
    }
  },

  verify: async (userId, otp) => {
    set({isLoading: true, error: null});
    try {
      console.log('verify');
      await axios
        .post(`${apiLink}/verify-otp`, {
          userId,
          otp,
        })
        .then(response => {
          // console.log(response, 'I ran');
          // Alert.alert('OTP verified successfully');
        })
        .catch(err => {
          console.log(err.response.data, 'I ERROR ran');
          Alert.alert(err.response.data.message);
          return;
        });
      return true;
    } catch (error: any) {
      set({error: error.message, isLoading: false});
      const Error = error.response.data.data
        ? error.response.data.data.errors
          ? error.response.data.data.errors[0]?.msg
          : error.response.data.data.error
        : 'Something went wrong';
      Alert.alert('Error', Error);
      return false;
    } finally {
      set({isLoading: false});
    }
  },

  signup: async (name, email, password, mobile) => {
    set({isLoading: true, error: null});

    try {
      const response = await axios
        .post(`${apiLink}/signup`, {
          name,
          email,
          password,
          mobile,
        })
        .then(response => {
          // console.log(response.data.data, 'I ran');
          // Alert.alert('OTP verified successfully');
          return response.data;
        })
        .catch(err => {
          console.log(err.response.data, 'I ERROR ran');
          Alert.alert(err.response.data.message);
          return;
        });
      const {userId} = response?.data;
      return {userId, check: true};
      // Alert.alert('User Created Successfully');
    } catch (error: any) {
      set({error: error.message, isLoading: false});
      console.log(error.response.data.data);
      const Error = error.response.data.data
        ? error.response.data.data.errors
          ? error.response.data.data.errors[0]?.msg
          : error.response.data.data.error
        : 'Something went wrong';
      Alert.alert('Error', Error);
      return false;
    } finally {
      set({isLoading: false});
    }
  },
  resend: async (email, type) => {
    const response = await axios
      .post(`${apiLink}/resend-otp`, {
        email,
        type,
      })
      .then(response => {
        // console.log(response, 'I ran');
        Alert.alert('OTP sent successfully');
      })
      .catch(error => {
        set({error: error.message, isLoading: false});
        console.log(error.response.data.data);
        const Error = error.response.data.data
          ? error.response.data.data.errors
            ? error.response.data.data.errors[0]?.msg
            : error.response.data.data.error
          : 'Something went wrong';
        Alert.alert('Error', Error);
        return false;
      });
  },
  fetchUserData: async () => {
    const token = get().token;
    if (!token) return;

    set({isLoading: true});
    try {
      const response = await axios.get(apiLink, {
        headers: {Authorization: `Bearer ${token}`},
      });
      set({user: response.data});
    } catch (err: any) {
      set({error: err.message});
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
}));

export default useAuthStore;
