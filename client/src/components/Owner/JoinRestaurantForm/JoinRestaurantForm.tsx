import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import React, { useEffect, useState } from 'react';
import { StepOneData, StepTwoData } from '../../../types';
import { serverUrl } from '../../../utils/constants';
import { RestaurantForm } from '../RestaurantForm/RestaurantForm';
import { RestaurantSettingForm } from '../RestaurantSettingForm/RestaurantSettingForm';

interface RawResultAddress extends RawResult {
  address?: {
    [key: string]: string;
  };
}

interface Props {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const JoinRestaurantForm: React.FC<Props> = ({ setChecked }) => {
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);
  const [address, setAddress] = useState<SearchResult<RawResultAddress>>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAllFormReady();
  }, [stepTwoData]);

  const onAllFormReady = async () => {
    if (stepOneData && stepTwoData) {
      setLoading(true);
      const formData = new FormData();
      formData.append('address', stepOneData.address);
      formData.append('category', stepOneData.category);
      formData.append('city', stepOneData.city);
      formData.append('closeTime', stepOneData.closeTime);
      formData.append('fullAddress', stepOneData.fullAddress);
      formData.append('lat', stepOneData.lat);
      formData.append('long', stepOneData.long);
      formData.append('name', stepOneData.name);
      formData.append('openTime', stepOneData.openTime);
      formData.append('phone', stepOneData.phone);
      formData.append('state', stepOneData.state);
      formData.append('zipcode', stepOneData.zipcode);
      formData.append('cardImage', stepTwoData.cardImage);
      formData.append('facebook', stepTwoData.facebook);
      stepTwoData.heroImages.forEach((file) => {
        formData.append('heroImages[]', file);
      });
      formData.append('menuCategory', JSON.stringify(stepTwoData.menuCategory));
      formData.append('menuType', stepTwoData.menuType);
      formData.append('heroType', stepTwoData.heroType);
      formData.append('instagram', stepTwoData.instagram);
      formData.append('twitter', stepTwoData.twitter);
      if (stepTwoData.menuType === 'aio') {
        stepTwoData.menuCategoryImages.forEach((file) => {
          formData.append('categoryImages[]', file);
        });
      }

      const res = await fetch(`${serverUrl}/restaurant`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: formData,
      });
      const data = await res.json();

      if (!data.success && data.error) {
        setChecked(false);
        console.error(data.error);
      }

      if (data.success) {
        setChecked(true);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 ? (
        <RestaurantForm
          setStep={setStep}
          stepOneData={stepOneData}
          setStepOneData={setStepOneData}
          address={address}
          setAddress={setAddress}
        />
      ) : (
        <RestaurantSettingForm
          setStep={setStep}
          setStepTwoData={setStepTwoData}
          onAllFormReady={onAllFormReady}
          loading={loading}
        />
      )}
    </div>
  );
};
