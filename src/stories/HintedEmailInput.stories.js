import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  DADATA_KEY,
  EMAIL_HINT_SERVER_ADDRESS,
} from '../../demo/src/constants';
import HintedEmailInput from '../components/HintedEmailInput';

const storiesWithoutHits = storiesOf('HintedEmailInput', module);

storiesWithoutHits.add('simple without hits', () => (
  <HintedEmailInput />
));

storiesWithoutHits.add('with placeholder', () => (
  <HintedEmailInput
    hintRequestApiKey={DADATA_KEY}
    hintRequestAddress={EMAIL_HINT_SERVER_ADDRESS}
    placeholder="Placeholder value"
  />
));

storiesWithoutHits.add('with defaultText', () => (
  <HintedEmailInput
    hintRequestApiKey={DADATA_KEY}
    hintRequestAddress={EMAIL_HINT_SERVER_ADDRESS}
    defaultText="email@text.mk"
  />
));
