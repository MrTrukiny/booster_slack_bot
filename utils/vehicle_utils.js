exports.vehicleUtils = Object.freeze({
  validateVinNumber: (vin) => {
    // This regex is for US VINs and vehicles manufactured after 1981.
    if (!vin.match(/[A-HJ-NPR-Z0-9]{17}/)) {
      throw Error(
        '*VIN* cannot contains I, O, or Q. Last 6 characters of *VIN* must be a number. *VIN* must be 17 characters long.',
      );
    }
  },

  formatVehicleInfo: (vehicleInfo, formatType) => {
    const { Make, Model, ModelYear, FuelTypePrimary } = vehicleInfo;

    const vehicle = {
      make: Make,
      model: Model,
      year: ModelYear,
      fuelType: FuelTypePrimary,
    };

    return formatType === 'JSON'
      ? vehicle
      : Object.keys(vehicle)
          .map((key) => `*${key}*: ${vehicle[key]}\n`)
          .join('');
  },
});
