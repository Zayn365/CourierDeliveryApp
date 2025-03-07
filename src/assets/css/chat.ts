import {StyleSheet} from 'react-native';

export const chat = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    padding: 10,
  },
  messageContainerUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#EEF3FB',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageContainerAgent: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  labelText: {
    fontSize: 13,
    color: '#ED1C24',
    marginBottom: 10,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  dateHeader: {
    fontSize: 14,
    color: '#465061',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: '#d0f0fd',
    paddingVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    paddingHorizontal: 10,
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
    marginHorizontal: 10,
  },
  iconButton: {
    padding: 10,
  },
});
