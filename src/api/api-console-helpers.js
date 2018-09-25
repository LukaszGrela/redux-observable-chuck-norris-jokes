import {
  changeOrdersStatus,
  removeOldestOrders,
  resetOrders,
  getNewOrder,
  addOrder,
} from './api';

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