import {Alert, Linking, Share} from 'react-native';
import {
  CalculationTypeEnum,
  OrderStatusEnum,
  ParcelTypeEnum,
  PaymentFromEnum,
  PaymentTypeEnum,
} from '../enums/enum';

export function getOrderStatusText(status: number): string {
  switch (status) {
    case OrderStatusEnum.PENDING:
      return 'Pending';
    case OrderStatusEnum.ASSIGNED:
      return 'Assigned';
    case OrderStatusEnum.PICKED_UP:
      return 'Picked Up';
    case OrderStatusEnum.IN_TRANSIT:
      return 'In Transit';
    case OrderStatusEnum.OUT_FOR_DELIVERY:
      return 'Out for Delivery';
    case OrderStatusEnum.DELIVERED:
      return 'Delivered';
    case OrderStatusEnum.RETURNED:
      return 'Returned';
    case OrderStatusEnum.CANCELLED:
      return 'Cancelled';
    case OrderStatusEnum.DISPUTED:
      return 'Disputed';
    default:
      return 'Unknown Status';
  }
}

export function getParcelTypeText(type: number): string {
  switch (type) {
    case ParcelTypeEnum.PARCEL:
      return 'Parcel';
    case ParcelTypeEnum.DOCUMENT:
      return 'Document';
    default:
      return 'Unknown Type';
  }
}

export function getCalculationTypeText(type: number): string {
  switch (type) {
    case CalculationTypeEnum.WEIGHT_BASED:
      return 'Weight Based';
    case CalculationTypeEnum.DISTANCE_BASED:
      return 'Distance Based';
    case CalculationTypeEnum.WEIGHT_AND_DISTANCE_BASED:
      return 'Weight and Distance Based';
    default:
      return 'Unknown Calculation Type';
  }
}

export function getPaymentTypeText(type: number): string {
  switch (type) {
    case PaymentTypeEnum.CASH:
      return 'Cash';
    case PaymentTypeEnum.DIGITAL_PAYMENT:
      return 'Digital Payment';
    case PaymentTypeEnum.WALLET:
      return 'Wallet';
    default:
      return 'Unknown Payment Type';
  }
}

export function getPaymentFromText(from: number): string {
  switch (from) {
    case PaymentFromEnum.SENDER:
      return 'Sender';
    case PaymentFromEnum.CONSIGNEE:
      return 'Consignee';
    default:
      return 'Unknown Payment From';
  }
}

export const OrderIdSpliter = (order_id: string) => {
  const orderId = order_id;
  const splitId = orderId?.split('-')[0];
  return `TCSN${splitId}`;
};

export const onShare = async (message: string) => {
  try {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const supported = await Linking.canOpenURL(whatsappUrl);

    if (supported) {
      await Linking.openURL(whatsappUrl);
    } else {
      Alert.alert('Error', 'WhatsApp is not installed on this device.');
    }
  } catch (error: any) {
    Alert.alert('Error', error.message);
  }
};
