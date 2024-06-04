const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  USER_API_URL: import.meta.env.VITE_USER_MANAGE,
  API_URL_BE: import.meta.env.VITE_API_URL_BE,
  PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL,
  COUNTER_URL: import.meta.env.VITE_COUNTER_URL,
  ORDER_URL: import.meta.env.VITE_ORDER_URL,
  // create fake token here
};

export const {
  API_URL,
  USER_API_URL,
  API_URL_BE,
  PRODUCT_URL,
  COUNTER_URL,
  ORDER_URL,
} = publicRuntimeConfig;
export default publicRuntimeConfig;
