# react-dadata

Collection of components for input any data using hints from dadata.ru service.<br>
Contains:
- _HintedEmailInput_ - hinted input for emails

## Install ##
`npm i --save @crpt/react-dadata`

## HintedEmailInput ##
### Usage ###
```javascript
import { HintedEmailInput } from "@crpt/react-dadata"; 
...
<HintedEmailInput
  hintRequestApiKey={value}
  hintRequestAddress={value}
  defaultText="textInInputField"
/>
```

| PropName | Description | Example |
|---|---|---|
| `apiKey: string`  | Api key of hints service. |   |
| `apiURL: string`  | IP address of hints service. |   |
| `defaultText: string`  | Text will showed in the input field |   |

Additional properties you can get from @crpt/react-select. __`values` property is ignored__
