import React from 'react';
import { SingleSelect } from '@crpt/react-select';
import PropTypes from 'prop-types';

const propTypes = {
  hints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
};

const HintedEmailInputView = ({
  hints,
  ...othersProps
}) => (
  <SingleSelect
    values={hints}
    {...othersProps}
  />
);

HintedEmailInputView.propTypes = propTypes;

export default HintedEmailInputView;
