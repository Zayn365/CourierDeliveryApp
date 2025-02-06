import React, {useState, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import CustomText from '@components/Ui/CustomText';
import MileStoneTracking from '@components/Ui/MileStoneTracking';
import Icons from '@utils/imagePaths/imagePaths';
import Order from '@assets/css/orderList';
import usePlaceOrder from '@utils/store/placeOrderStore';
import useMapStore from '@utils/store/mapStore';
import {
  getOrderStatusText,
  OrderIdSpliter,
} from '@utils/helper/helperFunctions';
import {useNavigation} from '@react-navigation/native';
import useAuthStore from '@utils/store/authStore';

const OrderList = () => {
  const data = usePlaceOrder();
  const map: any = useMapStore();
  const {token}: any = useAuthStore();
  const navigation: any = useNavigation();
  const {setCurrentLocation, setDestination} = map;
  const {
    orders,
    setCanCancel,
    setPlaceOrderData,
    setCurrentStep,
    setRiderId,
    getUserOrders,
  }: any = data;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getUserOrders(token);
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh orders.');
    }
    setRefreshing(false);
  }, [getUserOrders, token]);

  const placeMyOrder = async (orderData: any) => {
    try {
      await navigation.setParams({stepToGo: 6});
      const currentLocation = {
        latitude: Number(orderData?.pickUpLat),
        longitude: Number(orderData?.pickUpLong),
      };
      const destinationAddress = {
        latitude: Number(orderData?.consigneeLat),
        longitude: Number(orderData?.consigneeLong),
      };

      setCurrentLocation(currentLocation);
      setDestination(destinationAddress);
      setPlaceOrderData(orderData);
      setRiderId(orderData?.assignRiderId);
      await setCanCancel(false);
      setCurrentStep(6);
      await navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const filteredOrders = orders?.filter((val: any) => {
    return (
      val.orderStatus < 6 || val.orderStatus === 10 || val.orderStatus !== 6
    );
  });

  const renderItem = ({item}: {item: any}) => {
    const orderProgress = getOrderStatusText(item.orderStatus);
    const orderNumber = OrderIdSpliter(item.id);

    return (
      <TouchableOpacity onPress={() => placeMyOrder(item)}>
        <View style={Order.card}>
          <View style={Order.row}>
            <Icons.RedBox />
            <View style={Order.iconSpacing}>
              {/* Upper Status */}
              <CustomText isBold style={Order.statusText}>
                {orderProgress}
              </CustomText>
              {/* Name of the customer */}
              <CustomText isBold style={Order.customerName}>
                {item.consigneeName}
              </CustomText>
              {/* OrderId Text */}
              <CustomText style={Order.orderIdText}>{orderNumber}</CustomText>
            </View>
          </View>
          <View>
            <MileStoneTracking status={item.orderStatus} colorless={true} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Order.container}>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={{padding: 20, alignItems: 'center'}}>
            <CustomText>No orders found</CustomText>
          </View>
        )}
      />
    </View>
  );
};

export default OrderList;
