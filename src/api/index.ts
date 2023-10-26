import { useQuery } from 'react-query';
import axios from 'axios';

const url: string = 'http://localhost:3004/data'

function useData() {
  return useQuery('data', async () => {
    const response = await axios.get(url);
    return response.data;
  });
}

export default useData;