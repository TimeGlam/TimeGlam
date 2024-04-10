import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Routes />
    </Provider>
);
