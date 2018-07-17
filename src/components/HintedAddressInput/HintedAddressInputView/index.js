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
  
  updateHintsForShown = (hints) => {
    if (hints.length === 0) { return []; }
    const inputText = hints[0].title;

    return hints.map(item => ({
      id: item.id,
      title: item.title,
      titleOption: this.highlightOverlap({ str: item.title, base: inputText }),
    }));
  }

  render() {
    const {
      hints,
      ...othersProps
    } = this.props;

    const hintList = this.updateHintsForShown(hints);
    return (
      <SingleSelect
        withoutIcon
        values={hintList}
        {...othersProps}
      />
    );
  }
}
