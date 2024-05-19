const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  USER_API_URL: import.meta.env.VITE_USER_MANAGE,
  // create fake token here
};

export const { API_URL, USER_API_URL } = publicRuntimeConfig;
export default publicRuntimeConfig;
