import axios from "./axios";

export default async function getExchangeRate(base = 'USD', target = '') {
  return axios
    .get('rate/', {
      params: { base, target },
    })
    .then((response) => {
        if (response.data){
            return response.data.rates
        }
    })
}