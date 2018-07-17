import React from 'react';
import { shallow } from 'enzyme';

import { HintedAddressInput } from '../src';

describe('HintedAddressInput', () => {
  it('should renders without problems', () => {
    const wrapper = shallow(<HintedAddressInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
