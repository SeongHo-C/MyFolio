import axios from 'axios';

export const setRefreshToken = async (accessToken, refreshToken) => {
  const url = process.env.REACT_APP_URL;

  try {
    const response = await axios.post(`${url}/token/reissue`, {
      accessToken,
      refreshToken,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
