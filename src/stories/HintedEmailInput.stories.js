import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  API_KEY,
  API_URL,
} from '../../demo/src/constants';
import HintedEmailInput from '../components/HintedEmailInput';

const storiesWithoutHits = storiesOf('HintedEmailInput', module);

storiesWithoutHits.add('simple without hits', () => (
  <HintedEmailInput />
));

storiesWithoutHits.add('with placeholder', () => (
  <HintedEmailInput
    apiKey={API_KEY}
    apiURL={API_URL}
    placeholder="Placeholder value"
    savePlaceholder
  />
));

storiesWithoutHits.add('with defaultText', () => (
  <HintedEmailInput
    apiKey={API_KEY}
    apiURL={API_URL}
    defaultText="email@text.mk"
  />
));
