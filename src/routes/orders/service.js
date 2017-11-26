import Order, {validate} from './schema';
import { resultTemplate } from '../../lib/resultTemplate';
import fetch from 'node-fetch';


const sortOrderAsc = (a,b) => {
  return a.eta - b.eta;
};

const sortOrderDsc = (a,b) => {
  return b.eta - a.eta;
};


export const listOrders = async ({count, page, sort}) => {
  let orders = await Order.find({}).exec();

  if (typeof sort !== 'undefined') {
    if (sort === 'asc') orders.sort(sortOrderAsc);
    if (sort === 'dsc') orders.sort(sortOrderDsc);
  }

  var data = {};

  if (typeof count !== 'undefined') {
    let selectedPage = page || 0;
    var orderPage = orders.splice(count * page, count);

    var totalPages = orderPage.length / count;
    if (orderPage.length % count > 0) totalPages += 1;

    data = {
      total: orderPage.length,
      orders: orderPage,
      page,
      sort,
    }
  } else {
    data = {
      total: orders.length,
      orders: orders,
      sort,
    };
  }



  return Object.assign({}, resultTemplate(), {data});
};

export const findOrder = async ({id}) => {
  let order = await Order.find({_id: id}).exec();
  return Object.assign({}, resultTemplate(), {data:order});
};

export const createOrder = async ({ pickupAddress, deliveryAddress }) => {

  const result = resultTemplate();

  // 1. Validate the user object
  let validationResults = validate({ pickupAddress, deliveryAddress });
  if (validationResults.errorCount > 0) return validationResults;

  // 2. Calculate the ETA
  let eta = await calculateETA({pickupAddress, deliveryAddress});

  // 3. If successful save new user
  let savedOrder = await Order.create({pickupAddress, deliveryAddress, eta});
  result.data = savedOrder;

  return result;
};

export const updateOrder = async ({ id, pickupAddress, deliveryAddress }) => {

  // 1. Validate the user object
  let validationResults = validate({ pickupAddress, deliveryAddress });
  if (validationResults.errorCount > 0) return validationResults;

  // 2. Calculate the ETA
  let eta = await calculateETA({pickupAddress, deliveryAddress});

  let updatedOrder = await Order.update({_id: id}, {$set: {pickupAddress, deliveryAddress, eta}});
  return await findOrder({id})
};

export const calculateETA = async ({pickupAddress, deliveryAddress}) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyDD7j2jomDEkU5Nqyk24drdwJxkIcka8ds';
  const pLat = parseFloat(pickupAddress.lat);
  const pLng = parseFloat(pickupAddress.lng);
  const dLat = parseFloat(deliveryAddress.lat);
  const dLng = parseFloat(deliveryAddress.lng);

  const mapsURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${pLat},${pLng}&destination=${dLat},${dLng}&key=AIzaSyDD7j2jomDEkU5Nqyk24drdwJxkIcka8ds`;
  let mapsResult = await fetch(mapsURL).then((res) => {return res.json()});
  let eta = mapsResult.routes[0].legs[0].duration.value;

  return eta;
};