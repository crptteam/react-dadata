import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from "styled-components";

import {
  KEYPRESS_TO_HINT_REQUEST_TIME_MS,
  MIN_CHARACTERS_FOR_HINT,
  MAX_HINT_ARRAY_LENGTH,
} from './constants';
import { emailHintRequester } from '../api/index';
import HintedEmailInputView from './HintedEmailInputView';

class HintedEmailInput extends Component {
  displayName = 'HintedEmailInput';

  static propTypes = {
    defaultText: PropTypes.string,
    hintRequestApiKey: PropTypes.string,
    hintRequestAddress: PropTypes.string,
    onKeyPress: PropTypes.func,
    onUpdate: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultText: '',
    hintRequestApiKey: '',
    hintRequestAddress: '',
    onKeyPress: undefined,
    onUpdate: undefined,
    onChange: undefined,
  };

  constructor(props) {
    super(props);
    const {
      defaultText,
      onUpdate,
      onChange,
      onKeyPress,
      ...othersProps
    } = this.props;

    this.state = {
      text: {
        id: 1,
        title: defaultText,
      },
      hints: [],
    };
    this.requestDalayTimer = null;

    this.callbacks = {
      onUpdate,
      onChange,
      onKeyPress,
    };

    this.othersProps = othersProps;
  }

  componentWillUnmount() {
    if (this.requestDalayTimer) {
      clearTimeout(this.requestDalayTimer);
    }
  }

  onKeyPress = (event) => {
    const { onUpdate, onKeyPress } = this.callbacks;
    if ((event.charCode === 13)
      || (event.keyCode === 13)
      || (event.key === 'Enter')) {
      clearTimeout(this.requestDalayTimer);
      if (onUpdate) { onUpdate(event); }
    }
    if (onKeyPress) { onKeyPress(event); }
  }

  onChange = (inValue) => {
    const value = inValue || '';
    const { onChange } = this.callbacks;
    this.setState({
      text: {
        id: 1,
        title: value,
      },
    },
    () => { if (onChange) { onChange(value); } });

    if (value.length >= MIN_CHARACTERS_FOR_HINT) {
      if (this.requestDalayTimer) {
        clearTimeout(this.requestDalayTimer);
      }
      this.requestDalayTimer = setTimeout(this.requestHint, KEYPRESS_TO_HINT_REQUEST_TIME_MS);
    }
  }

  onUpdate = (event) => {
    const { onUpdate } = this.callbacks;
    clearTimeout(this.requestDalayTimer);
    if (onUpdate) { onUpdate(event.text); }
  }

  onSelect = (event) => {
    const { onUpdate, onSelect } = this.callbacks;
    const selectedText = event ? event.title : '';
    if (onUpdate) { onUpdate(selectedText); }
    if (onSelect) { onSelect(event); }
  }

  requestHint = () => {
    const { hintRequestAddress, hintRequestApiKey } = this.props;
    if (hintRequestAddress === '') {
      return;
    }

    const { text } = this.state;
    emailHintRequester({
      requestAddress: hintRequestAddress,
      apiKey: hintRequestApiKey,
      query: text.title,
      onHintsReceive: this.receivedHint,
    });
  }

  receivedHint = (newHints) => {
    const updatedHints = [...newHints];
    updatedHints.length = updatedHints.length > MAX_HINT_ARRAY_LENGTH
      ? MAX_HINT_ARRAY_LENGTH
      : updatedHints.length;

    this.setState({ hints: updatedHints.map((item, k) => ({ id: k + 2, title: item })) });
  }

  render() {
    const { hints, text } = this.state;
    const hintList = [{ ...text }, ...hints];
    return (
      <HintedEmailInputView
        onUpdate={this.onUpdate}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onSelect={this.onSelect}
        selectedId={1}
        hints={hintList}
        {...this.othersProps}
      />
    );
  }
}

export default withTheme(HintedEmailInput);
