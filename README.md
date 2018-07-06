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
| `hintRequestApiKey: string`  | {API_KEY} for dadata.ru service. |   |
| `hintRequestAddress: string`  | IP address where hints will be requested. |   |
| `defaultText: string`  | Text in input field |   |

Additional properties you can get from @crpt/react-select. __Value property is ignored__
