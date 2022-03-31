const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyRate = async () => {
  const response = await fetch(END_POINT);
  const json = await response.json();
  const data = Object.entries(json);

  return data;
};

export default getCurrencyRate;
