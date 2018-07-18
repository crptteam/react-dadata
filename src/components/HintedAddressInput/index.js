import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  KEYPRESS_TO_HINT_REQUEST_TIME_MS,
  MIN_CHARACTERS_FOR_HINT,
  MAX_HINT_ARRAY_LENGTH,
  BASE_HINT_ID,
} from './constants';

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
  addressHintRequester } from '../api/index';

import HintedAddressInputView from './HintedAddressInputView/index';

class HintedAddressInput extends Component {
  displayName = 'HintedAddressInput';

  static propTypes = {
    apiKey: PropTypes.string,
    apiURL: PropTypes.string,
    type: PropTypes.oneOf([
      ADDRESS_HINT_REQUESTER_POSTAL_CODE,
      ADDRESS_HINT_REQUESTER_REGION_CODE,
      ADDRESS_HINT_REQUESTER_AREA,
      ADDRESS_HINT_REQUESTER_CITY,
      ADDRESS_HINT_REQUESTER_SETTLEMENT,
      ADDRESS_HINT_REQUESTER_STREET,
      ADDRESS_HINT_REQUESTER_HOUSE,
      ADDRESS_HINT_REQUESTER_BLOCK,
      ADDRESS_HINT_REQUESTER_FULL,
    ]).isRequired,
    defaultText: PropTypes.string,
    query: PropTypes.shape({
      fullAddress: PropTypes.string,
      postalCode: PropTypes.string,
      regionCode: PropTypes.string,
      area: PropTypes.string,
      city: PropTypes.string,
      settlement: PropTypes.string,
      street: PropTypes.string,
      house: PropTypes.string,
      block: PropTypes.string,
    }).isRequired,
    onKeyPress: PropTypes.func,
    onUpdate: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    apiKey: '',
    apiURL: '',
    defaultText: '',
    onKeyPress: undefined,
    onUpdate: undefined,
    onChange: undefined,
  };

  constructor(props) {
    super(props);
    const {
      defaultText,
      type,
      onChange,
      onUpdate,
      onKeyPress,
    } = this.props;

    this.defaultState = {
      text: {
        id: BASE_HINT_ID,
        title: defaultText,
      },
      hints: [],
      type,
    };

    this.state = this.defaultState;
    this.requestDelayTimer = null;

    this.callbacks = {
      onUpdate,
      onChange,
      onKeyPress,
    };
  }

  componentWillUnmount() {
    if (this.requestDelayTimer) {
      clearTimeout(this.requestDelayTimer);
    }
  }

  clear = () => {
    this.setState(this.defaultState);
    if (onChange) { onChange(this.defaultState.text.title) };
    if (onUpdate) { onUpdate(this.defaultState.text.title) };
  }

  onKeyPress = (event) => {
    const { onKeyPress } = this.callbacks;
    if ((event.charCode === 13)
      || (event.keyCode === 13)
      || (event.key === 'Enter')) {
      clearTimeout(this.requestDelayTimer);
    }
    if (onKeyPress) { onKeyPress(event); }
  }

  onChange = (inValue) => {
    const value = inValue || '';
    const { onChange } = this.callbacks;
    this.setState({
      text: {
        id: BASE_HINT_ID,
        title: value,
      },
    },
    () => { if (onChange) { onChange(value); } });

    if (value.length >= MIN_CHARACTERS_FOR_HINT) {
      if (this.requestDelayTimer) {
        clearTimeout(this.requestDelayTimer);
      }
      this.requestDelayTimer = setTimeout(this.requestHint, KEYPRESS_TO_HINT_REQUEST_TIME_MS);
    }
  }

  onUpdate = (event) => {
    clearTimeout(this.requestDelayTimer);
    if (onUpdate) { onUpdate(event); }
  }

  onSelect = (event) => {
    const { onUpdate } = this.callbacks;
    const { type } = this.state;
    const selectedObject = {
        type,
        value: event ? event.title: '',
        fias: event ? event.fias: '',
      };
    if (onUpdate) { onUpdate(selectedObject); }
    this.onChange(selectedObject.value);
  }

  makeQueryString = ({ type, query, inputedText }) => {
    if (type === ADDRESS_HINT_REQUESTER_FULL) {
      return inputedText;
    }
    const newQuery = {...query};
    newQuery[type] = inputedText;

    const retArray = [];
    switch (type) {
      case ADDRESS_HINT_REQUESTER_BLOCK: retArray.push(newQuery.block);
      case ADDRESS_HINT_REQUESTER_HOUSE: retArray.push(newQuery.house);
      case ADDRESS_HINT_REQUESTER_STREET: retArray.push(newQuery.street);
      case ADDRESS_HINT_REQUESTER_SETTLEMENT: retArray.push(newQuery.settlement);
      case ADDRESS_HINT_REQUESTER_CITY: retArray.push(newQuery.city);
      case ADDRESS_HINT_REQUESTER_AREA: retArray.push(newQuery.area);
      case ADDRESS_HINT_REQUESTER_REGION_CODE: retArray.push(newQuery.regionCode);
      case ADDRESS_HINT_REQUESTER_POSTAL_CODE: retArray.push(newQuery.postalCode);
    }
    return retArray.reverse().join(' ');
  }

  requestHint = () => {
    const { apiURL, apiKey } = this.props;
    if (apiURL === '') {
      return;
    }

    const { text } = this.state;
    const { type, query } = this.props;
    addressHintRequester({
      apiURL,
      apiKey,
      partOfAddress: type,
      query: this.makeQueryString({ type, query, inputedText: text.title }),
      onHintsReceive: this.receivedHint,
    });
  }

  receivedHint = (newHints) => {
    const updatedHints = [...newHints];
    updatedHints.length = updatedHints.length > MAX_HINT_ARRAY_LENGTH
      ? MAX_HINT_ARRAY_LENGTH
      : updatedHints.length;

    this.setState({
      hints: updatedHints.map(item => ({
        id: 0,
        title: item.title,
        fias: item.fiasId,
      }))
    });
  }

  render() {
    const {
      defaultText,
      type,
      query,
      onChange,
      onUpdate,
      onKeyPress,
      ...othersProps
    } = this.props;

    const { hints, text } = this.state;
    const filteredHints = hints !== []
      ? hints.filter(item => item.title !== text.title)
      : [];

    const hintList = text.title !== ''
      ? ([{ ...text }, ...filteredHints])
      : [];

    return (
      <HintedAddressInputView
        onUpdate={this.onUpdate}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onSelect={this.onSelect}
        selectedId={hintList.length !== 0 ? BASE_HINT_ID : null}
        hideOptionList={hintList.length < 2}
        hints={hintList}
        filterDisable
        {...othersProps}
      />
    );
  }
}

export default HintedAddressInput;

