import axios from 'axios';
const KEY = '33604820-2b95686eb9e2401382a4857df';
const BASE_URL = 'https://pixabay.com/api/';
const BASE_PARAMS = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async function (querry, page) {
  const url = `${BASE_URL}?q=${querry}&page=${page}&key=${KEY}${BASE_PARAMS}`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};
