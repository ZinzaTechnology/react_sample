// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, hashHistory, ConnectedRouter, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore, { history } from './store/configure_store';
import MainContainer from './containers/main_container';
import HomeContainer from './containers/home_container';
import AnotherContainer from './containers/another_container';
import * as appActions from './actions/app_actions';
import * as itemActions from './actions/item_actions';

export const store = configureStore();

// https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <MainContainer>
                <ConnectedRouter history={history}>
                    <Route path="/" component={MainContainer} />
                    <Route path="/home" component={HomeContainer} />
                    <Route path="/another" component={AnotherContainer} />
                    <Redirect from="*" to="/" />
                </ConnectedRouter>
            </MainContainer>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('fund'),
)
