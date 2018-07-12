import React from 'react';
import { mount } from 'enzyme';

import { HintedEmailInput } from '../src';

describe('HintedEmailInput', () => {
  it('should renders without problems', () => {
    const wrapper = mount(<HintedEmailInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
