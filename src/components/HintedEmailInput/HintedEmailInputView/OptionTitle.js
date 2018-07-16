import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  boldedText: PropTypes.string,
  normalText: PropTypes.string,
}

const defaultProps = {
  boldedText: '',
  normalText: '',
}

const OptionTitle = ({ boldedText, normalText }) => (
  <span><b>{boldedText}</b>{normalText}</span>
);

OptionTitle.propTypes = propTypes;
OptionTitle.defaultProps = defaultProps;

export default OptionTitle;
