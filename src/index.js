import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import RouteMap from "Configure/router/";
import AppReducers from "./redux/reducers";

import "Styles/Tools/css_tools.css"
import "Styles/Common/styles.less";
import "Styles/Map/arcgis-js-api/themes/light/main.css";
import "Styles/Map/main.css";
import "Assets/fonts/iconfont.css";

const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
});
const store = createStore(AppReducers, compose(applyMiddleware(thunk, logger)));
const addDOMNode = () => {
    const appNode = document.createElement("div");
    appNode.id = "root";
    appNode.className = "container_root";
    document.body.appendChild(appNode);
    return appNode;
};
/**
 * React portion of application
 */
ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <RouteMap/>
        </LocaleProvider>
    </Provider>,
    addDOMNode()
);
