import React, {useEffect, useState} from 'react';
import PickUpAdressForm from '../forms/PickUpAdressForm';
import ParcelDocumentForm from '../forms/ParcelDocumentForm';
import ConsigneeAddressForm from '../forms/ConsigneeAddressForm';
import ConsigneeDetailsForm from '../forms/ConsigneeDetailsForm';
import OrderSummaryForm from '../forms/OrderSummaryForm';
import ThankYouFormDetails from '../forms/ThankYouFormDetails';
import PaymentMethodSelection from '../forms/PaymentMethodSelection';
import useAuthStore from '@utils/store/authStore';
import usePlaceOrder from '@utils/store/placeOrderStore';
import {PackageData} from '@utils/types/types';
type Prop = {
  currentStep: number;
  nextStep: () => void;
  shouldGet: boolean;
};
const FormRenderer: React.FC<Prop> = ({currentStep, nextStep, shouldGet}) => {
  const {user, token}: any = useAuthStore();
  const {placeOrderData, setCurrentStep}: any = usePlaceOrder();
  const [COD, setCOD] = useState(false);
  const [packageData, setPackageData] = useState<PackageData>({
    user_id: user?.userId,
    parcelType: 2,
    details: 'Urgent delivery required',
    flyerRequired: false,
    weight: 0,
    price: 500,
    discount: 50,
    amountReceived: 450,
    calculationType: 1,
    pickUpArea: 'Downtown',
    pickUpAddress: '123 Main St',
    pickUpCityId: 1,
    pickUpLat: 24.8607,
    pickUpLong: 67.0011,
    consigneeName: '',
    consigneePhone: '',
    consigneeEmail: '',
    consigneeAddress: '',
    consigneeCityId: 1,
    consigneeLat: 24.9123,
    consigneeLong: 67.0754,
    consigneeLandmark: '',
    paymentType: COD ? 1 : 2,
    paymentFrom: 1,
    estDistance: 15.3,
    isInsured: true,
    orderStatus: 0,
    photos: [],
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const [ParcelWorth, setParcelWorth] = useState(0);
  const [selected, setSelected] = useState('Parcel');
  const [isCheck, setIsCheck] = useState(false);
  const [dropdown, setDropdown] = useState('Karachi');

  const toggleSwitch = (val?: boolean) => {
    if (val) {
      setIsEnabled(val);
    } else {
      setIsEnabled(previousState => !previousState);
    }
  };
  useEffect(() => {
    if (shouldGet) {
      setPackageData(placeOrderData);
    }
  }, [placeOrderData, shouldGet]);
  switch (currentStep) {
    case 1:
      return (
        <>
          <PickUpAdressForm nextStep={nextStep} setData={setPackageData} />
        </>
      );
    case 2:
      return (
        <ParcelDocumentForm
          selected={selected}
          setSelected={setSelected}
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
          nextStep={nextStep}
          setData={setPackageData}
          ParcelWorth={ParcelWorth}
          setParcelWorth={setParcelWorth}
          isWeight={packageData?.weight}
        />
      );
    case 3:
      return (
        <ConsigneeAddressForm
          nextStep={nextStep}
          dropdown={dropdown}
          setDropdown={setDropdown}
          setData={setPackageData}
        />
      );
    case 4:
      return (
        <ConsigneeDetailsForm
          packageData={packageData}
          nextStep={nextStep}
          setData={setPackageData}
          ParcelWorth={ParcelWorth as any}
          token={token}
        />
      );
    case 5:
      return (
        <>
          <OrderSummaryForm
            COD={COD}
            packageData={packageData}
            nextStep={nextStep}
            setCurrentStep={setCurrentStep}
            setData={setPackageData}
            token={token}
            setParcelWorth={setParcelWorth}
          />
        </>
      );
    case 6:
      return <ThankYouFormDetails COD={COD} setCurrentStep={setCurrentStep} />;
    case 66:
      return (
        <PaymentMethodSelection
          COD={COD}
          setCurrentStep={setCurrentStep}
          setCOD={setCOD}
        />
      );
    default:
      return null;
  }
};

export default FormRenderer;
