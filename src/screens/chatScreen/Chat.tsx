import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {pick, DocumentPickerResponse} from 'react-native-document-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Svg, {Path} from 'react-native-svg';
import Icons from '../../utils/imagePaths/imagePaths';

const audioRecorderPlayer = new AudioRecorderPlayer();

interface Message {
  type: 'text' | 'image' | 'document' | 'audio';
  content: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordingPath, setRecordingPath] = useState<string>('');

  const sendMessage = () => {
    if (message.trim() === '') return;

    setMessages([...messages, {type: 'text', content: message}]);
    setMessage('');
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets.length > 0) {
      const imageUri = (result.assets[0] as Asset).uri!;
      setMessages([...messages, {type: 'image', content: imageUri}]);
    }
  };

  const pickDocument = async () => {
    try {
      // const result = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.allFiles],
      // });
      const [result] = await pick({
        mode: 'open',
      });
      console.log(result);
      // const documentUri = (result[0] as DocumentPickerResponse).uri;
      // setMessages([...messages, {type: 'document', content: documentUri}]);
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   Alert.alert('Cancelled', 'Document picker was cancelled.');
      // } else {
      console.log(err);
      Alert.alert('Error', 'An unknown error occurred.');
      // }
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
      setMessages([...messages, {type: 'audio', content: recordingPath}]);
      setRecordingPath('');
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording.');
    }
  };

  const renderMessage = ({item}: {item: Message}) => {
    switch (item.type) {
      case 'text':
        return <Text style={styles.textMessage}>{item.content}</Text>;
      case 'image':
        return (
          <Image
            source={{uri: item.content}}
            style={styles.imageMessage}
            resizeMode="contain"
          />
        );
      case 'document':
        return (
          <Text style={styles.documentMessage}>
            Document: {item.content.split('/').pop()}
          </Text>
        );
      case 'audio':
        return (
          <Text style={styles.audioMessage}>
            Audio: {item.content.split('/').pop()}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
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
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    backgroundColor: '#fff',
  },
  messageList: {
    padding: 10,
  },
  textMessage: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  documentMessage: {
    color: '#007BFF',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  audioMessage: {
    color: '#007BFF',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
});

export default Chat;
