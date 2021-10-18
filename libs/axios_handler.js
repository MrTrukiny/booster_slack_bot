const axios = require('axios');

const axiosHandler = Object.freeze({
  async request({ ...options }) {
    try {
      const instance = axios.create();
      const { data } = await instance(options);
      return { ...data };
    } catch (error) {
      const { response } = error;
      // Log error for debugging purposes. Maybe we could use a logger.
      console.error(error);
      throw new Error(response?.data || 'Failed to get vehicle data');
    }
  },
});

module.exports = axiosHandler;
