const axiosHandler = require('../libs/axios_handler');

const nhtsaAPI = Object.freeze({
  getVehicleInfo: async (vin) => {
    const requestOptions = {
      method: 'GET',
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`,
      timeout: 5000,
    };

    const {
      Results: [vehicle],
    } = await axiosHandler.request({ ...requestOptions });

    return vehicle;
  },
});

module.exports = nhtsaAPI;
