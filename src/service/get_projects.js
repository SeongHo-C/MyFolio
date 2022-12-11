import axios from 'axios';

export const GetProjects = async (keyword, type) => {
  const url = process.env.REACT_APP_URL;

  const response = await axios.get(`${url}/project`, {
    params: {
      keyword,
      type,
      page: 1,
      size: 9,
    },
  });

  return response.data;
};
