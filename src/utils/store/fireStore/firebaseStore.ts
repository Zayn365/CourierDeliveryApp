import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';

export const riderCollection = firestore().collection('riders_locations');

export const GetRiderLocaton = (
  riderId: string,
  setRiderData: React.Dispatch<any>,
) => {
  riderCollection.where('userId', '==', riderId).onSnapshot(querySnapshot => {
    if (!querySnapshot.empty) {
      const documentSnapshot = querySnapshot.docs[0];
      const data = documentSnapshot.data();
      if (data.lat != null && data.long != null) {
        setRiderData({
          latitude: Number(data.lat),
          longitude: Number(data.long),
        });
      } else {
        console.log('Lat/Long not available in the document.');
        setRiderData(null);
      }
    } else {
      console.log('No data found for the specified riderId.');
      setRiderData(null);
    }
  });
};
