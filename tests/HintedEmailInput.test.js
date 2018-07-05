import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HintedEmailInput } from '../src';

describe('HintedEmailInput', () => {
  it('Should renders without problems', () => {
    const wrapper = shallow(<HintedEmailInput />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
