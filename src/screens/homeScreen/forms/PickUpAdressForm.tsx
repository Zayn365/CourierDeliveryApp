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

type Props = {
  nextStep: () => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const PickUpAdressForm: React.FC<Props> = ({nextStep, setData}) => {
  const [address, setAdress] = useState('');
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const data: any = useMapStore();
  const {
    fetchPlaces,
    fetchLonLat,
    currentAddress,
    setCurrentAddress,
    currentLocation,
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
      // console.log(data);
      setLocations(data);
    }
  };

  const handleSelectLocation = (location: string, id: string) => {
    setAdress(location); // Set selected location to input
    setCurrentAddress(location);
    setShowDropdown(false); // Hide dropdown after selection
  };

  function SendLocations() {
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
  }

  return (
    <>
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
          placeholder="Enter nearest landmark"
          setValue={setAdress}
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
                    fetchLonLat(item.place_id, false);
                  }} // Adjust based on location property
                >
                  <Text style={styles.dropdownText}>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <CustomButton onPress={SendLocations} text="Request a Pick Up" />
      </View>
    </>
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
