import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  API_KEY,
  API_EMAIL_URL,
} from '../../demo/src/constants';
import HintedEmailInput from '../components/HintedEmailInput';

const storiesEmailInput = storiesOf('HintedEmailInput', module);

storiesEmailInput.add('simple without hits', () => (
  <HintedEmailInput />
));

storiesEmailInput.add('with placeholder', () => (
  <HintedEmailInput
    apiKey={API_KEY}
    apiURL={API_EMAIL_URL}
    placeholder="Placeholder value"
    savePlaceholder
  />
));

storiesEmailInput.add('with defaultText', () => (
  <HintedEmailInput
    apiKey={API_KEY}
    apiURL={API_EMAIL_URL}
    defaultText="email@text.mk"
  />
));
