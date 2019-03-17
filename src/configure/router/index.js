import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'

// import Header from "../../layout/Header/index"
// import Footer from "../../layout/Footer/index"
import MapModule from 'Views/Map/'
import NoFound from 'Views/NoFound/NpFound'
import {PrivateRoute} from "Shared/AuthorizeFilter";

export default class RouteMap extends React.Component {
    render() {
        return (
            <HashRouter basename="/">
                <div className="container_outer" id={'container_outer'}>
                    {/*<Header/>*/}
                    <div className={'container_inner'} id={'container_inner'}>
                        <Switch>
                            <PrivateRoute path="/" component={MapModule}/>
                            <PrivateRoute component={NoFound}/>
                        </Switch>
                    </div>
                    {/*<Footer/>*/}
                </div>
            </HashRouter>
        );
    }
}
