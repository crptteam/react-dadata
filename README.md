# react-dadata

Collection of components for input any data using hints from dadata.ru service.<br>
Contains:
- _HintedEmailInput_ - hinted input for emails
- _HintedAddressInput_ - hinted input for address

## Install ##
`npm i --save @crpt/react-dadata`

## HintedEmailInput ##
### Usage ###
```javascript
import { HintedEmailInput } from "@crpt/react-dadata"; 
...
<HintedEmailInput
  apiKey={value}
  apiURL={value}
  defaultText="textInInputField"
/>
```

| PropName | Description | Example |
|---|---|---|
| `apiKey: string`  | Api key of hints service. |   |
| `apiURL: string`  | IP address of hints service. |   |
| `defaultText: string`  | Text will showed in the input field |   |
| `onUpdate: function` | Calling with updated text. | |

Additional properties you can get from @crpt/react-select. __`values` property is ignored__


## HintedAddressInput ##
### Usage ###
```javascript
import { HintedAddresslInput } from "@crpt/react-dadata"; 
...
<HintedAddressInput
  apiKey={value}
  apiURL={value}
  defaultText="textInInputField"
  querty="City, street"
/>
```

| PropName | Description | Example |
|---|---|---|
| `apiKey: string`  | Api key of hints service. |   |
| `apiURL: string`  | IP address of hints service. |   |
| `defaultText: string`  | Text will showed in the input field |   |
| `type: string` | see note1. | |
| `query: object` | see note2. | |
| `onUpdate: function` | Calling with object: `{type: {note1} value: 'smth', fias: 'smth'}` 

__Note 1.__ Type can be one of:
- ADDRESS_HINT_REQUESTER_POSTAL_CODE
- ADDRESS_HINT_REQUESTER_REGION_CODE
- ADDRESS_HINT_REQUESTER_AREA
- ADDRESS_HINT_REQUESTER_CITY
- ADDRESS_HINT_REQUESTER_SETTLEMENT
- ADDRESS_HINT_REQUESTER_STREET
- ADDRESS_HINT_REQUESTER_HOUSE
- ADDRESS_HINT_REQUESTER_BLOCK
- ADDRESS_HINT_REQUESTER_FULL

__Note 2.__ Query object is:

| PropName | Type |
|---|---|
| fullAddress | string |
| postalCode | string |
| regionCode | string |
| area | string |
| city | string |
| settlement | string |
| street | string |
| house | string |
| block | string |

Additional properties you can get from @crpt/react-select. __`values` property is ignored__