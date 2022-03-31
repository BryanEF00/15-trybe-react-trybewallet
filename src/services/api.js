const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  const response = await fetch(END_POINT);
  const json = await response.json();

  return Promise.resolve(json);
};

export default fetchApi;
