import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export const customInput = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  focusedInput: {
    borderWidth: 1,
    borderColor: '#ED1C24',
  },
  unFocusedInput: {
    borderColor: '#E9F1FF',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 19,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    color: 'black',
  },
});

export const customButtons = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
    borderRadius: 20,
    overflow: 'hidden',
    // shadowColor: 'red',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,

    // elevation: 24,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
});

export const customDropDown = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    borderColor: '#E9F1FF',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 18,
    color: '#E9F1FF',
  },
  icon: {
    marginRight: 5,
  },
  // label: {
  //   position: 'absolute',
  //   backgroundColor: 'white',
  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
    color: '#737B85',
  },
  selectedTextStyle: {
    color: '#737B85',
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export const customSmallBtn = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
  },
  active: {
    backgroundColor: '#ED1C24', // Red color for active
    borderColor: '#ECF3FF',
  },
  inactive: {
    backgroundColor: '#fff', // White background for inactive
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Outfit-Regular',
  },
  activeText: {
    color: '#fff', // White text for active
  },
  inactiveText: {
    color: '#555', // Gray text for inactive
  },
});

export const HeaderStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it overlays the map
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10, // For devices with a notch
    // backgroundColor: 'transparent', // Transparent background
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
});

export const ImagePicker = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    borderStyle: 'dashed',
    paddingVertical: 20,
    marginTop: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    marginLeft: -40,
    color: '#465061',
  },
  optional: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    // backgroundColor: '#F7F7F7',
  },
  imageContainerArray: {
    width: 80,
    height: 80,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    // backgroundColor: '#F7F7F7',
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    tintColor: '#C4C4C4',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#465061',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 5,
    fontFamily: 'Outfit-Bold',
  },
});
