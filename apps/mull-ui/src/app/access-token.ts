let accessToken: string | null = null;

export const getAccessToken = () => {
  return accessToken;
};

export const setAccessToken = (token: string) => {
  accessToken = token;
};
