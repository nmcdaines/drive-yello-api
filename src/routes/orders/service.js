import Order, {validate} from './schema';
import { resultTemplate } from '../../lib/resultTemplate';


export const listOrders = async () => {
  let order = await Order.find().exec();
  return Object.assign({}, resultTemplate(), {data:order});
};

export const findOrder = async ({id}) => {
  let order = await Order.find({_id: id}).exec();
  return Object.assign({}, resultTemplate(), {data:order});
};

export const createOrder = async ({ pickupAddress, deliveryAddress, eta }) => {

  const result = resultTemplate();

  // 1. Validate the user object
  let validationResults = validate({ pickupAddress, deliveryAddress });
  if (validationResults.errorCount > 0) return validationResults

  // 3. If successful save new user
  let savedOrder = await Order.create({pickupAddress, deliveryAddress, eta});
  result.data = savedOrder;

  return result;
};

export const updateUser = async ({username, password}) => {

  

};

export const calculateETA = async ({pickupAddress, deliveryAddress}) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyDD7j2jomDEkU5Nqyk24drdwJxkIcka8ds';
  const pLat = parseFloat(pickupAddress.lat);
  const pLng = parseFloat(pickupAddress.lng);
  const dLat = parseFloat(deliveryAddress.lat);
  const dLng = parseFloat(deliveryAddress.lng);

  const mapsURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${pLat},${pLng}&destination=${dLat},${dLng}&key=AIzaSyDD7j2jomDEkU5Nqyk24drdwJxkIcka8ds`;

  let mapsResult = await fetch(mapsURL).then((res) => {return res.json()});
  console.log(mapsResult);
};