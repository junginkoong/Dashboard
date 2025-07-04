import axios from "./axios";

export default async function getExchangeRate(base = 'USD') {
  return axios
    .get('rate/', {
      params: { base },
    })
    .then((response) => {
        if (response.data){
            return response.data.rates
        }
    })
}