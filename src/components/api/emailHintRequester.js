/* This component requests email hints from dadata and returns array of hints (string) */
import PropTypes from 'prop-types';
import axios from 'axios';

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
  axios({
    method: 'post',
    url: requestAddress,
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
      const emainHints = responsedJSON.data.suggestions.map(item => item.value);
      if (onHintsReceive) onHintsReceive(emainHints);
    })
    .catch(error => console.log(`Was requested hint for email. Body = ${query}. Received error: ${error}`));
};

emailHintRequester.propTypes = propTypes;

export default emailHintRequester;
