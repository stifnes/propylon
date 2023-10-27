import axios from 'axios';

const url: string = 'http://localhost:3004/data'

const useData = async () => {
  // return useQuery('data', async () => {
  //   const response = await axios.get(url);
  //   return response.data;
  // });
  const response = await axios.get(url);
  return response.data;
}


export default useData;