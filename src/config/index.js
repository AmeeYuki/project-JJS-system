const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  USER_API_URL: import.meta.env.VITE_USER_MANAGE,
  API_URL_BE: import.meta.env.VITE_API_URL_BE,
  // create fake token here
};

export const { API_URL, USER_API_URL, API_URL_BE } = publicRuntimeConfig;
export default publicRuntimeConfig;
