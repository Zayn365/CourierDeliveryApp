import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {homeStyles} from '@assets/css/home';
import CustomText from '@components/Ui/CustomText';
import Icons from '@utils/imagePaths/imagePaths';
import CustomInput from '@components/Ui/CustomInput';
import CustomButton from '@components/Ui/CustomButton';
import useMapStore from '@utils/store/mapStore';

type Props = {
  nextStep: () => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const PickUpAdressForm: React.FC<Props> = ({nextStep, setData}) => {
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
    distance,
  } = data;

  const locationGetter = async () => {
    if (currentAddress) {
      const data = await fetchPlaces(currentAddress);
      setLocations(data);
    }
  };
  useEffect(() => {
    if (currentAddress) {
      locationGetter();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  const handleAddressChange = async (text: string) => {
    if (text) {
      const locationData = await fetchLonLat(text, true); // Fetch lat-long for the typed address
      if (locationData) {
        setCurrentLocation(locationData);
        setCurrentAddress(text); // Update currentAddress dynamically
      }
    }
  };

  const handleSelectLocation = async (location: string, id: string) => {
    // setAddress(location); // Update input value
    setCurrentAddress(location); // Set current address
    setShowDropdown(false); // Hide dropdown
    await fetchLonLat(id, false); // Fetch lat-long and update store
  };

  const SendLocations = () => {
    if (currentLocation && currentAddress) {
      const pickupArea = currentAddress.split(',')[1]?.trim() || '';
      setData((prevData: any) => ({
        ...prevData,
        estDistance: distance || 2,
        pickUpAddress: currentAddress,
        pickUpArea: pickupArea,
        pickUpLong: currentLocation?.longitude,
        pickUpLat: currentLocation?.latitude,
      }));
      nextStep();
    } else {
      Alert.alert('Please complete the address details before proceeding.');
    }
  };

  const combinedSetData = (data: string) => {
    setCurrentAddress(data);
    handleAddressChange(data);
  };

  return (
    <View style={homeStyles.bottomSheetContent}>
      <CustomText style={homeStyles.heading}>Add Pickup Address</CustomText>
      <View style={homeStyles.addressContainer}>
        <Icons.MapIcon style={{position: 'absolute', zIndex: 10, left: 10}} />
        <CustomInput
          value={currentAddress}
          style={{width: '100%', paddingHorizontal: 30}}
          placeholder="Enter your location"
          setValue={combinedSetData}
        />
      </View>

      {showDropdown && locations.length > 0 && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() =>
                  handleSelectLocation(item.description, item.place_id)
                }>
                <Text style={styles.dropdownText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <CustomButton
        disabled={!currentAddress || !locations}
        onPress={SendLocations}
        text="Request a Pick Up"
      />
    </View>
  );
};

export default PickUpAdressForm;

const styles = StyleSheet.create({
  dropdownContainer: {
    maxHeight: 150,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    elevation: 3,
    zIndex: 1,
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
