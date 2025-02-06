import firestore, {onSnapshot, query} from '@react-native-firebase/firestore';

export const riderCollection = firestore().collection('riders_locations');
export const chatCollection = firestore().collection('chats');
export const GetRiderLocation = (
  riderId: string,
  setRiderData: React.Dispatch<any>,
  setHeading: React.Dispatch<number>,
) => {
  riderCollection.where('userId', '==', riderId).onSnapshot(
    (querySnapshot: any) => {
      // Check if querySnapshot is empty
      if (!querySnapshot || querySnapshot.empty) {
        setRiderData(null);
        setHeading(0);
        return;
      }

      // Get the first document
      const documentSnapshot = querySnapshot.docs[0];
      if (documentSnapshot) {
        const data = documentSnapshot.data();
        if (data.lat != null && data.long != null && data.heading != null) {
          setRiderData({
            latitude: data?.lat ? Number(data.lat) : 0,
            longitude: data?.long ? Number(data.long) : 0,
          });
          setHeading(data.heading);
        } else {
          setRiderData(null);
        }
      } else {
        setRiderData(null);
      }
    },
    error => {
      console.error('Error fetching rider location:', error);
      setRiderData(null);
    },
  );
};

export const getChats = (setChats: any, chatId: any) => {
  const q = query(chatCollection);

  const unsubscribe = onSnapshot(q, snapshot => {
    const chatData: any = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    const currentChatData: any = chatData.find(
      (item: any) => item.id === chatId,
    );
    setChats(currentChatData ? currentChatData?.messages : []);
  });

  return () => unsubscribe();
};
