/* This component requests email hints from dadata and returns array of hints (string) */
import PropTypes from 'prop-types';

const propTypes = {
  apiKey: PropTypes.string.isRequired,
  requestAddress: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onHintsReceive: PropTypes.func,
};

const emailHintRequester = (props) => {
  const {
    apiKey,
    requestAddress,
    query,
    onHintsReceive,
  } = props;
  PropTypes.checkPropTypes(propTypes, props, 'prop', 'emailHintRequester');
  fetch(requestAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${apiKey}`,
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then((responsedJSON) => {
      const emainHints = responsedJSON.suggestions.map(item => item.value);
      if (onHintsReceive) onHintsReceive(emainHints);
    })
    .catch(error => console.log(`Was requested hint for email. Body = ${query}. Received error: ${error}`));
};

emailHintRequester.propTypes = propTypes;

export default emailHintRequester;
