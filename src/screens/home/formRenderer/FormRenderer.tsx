import {Text, View} from 'react-native';
import React, {useState} from 'react';
import PickUpAdressForm from '../forms/PickUpAdressForm';
import ParcelDocumentForm from '../forms/ParcelDocumentForm';
import ConsigneeAddressForm from '../forms/ConsigneeAddressForm';
import ConsigneeDetailsForm from '../forms/ConsigneeDetailsForm';
import OrderSummaryForm from '../forms/OrderSummaryForm';
import ThankYouFormDetails from '../forms/ThankYouFormDetails';
import PaymentMethodSelection from '../forms/PaymentMethodSelection';
import useAuthStore from '../../../utils/store/authStore';

type Prop = {
  currentStep: number;
  nextStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const FormRenderer: React.FC<Prop> = ({
  currentStep,
  nextStep,
  setCurrentStep,
}) => {
  const {user, token}: any = useAuthStore();
  const [packageData, setPackageData] = useState({
    user_id: user?.userId,
    parcelType: 2,
    details: 'Urgent delivery required',
    flyerRequired: false,
    weight: 2.5,
    price: 500,
    discount: 50,
    amountReceived: 450,
    calculationType: 1,
    pickUpArea: 'Downtown',
    pickUpAddress: '123 Main St',
    pickUpCityId: 1,
    pickUpLat: 24.8607,
    pickUpLong: 67.0011,
    consigneeName: 'John Doe',
    consigneePhone: '1234567890',
    consigneeEmail: 'johndoe@example.com',
    consigneeAddress: '456 Elm St',
    consigneeCityId: 1,
    consigneeLat: 24.9123,
    consigneeLong: 67.0754,
    consigneeLandmark: 'Near Park',
    paymentType: 1,
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
  const [COD, setCOD] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  console.log(packageData, 'CHECK ME OUT');
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
          ParcelWorth={ParcelWorth}
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
          />
        </>
      );
    case 6:
      return <ThankYouFormDetails setCurrentStep={setCurrentStep} />;
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
