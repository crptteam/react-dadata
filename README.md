# react-dadata

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

#react-data
Component for input any data using hints from dadata.ru service.

###Install
```
npm i --save-dev @crpt/react-dadata
```
## Usage
```javascript
import { Form } from  "@crpt/react-form"; 
import { DatePicker } from  "@crpt/react-datepicker"; 

<Form onSubmit={vals => console.log('vals', vals)}>
    <DatePicker name="date" />
</Form>
```

###HintedEmailInput

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
