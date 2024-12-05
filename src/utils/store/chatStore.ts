import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for the store
interface Chat {
  id: string;
  name?: string;
  createdAt?: string;
}

interface Message {
  id: string;
  chatId: string;
  sender: string;
  content: string;
  type: string;
  file?: string;
  createdAt?: string;
}

interface ChatStore {
  token: string | null;
  chats: Chat[];
  currentChatId: string | null;
  messages: Record<string, Message[]>;
  setToken: (token: string) => void;
  createChatRoom: (message: string, token: string) => Promise<void>;
  sendMessageApi: (
    content: string,
    type: string,
    token: string | null,
    file?: File,
  ) => Promise<void>;
  setCurrentChatId: (chatId: string) => void;
  intializeChatID: () => void;
  getChatByID: (token: string) => void;
}

const BASE_URL = 'http://65.0.45.223:5002/user';

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      token: null,
      chats: [],
      currentChatId: null,
      messages: {},

      // Set the token
      setToken: (token: string) => set({token}),

      // Set the current chat room ID
      setCurrentChatId: (chatId: string) => set({currentChatId: chatId}),

      // Create a chat room
      createChatRoom: async (message: string, token: string) => {
        try {
          const response: any = await axios.post(
            `${BASE_URL}/chats/create-chat`,
            {message},
            {
              headers: {
                Authorization: token,
              },
            },
          );

          const newChat: Chat | any = response.data?.data?.chatId;
          console.log(newChat);
          await AsyncStorage.setItem('chatId', newChat);
          set({currentChatId: newChat});
        } catch (error: any) {
          console.error(
            'Error creating chat room:',
            error?.response.data?.data?.messages,
          );
          Alert.alert('Error', 'Failed to create chat room');
        }
      },

      // Send a message
      sendMessageApi: async (
        content: string,
        type: string,
        token: string | null,
        file?: File,
      ) => {
        const chatId = get().currentChatId;
        try {
          const formData = new FormData();
          formData.append('chatId', chatId as string);
          formData.append('sender', 'user');
          formData.append('content', content);
          formData.append('type', type);

          if (file) {
            formData.append('file', file);
          }
          //   console.log(formData, 'Check');
          const response: any = await axios.post(
            `${BASE_URL}/chats/send-message`,
            formData,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          const newMessage: Message | any = response.data?.data?.messages;
          set({chats: newMessage});
        } catch (error: any) {
          console.error('Error sending message:', error?.response?.data?.data);
          Alert.alert('Error', 'Failed to send message');
        }
      },
      intializeChatID: async () => {
        const chatID = await AsyncStorage.getItem('chatId');
        console.log('🚀 ~ intializeChatID: ~ chatID:', chatID);

        set({currentChatId: chatID});
      },
      getChatByID: async (token: string) => {
        const chatID = await AsyncStorage.getItem('chatID');
        const response: any = await axios.get(
          `${BASE_URL}/chats/get-chat/${chatID}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        const res = response.data.data.messages;
        console.log('🚀 ~ getChatByID: ~ res:', res);

        set({chatyos: res});
      },
    }),
    {
      name: 'chat-store', // Name of the storage key
      partialize: (state: any) => ({
        currentChatId: state.currentChatId,
      }), // Use AsyncStorage for React Native
    },
  ),
);

export default useChatStore;
