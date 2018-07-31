import React, { Component } from 'react';
import { SingleSelect } from '@crpt/react-select';
import PropTypes from 'prop-types';

import OptionTitle from './OptionTitle';

export default class HintedAddressInputView extends Component {
  static propTypes = {
    hints: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
    ).isRequired,
  };

  highlightOverlap = ({ str, base }) => {
    const splittedArray = str.split(base);
    const mergedArray = splittedArray.map((item, position, srcArray) => (
      ( position !== (srcArray.length - 1) )
        ? <OptionTitle key={position} boldedText={base} normalText={item} />
        : <OptionTitle key={position} normalText={item} />
    ));
    return mergedArray;
  }
  
  updateHintsForShow = (hints) => {
    if (hints.length === 0) { return []; }
    const inputText = hints[0].title;

    const copiedHints = [...hints];
    copiedHints.forEach(item => {
      item.titleOption = this.highlightOverlap({ str: item.title, base: inputText });
    });

    return copiedHints;
  }

  render() {
    const {
      hints,
      ...othersProps
    } = this.props;

    const hintList = this.updateHintsForShow(hints);

    return (
      <SingleSelect
        withoutIcon
        values={hintList}
        {...othersProps}
      />
    );
  }
}
