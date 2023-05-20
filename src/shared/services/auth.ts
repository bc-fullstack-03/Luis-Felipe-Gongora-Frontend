export const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return authHeader;
};
