import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const orderSchema = new Schema({
  pickupAddress: {
    text: String,
    lat: Number,
    lng: Number,
  },
  deliveryAddress: {
    text: String,
    lat: Number,
    lng: Number,
  },
  eta: Number,
  // submittedBy: ObjectId,
});


export const validate = ({ pickupAddress, deliveryAddress }) => {

  const result = {
    errors: [],
    errorCount: 0,
  };

  // Pickup Address
  if (typeof pickupAddress=== 'undefined') {
    result.errors.push("No pickupAddress supplied");
    result.errorCount += 1;
  } else {

    // Pickup Address > Text
    if (typeof pickupAddress.text === 'undefined') {
      result.errors.push("No pickupAddress.text supplied");
      result.errorCount += 1;
    }

    if (/^[a-zA-Z0-9 ]{0,255}$/.test(pickupAddress.text) === false) {
      result.errors.push("pickupAddress.text has invalid characters");
      result.errorCount += 1;
    }

    // Pickup Address > Lat
    if (typeof pickupAddress.lat === 'undefined') {
      result.errors.push("No pickupAddress.lat supplied");
      result.errorCount += 1;
    }

    // Pickup Address > Lng
    if (typeof pickupAddress.lng === 'undefined') {
      result.errors.push("No pickupAddress.lng supplied");
      result.errorCount += 1;
    }
  }


  // Delivery Address
  if (typeof deliveryAddress=== 'undefined') {
    result.errors.push("No deliveryAddress supplied");
    result.errorCount += 1;
  } else {

    // Delivery Address > Text
    if (typeof deliveryAddress.text === 'undefined') {
      result.errors.push("No deliveryAddress.text supplied");
      result.errorCount += 1;
    }

    if (/^[a-zA-Z0-9 ]{0,255}$/.test(deliveryAddress.text) === false) {
      result.errors.push("deliveryAddress.text has invalid characters");
      result.errorCount += 1;
    }

    // Delivery Address > Lat
    if (typeof deliveryAddress.lat === 'undefined') {
      result.errors.push("No deliveryAddress.lat supplied");
      result.errorCount += 1;
    }

    // Delivery Address > Lng
    if (typeof deliveryAddress.lng === 'undefined') {
      result.errors.push("No deliveryAddress.lng supplied");
      result.errorCount += 1;
    }

  }

  return result;
};

export default mongoose.model('Order', orderSchema);