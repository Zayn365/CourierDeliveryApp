import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  Alert,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import CustomText from '../../components/Ui/CustomText';
import CustomInput from '../../components/Ui/CustomInput';
import moment from 'moment';
import {DocumentPickerResponse, pick} from 'react-native-document-picker';
import Icons from '../../utils/imagePaths/imagePaths';
import Svg, {Path} from 'react-native-svg';
import {chat} from '../../assets/css/chat';
import useChatStore from '../../utils/store/chatStore';
import useAuthStore from '../../utils/store/authStore';

const audioRecorderPlayer = new AudioRecorderPlayer();

interface Message {
  type: 'text' | 'image' | 'file' | 'audio';
  content: any;
  by: 'user' | 'agent';
  timestamp: string;
}
const date = new Date().toISOString();
const Chat: React.FC = () => {
  const chatData: any = useChatStore();
  const {currentChatId, getChatByID, sendMessageApi, chats} = chatData;
  const {token} = useAuthStore();
  const [message, setMessage] = useState<string>('');
  const [recordingPath, setRecordingPath] = useState<any>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'text',
      content: 'How Can I Help You?',
      by: 'agent',
      timestamp: new Date().toISOString(),
    },
  ]);
  useEffect(() => {
    getChatByID(token);
  }, []);
  const sendMessage = async () => {
    getChatByID(token);
    if (message.trim() === '') return;
    const newMessage: Message = {
      type: 'text',
      content: message,
      by: 'user',
      timestamp: new Date().toISOString(),
    };
    console.log(
      newMessage.type,
      newMessage.content,
      newMessage.by,
      token,
      'DEKH',
    );
    await sendMessageApi(newMessage.content, newMessage.type, token, undefined);
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const renderDateHeader = (timestamp: string) => {
    const date = moment(timestamp).startOf('day');
    const now = moment().startOf('day');
    const diffDays = now.diff(date, 'days');

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return moment(timestamp).format('MMMM DD, YYYY');
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets.length > 0) {
      const imageUri = (result.assets[0] as Asset).uri!;
      await sendMessageApi(undefined, 'image', token, imageUri);
      setMessages([
        ...messages,
        {type: 'image', content: imageUri, by: 'user', timestamp: date},
      ]);
    }
  };

  const pickDocument = async () => {
    try {
      const [result] = await pick({
        mode: 'open',
      });
      const documentUri = (result as DocumentPickerResponse).uri;
      const documentName = result.name || 'Unknown File';
      const documentType = result.type || 'application/octet-stream'; // Default MIME type

      // Call your API to send the file
      await sendMessageApi(undefined, 'file', token, result);
      console.log('🚀 ~ pickDocument ~ result:', result);

      setMessages([
        ...messages,
        {
          type: 'file',
          content: {name: result.name, type: result.type},
          by: 'user',
          timestamp: date,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setRecording(true);
      setRecordingPath(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording.');
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setRecording(false);
      setMessages([
        ...messages,
        {type: 'audio', content: recordingPath, by: 'user', timestamp: date},
      ]);
      setRecordingPath('');
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording.');
    }
  };

  const renderMessage = ({item, index}: {item: Message; index: number}) => {
    const showDateHeader =
      index === 0 ||
      !moment(messages[index - 1].timestamp).isSame(item.timestamp, 'day');

    return (
      <View>
        {showDateHeader && (
          <View>
            <CustomText style={chat.dateHeader}>
              {renderDateHeader(item.timestamp)}
            </CustomText>
          </View>
        )}
        <View
          style={[
            item.by === 'user'
              ? chat.messageContainerUser
              : chat.messageContainerAgent,
          ]}>
          {item.type === 'text' && (
            <CustomText style={chat.messageText}>{item.content}</CustomText>
          )}
          {item.type === 'image' && (
            <Image
              source={{uri: item.content}}
              style={chat.messageImage}
              resizeMode="contain"
            />
          )}
          {item.type === 'file' && (
            <>
              <Image
                source={Icons.file}
                style={{width: 100, height: 100}}
                resizeMode="contain"
              />
              <CustomText>{item?.content?.name}</CustomText>
            </>
          )}
          <Text style={chat.timestamp}>
            {moment(item.timestamp).format('hh:mm A')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={chat.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={chat.messageList}
      />
      <View style={chat.inputContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            paddingVertical: 1,
            paddingHorizontal: 2,
            borderRadius: 4,
          }}
          onPress={pickImage}>
          <Icons.CameraIcon width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDocument}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 2H8C6.89 2 6 2.89 6 4V20C6 21.11 6.89 22 8 22H16L22 16V4C22 2.89 21.11 2 20 2ZM13 13H11V7H13V13ZM13 17H11V15H13V17Z"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d={
                recording
                  ? 'M8 5H16V19H8V5Z' // Stop Icon
                  : 'M12 2C10.89 2 10 2.89 10 4V14C10 15.11 10.89 16 12 16C13.11 16 14 15.11 14 14V4C14 2.89 13.11 2 12 2ZM18 7V14C18 16.97 15.97 19 13 19H11C8.03 19 6 16.97 6 14V7H8V14C8 15.66 9.34 17 11 17H13C14.66 17 16 15.66 16 14V7H18Z' // Microphone Icon
              }
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
        <View style={chat.input}>
          <CustomInput
            placeholder="Type a message"
            value={message}
            setValue={setMessage}
          />
        </View>
        <TouchableOpacity onPress={sendMessage}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3.4 20.29L5 12.76L3.4 5.24C3.17 4.19 4.1 3.38 5.07 3.77L21.07 10.27C22.05 10.66 22.05 11.9 21.07 12.29L5.07 18.79C4.1 19.18 3.17 18.37 3.4 17.32Z"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
