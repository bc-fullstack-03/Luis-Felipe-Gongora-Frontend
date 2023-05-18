export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const authHeader = {
    Authorization: `Bearer ${token}`,
    RequestedBy: userId,
  };
  return authHeader;
};
