const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const API_BASE_URL = NODE_ENV === 'dev' ? import.meta.env.VITE_API_BASE_URL : '/api/v1';

export { NODE_ENV, API_BASE_URL };
