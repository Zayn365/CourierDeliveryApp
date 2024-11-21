import {Text, View} from 'react-native';
import React, {useState} from 'react';
import PickUpAdressForm from '../forms/PickUpAdressForm';
import ParcelDocumentForm from '../forms/ParcelDocumentForm';
import ConsigneeAddressForm from '../forms/ConsigneeAddressForm';
import ConsigneeDetailsForm from '../forms/ConsigneeDetailsForm';
import OrderSummaryForm from '../forms/OrderSummaryForm';
import ThankYouFormDetails from '../forms/ThankYouFormDetails';
import PaymentMethodSelection from '../forms/PaymentMethodSelection';

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
  const [isEnabled, setIsEnabled] = useState(false);
  const [selected, setSelected] = useState('Parcel');
  const [isCheck, setIsCheck] = useState(false);
  const [dropdown, setDropdown] = useState('Karachi');
  const [COD, setCOD] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  switch (currentStep) {
    case 1:
      return (
        <>
          <PickUpAdressForm nextStep={nextStep} />
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
        />
      );
    case 3:
      return (
        <ConsigneeAddressForm
          nextStep={nextStep}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
      );
    case 4:
      return <ConsigneeDetailsForm nextStep={nextStep} />;
    case 5:
      return (
        <>
          <OrderSummaryForm
            COD={COD}
            nextStep={nextStep}
            setCurrentStep={setCurrentStep}
          />
        </>
      );
    case 6:
      return (
        <ThankYouFormDetails
          isShow={isShow}
          setCurrentStep={setCurrentStep}
          setIsShow={setIsShow}
        />
      );
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
