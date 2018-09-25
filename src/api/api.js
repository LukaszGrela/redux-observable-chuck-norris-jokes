import { parse } from 'date-fns';
import placeholderData from '../static/placeholderData';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

// payload for the Axios calls - could be updated if API require different
export const completeOrderPayload = id => ({
  type: 'complete',
  id,
});
export const recallOrderPayload = id => ({
  type: 'recall',
  id,
});

// TODO: NAMES Could stay, paths are mocked
export const GET_ORDERS_LIST = '/api/get-orders';
export const SET_ORDER_DETAILS = '/api/set-order-details';
export const GET_CONFIG = '/api/get-config';

/* ALL BELOW is mocked, Axios implementation is faked to have single place to inject mocked data */
let idIndex = 0;
let orders = [];
// to avoid reference errors😀 <- no space :)
export const cloneOrders = () => JSON.parse(JSON.stringify(orders));
export const resetOrders = () => {
  orders = [];
};
export const getNewOrder = time => {
  idIndex += 1;
  return {
    ...placeholderData[Math.floor(Math.random() * placeholderData.length)],
    id: `order-${idIndex}`,
    orderPlaced: time || Date.now(),
    type: ['Eat in', 'Take away'][Math.floor(Math.random() * 2)],
  };
};
export const addOrder = order => orders.push(order);
export const initOrders = length => {
  let now = new Date();
  const list = placeholderData;
  const len = length || list.length;
  const results = [];
  for (let i = 0; i < len; i += 1) {
    now = new Date(
      new Date().getTime() -
        (Math.floor(Math.random() * 3000) + 20000 * (len - i + 1))
    );
    idIndex += 1;
    const item = {
      ...list[i],
      id: `order-${idIndex}`,
      orderPlaced: now,
      type: ['Eat in', 'Take away'][Math.floor(Math.random() * 2)],
    };
    results.push(item);
  }

  return results;
};
const olderThan = (date, thresholdMs) => {
  const a = parse(date).getTime();
  const b = Date.now();
  console.log(
    'olderThan',
    date,
    thresholdMs,
    'b - a > thresholdMs',
    b,
    a,
    b - a > thresholdMs
  );

  return b - a > thresholdMs;
};
export const removeOldestOrders = (threshold = 15 * 60 * 1000) => {
  // remove completed orders starting from oldest
  orders = orders.filter(ticket => {
    if (
      ticket.status === 'complete' &&
      olderThan(ticket.orderCompleted, threshold)
    ) {
      // if completed older than 15mins remove
      return false;
    }

    return true;
  });
};
export const changeOrdersStatus = () => {
  // change from completed/active and vice versa
  orders = orders.map(ticket => {
    const complete = ticket.status !== 'complete';
    const rand = Math.random();
    if (rand > 0.75) {
      // change type (flip randomly)
      console.log('Order status changed!');
      return {
        ...ticket,
        status: complete ? 'complete' : 'active',
        orderCompleted: complete ? Date.now() : undefined,
      };
    }
    return ticket;
  });
};

const updateOrders = payload => {
  const { type, id } = payload;
  if (type && id) {
    const complete = type === 'complete';
    orders = orders.map(
      ticket =>
        ticket.id === id
          ? {
              ...ticket,
              status: complete ? 'complete' : 'active',
              orderCompleted: complete ? Date.now() : undefined,
            }
          : ticket
    );
  }
};

const Axios = {
  post: (path, payload) =>
    new Promise((resolve, _) => {
      // simulated axios call
      setTimeout(() => {
        updateOrders(payload);

        resolve(cloneOrders());
      }, 1000);
    }),
  /* eslint-disable no-shadow */
  get: path => {
    if (path === GET_CONFIG) {
      return new Promise((resolve, _) => {
        setTimeout(() => {
          resolve({ pollInterval: 10000 });
        }, 333);
      });
    }
    return new Promise((resolve, _) => {
      /* eslint-enable no-shadow */
      // simulated axios call
      setTimeout(() => {
        resolve(cloneOrders());
      }, 1000);
    });
  },
};
export default Axios;

export const ajax = () => {
  const orders = cloneOrders();
  if (orders.length % 2) throw new Error('Boom!');
  return of(orders).pipe(delay(350));
};

window.mockResetOrders = () => {
  resetOrders();
};
window.mockAddNewOrder = (completed = false, time = undefined) => {
  if (completed) {
    const ticket = getNewOrder();
    addOrder({
      ...ticket,
      status: 'complete',
      orderCompleted: time || Date.now(),
    });
  } else {
    addOrder(getNewOrder());
  }
};
window.mockRemoveCompleteOrders = threshold => {
  removeOldestOrders(threshold);
};
window.mockFlipOrderStatus = () => {
  changeOrdersStatus();
};
