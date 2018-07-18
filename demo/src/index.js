import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../../src/theme';
import { HintedEmailInput } from '../../src/index';
import AddressHintedInput from './AddressHintedInput';
import {
  API_KEY,
  API_EMAIL_URL,
  API_ADDR_URL,
} from './constants';

const Demo = () => (
  <div>
    <h1>
      react-dadata Demo
    </h1>
    <div>
      HintedEmailInput <br />
      <HintedEmailInput
        defaultText="text@text.tx"
        inline
        apiKey={API_KEY}
        apiURL={API_EMAIL_URL}
        placeholder="email"
        onKeyPress={event => console.log('Demo: was pressed key ', event.key)}
        onUpdate={event => console.log('Demo: was updated value ', event)}
        onChange={event => console.log('Demo: was changed value ', event)}
        onSelect={event => console.log('Demo: was selected value ', event)}
      />
      </div>
      <br />
      <br />
      HintedAddressInput
      <AddressHintedInput
        API_KEY={API_KEY}
        API_ADDR_URL={API_ADDR_URL}
      />
  </div>
);

render(
  <ThemeProvider theme={defaultTheme}>
    <Demo />
  </ThemeProvider>,
  document.querySelector('#demo'),
);
