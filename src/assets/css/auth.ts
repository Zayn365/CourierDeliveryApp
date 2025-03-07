import {StyleSheet} from 'react-native';

export const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
  heightOfScreen: {
    marginTop: 30,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    // paddingHorizontal: 10,
    marginBottom: 0,
    color: '#465061',
    // fontFamily: 'Outfit-Regular',
  },
  subHeader: {
    fontSize: 17,
    color: '#737B85',
    fontWeight: '400',
    paddingHorizontal: 10,
    marginBottom: 50,
    textAlign: 'center',
    marginTop: -10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#666',
    marginVertical: 10,
  },
  signUpText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#666',
  },
  signUpLink: {
    color: '#ED1C24',
    fontWeight: 'bold',
  },
  subStyleHead: {
    flexShrink: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
export const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    fontFamily: 'Outfit-Regular',
  },

  heightOfScreen: {
    marginTop: 10,
  },
  header: {
    fontSize: 28,
    paddingHorizontal: 10,
    marginBottom: 0,
    color: '#465061',
    // fontFamily: 'Outfit-Regular',
  },
  subHeader: {
    fontSize: 17,
    color: '#737B85',
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // marginBottom: 10,
    justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#666',
    marginVertical: 10,
  },
  signUpText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#666',
  },
  signUpLink: {
    color: '#ED1C24',
    fontWeight: 'bold',
  },
  subStyleHead: {
    // flexShrink: 1,
    // flexDirection: 'row',
    // marginBottom: 10,
    // justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
});
export const verifyStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    fontFamily: 'Outfit-Regular',
  },
  subStyleHead: {
    flexShrink: 1,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    // paddingHorizontal: 10,
    marginBottom: 10,
    color: '#465061',
  },
  subHeader: {
    fontSize: 17,
    color: '#737B85',
    fontWeight: '400',
    paddingHorizontal: 10,
    marginBottom: 40,
    marginRight: 60,
  },
  timer: {
    marginTop: -30,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '600',
    color: '#737B85',
    textAlign: 'center',
  },
  resendCode: {
    marginBottom: 20,
    fontSize: 16,
    // fontWeight: '700',
    fontFamily: 'Outfit-Bold',
    color: '#ED1C24',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  resendCodeDisable: {
    marginBottom: 20,
    fontSize: 16,
    // fontWeight: '700',
    fontFamily: 'Outfit-Bold',
    color: '#737B85',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  containerDigits: {
    // paddingHorizontal: 40,
  },
  pinCodeContainer: {
    height: 60,
    margin: 0,
    width: '16%',
  },
  pinCodeText: {},
  focusStick: {},
  activePinCodeContainer: {},
});
