import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import {
  KEYPRESS_TO_HINT_REQUEST_TIME_MS,
  MIN_CHARACTERS_FOR_HINT,
  MAX_HINT_ARRAY_LENGTH,
  BASE_HINT_ID,
} from './constants';
import { emailHintRequester } from '../api/index';
import HintedEmailInputView from './HintedEmailInputView/index';

class HintedEmailInput extends Component {
  displayName = 'HintedEmailInput';

  static propTypes = {
    defaultText: PropTypes.string,
    apiKey: PropTypes.string,
    apiURL: PropTypes.string,
    onKeyPress: PropTypes.func,
    onUpdate: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultText: '',
    apiKey: '',
    apiURL: '',
    onKeyPress: undefined,
    onUpdate: undefined,
    onChange: undefined,
  };

  constructor(props) {
    super(props);
    const {
      defaultText,
      onSelect,
      onUpdate,
      onChange,
      onKeyPress,
      ...othersProps
    } = this.props;

    this.defaultState = {
      text: {
        id: BASE_HINT_ID,
        title: defaultText,
      },
      hints: [],
    };

    this.state = this.defaultState;
    this.requestDelayTimer = null;

    this.callbacks = {
      onSelect,
      onUpdate,
      onChange,
      onKeyPress,
    };

    this.othersProps = othersProps;
  }

  componentWillUnmount() {
    if (this.requestDelayTimer) {
      clearTimeout(this.requestDelayTimer);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultText !== this.props.defaultText) {
      this.setState({
        text: {
          id: BASE_HINT_ID,
          title: this.props.defaultText,
        }
      })
    }
  }

  clear = () => {
    this.setState(this.defaultState);
    if (onChange) { onChange(this.defaultState.text.title) };
    if (onUpdate) { onUpdate(this.defaultState.text.title) };
  }

  onKeyPress = (event) => {
    const { onUpdate, onKeyPress } = this.callbacks;
    if ((event.charCode === 13)
      || (event.keyCode === 13)
      || (event.key === 'Enter')) {
      clearTimeout(this.requestDelayTimer);
      if (onUpdate) { onUpdate(event); }
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
    const { onUpdate } = this.callbacks;
    clearTimeout(this.requestDelayTimer);
    if (onUpdate) { onUpdate(event.text); }
  }

  onSelect = (event) => {
    const { onUpdate } = this.callbacks;
    const selectedText = event ? event.title : '';
    if (onUpdate) { onUpdate(selectedText); }
    this.onChange(selectedText);
  }

  requestHint = () => {
    const { apiURL, apiKey } = this.props;
    if (apiURL === '') {
      return;
    }

    const { text } = this.state;
    emailHintRequester({
      apiURL,
      apiKey,
      query: text.title,
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
        title: item,
      }))
    });
  }

  render() {
    const {
      defaultText,
      onChange,
      onUpdate,
      onKeyPress,
      onSelect,
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
      <HintedEmailInputView
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

export default withTheme(HintedEmailInput);
