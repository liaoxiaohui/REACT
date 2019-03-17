import Api from "Configure/api";
import "Layout/Header/Header.less";
import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {cookies} from "Utils/tool-utils";
import {getUserInfo, signIn, isLoggedIn} from "Shared/AuthorizeFilter";

const {roleType, userName} = getUserInfo();

//全局头部导航模块组件
class Header extends React.Component {
    static getSignInComponent() {
        return (
            <ul className="nav navbar-nav navbar-right login_info">
                <li>
                    <a
                        className={
                            "user_icon " +
                            (roleType === 1 ? "user_admin" : "")
                        }
                        id="user_icon"
                    />
                </li>
                <li>
                    <a className="user_menu" id="user_menu">
                        {userName}
                    </a>
                </li>
                <li className="line_verti"/>
                <li onClick={Header.signOut}>
                    <a href="#" className="g-borderadius5">
                        注销
                    </a>
                </li>
            </ul>
        );
    }

    static getSignOutComponent() {
        return (
            <ul className="nav navbar-nav navbar-right login_info">
                <li>
                    <a href={signIn()} className="g-borderadius5">
                        登录
                    </a>
                </li>
            </ul>
        );
    }

    static signOut() {
        cookies("accessToken", null, {path: '/'});
        cookies("userInfo", null, {path: '/'});
        window.location.replace(Api.big_data_sys);
    }

    render() {
        return (
            <header id="header" className="header g_clear_fix">
                <nav
                    className="navbar navbar-default navbar-static-top"
                    id="nav_main"
                >
                    <div className="header_inner g_clear_fix">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#navbar_collapse"
                                aria-expanded="false"
                            >
                                <span className="sr-only">导航切换</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            {/* <a className="navbar-brand" href="#"/> */}
                        </div>
                        <div
                            className="collapse navbar-collapse navbar_collapse"
                            id="navbar_collapse"
                        >
                            <NavLink to={'/'} className={'logo_site_nav'}>
                                <div className="logo_site"/>
                            </NavLink>
                            <ul className="nav navbar-nav nav_main_wrap">
                                <li className="nav_main_item nav_0">
                                    <NavLink exact activeClassName="selected" to="/">
                                        首页
                                    </NavLink>
                                </li>
                                <li className="nav_main_item nav_1">
                                    <NavLink activeClassName="selected" to="/spaceWork">
                                        工作空间
                                    </NavLink>
                                </li>
                                <li className="nav_main_item nav_2">
                                    <NavLink activeClassName="selected" to="/maps">
                                        我的地图
                                    </NavLink>
                                </li>
                                <li className="nav_main_item nav_3">
                                    <NavLink activeClassName="selected" to="/resource">
                                        我的资源
                                    </NavLink>
                                </li>
                                {/*<li className="nav_main_item nav_4">*/}
                                {/*<NavLink activeClassName="selected" to="/authorize">*/}
                                {/*用户授权*/}
                                {/*</NavLink>*/}
                                {/*</li>*/}
                            </ul>
                            {isLoggedIn()
                                ? Header.getSignInComponent()
                                : Header.getSignOutComponent()}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);
