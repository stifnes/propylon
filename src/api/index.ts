import axios from 'axios';

const url: string = 'http://localhost:3004/data'

export const useData = async () => {
  const response = await axios.get(url);
  return response.data;
}
