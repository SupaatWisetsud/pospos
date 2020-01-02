import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import RootView from './views';
import {Login,Logout,NotFoundPage} from './views/page'
import { menuReducer, basketReducer, depositReducer } from './reducers';

const store = createStore(combineReducers({
    menuReducer,
    basketReducer,
    depositReducer
}));

export default () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={RootView} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
);