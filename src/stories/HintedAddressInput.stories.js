import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  API_KEY,
  API_ADDR_URL,
} from '../../demo/src/constants';
import HintedAddressInput from '../components/HintedAddressInput';
import {
  ADDRESS_HINT_REQUESTER_POSTAL_CODE,
  ADDRESS_HINT_REQUESTER_REGION_CODE,
  ADDRESS_HINT_REQUESTER_AREA,
  ADDRESS_HINT_REQUESTER_CITY,
  ADDRESS_HINT_REQUESTER_SETTLEMENT,
  ADDRESS_HINT_REQUESTER_STREET,
  ADDRESS_HINT_REQUESTER_HOUSE,
  ADDRESS_HINT_REQUESTER_BLOCK,
  ADDRESS_HINT_REQUESTER_FULL,
} from '../components/api/index';

const storiesAddressInput = storiesOf('HintedAddressInput', module);

storiesAddressInput.add('full address', () => (
  <HintedAddressInput
    placeholder="Address"
    apiKey={API_KEY}
    apiURL={API_ADDR_URL}
    type={ADDRESS_HINT_REQUESTER_FULL}
    query={{
      fullAddress: '',
      postalCode: '',
      regionCode: '',
      area: '',
      city: '',
      settlement: '',
      street: '',
      house: '',
      block: '',
    }}
  />
));

storiesAddressInput.add('separated fields', () => {
  let query = {
    fullAddress: '',
    postalCode: '',
    regionCode: '',
    area: '',
    city: '',
    settlement: '',
    street: '',
    house: '',
    block: '',
  };

  let fiasCode = '';

  function onUpdate({ type, value, fias }) {
    query[type] = value;
    fiasCode = fias;
  }

  const types = [
    { type: ADDRESS_HINT_REQUESTER_POSTAL_CODE, placeholder: 'Индекс' },
    { type: ADDRESS_HINT_REQUESTER_REGION_CODE, placeholder: 'Регион' },
    { type: ADDRESS_HINT_REQUESTER_AREA, placeholder: 'Район' },
    { type: ADDRESS_HINT_REQUESTER_CITY, placeholder: 'Город' },
    { type: ADDRESS_HINT_REQUESTER_SETTLEMENT, placeholder: 'Населенный пункт' },
    { type: ADDRESS_HINT_REQUESTER_STREET, placeholder: 'Улица' },
    { type: ADDRESS_HINT_REQUESTER_HOUSE, placeholder: 'Дом' },
    { type: ADDRESS_HINT_REQUESTER_BLOCK, placeholder: 'Корпус' },
  ];

  const addressInputsList = types.map(item => (
    <HintedAddressInput
      key={item.placeholder}
      placeholder={item.placeholder}
      apiKey={API_KEY}
      apiURL={API_ADDR_URL}
      type={item.type}
      query={query}
      onUpdate={onUpdate}
    />
  ));
  return (
    <div>
      Фиас = {fiasCode}
      {addressInputsList}
    </div>
  );
});