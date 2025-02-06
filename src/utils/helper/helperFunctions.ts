import {Alert, Share} from 'react-native';
import {
  CalculationTypeEnum,
  OrderStatusEnum,
  ParcelTypeEnum,
  PaymentFromEnum,
  PaymentTypeEnum,
} from '../enums/enum';
import {Dimensions} from 'react-native';
export const {height, width} = Dimensions.get('window');

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
    case OrderStatusEnum.OUT_FOR_PICKUP:
      return 'Out For Pickup';
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
      return 'Cash On Pickup';
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
  return `TCSN-${order_id.toString().padStart(5, '0')}`;
};

export const onShare = async (message: string) => {
  try {
    const result = await Share.share({
      message: message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Specific activity was used (e.g., WhatsApp, etc.)
        console.log('Shared with activity:', result.activityType);
      } else {
        // Shared successfully
        console.log('Content shared successfully!');
      }
    } else if (result.action === Share.dismissedAction) {
      // Sharing was dismissed
      console.log('Share dismissed');
    }
  } catch (error: any) {
    Alert.alert('Error', 'Unable to share the message. Please try again.');
    console.error('Error sharing content:', error.message);
  }
};
const formatWithCommas = (value: number | string) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const handleChange = (
  text: string,
  setValue: React.Dispatch<React.SetStateAction<any>>,
) => {
  const numericValue = text.replace(/,/g, ''); // Remove commas for pure numeric parsing
  setValue(formatWithCommas(numericValue));
};

export const AddCommas = (text: string | number) => {
  const TEXT = text.toString();
  const numericValue = TEXT.replace(/,/g, '');
  return formatWithCommas(numericValue);
};
