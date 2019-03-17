import React from 'react';
import {addQueryString, cookies, getQueryString} from 'Utils/tool-utils'
import {Route, Redirect} from 'react-router-dom'
import Api from "Configure/api";
import {getData} from "Shared/Fetch";

/**获取当前登录的用户信息
 * @param:
 * return:object=>{userId: "1", userName: "管理员", tokens: "21232f297a57a5a743894a0e4a801fc3", roleType: 1}
 * 调用示例
 *const user_info=getUserInfo();
 * **/
export function getUserInfo() {
    let user_info = {};
    user_info.userId = null;
    user_info.userName = null;
    user_info.tokens = null;
    user_info.roleType = null;
    try {
        user_info = Object.assign({}, user_info, JSON.parse(decodeURIComponent(cookies('userInfo'))));
    } catch (e) {
        user_info = {};
    }
    return user_info;
}

/**
 * 检查用户是否登录
 * @returns {null}
 */
export function isLoggedIn() {
    let {userId, tokens} = getUserInfo();
    return userId && tokens && cookies('accessToken');
}

/**判断是否是当前的登录用户
 * @param:userId=>string
 * return:bool
 * 调用示例
 *const is_current_user=isCurrentUser(userId);
 * **/
export function isCurrentUser(userId) {
    let user_info = getUserInfo();
    return user_info && Object.keys(user_info).length > 0 && Number(user_info.userId) === Number(userId);
}

/**判断是否具有管理员的操作权限
 * @param:
 * return:bool
 * 调用示例
 *const admin_authorized=adminAuthorized(userId);
 * **/
export function adminAuthorized() {
    let user_info = getUserInfo();
    return user_info && Object.keys(user_info).length > 0 && user_info.userId && user_info.roleType === 1;
}

export const isAdmin = adminAuthorized();

/**判断是否具有当前数据的操作权限
 * @param:userId=>string
 * return:bool
 * 调用示例
 *const is_authorized=isAuthorized(userId);
 * **/
export function isAuthorized(userId) {
    return isAdmin || isCurrentUser(userId);
}

/**判断是否显示具有数据操作的功能(是否渲染增删改查的触发按钮)
 * @param:props=>object=>{userId:'xxx'}
 *       function=>Wrapped=Button
 * return:element=><Button {...props}/>
 * 调用示例
 *AuthorizeFilter(props)(Button);
 * **/
export const AuthorizeFilter = props => (Wrapped) => {
    let {userId, children} = props;
    return isAuthorized(userId) ? < Wrapped {...props} >{children}</Wrapped> : null;
};

export const signIn = () => {
    let OauthAppID = Api.AppId; //应用id
    let nonce = "my-nonce";
    /**获取access_token**/
    return addQueryString(Api.dci_auth, {
        client_id: OauthAppID,
        redirect_uri: Api.big_data_sys,
        state: nonce,
        scope: OauthAppID + " AppId",
        response_type: "token"
    });
};

/**
 * 限制性组件访问，需要登录
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (rest.render && typeof rest.render === 'function')
                    return rest.render(props);
                if (isLoggedIn()) {
                    return <Component {...props} {...rest} />;
                } else {
                    /**
                     * 用户登录测试代码，测试完成，删除
                     */
                    let expires = 60 * 24; //过期时间;
                    let mydate = new Date();
                    let expiresTime = new Date(
                        mydate.setMinutes(mydate.getMinutes() + expires)
                    );
                    const accessToken='zATVqXlj92acfiabije06GnP98ZEYZBnf2bIho1oTgMC7wcOUgzY9r-6azlzl3HyZUC4Rsim7HJGTcIRmlunZ_f_uFy9Re1W3NNzLzOOAxPOHWlk2_U_zNiVa7-z8MhXnzBPmNZLrwCF4R6xWzzLjDsHGaktMo2Tut_e4mtp4Vy6FNT2xbjij75y1YKxi8YWTnAkn6BYEgDMZMhcYhfezhQDOAaDZ4Dh3MS2NCFJO6ugoYIwTnYgwVVGOUM45dar3cfr7ozcOUZ69scw7oTDwuPb57FJ63N7gQhG1E8MzLSPq6kfKtHiT4KQBRaMyheGuDHiylx3Zeulpiq1yR4hHttPq3y32-_rbuC4HwfiFPZ20pf1Imw9yEMWDL8RCgnKnwAEjb_wfgcE48fBAU-ExuapPYExsiVa_bYwAIGd-In5CofzclWODxNzdJRxRamYRp8qfOq0FgYwfBkli_bsld5Wljh6Y9TZu1JFWOdsdIJKZ9poKQjRBmwri_YDOI9DPIw3OThs4z053LkWeMgcOzQaKmqsz61FEks7vABoPTlTdv0EE5DPyt88VAHD7K07SR86IgVinNYnWq2GghrkoolANOMCqSvIO59y4MjfjEJZd4gBV97JS_ZM0BJQdKmoCNLMEcRaTWNnLAh7WtJa8pLRj8nuSDfxTb4Xl2qg9SLnEPzzRbKfOKskT6lNpCFn286P6txAwFn5h3Om9VRhMZ2G12EJfEuXqgVYZMYRAEP6gMHZawaeXtk6ZZ-fL4IGno1VrQ';
                    cookies("accessToken", accessToken, {
                        expires: expiresTime,
                        path: "/"
                    });
                    let user_info = {};
                    user_info.userId = 1;
                    user_info.userName = '管理员';
                    user_info.tokens = '21232f297a57a5a743894a0e4a801fc3';
                    user_info.roleType =1;
                    let user_cookies = JSON.stringify(user_info);
                    cookies("userInfo", user_cookies, {
                        expires: expiresTime,
                        path: "/"
                    });
                    window.location.replace(Api.big_data_sys);
                    if (window.location.href.indexOf("access_token") > -1) {
                        let expires = 60 * 24; //过期时间;
                        let mydate = new Date(),
                            accessToken = getQueryString("access_token");
                        let expiresTime = new Date(
                            mydate.setMinutes(mydate.getMinutes() + expires)
                        );
                        /**拿到access_token之后获取用户信息法**/
                        getData("/api/authorize/dci_resource", {
                            dataType: 'json',
                            data: {accessToken: accessToken}
                        }, (result) => {
                            if (result) {
                                result = JSON.parse(result);
                                //把access_token写在cookie里
                                cookies("accessToken", accessToken, {
                                    expires: expiresTime,
                                    path: "/"
                                });
                                let user_info = {};
                                user_info.userId = result.USERID;
                                user_info.userName = result.USERNAME;
                                user_info.tokens = result.TOKENS;
                                user_info.roleType =
                                    result.ROLEIDENTITY.indexOf('管理员') !== -1 ? 1 : 0;
                                //把用户信息写入COOKIE
                                let user_cookies = JSON.stringify(user_info);
                                cookies("userInfo", user_cookies, {
                                    expires: expiresTime,
                                    path: "/"
                                });
                                //登录完成
                            }
                            //跳回首页
                            window.location.replace(Api.big_data_sys);
                        });
                    } else {
                        window.location.replace(signIn());
                    }
                    return <></>;
                }
            }
            }
        />
    )
};
