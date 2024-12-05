import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {homeStyles} from '../../../assets/css/home';
import CustomText from '../../../components/Ui/CustomText';
import Icons from '../../../utils/imagePaths/imagePaths';
import CustomInput from '../../../components/Ui/CustomInput';
import CustomButton from '../../../components/Ui/CustomButton';
import useMapStore from '../../../utils/store/mapStore';
import {TextInput} from 'react-native-gesture-handler';

type Props = {
  nextStep: () => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const PickUpAdressForm: React.FC<Props> = ({nextStep, setData}) => {
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const data: any = useMapStore();
  const {
    fetchPlaces,
    fetchLonLat,
    currentAddress,
    setCurrentAddress,
    currentLocation,
    setCurrentLocation,
    destination,
    distance,
  } = data;

  useEffect(() => {
    if (address) {
      locationGetter();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [address]);

  const locationGetter = async () => {
    if (address) {
      const data = await fetchPlaces(address);
      setLocations(data);
    }
  };

  const handleAddressChange = async (text: string) => {
    setAddress(text);
    const locationData = await fetchLonLat(text, true); // Fetch lat-long for the typed address
    if (locationData) {
      setCurrentLocation(locationData);
      setCurrentAddress(text); // Update currentAddress dynamically
    }
  };

  const handleSelectLocation = async (location: string, id: string) => {
    setAddress(location); // Update input value
    setCurrentAddress(location); // Set current address
    setShowDropdown(false); // Hide dropdown
    await fetchLonLat(id, false); // Fetch lat-long and update store
  };

  const SendLocations = () => {
    const pickuparea = currentAddress.split(',')[1];
    if (currentLocation && destination) {
      setData((prevData: any) => {
        return {
          ...prevData,
          estDistance: distance,
          pickUpAddress: currentAddress,
          pickUpArea: pickuparea ? pickuparea : '',
          pickUpLong: currentLocation?.longitude,
          pickUpLat: currentLocation?.latitude,
        };
      });
      nextStep();
    } else {
      Alert.alert('Something is missing! Select both Addresses');
    }
  };
  const combinedSetData = (data: any) => {
    setAddress(data);
    handleAddressChange(data);
  };

  return (
    <View style={homeStyles.bottomSheetContent}>
      <CustomText style={homeStyles.heading}>Pick Up Address</CustomText>
      <View style={homeStyles.addressContainer}>
        <Icons.MapIcon />
        <CustomText style={homeStyles.addressText}>
          {currentAddress
            ? currentAddress
            : 'L7, Zafa Street, Block 21, F.B. Area, Karachi.'}
        </CustomText>
      </View>
      <CustomInput
        value={address}
        style={{width: '100%'}}
        placeholder="Enter Exact Location"
        setValue={combinedSetData}
        // onChangeText={handleAddressChange} // Dynamic update on change
      />
      {/* Scrollable Dropdown */}
      {showDropdown && locations.length > 0 && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  handleSelectLocation(item.description, item.place_id);
                }}>
                <Text style={styles.dropdownText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <CustomButton onPress={SendLocations} text="Request a Pick Up" />
    </View>
  );
};

export default PickUpAdressForm;

const styles = StyleSheet.create({
  dropdownContainer: {
    maxHeight: 150, // Limit dropdown height for scrollability
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    elevation: 3, // Add shadow for better visibility
    zIndex: 1, // Ensure dropdown appears above other elements
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
});
