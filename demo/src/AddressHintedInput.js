import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  HintedAddressInput,
  ADDRESS_HINT_REQUESTER_POSTAL_CODE,
  ADDRESS_HINT_REQUESTER_REGION_CODE,
  ADDRESS_HINT_REQUESTER_AREA,
  ADDRESS_HINT_REQUESTER_CITY,
  ADDRESS_HINT_REQUESTER_SETTLEMENT,
  ADDRESS_HINT_REQUESTER_STREET,
  ADDRESS_HINT_REQUESTER_HOUSE,
  ADDRESS_HINT_REQUESTER_BLOCK,
} from '../../src/index';


export default class AddressHintedInput extends Component {
  static propTypes = {
    API_KEY: PropTypes.string.isRequired,
    API_ADDR_URL: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      query: {
        fullAddress: '',
        postalCode: '',
        regionCode: '',
        area: '',
        city: '',
        settlement: '',
        street: '',
        house: '',
        block: '',
      },
      fiasCode: '',
    };
  }

  onUpdate = ({ type, value, fias }) => {
   const { query } = this.state;
   query[type] = value;
   this.setState({ query, fiasCode: fias });
  }

  render() {
    const { fiasCode, query } = this.state;
    const { API_KEY, API_ADDR_URL } = this.props;

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
        onUpdate={this.onUpdate}
      />
    ));

    return (
      <div>
        Фиас = {fiasCode}
        {addressInputsList}
      </div>
    );
  }
}
