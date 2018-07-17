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
| `querty: object` | see note2. | |
| `onUpdate: function` | Calling with object: `{type: {note1} value: 'smth', fias: 'smth'}` 

__Note 1.__ Type can be one of:
- HINTED_ADDRESS_INPUT_TYPE_POSTAL_CODE
- HINTED_ADDRESS_INPUT_TYPE_REGION_CODE
- HINTED_ADDRESS_INPUT_TYPE_AREA
- HINTED_ADDRESS_INPUT_TYPE_CITY
- HINTED_ADDRESS_INPUT_TYPE_SETTLEMENT
- HINTED_ADDRESS_INPUT_TYPE_STREET
- HINTED_ADDRESS_INPUT_TYPE_HOUSE
- HINTED_ADDRESS_INPUT_TYPE_BLOCK
- HINTED_ADDRESS_INPUT_TYPE_FULL

__Note 2.__ Querty object is:
| PropName | Type |
|---|---|---|
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