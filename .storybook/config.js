import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/HintedEmailInput.stories.js');
  require('../src/stories/HintedAddressInput.stories.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);