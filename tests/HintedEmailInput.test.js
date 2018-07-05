import React from 'react';
import { shallow } from 'enzyme';

import { HintedEmailInput } from '../src';

describe('HintedEmailInput', () => {
  it('should renders without problems', () => {
    const wrapper = shallow(<HintedEmailInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
