import axios from 'axios';

export const setRefreshToken = async (accessToken, refreshToken) => {
  const url = process.env.REACT_APP_URL;

  try {
    const data = await axios
      .post(`${url}/token/reissue`, {
        accessToken,
        refreshToken,
      })
      .then((response) => response.data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
