import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList, Image, Alert} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import CustomText from '@components/Ui/CustomText';
import CustomInput from '@components/Ui/CustomInput';
import moment from 'moment';
import {pick} from 'react-native-document-picker';
import Icons from '@utils/imagePaths/imagePaths';
import {chat} from '@assets/css/chat';
import useChatStore from '@utils/store/chatStore';
import useAuthStore from '@utils/store/authStore';
import {getChats} from '@utils/store/fireStore/firebaseStore';

// const audioRecorderPlayer = new AudioRecorderPlayer();

interface Message {
  type: 'text' | 'image' | 'file' | 'audio';
  content: any;
  sender: 'user' | 'agent';
  timestamp: string;
  link?: string | null;
}
const date = new Date().toISOString();
const Chat: React.FC = () => {
  const chatData: any = useChatStore();
  const {getChatByID, currentChatId, sendMessageApi, chats, setChats} =
    chatData;
  const {token} = useAuthStore();
  const [message, setMessage] = useState<string>('');
  // const [recordingPath, setRecordingPath] = useState<any>(null);
  // const [recording, setRecording] = useState<boolean>(false);
  // const [chats, setChats] = useState<Message[]>(chats);
  useEffect(() => {
    if (currentChatId) {
      getChatByID(token, currentChatId);
      getChats(setChats, currentChatId);
    }
  }, [currentChatId, getChatByID, setChats, token]);
  const sendMessage = async () => {
    if (message.trim() === '') return;
    const newMessage: Message = {
      type: 'text',
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    await sendMessageApi(newMessage.content, newMessage.type, token, undefined);
    setChats([...chats, newMessage]);
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
      const allowedTypes = ['image/jpeg', 'image/png'];
      const imageUri = (result.assets[0] as Asset).uri!;
      const imageAsset = result.assets[0]; // Get the first selected asset
      if (!allowedTypes.includes(imageAsset.type as string)) {
        Alert.alert(
          'Invalid File',
          'Please select an image in jpg or png format.',
        );
        return;
      }
      const imageFile = {
        uri: imageAsset.uri,
        name: imageAsset.fileName || 'unknown.jpg', // Ensure there's a default name
        type: imageAsset.type || 'image/jpeg', // Provide a default MIME type
      };

      // Call the API with the formatted file object
      await sendMessageApi('image', 'image', token, imageFile);

      setChats([
        ...chats,
        {type: 'image', content: imageUri, sender: 'user', timestamp: date},
      ]);
    }
  };

  const pickDocument = async () => {
    try {
      const [result] = await pick({
        mode: 'open',
      });
      const File = {
        uri: result.uri,
        name: result.name || 'unknown.jpg',
        type: result.type || 'image/jpeg',
      };
      await sendMessageApi(result.name, 'file', token, File);
      setChats([
        ...chats,
        {
          type: 'file',
          content: result.name,
          sender: 'user',
          timestamp: date,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  // const startRecording = async () => {
  //   try {
  //     const result = await audioRecorderPlayer.startRecorder();
  //     setRecording(true);
  //     setRecordingPath(result);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to start recording.');
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     const result = await audioRecorderPlayer.stopRecorder();
  //     setRecording(false);
  //     setChats([
  //       ...chats,
  //       {
  //         type: 'audio',
  //         content: recordingPath,
  //         sender: 'user',
  //         timestamp: date,
  //       },
  //     ]);
  //     setRecordingPath('');
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to stop recording.');
  //   }
  // };
  // console.log('CHAT', chats);
  const renderMessage = ({item, index}: {item: Message; index: number}) => {
    console.log(
      '🚀 ~ renderMessage ~ item:',
      item.content.includes('png', 'jpg', 'jpeg'),
    );
    const showDateHeader =
      index === 0 ||
      !moment(chats[index - 1].timestamp).isSame(item.timestamp, 'day');
    return (
      <View>
        {showDateHeader && (
          <View>
            <CustomText style={chat.dateHeader}>
              {renderDateHeader(item.timestamp)}
            </CustomText>
          </View>
        )}
        {item.content !== 'Chat Intialized' && (
          <View
            style={[
              item.sender === 'user'
                ? chat.messageContainerUser
                : chat.messageContainerAgent,
            ]}>
            {item.sender !== 'user' && (
              <>
                {' '}
                <CustomText style={chat.labelText}>
                  Customer Support Agent
                </CustomText>
                <CustomText style={chat.messageText}>{item.content}</CustomText>
              </>
            )}

            {item.type === 'text' && (
              <CustomText style={chat.messageText}>{item.content}</CustomText>
            )}
            {item.type === 'image' && (
              <Image
                source={{
                  uri: item.link
                    ? `http://65.1.125.173:5002/${item?.link}`
                    : item.content,
                }}
                style={chat.messageImage}
                resizeMode="contain"
              />
            )}
            {item.type === 'file' && (
              <>
                <Image
                  source={
                    item.content.includes('png', 'jpg', 'jpeg')
                      ? {uri: `http://65.1.125.173:5002/${item?.link}`}
                      : Icons.file
                  }
                  style={{width: 100, height: 100}}
                  resizeMode="contain"
                />
                <CustomText>{item?.content}</CustomText>
              </>
            )}
            <CustomText style={chat.timestamp}>
              {moment(item.timestamp).format('hh:mm A')}
            </CustomText>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={chat.container}>
      <FlatList
        data={chats}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={chat.messageList}
      />
      <View style={chat.inputContainer}>
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
          }}
          onPress={pickImage}>
          <Icons.ChatCamera width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
          }}
          onPress={pickDocument}>
          <Icons.PinChat width={20} height={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
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
        </TouchableOpacity> */}
        <View style={chat.input}>
          <CustomInput
            placeholder="Type a message"
            value={message}
            setValue={setMessage}
          />
        </View>
        <TouchableOpacity onPress={sendMessage}>
          <Icons.Send width={45} height={45} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
