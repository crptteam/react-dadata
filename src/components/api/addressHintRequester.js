/* This component requests email hints from dadata and returns array of hints (string) */
import PropTypes from 'prop-types';
import axios from 'axios';

export const POSTAL_CODE = 'postalCode';
export const REGION_CODE ='regionCode';
export const AREA = 'area';
export const CITY = 'city';
export const SETTLEMENT = 'settlement';
export const STREET = 'street';
export const HOUSE = 'house';
export const BLOCK = 'block';
export const FULL_ADDRESS = 'fullAddress';

const propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiURL: PropTypes.string.isRequired,
  partOfAddress: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onHintsReceive: PropTypes.func,
};

const suggestionFilter = ({ type, source }) => {
  const filteredSource = { type, title: '', fiasId: '' };
  switch (type) {
    case POSTAL_CODE: filteredSource.title = source.data.postal_code; break;
    case REGION_CODE: filteredSource.title = source.data.region; break;
    case AREA: filteredSource.title = source.data.area; break;
    case CITY: filteredSource.title = source.data.city; break;
    case SETTLEMENT: filteredSource.title = source.data.settlement; break;
    case STREET: filteredSource.title = source.data.street; break;
    case HOUSE: filteredSource.title = source.data.house; break;
    case BLOCK: filteredSource.title = source.data.block; break;
    case FULL_ADDRESS: filteredSource.title = source.unrestricted_value; break;
    default: break;
  }
  filteredSource.fiasId = source.data.fias_id;
  return filteredSource;
};

const unicFilter = (src) => {
  const retArray = [];
  src.forEach(item => {
    if (!retArray.find(retArrayItem => retArrayItem.title === item.title)) {
      retArray.push(item);
    }
  });

  return retArray;
}

export const addressHintRequester = (props) => {
  const {
    apiKey,
    apiURL,
    query,
    partOfAddress,
    onHintsReceive,
  } = props;
  PropTypes.checkPropTypes(propTypes, props, 'prop', 'addressHintRequester');
  axios({
    method: 'post',
    url: apiURL,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${apiKey}`,
    },
    responseType: 'json',
    data: {
      query,
    },
  })
    .then((responsedJSON) => {
      const addrHints = responsedJSON.data.suggestions.map(item => suggestionFilter({ type: partOfAddress, source: item }));
      const addrHintsWithoutNullInTitle = addrHints.filter(item => item.title);
      const arrHintsUnic = unicFilter(addrHintsWithoutNullInTitle);
      if (onHintsReceive) onHintsReceive(arrHintsUnic);
    })
    .catch(error => console.log(`Was requested hint for email. Body = ${query}. Received error: ${error}`));
};

addressHintRequester.propTypes = propTypes;
