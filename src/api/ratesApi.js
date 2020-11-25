import mockFxResult from "../mock/fx.json";
// import { RATES_API_BASE_URL } from "../config";

// eslint-disable-next-line no-unused-vars
async function handleResponse(response) {
  if (!response.ok) {
    throw Error(`Response status code: ${response.status}`);
  }
  return await response.json();
}

// eslint-disable-next-line no-unused-vars
function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export function fetchFxRates() {
  // return fetch(RATES_API_URL).then(handleResponse).catch(handleError);
  return Promise.resolve(mockFxResult);
}
