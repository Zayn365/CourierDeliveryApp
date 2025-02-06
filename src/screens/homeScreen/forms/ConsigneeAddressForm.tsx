import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {homeStyles} from '@assets/css/home';
import CustomText from '@components/Ui/CustomText';
import CustomDropdown from '@components/Ui/CustomDropDown';
import Icons from '@utils/imagePaths/imagePaths';
import CustomButton from '@components/Ui/CustomButton';
import CustomInput from '@components/Ui/CustomInput';
import {FlatList} from 'react-native-gesture-handler';
import useMapStore from '@utils/store/mapStore';

type Props = {
  nextStep: () => void;
  dropdown: string;
  setDropdown: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const ConsigneeAddressForm: React.FC<Props> = ({
  nextStep,
  dropdown,
  setDropdown,
  setData,
}) => {
  const [formEnabled, setFormEnabled] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [locations, setLocations] = useState([]);

  const data: any = useMapStore();
  const {
    destinationAddress,
    destination,
    fetchLonLat,
    setDestinationAddress,
    fetchPlaces,
    distance,
  } = data;
  // console.log(destination, currentLocation, 'Check this distance');
  const handleSetForm = () => {
    setFormEnabled(prev => !prev);
  };
  const handleSelectLocation = (location: string) => {
    // setAddress(location); // Set selected location to input
    setDestinationAddress(location);
    setShowDropdown(false); // Hide dropdown after selection
    handleSetForm();
  };
  useEffect(() => {
    if (destinationAddress) {
      locationGetter();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationAddress]);

  const locationGetter = async () => {
    if (destinationAddress) {
      const data = await fetchPlaces(destinationAddress);
      // console.log(data);
      setLocations(data);
    }
  };

  function SendLocations() {
    const destinationarea =
      destinationAddress && destinationAddress.split(',')[1];
    if (destinationAddress) {
      setData((prevData: any) => {
        return {
          ...prevData,
          estDistance: distance ? distance : 15.1,
          consigneeLandmark: destinationarea ? destinationarea : '',
          consigneeAddress: destinationAddress && destinationAddress,
          consigneeLong: destination?.longitude,
          consigneeLat: destination?.latitude,
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
        <CustomText style={homeStyles.heading}>
          Add Recipient’s Address
        </CustomText>
        <CustomDropdown
          data={[
            {label: 'Karachi', value: 'Karachi'},
            // {label: 'Lahore', value: 'Lahore'},
          ]}
          value={dropdown}
          // @ts-ignore
          onSelect={setDropdown}
        />
        {formEnabled ? (
          <>
            <View style={homeStyles.addressContainer}>
              <Icons.MapIcon
                style={{position: 'absolute', zIndex: 10, left: 10}}
              />{' '}
              {/* Inside the text feild */}
              <CustomInput
                value={destinationAddress}
                style={{width: '100%', paddingHorizontal: 30}}
                placeholder="Enter recipient’s address"
                setValue={setDestinationAddress}
                // onChangeText={handleAddressChange} // Dynamic update on change
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
                      onPress={() => {
                        handleSelectLocation(item.description);
                        fetchLonLat(item.place_id, true);
                      }}>
                      <Text style={styles.dropdownText}>
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </>
        ) : (
          <TouchableOpacity onPress={handleSetForm}>
            <View style={homeStyles.addressContainerConsignee}>
              <Icons.MapIcon />
              <CustomText style={homeStyles.addressText}>
                {destinationAddress
                  ? destinationAddress
                  : 'Enter consignee address'}
              </CustomText>
            </View>
          </TouchableOpacity>
        )}

        <CustomButton
          disabled={!destinationAddress}
          text="Next"
          onPress={SendLocations}
        />
      </View>
    </>
  );
};

export default ConsigneeAddressForm;

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
