import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import  thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { fetchInitialState } from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(fetchInitialState()).then(() =>
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, 
        document.getElementById('root'))
)