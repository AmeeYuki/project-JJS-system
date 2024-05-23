const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  USER_API_URL: import.meta.env.VITE_USER_MANAGE,
  PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL,
  // create fake token here
};

export const { API_URL, USER_API_URL, PRODUCT_URL } = publicRuntimeConfig;
export default publicRuntimeConfig;
