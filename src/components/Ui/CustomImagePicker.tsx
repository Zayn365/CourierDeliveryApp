import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import ImageSource from '../../assets/images/icons/add-image.svg';
import CameraIcon from '../../assets/images/icons/camera-icon.svg';
import ImagesIcon from '../../assets/images/icons/images-icon.svg';
import {ImagePicker} from '../../assets/css/main';

type UploadImageProps = {
  addname: string;
};
const UploadDocument: React.FC<UploadImageProps> = ({addname}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const handleSelectFromGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? null);
    }
  };

  const handleOpenCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (result?.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? null);
    }
  };

  return (
    <View style={ImagePicker.container}>
      <Text style={ImagePicker.header}>
        Add {addname} Photo <Text style={ImagePicker.optional}>(Optional)</Text>
      </Text>

      <View style={ImagePicker.imageContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={ImagePicker.image} />
        ) : (
          <ImageSource />
        )}
      </View>

      <View style={ImagePicker.buttonContainer}>
        <TouchableOpacity
          style={ImagePicker.button}
          onPress={handleSelectFromGallery}>
          <ImagesIcon />
          <Text style={ImagePicker.buttonText}>GALLERY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ImagePicker.button} onPress={handleOpenCamera}>
          <CameraIcon />
          <Text style={ImagePicker.buttonText}>CAMERA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadDocument;
