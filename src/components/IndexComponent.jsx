import React from 'react'
import {Provider} from 'react-redux';
import store from '../store/store';
import App from '../App';

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Index;